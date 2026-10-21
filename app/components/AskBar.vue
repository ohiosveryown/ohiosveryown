<template>
  <!-- Transparent and inert until he's ready (see LittleGuy's "ready"), so
       the bar never appears with an empty or loading avatar. Not
       visibility: hidden, which would stop his video from decoding. -->
  <motion.form
    class="ask-bar"
    aria-label="Ask Mallow"
    :inert="!ready"
    :initial="{ opacity: 0, filter: 'blur(10px)' }"
    :animate="
      ready
        ? {
            opacity: 1,
            filter: 'blur(0px)',
            // Any filter left on, even blur(0px), stops the bar's own
            // backdrop-filter from seeing the page behind it.
            transitionEnd: { filter: 'none' },
            transition: { duration: reduceMotion ? 0.01 : 0.6, ease },
          }
        : { opacity: 0, filter: 'blur(10px)' }
    "
    drag
    :drag-listener="false"
    :drag-controls="dragControls"
    :drag-constraints="surface ?? false"
    :drag-elastic="0.12"
    :drag-transition="{ power: 0.18, timeConstant: 220 }"
    :while-drag="{ scale: 1.04 }"
    :class="{ 'is-open': open }"
    @pointerdown="startDrag"
    @drag-start="dragged = true"
    @click.capture="onClick"
    @submit.prevent="submit"
    @keydown.esc="open = false"
  >
    <!-- The conversation, once there is one (the pill grows into a panel). -->
    <motion.ul
      v-if="open"
      class="ask-bar__messages"
      aria-live="polite"
      :initial="{ opacity: 0, filter: 'blur(10px)' }"
      :animate="{
        opacity: 1,
        filter: 'blur(0px)',
        transitionEnd: { filter: 'none' },
        transition: { duration: reduceMotion ? 0.01 : 0.4, ease },
      }"
    >
      <li
        v-for="(message, index) in messages"
        :key="index"
        class="ask-bar__message"
        :class="`ask-bar__message--${message.role}`"
      >
        <template v-if="message.role === 'user'">
          <p class="ask-bar__bubble">{{ message.content }}</p>
        </template>
        <template v-else>
          <span class="ask-bar__face">
            <!-- Only the latest reply's avatar is live (and talks while it
                 streams); earlier ones are his still frame. -->
            <span class="ask-bar__face-guy">
              <LittleGuy
                v-if="index === messages.length - 1"
                :size="3.2"
                :mood="streaming ? 'talking' : 'idle'"
                label=""
              />
              <img
                v-else
                class="ask-bar__face-still"
                src="/little-guy/rest-sm.webp"
                alt=""
              />
            </span>
          </span>
          <p
            class="ask-bar__reply"
            :class="{ 'is-waiting': !message.content }"
          >
            {{ message.content || '…' }}
          </p>
        </template>
      </li>
    </motion.ul>

    <div class="ask-bar__row">
      <span
        v-show="!open"
        class="ask-bar__avatar"
      >
        <span class="ask-bar__guy">
          <LittleGuy
            :size="4.2"
            label="Mallow, the site's assistant"
            @ready="ready = true"
          />
        </span>
      </span>
      <input
        ref="input"
        v-model="question"
        class="ask-bar__input"
        type="text"
        name="question"
        :placeholder="open ? 'Ask a follow-up...' : 'Ask Mallow anything...'"
        aria-label="Ask Mallow anything"
        autocomplete="off"
        enterkeyhint="send"
        maxlength="500"
        @focus="reopen"
      />
      <button
        class="ask-bar__send"
        :class="{ 'is-ready': canSend }"
        type="submit"
        aria-label="Send"
        :disabled="!canSend"
      >
        <img
          class="ask-bar__arrow"
          :src="arrow"
          alt=""
          width="12.8947"
          height="9.73686"
        />
      </button>
    </div>
  </motion.form>
</template>

