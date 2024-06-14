<template>
  <header class="container">
    <h1>Travel guide.</h1>
    <h2>
      👋 can be sent to:
      <Tooltip
        @click="copyEmail"
        trigger="matt@ohiosveryown.co"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/email.webp?updatedAt=1718291659670"
        alt="Illustration of me"
        tooltipLabel="click to copy email"
      />
    </h2>
  </header>
  <transition name="fade">
    <div
      class="toast"
      v-if="isToastVisible"
    >
      <!-- <div class="icon" /> -->
      <svg
        width="13"
        height="10"
        fill="none"
      >
        <path
          fill="var(--color--bg)"
          fill-rule="evenodd"
          d="M12.723.217c.346.31.371.837.056 1.177L5.07 9.727a.855.855 0 0 1-1.285-.034L.19 5.36a.824.824 0 0 1 .121-1.172.858.858 0 0 1 1.193.12L4.476 7.89 11.525.273a.858.858 0 0 1 1.198-.056Z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="sans">Email copied</p>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    margin-bottom: 4rem;
    @include breakpoint(lg) {
      margin-bottom: 7.2rem;
    }
  }

  h1 {
    margin-bottom: 1.6rem;
    @include breakpoint(md) {
      margin-bottom: 2rem;
    }
  }

  br {
    display: none;
    @include breakpoint(md) {
      display: initial;
    }
  }

  .toast {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7rem;
    position: fixed;
    z-index: var(--z1);
    left: 0;
    right: 0;
    bottom: 2rem;
    margin: auto;
    width: max-content;
    border-radius: var(--border-radius--full);
    padding: 1rem 1.6rem 0.9rem 1.4rem;
    background: var(--color--primary);
    color: var(--color--bg);
    box-shadow: var(--shadow--md);
    p {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 1;
    }
    @include breakpoint(lg) {
      left: auto;
      right: 2.2rem;
      bottom: 2rem;
      width: initial;
    }
  }

  .icon {
    margin-right: 0.2rem;
    border-radius: 100px;
    width: 8px;
    height: 8px;
    background: #4ed70e;
    filter: drop-shadow(0 3px 4px rgba(29, 167, 34, 0.3));
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(1rem);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
    transition: all 300ms ease;
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
    transition: all 300ms ease;
  }

  input {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    height: 0px !important;
    max-height: 0px !important;
  }
</style>

<script setup>
  const isToastVisible = ref(false)
  const copyEmail = () => {
    const email = "matt@ohiosveryown.co"
    const tempInput = document.createElement("input")

    tempInput.setAttribute("value", email)
    document.body.appendChild(tempInput)
    tempInput.select()
    tempInput.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(tempInput)

    // toast
    isToastVisible.value = true
    setTimeout(() => {
      isToastVisible.value = false
    }, 2000)
  }
</script>
