<template>
  <main class="width">

    <header class="intro">
      <h1 class="mb-2 fs--lg f--c">My name is Matt.</h1>
      <h2 class="fs--md f--g">I’m a product designer in Atlanta, Ga. Presently I’m researching design systems & machine learning.</h2>
    </header>

    <section>
      <header class="work fs--sm f--f uc">
        <h3>case studies</h3>
        <h3>2016 – 2020</h3>
      </header>

      <ul>
        <WorkItem v-for="work in works" :work="work" :key="work.id" />
      </ul>
    </section>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .intro {
    @include breakpoint(md) {
      margin: 16rem 0 8rem;
      width: grid-width(10);
    }

    @include breakpoint(mdl) { width: grid-width(6); }
  }

  section {
    @include breakpoint(md) {
      margin-left: grid-width(1);
      width: grid-width(8);
    }

    @include breakpoint(mdl) {
      margin: 0 0 7.2rem 0;
      width: grid-width(4);
    }

    header {
      display: flex;
      justify-content: space-between;

      @include breakpoint(md) {
        margin-bottom: 9rem;
      }
    }
  }

</style>


<script>
  import WorkItem from '../components/WorkItem'
  import works from '../static/works'

  export default {
    components: { WorkItem },

    data: () => ({
      works
    }),
  }
</script>