<style scoped lang="scss">
  :global(html.is-dragging-ask-bar) {
    -webkit-user-select: none;
    user-select: none;
  }

  .ask-bar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.5rem 1.2rem 1.8rem;
    border-radius: 3.2rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #000);
    box-shadow:
      0 6.7237rem 7.3684rem 0 rgba(0, 0, 0, 0.2),
      0 1.5018rem 1.6458rem 0 rgba(0, 0, 0, 0.12),
      0 0.4471rem 0.49rem 0 rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(0.5526rem);
    user-select: none;
  }

  .ask-bar__row {
    display: flex;
    align-items: center;
    gap: 1rem;

    .is-open > & {
      padding-left: 0.5rem;
    }
  }

  .ask-bar__messages {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    max-height: min(46rem, 50svh);
    padding: 0.3rem 0 1.6rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }

  .ask-bar__message {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
  }

  .ask-bar__message--user {
    justify-content: flex-end;
  }

  .ask-bar__bubble,
  .ask-bar__reply {
    font-family: var(--system-font);
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.06rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
    user-select: text;
  }

  .ask-bar__bubble {
    max-width: 85%;
    padding: 1.4rem;
    border-radius: 2.1rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .ask-bar__reply {
    flex: 1 0 0;
    min-width: 0;
    padding-top: 0.6rem;
    color: #d7f296;
    white-space: pre-wrap;

    &.is-waiting {
      opacity: 0.6;
    }
  }

  // A 24px slot, like the pill's avatar but smaller.
  .ask-bar__face {
    flex-shrink: 0;
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }

  .ask-bar__face-guy {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.2rem;
    transform: translate(-49.3%, -52.7%);
  }

  .ask-bar__face-still {
    display: block;
    width: 100%;
    height: auto;
  }

  // A 32px slot; he's drawn a little larger and centred on it, since his
  // video frame has room around him for his breathing.
  .ask-bar__avatar {
    flex-shrink: 0;
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }

  .ask-bar__guy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-49.3%, -52.7%);
  }

  .ask-bar__input {
    flex: 1 0 0;
    min-width: 0;
    padding: 0;
    border: 0;
    color: #d2f976;
    background: none;
    font-family: var(--system-font);
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.06rem;
    line-height: 1;
    outline: none;
    user-select: text;

    &::placeholder {
      color: #d2f976;
      opacity: 1;
    }

    .is-open & {
      color: #fff;

      &::placeholder {
        color: #fff;
        opacity: 0.7;
      }
    }
  }

  .ask-bar__send {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    border: 0;
    border-radius: 10rem;
    background: #d2f976;
    opacity: 0.3;
    transition: opacity 150ms var(--ease);

    &.is-ready {
      opacity: 1;
      cursor: var(--cursor, pointer);
    }

    &:focus-visible {
      outline: 1px solid #d2f976;
      outline-offset: 2px;
    }
  }

  .ask-bar__arrow {
    display: block;
    transform: rotate(-90deg);
  }
</style>

<script setup lang="ts">
  import { motion, useDragControls } from 'motion-v'
  import arrow from '~/assets/icons/send-arrow.svg'

  const ease = [0.8, 0, 0.16, 1] as const
  const ready = ref(false)
  const reduceMotion = ref(false)

  // With a mouse or trackpad the bar drags around the desk like the icons
  // (same bounds and feel as DeskItem). Not on touch, where it's full width.
  // Drags start anywhere but the text field and the send button. `drag` stays
  // on and startDrag decides: motion measures the drag bounds on mount, and
  // turning drag on later left the bar with no bounds at all.
  const { surface } = useDesk()
  const dragControls = useDragControls()
  const draggable = ref(false)
  let dragged = false

  function startDrag(event: PointerEvent) {
    dragged = false
    if (!draggable.value) return
    if ((event.target as Element).closest('input, button')) return
    // The press would also start selecting text across the page. Turn
    // selection off until it's released (cancelling the press instead
    // throws off motion's drag tracking).
    const root = document.documentElement
    root.classList.add('is-dragging-ask-bar')
    window.getSelection()?.removeAllRanges()
    window.addEventListener(
      'pointerup',
      () => root.classList.remove('is-dragging-ask-bar'),
      { once: true },
    )
    dragControls.start(event)
  }

  // Letting go after a drag isn't a click (no hop from the little guy).
  function onClick(event: MouseEvent) {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    draggable.value = window.matchMedia('(pointer: fine)').matches
  })

  // Mallow's chat (server/api/ask.post.ts): the pill grows into a panel with
  // the conversation, and his reply streams in while he talks.
  type Message = { role: 'user' | 'assistant'; content: string }

  const question = ref('')
  const messages = ref<Message[]>([])
  const open = ref(false)
  const streaming = ref(false)
  const input = useTemplateRef<HTMLInputElement>('input')
  const canSend = computed(
    () => question.value.trim().length > 0 && !streaming.value,
  )
  let controller: AbortController | undefined

  const SORRY =
    "I'm having trouble answering right now. You can always reach Matt at matt@ohiosveryown.co."
  const BUSY =
    "I've answered a lot of questions in a row! Give me a few minutes, or email Matt at matt@ohiosveryown.co."

  function scrollToEnd() {
    nextTick(() => {
      const el = input.value
        ?.closest('form')
        ?.querySelector<HTMLElement>('.ask-bar__messages')
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  function reopen() {
    if (messages.value.length) open.value = true
  }

  async function submit() {
    if (!canSend.value) return
    const text = question.value.trim()
    question.value = ''
    const history = [
      ...messages.value,
      { role: 'user', content: text } as Message,
    ]
    messages.value = [...history, { role: 'assistant', content: '' }]
    const reply = messages.value.at(-1)!
    open.value = true
    streaming.value = true
    scrollToEnd()

    controller = new AbortController()
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only finished turns; the server keeps the last few.
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        reply.content = res.status === 429 ? BUSY : SORRY
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        reply.content += decoder.decode(value, { stream: true })
        scrollToEnd()
      }
      if (!reply.content.trim()) reply.content = SORRY
    } catch (error) {
      if ((error as Error).name !== 'AbortError') reply.content = SORRY
    } finally {
      streaming.value = false
      controller = undefined
      scrollToEnd()
      input.value?.focus()
    }
  }

  // A click anywhere else on the page folds the panel back into the pill.
  function onDocumentPointer(event: PointerEvent) {
    if (!open.value) return
    const form = input.value?.closest('form')
    if (form && !form.contains(event.target as Node)) open.value = false
  }
  onMounted(() =>
    document.addEventListener('pointerdown', onDocumentPointer, true),
  )
  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointer, true)
    controller?.abort()
  })
</script>
