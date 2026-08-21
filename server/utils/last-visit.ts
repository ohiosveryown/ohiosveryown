export type LastVisit = {
  id: string
  label: string
}

type StoredVisit = LastVisit & {
  ipHash: string
}

type Geo = {
  city: string
  region: string
  country: string
}

const STORAGE_KEY = 'last-visit'

function titleState(code: string) {
  const upper = code.toUpperCase()
  return `${upper[0]}${upper.slice(1).toLowerCase()}`
}

function formatStateAbbr(region: string, country: string): string | null {
  const trimmed = region.trim()
  const prefixed = /^US-([A-Z]{2})$/i.exec(trimmed)
  if (prefixed) return titleState(prefixed[1])
  if (/^US$/i.test(country) && /^[A-Z]{2}$/i.test(trimmed)) {
    return titleState(trimmed)
  }
  return null
}

export function formatVisitLabel(geo: Geo): string | null {
  const city = geo.city.trim()
  const country = geo.country.trim()
  const state = formatStateAbbr(geo.region, country)

  if (city && state) return `${city}, ${state}`
  if (city && country) return `${city}, ${country}`
  if (city) return city
  if (state) return state
  if (country) return country
  return null
}

function isPrivateIp(ip: string) {
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return true
  }
  if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('169.254.')) {
    return true
  }
  const m = /^172\.(\d+)\./.exec(ip)
  if (m) {
    const n = Number(m[1])
    if (n >= 16 && n <= 31) return true
  }
  return false
}

function decodeHeader(value: string | undefined) {
  if (!value) return ''
  try {
    return decodeURIComponent(value.replace(/\+/g, ' ')).trim()
  } catch {
    return value.trim()
  }
}

export function getClientIp(event: Parameters<typeof getRequestIP>[0]) {
  return (
    getRequestIP(event, { xForwardedFor: true }) ||
    getHeader(event, 'cf-connecting-ip') ||
    getHeader(event, 'x-real-ip') ||
    ''
  )
}

function geoFromHeaders(event: Parameters<typeof getHeader>[0]): Geo | null {
  const vercelCity = decodeHeader(getHeader(event, 'x-vercel-ip-city'))
  const vercelRegion = decodeHeader(getHeader(event, 'x-vercel-ip-country-region'))
  const vercelCountry = decodeHeader(getHeader(event, 'x-vercel-ip-country'))
  if (vercelCity || vercelCountry) {
    return {
      city: vercelCity,
      region: vercelRegion,
      country: vercelCountry,
    }
  }

  const cfCountry = decodeHeader(getHeader(event, 'cf-ipcountry'))
  const cfCity = decodeHeader(getHeader(event, 'cf-ipcity'))
  const cfRegion = decodeHeader(getHeader(event, 'cf-region-code'))
  if (cfCity || (cfCountry && cfCountry !== 'XX')) {
    return {
      city: cfCity,
      region: cfRegion,
      country: cfCountry === 'XX' ? '' : cfCountry,
    }
  }

  return null
}

type IpWhoResponse = {
  success?: boolean
  city?: string
  region_code?: string
  country_code?: string
}

async function geoFromIpLookup(ip: string): Promise<Geo | null> {
  try {
    const data = await $fetch<IpWhoResponse>(
      `https://ipwho.is/${encodeURIComponent(ip)}`,
      { timeout: 2000 },
    )
    if (!data.success) return null
    return {
      city: data.city?.trim() ?? '',
      region: data.region_code?.trim() ?? '',
      country: data.country_code?.trim() ?? '',
    }
  } catch (err) {
    console.error('[last-visit] ip lookup failed', err)
    return null
  }
}

async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, '0'),
  )
    .join('')
    .slice(0, 16)
}

export function isBotRequest(event: Parameters<typeof getHeader>[0]) {
  const ua = getHeader(event, 'user-agent') || ''
  return /bot|crawl|spider|preview|facebookexternalhit|slackbot|embed/i.test(ua)
}

async function readStored(): Promise<StoredVisit | null> {
  return (await useStorage('data').getItem<StoredVisit>(STORAGE_KEY)) ?? null
}

async function writeStored(visit: StoredVisit) {
  await useStorage('data').setItem(STORAGE_KEY, visit)
}

function toPublic(visit: StoredVisit): LastVisit {
  return { id: visit.id, label: visit.label }
}

export async function peekLastVisit(
  event: Parameters<typeof getClientIp>[0],
): Promise<LastVisit | null> {
  const stored = await readStored()
  if (!stored) return null

  const ip = getClientIp(event)
  if (!ip) return toPublic(stored)

  const ipHash = await hashIp(ip)
  if (stored.ipHash === ipHash) return null
  return toPublic(stored)
}

export async function recordVisit(
  event: Parameters<typeof getClientIp>[0],
): Promise<LastVisit | null> {
  const stored = await readStored()
  const ip = getClientIp(event)

  if (!ip || isPrivateIp(ip) || isBotRequest(event)) {
    return stored ? toPublic(stored) : null
  }

  const ipHash = await hashIp(ip)
  const shown =
    stored && stored.ipHash !== ipHash ? toPublic(stored) : null

  if (stored?.ipHash === ipHash) return shown

  const geo = geoFromHeaders(event) ?? (await geoFromIpLookup(ip))
  const label = geo ? formatVisitLabel(geo) : null
  if (!label) return shown

  await writeStored({
    id: `${Date.now()}-${ipHash}`,
    label,
    ipHash,
  })

  return shown
}
