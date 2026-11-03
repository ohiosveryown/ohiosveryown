import type { H3Event } from 'h3'

type SpotifyArtist = { name: string }
type SpotifyImage = { url: string; width: number | null }
type SpotifyTrack = {
  name: string
  artists: SpotifyArtist[]
  album: { images: SpotifyImage[] }
  external_urls: { spotify: string }
}
type RecentlyPlayed = { items: { track: SpotifyTrack; played_at: string }[] }
type CurrentlyPlaying = { is_playing: boolean; item: SpotifyTrack | null }

export type LastPlayed = {
  title: string
  artist: string
  cover: string | null
  url: string | null
  source: 'now-playing' | 'recently-played'
  playedAt: string | null
}

// The cover shows as a small desk icon, but Spotify lists its 640px image
// first (about 100KB). Take the smallest that's still sharp on a 3x screen.
const COVER_MIN_WIDTH = 216
function coverFor(images: SpotifyImage[]) {
  const sharp = images
    .filter((image) => (image.width ?? 0) >= COVER_MIN_WIDTH)
    .sort((a, b) => (a.width ?? 0) - (b.width ?? 0))
  return (sharp[0] ?? images[0])?.url ?? null
}

function toLastPlayed(
  track: SpotifyTrack,
  source: LastPlayed['source'],
  playedAt: string | null = null,
): LastPlayed {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    cover: coverFor(track.album.images ?? []),
    url: track.external_urls.spotify ?? null,
    source,
    playedAt,
  }
}

async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  return $fetch<{ access_token: string }>(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    },
  )
}

// The last song seen playing, kept by the counter Worker (/last-played),
// since Spotify's recently-played list sometimes stops updating for days.
// Skipped without the Worker's secret (as in dev, so dev never writes it).
type Remembered = Omit<LastPlayed, 'source' | 'playedAt'> & { at: number }

function counter(event: H3Event) {
  const { askLimitSecret, public: pub } = useRuntimeConfig(event)
  if (!askLimitSecret || !pub.counterUrl) return null
  return {
    url: `${pub.counterUrl}/last-played`,
    headers: {
      Authorization: `Bearer ${askLimitSecret}`,
      'Content-Type': 'application/json',
    },
  }
}

async function remember(event: H3Event, song: LastPlayed) {
  const to = counter(event)
  if (!to) return
  const { title, artist, cover, url } = song
  await fetch(to.url, {
    method: 'PUT',
    headers: to.headers,
    body: JSON.stringify({ title, artist, cover, url }),
  }).catch((err) => console.error('[last-played] remember failed', err))
}

async function remembered(event: H3Event) {
  const to = counter(event)
  if (!to) return null
  const res = await fetch(to.url, { headers: to.headers }).catch(() => null)
  if (!res?.ok) return null
  return ((await res.json()) as Remembered | null) ?? null
}

// Prefer currently-playing (updates live, and is remembered), falling back
// to whichever is newer: recently-played or the last one seen playing.
export default defineCachedEventHandler(
  async (event): Promise<LastPlayed | null> => {
    const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } =
      useRuntimeConfig(event)

    if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
      return null
    }

    try {
      const { access_token } = await getAccessToken(
        spotifyClientId,
        spotifyClientSecret,
        spotifyRefreshToken,
      )

      const headers = { Authorization: `Bearer ${access_token}` }

      const currentRes = await fetch(
        'https://api.spotify.com/v1/me/player/currently-playing',
        { headers },
      )

      // 200 = playing/paused with body; 204 = nothing active (empty body).
      if (currentRes.status === 200) {
        const current = (await currentRes.json()) as CurrentlyPlaying
        if (current?.item) {
          const playing = toLastPlayed(current.item, 'now-playing')
          await remember(event, playing)
          return playing
        }
      }

      const [data, seen] = await Promise.all([
        $fetch<RecentlyPlayed>(
          'https://api.spotify.com/v1/me/player/recently-played?limit=1',
          { headers },
        ),
        remembered(event),
      ])

      const item = data.items?.[0]
      const playedAt = item?.played_at ? Date.parse(item.played_at) : 0
      if (seen && seen.at > playedAt) {
        const { at, ...song } = seen
        return {
          ...song,
          source: 'recently-played',
          playedAt: new Date(at).toISOString(),
        }
      }
      if (!item?.track) return null

      return toLastPlayed(
        item.track,
        'recently-played',
        item.played_at ?? null,
      )
    } catch (err) {
      console.error('[last-played] Spotify fetch failed', err)
      return null
    }
  },
  { maxAge: 30 },
)
