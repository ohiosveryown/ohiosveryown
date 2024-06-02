<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <header>
        <h1>{{ doc.name }}</h1>
        <h2>{{ doc.subtitle }}</h2>

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

      <ContentRenderer :value="doc" />
    </ContentDoc>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  :deep(h2) {
    margin: 0.8rem 0 2rem;
    line-height: 112%;
  }

  :deep(h3),
  :deep(h4) {
    margin-bottom: 2rem;
  }

  :deep(h4) {
    @include italic;
    margin-left: -0.2rem;
    font-size: clamp(1rem, -0.875rem + 10vw, 3.6rem);
    font-weight: 100;
    line-height: 112%;
  }

  header {
    // margin-bottom: 3.2rem;
    @include breakpoint(lg) {
      margin-bottom: 0rem;
    }
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 4rem 0 5.6rem;
    @include breakpoint(lg) {
      padding: 4.4rem 0;
    }
  }
</style>
