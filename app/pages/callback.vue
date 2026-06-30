<template>
  <div class="callback">
    <template v-if="code">
      <h1>Spotify authorized</h1>
      <p>
        Copy the URL from your address bar and paste it into the terminal
        running <code>node scripts/spotify-auth.mjs</code>.
      </p>
      <p class="callback__hint">
        Or paste just this code when prompted:
      </p>
      <code class="callback__code">{{ code }}</code>
    </template>

    <template v-else>
      <h1>Missing authorization code</h1>
      <p>Run <code>node scripts/spotify-auth.mjs</code> and try again.</p>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .callback {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin: 0 auto;
    max-width: 58.6rem;
    padding: 5.6rem 2rem;
  }

  .callback__hint {
    opacity: 0.6;
  }

  .callback__code {
    display: block;
    overflow-x: auto;
    padding: 1.2rem;
    border-radius: 0.8rem;
    background: #f7f7f7;
    font-size: 1.3rem;
    font-family: var(--system-font);
    word-break: break-all;
  }
</style>

<script setup lang="ts">
  const route = useRoute()
  const code = computed(() =>
    typeof route.query.code === 'string' ? route.query.code : null,
  )
</script>
