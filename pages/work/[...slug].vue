<template>
  <div ref="articleRef">
    <NuxtLayout>
      <ContentDoc>
        <template v-slot="{ doc }">
          <header>
            <h1>
              {{ doc.name }}
            </h1>
            <h2>
              {{ doc.subtitle }}
            </h2>

            <ul class="meta">
              <li class="sans">
                <span class="op-6">Contributions:</span>
                {{ doc.kicker }}
              </li>
              <li class="sans">
                <span class="op-6">Timeline:</span>
                {{ doc.date }}
              </li>
            </ul>
          </header>

          <article>
            <ContentRenderer :value="doc" />
          </article>
        </template>

        <template #not-found>
          <h2 class="tac">
            Looks like you lost your way. <br />Try one of the links below.
          </h2>
        </template>
      </ContentDoc>
    </NuxtLayout>

    <footer>
      <h4>You also might be interested in:</h4>
      <ul>
        <li
          v-for="post in posts"
          :key="post._path"
        >
          <NuxtLink
            v-if="!post.url"
            :to="post._path"
          >
            <img
              :src="post.poster"
              :alt="post.name"
            />
            <p>{{ post.caption }}</p>
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  main {
    padding-bottom: 7.2rem;
    @include breakpoint(lg) {
      padding-bottom: 18rem;
    }
  }

  footer {
    margin-top: 8rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 6.4rem 2rem;
    @include breakpoint(md) {
      padding: 12rem;
    }
  }

  footer h4 {
    font-size: 2.6rem;
    @include breakpoint(md) {
      font-size: 3.8rem;
    }
  }

  footer ul {
    padding-top: 0;
    @include breakpoint(md) {
      padding-top: 2rem;
    }
  }

  footer a {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin: 1.6rem 0;
    text-decoration: none;
    cursor: inherit;
    @include breakpoint(md) {
      gap: 2.4rem;
      text-decoration: underline;
    }
  }

  footer a:hover {
    text-decoration: none;
  }

  footer li {
    display: flex;
    flex-direction: column;
  }

  footer p {
    font-size: 1.7rem;
    transform: translateY(1rem);
    @include breakpoint(md) {
      font-size: 3.2rem;
    }
  }

  footer img {
    border-radius: var(--border-radius--partial);
    width: 6.4rem;
    height: 6.4rem;
    box-shadow: var(--shadow--lg);
    object-fit: cover;
  }

  :deep(h2) {
    margin: 0.8rem 0 2rem;
    line-height: 112%;
  }

  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(p) {
    margin-bottom: 2rem;
  }

  :deep(h4) {
    @include italic;
    margin-left: -0.2rem;
    font-size: clamp(1rem, -0.875rem + 10vw, 3.8rem);
    font-weight: 100;
    line-height: 112%;
  }

  :deep(p) {
    @include thin;
    font-size: 2.6rem;
    line-height: 128%;
    @include breakpoint(lg) {
      font-size: 3.2rem;
      line-height: 130%;
    }
  }

  :deep(a) {
    text-decoration: underline;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 4rem 0 5.6rem;
    @include breakpoint(lg) {
      padding: 4.4rem 0 5.6rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    footer {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
</style>

<script setup>
  const route = useRoute()
  const currentSlug = route.params.slug
  const currentPostPath = route.path

  // const { data } = await useAsyncData("", () => queryContent("").skip(2).find())

  const posts = useAsyncData(async () => {
    const { data } = await queryContent("")
      .sort({ key: 1 })
      .skip(2)
      .where({ _path: { $ne: currentPostPath } }) // $ne stands for "not equal"
      .find()
    return data
  })
</script>
