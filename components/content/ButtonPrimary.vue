<template>
  <NuxtLink :to="`${randomPost}`">
    <div class="button">
      <span class="sheen" />
      <span class="bg" />
      {{ buttonLabel }}
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .button {
    position: relative;
    border-radius: var(--border-radius--full);
    background: var(--color--button-primary);
    box-shadow: var(--shadow--large);
    padding: 1.2rem 1.6rem 1.3rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    color: var(--color--primary);
    text-shadow: var(--shadow-text);
    overflow: hidden;
  }

  .button:hover {
    background: none;
    .bg {
      opacity: 1;
      transform: scale(2);
      transition: opacity 300ms ease, transform 18s ease;
    }
  }

  @media (prefers-color-scheme: dark) {
    .button:hover {
      color: var(--color--bg);
      .sheen {
        opacity: 0;
      }
    }
  }

  .button:active {
    transform: scale(0.98);
  }

  .sheen {
    position: absolute;
    z-index: var(--z1);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 100px;
    width: 88%;
    height: 62%;
    background: var(--color--button-sheen);
    pointer-events: none;
  }

  .bg {
    position: absolute;
    z-index: var(--z0);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/button-bg@3x.webp?updatedAt=1715451138367")
      no-repeat center center;
    background-size: cover;
    opacity: 0;
    transition: transform 1ms ease;
    pointer-events: none;
  }
</style>

<script setup>
  defineProps({
    buttonLabel: String,
  })

  const randomPost = ref(null)

  onMounted(async () => {
    const posts = await queryContent("/work").find()
    randomPost.value = posts[~~(Math.random() * posts.length)]._path
  })
</script>
