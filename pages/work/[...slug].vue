<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <header>
        <h1>{{ doc.name }}</h1>
        <h2>{{ doc.subtitle }}</h2>
      </header>

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

      <ContentRenderer :value="doc" />
    </ContentDoc>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  h2 {
    margin: 0.8rem 0;
    line-height: 112%;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 4rem 0;
    @include breakpoint(lg) {
      padding: 6.4rem 0;
    }
  }
</style>
