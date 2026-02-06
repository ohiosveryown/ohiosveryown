<template>
  <div class="chat-container">
    <!-- Toggle Button -->
    <button
      class="chat-toggle sans"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      aria-label="Toggle chat"
    >
      <span v-if="!isOpen">Ask me anything</span>
      <svg
        v-else
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M1 1L13 13M1 13L13 1"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <!-- Chat Panel -->
    <transition name="chat">
      <div
        v-if="isOpen"
        class="chat-panel"
      >
        <div class="chat-header sans">
          <span class="dot"></span>
          Ask about Matt or his work
        </div>

        <div
          class="chat-messages"
          ref="messagesContainer"
        >
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="msg.role"
          >
            <p class="sans">{{ msg.content }}</p>
          </div>

          <div
            v-if="isLoading"
            class="message assistant"
          >
            <p class="sans loading"><span></span><span></span><span></span></p>
          </div>

          <div
            v-if="messages.length === 0 && !isLoading"
            class="suggestions"
          >
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              class="suggestion sans"
              @click="sendMessage(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <form
          class="chat-input"
          @submit.prevent="sendMessage(input)"
        >
          <input
            v-model="input"
            type="text"
            placeholder="Ask a question..."
            class="sans"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!input.trim() || isLoading"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 8L2 14L4 8L2 2L14 8Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
  const isOpen = ref(false)
  const input = ref('')
  const messages = ref([])
  const isLoading = ref(false)
  const messagesContainer = ref(null)

  const suggestions = [
    'What does Matt do?',
    'Tell me about his work at GitHub',
    'What side projects does he have?',
  ]

  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading.value) return

    const userMessage = text.trim()
    input.value = ''

    messages.value.push({ role: 'user', content: userMessage })
    scrollToBottom()

    isLoading.value = true

    try {
      const { reply } = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          message: userMessage,
          history: messages.value.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      })

      messages.value.push({ role: 'assistant', content: reply })
    } catch (error) {
      messages.value.push({
        role: 'assistant',
        content: "Sorry, I couldn't process that request. Please try again.",
      })
    } finally {
      isLoading.value = false
      scrollToBottom()
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/style/grid.scss';

  .chat-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: var(--z2);
    @include breakpoint(md) {
      bottom: 2.4rem;
      right: 2.4rem;
    }
  }

  .chat-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.2rem 1.8rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1;
    color: var(--color--bg);
    background: var(--color--primary);
    border-radius: var(--border-radius--full);
    box-shadow: var(--shadow--md);
    cursor: pointer;
    transition: all 200ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow--lg);
    }

    &.is-open {
      padding: 1.2rem;
      border-radius: 50%;
    }
  }

  .chat-panel {
    position: absolute;
    bottom: calc(100% + 1.2rem);
    right: 0;
    width: 340px;
    max-height: 480px;
    background: var(--color--bg);
    border-radius: var(--border-radius--lg);
    box-shadow: var(--shadow--lg);
    border: 1px solid var(--color--tertiary);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (max-width: 400px) {
      width: calc(100vw - 4rem);
      right: -1rem;
    }
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.4rem 1.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color--primary);
    background: var(--color--tertiary);
    border-bottom: 1px solid var(--color--tertiary);
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #34c759;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(52, 199, 89, 0.5);
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    min-height: 200px;
    max-height: 320px;
  }

  .message {
    max-width: 85%;

    p {
      padding: 1rem 1.4rem;
      font-size: 1.4rem;
      line-height: 1.5;
      border-radius: var(--border-radius--md);
    }

    &.user {
      align-self: flex-end;
      p {
        background: var(--color--primary);
        color: var(--color--bg);
        border-bottom-right-radius: 4px;
      }
    }

    &.assistant {
      align-self: flex-start;
      p {
        background: var(--color--tertiary);
        color: var(--color--primary);
        border-bottom-left-radius: 4px;
      }
    }
  }

  .loading {
    display: flex;
    gap: 4px;
    padding: 1.2rem 1.6rem !important;

    span {
      width: 6px;
      height: 6px;
      background: var(--color--secondary);
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }
      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0.6);
      opacity: 0.4;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .suggestion {
    padding: 1rem 1.4rem;
    font-size: 1.3rem;
    font-weight: 450;
    line-height: 1.4;
    text-align: left;
    color: var(--color--primary);
    background: var(--color--tertiary);
    border-radius: var(--border-radius--md);
    cursor: pointer;
    transition: opacity 200ms ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .chat-input {
    display: flex;
    gap: 0.8rem;
    padding: 1.2rem 1.6rem;
    border-top: 1px solid var(--color--tertiary);
    background: var(--color--bg);

    input {
      flex: 1;
      padding: 1rem 1.4rem;
      font-size: 1.4rem;
      color: var(--color--primary);
      background: var(--color--tertiary);
      border: none;
      border-radius: var(--border-radius--md);
      outline: none;

      &::placeholder {
        color: var(--color--secondary);
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--color--secondary);
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      color: var(--color--bg);
      background: var(--color--primary);
      border-radius: var(--border-radius--md);
      cursor: pointer;
      transition: opacity 200ms ease;

      &:hover:not(:disabled) {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

  // Transitions
  .chat-enter-active,
  .chat-leave-active {
    transition: all 200ms ease;
  }

  .chat-enter-from,
  .chat-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
</style>
