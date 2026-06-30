/**
 * One-time helper to obtain a Spotify refresh token.
 *
 * Prerequisites:
 * - App created at https://developer.spotify.com/dashboard
 * - Redirect URI set to: http://127.0.0.1:8080/callback
 * - NUXT_SPOTIFY_CLIENT_ID and NUXT_SPOTIFY_CLIENT_SECRET in .env
 *
 * Usage: node scripts/spotify-auth.mjs
 */

import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REDIRECT_URI = 'http://127.0.0.1:8080/callback'
const SCOPE = 'user-read-currently-playing user-read-recently-played'

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8')
    return Object.fromEntries(
      raw
        .split('\n')
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => {
          const i = line.indexOf('=')
          return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
        }),
    )
  } catch {
    return {}
  }
}

const env = { ...loadEnv(), ...process.env }
const clientId = env.NUXT_SPOTIFY_CLIENT_ID
const clientSecret = env.NUXT_SPOTIFY_CLIENT_SECRET

if (!clientId || !clientSecret) {
  console.error(
    'Missing NUXT_SPOTIFY_CLIENT_ID or NUXT_SPOTIFY_CLIENT_SECRET in .env',
  )
  process.exit(1)
}

const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.searchParams.set('client_id', clientId)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('scope', SCOPE)
// Required if you've authorized this app before — otherwise Spotify
// may omit refresh_token from the token response.
authUrl.searchParams.set('show_dialog', 'true')

console.log('\n1. Open this URL in your browser:\n')
console.log(authUrl.toString())
console.log(
  '\n2. After approving, the browser will redirect to 127.0.0.1 (page may not load).',
)
console.log('   Copy the full URL from the address bar.\n')

const rl = createInterface({ input, output })
const answer = await rl.question(
  '3. Paste the redirect URL (or just the code) here: ',
)
rl.close()

const trimmed = answer.trim()
let code
try {
  code = new URL(trimmed).searchParams.get('code')
} catch {
  code = trimmed.includes('code=')
    ? new URL(`http://x?${trimmed.split('?').pop()}`).searchParams.get('code')
    : trimmed
}

if (!code) {
  console.error('No ?code= found in that URL.')
  process.exit(1)
}

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  }),
})

const data = await res.json()
if (!res.ok) {
  console.error('Token exchange failed:', data)
  process.exit(1)
}

if (!data.refresh_token) {
  console.error(
    'No refresh_token in response. Spotify only returns one on first consent.',
  )
  console.error('Response:', data)
  console.error(
    '\nTry again: revoke this app at https://www.spotify.com/account/apps',
  )
  console.error('then re-run this script (show_dialog is already enabled).\n')
  process.exit(1)
}

console.log('\nAdd this to your .env:\n')
console.log(`NUXT_SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`)
