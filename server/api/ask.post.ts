import type { H3Event } from 'h3'

// Mallow's chat: takes the conversation so far, streams the reply back as
// plain text. Guards, since every question costs money: same-origin only,
// short messages and history, a capped reply, and a per-visitor rate limit
// (askLimit, kept in the counter Worker's D1). Questions starting with
// /test get a canned reply instead (see testReply).

type Turn = { role: 'user' | 'assistant'; content: string }

const MAX_QUESTION = 500
const MAX_REPLY_KEPT = 2000
const MAX_TURNS = 10
// A backstop: about 70 words. The instructions ask for far less.
const MAX_REPLY_TOKENS = 110
const REASONING_TOKENS = 1000

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

// Mallow's {{index}} (INDEX_MARKER) becomes the list of every post as it
// streams past. Text that could be the start of it is held back until
// the next piece shows whether it is.
function withIndex() {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let held = ''
  return new TransformStream<Uint8Array, Uint8Array>({
    async transform(chunk, controller) {
      held += decoder.decode(chunk, { stream: true })
      if (held.includes(INDEX_MARKER)) {
        held = held.replace(INDEX_MARKER, await mallowIndex())
      }
      let keep = Math.min(held.length, INDEX_MARKER.length - 1)
      while (keep && !INDEX_MARKER.startsWith(held.slice(-keep))) keep--
      const ready = held.slice(0, held.length - keep)
      held = held.slice(held.length - keep)
      if (ready) controller.enqueue(encoder.encode(ready))
    },
    flush(controller) {
      if (held) controller.enqueue(encoder.encode(held))
    },
  })
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

// "/test" questions get a canned reply without calling OpenAI or the
// Worker, so the chat can be tried without cost, rate limiting or logging.
// Streamed in bursts like a real reply, so the typing still gets exercised.
const TEST_REPLIES: Record<string, string> = {
  '': 'Testing, testing! This is a pretend answer, so nothing was sent to OpenAI or saved. 🧪',
  index: `Everything Matt's put on the desk, newest first:\n${INDEX_MARKER}`,
  long: "This is a longer pretend answer for checking how replies wrap and scroll. Matt is a software designer and builder in Atlanta, working across brand, product, and code. He's a Principal Product Designer at Square, and before that he designed at Slack, GitHub and Mailchimp. Outside of work he runs Proportional Design, a small furniture studio. None of this came from OpenAI.",
}

function testReply(event: H3Event, command: string) {
  const variant = command.slice('/test'.length).trim().toLowerCase()
  if (variant === 'busy') {
    throw createError({ statusCode: 429, statusMessage: 'Too many questions' })
  }
  if (variant === 'error') {
    throw createError({
      statusCode: 502,
      statusMessage: 'Mallow is unavailable',
    })
  }
  const words = (TEST_REPLIES[variant] ?? TEST_REPLIES['']!).split(/(?<= )/)
  const encoder = new TextEncoder()
  const replies = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (let i = 0; i < words.length; i += 3) {
        controller.enqueue(encoder.encode(words.slice(i, i + 3).join('')))
        await new Promise((r) => setTimeout(r, 60))
      }
      controller.close()
    },
  })
  setResponseHeaders(event, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  return sendStream(event, replies.pipeThrough(withIndex()))
}

export default defineEventHandler(async (event) => {
  // Browsers always send Origin on POST; other sites can't spend the key.
  const origin = getRequestHeader(event, 'origin')
  if (origin !== getRequestURL(event).origin) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const turns = readTurns(await readBody(event))
  const question = turns.at(-1)!.content
  if (/^\/test\b/i.test(question)) return testReply(event, question)

  const { openaiApiKey, openaiModel, openaiReasoningEffort } =
    useRuntimeConfig(event)
  const apiKey = openaiApiKey || process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Chat is off' })
  }
  await askLimit(event, question)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: openaiModel,
      stream: true,
      // A reasoning model: by default no thinking for a two-sentence reply
      // (it would only add a wait before the first word, and cost). Any
      // thinking counts against max_completion_tokens, so it gets room on
      // top of the reply's. Temperature isn't supported.
      reasoning_effort: openaiReasoningEffort,
      max_completion_tokens:
        MAX_REPLY_TOKENS +
        (openaiReasoningEffort === 'none' ? 0 : REASONING_TOKENS),
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
  return sendStream(event, textStream(res.body).pipeThrough(withIndex()))
})
