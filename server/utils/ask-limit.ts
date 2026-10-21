import type { H3Event } from 'h3'

// Per-visitor limit on Mallow's questions, counted by the counter Worker in
// D1 (POST /ask-limit), which also keeps each allowed question's text. The
// Worker only stores a salted hash of the IP, never the IP.
// Without a Worker secret configured the check is skipped in dev and
// refused in production, so a misconfigured deploy can't run up the bill.

export async function askLimit(event: H3Event, question: string) {
  const { askLimitSecret, public: pub } = useRuntimeConfig(event)
  if (!askLimitSecret || !pub.counterUrl) {
    if (import.meta.dev) return
    throw createError({ statusCode: 503, statusMessage: 'Chat is off' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const res = await fetch(`${pub.counterUrl}/ask-limit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${askLimitSecret}`,
      'Content-Type': 'application/json',
    },
    // The Worker keeps the question too (ask_questions), once it's allowed.
    body: JSON.stringify({ ip, question }),
  }).catch(() => null)

  if (res?.status === 429) {
    const retryAfter = res.headers.get('Retry-After')
    if (retryAfter) setResponseHeader(event, 'Retry-After', retryAfter)
    throw createError({ statusCode: 429, statusMessage: 'Too many questions' })
  }
  if (!res?.ok) {
    console.error('[mallow] ask limit unavailable', res?.status)
    throw createError({ statusCode: 503, statusMessage: 'Chat is off' })
  }
}
