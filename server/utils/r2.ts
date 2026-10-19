import { AwsClient } from 'aws4fetch'

// Cloudflare R2 through its S3-compatible API. Server-only credentials; the
// bucket itself is public (NUXT_R2_PUBLIC_URL) so browsers load images
// straight from it.

let client: AwsClient | undefined

function config() {
  const {
    r2AccountId,
    r2AccessKeyId,
    r2SecretAccessKey,
    r2Bucket,
    r2PublicUrl,
  } = useRuntimeConfig()
  if (
    !r2AccountId ||
    !r2AccessKeyId ||
    !r2SecretAccessKey ||
    !r2Bucket ||
    !r2PublicUrl
  ) {
    return null
  }
  client ??= new AwsClient({
    accessKeyId: r2AccessKeyId,
    secretAccessKey: r2SecretAccessKey,
    service: 's3',
    region: 'auto',
  })
  return {
    client,
    endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com/${r2Bucket}`,
    publicUrl: r2PublicUrl.replace(/\/$/, ''),
  }
}

export function isR2Configured() {
  return config() !== null
}

export function r2PublicUrl(key: string) {
  const r2 = config()
  return r2 ? `${r2.publicUrl}/${key}` : null
}

// Returns the object's custom metadata, or null if it doesn't exist.
export async function r2Head(key: string) {
  const r2 = config()
  if (!r2) return null
  const res = await r2.client.fetch(`${r2.endpoint}/${key}`, {
    method: 'HEAD',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`R2 HEAD ${key}: ${res.status}`)
  const meta: Record<string, string> = {}
  res.headers.forEach((value, name) => {
    if (name.startsWith('x-amz-meta-')) meta[name.slice(11)] = value
  })
  return meta
}

export async function r2Put(
  key: string,
  body: Uint8Array,
  contentType: string,
  meta: Record<string, string> = {},
) {
  const r2 = config()
  if (!r2) throw new Error('R2 is not configured')
  const headers: Record<string, string> = {
    'Content-Type': contentType,
    // Keys are content-addressed, so a file never changes once written.
    'Cache-Control': 'public, max-age=31536000, immutable',
  }
  for (const [name, value] of Object.entries(meta)) {
    headers[`x-amz-meta-${name}`] = value
  }
  const res = await r2.client.fetch(`${r2.endpoint}/${key}`, {
    method: 'PUT',
    headers,
    body,
  })
  if (!res.ok) throw new Error(`R2 PUT ${key}: ${res.status}`)
}
