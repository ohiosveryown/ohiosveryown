// Mallow's chat: takes the conversation so far, streams the reply back as
// plain text. Guards, since every question costs money: same-origin only,
// short messages and history, a capped reply, and a per-visitor rate limit
// (askLimit, kept in the counter Worker's D1).

type Turn = { role: 'user' | 'assistant'; content: string }

const MAX_QUESTION = 500
const MAX_REPLY_KEPT = 2000
const MAX_TURNS = 10
const MAX_REPLY_TOKENS = 350

function readTurns(body: unknown): Turn[] {
  const messages = (body as { messages?: unknown })?.messages
  if (!Array.isArray(messages) || !messages.length) {
    throw createError({ statusCode: 400, statusMessage: 'No question' })
  }
  const turns = messages.slice(-MAX_TURNS).map((message): Turn => {
    const { role, content } = (message ?? {}) as Record<string, unknown>
    if (
      (role !== 'user' && role !== 'assistant') ||
      typeof content !== 'string'
    ) {
      throw createError({ statusCode: 400, statusMessage: 'Bad message' })
    }
    if (role === 'user' && content.length > MAX_QUESTION) {
      throw createError({ statusCode: 413, statusMessage: 'Question too long' })
    }
    return { role, content: content.slice(0, MAX_REPLY_KEPT).trim() }
  })
  if (turns.at(-1)?.role !== 'user' || !turns.at(-1)?.content) {
    throw createError({ statusCode: 400, statusMessage: 'No question' })
  }
  return turns
}

// OpenAI streams server-sent events; pass on just the text.
function textStream(upstream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''
  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (!data || data === '[DONE]') continue
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content
            if (delta) controller.enqueue(encoder.encode(delta))
          } catch {
            // A partial or non-JSON line; skip it.
          }
        }
      },
    }),
  )
}

export default defineEventHandler(async (event) => {
  const { openaiApiKey, openaiModel } = useRuntimeConfig(event)
  const apiKey = openaiApiKey || process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Chat is off' })
  }

  // Browsers always send Origin on POST; other sites can't spend the key.
  const origin = getRequestHeader(event, 'origin')
  if (origin !== getRequestURL(event).origin) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const turns = readTurns(await readBody(event))
  await askLimit(event, turns.at(-1)!.content)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: openaiModel,
      stream: true,
      max_tokens: MAX_REPLY_TOKENS,
      temperature: 0.6,
      messages: [
        { role: 'system', content: await mallowInstructions() },
        ...turns,
      ],
    }),
  })
  if (!res.ok || !res.body) {
    console.error(
      '[mallow] OpenAI',
      res.status,
      await res.text().catch(() => ''),
    )
    throw createError({
      statusCode: 502,
      statusMessage: 'Mallow is unavailable',
    })
  }

  setResponseHeaders(event, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  return sendStream(event, textStream(res.body))
})
