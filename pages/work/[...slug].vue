<template>
  <ContentDoc v-slot="{ doc }">
    <header>
      <h1>{{ doc.name }}</h1>
      <h2>{{ doc.caption }}</h2>
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
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  h1 {
    margin-bottom: 0.4rem;
    @include breakpoint(md) {
      margin-bottom: 0.2rem;
    }
  }

  .meta {
    padding: 4rem 0;
    @include breakpoint(lg) {
      padding: 6.4rem 0 6.4rem;
    }
  }

  .meta li:first-of-type {
    margin-bottom: 1rem;
    @include breakpoint(lg) {
      margin-bottom: 0.2rem;
    }
  }
</style>
