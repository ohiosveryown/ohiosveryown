type SpotifyArtist = { name: string }
type SpotifyImage = { url: string }
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

function toLastPlayed(
  track: SpotifyTrack,
  source: LastPlayed['source'],
  playedAt: string | null = null,
): LastPlayed {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    cover: track.album.images?.[0]?.url ?? null,
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

// Prefer currently-playing (updates live), fall back to recently-played.
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
          return toLastPlayed(current.item, 'now-playing')
        }
      }

      const data = await $fetch<RecentlyPlayed>(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        { headers },
      )

      const item = data.items?.[0]
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
