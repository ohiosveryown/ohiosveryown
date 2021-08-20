<template>
  <main class="width">
    <header>
      <h1 class="mb-1 title">My name is Matt 👋🏼</h1>
      <h2 class="brow">
        I’m a product designer living in Atlanta, Ga.<br>
        Presently I’m researching <a href="" class="link">machine learning</a>.
      </h2>
    </header>

    <section>
      <header class="caption">
        <h3>Digital Projects ↯</h3>
        <h3>2018—2021</h3>
      </header>

      <ul>
        <list
          v-for="work in works"
          :work="work"
          :key="work.id"
        />
      </ul>
    </section>

    <rainbow/>
  </main>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  li:nth-child(-n+2) { display: none; }
  br { display: none; @include breakpoint(md) { display: inherit; }}

  h1 {
    margin: 8rem 0 2rem;
    @include breakpoint(md) { margin: 11.2rem 0 2rem; color: var(--gravity); }
  }

  h2 {
    margin-bottom: 8.8rem;
    @include breakpoint(md) { margin-bottom: 8.8rem; }
  }

  section {
    @include breakpoint(md) { width: grid-width(6.4); }
    @include breakpoint(mdl) { margin: 0 0 7.2rem 0; width: grid-width(6); }
    @include breakpoint(lg) { margin: 0 0 7.2rem 0; width: grid-width(5); }
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5.6rem;
      width: 100%;
      opacity: .56;
      @include breakpoint(md) { margin-bottom: 6.4rem; width: 64%; font-size: 1.3vw; }
      @include breakpoint(lg) { font-size: 1vw; }
    }
  }
</style>


<script>
  import { works } from '~/static/works'
  import list from '~/components/list'
  import rainbow from '~/components/rainbow'
  export default {
    head: () => ({
      title: 'ohiosveryown'
    }),
    data: () => ({
      works
    }),
    components: { list, rainbow },
  }
</script>
