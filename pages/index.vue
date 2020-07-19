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

    <div class="rainbow">
      <div class="r"></div>
      <div class="p"></div>
      <div class="o"></div>
      <div class="b"></div>
      <div class="i"></div>
    </div>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .intro {
    margin: 16rem 0 8rem;
    @include breakpoint(md) { width: grid-width(10); }
    @include breakpoint(mdl) { width: grid-width(6); }
  }

  section {
    @include breakpoint(md) { margin-left: grid-width(1); width: grid-width(8); }
    @include breakpoint(mdl) { margin: 0 0 7.2rem 0; width: grid-width(4); }

    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8rem;
      @include breakpoint(md) { margin-bottom: 9rem; }
    }
  }

  .rainbow {
    position: fixed;
    z-index: var(--zmin);
    top: 0; right: 0; bottom: 0;
    width: 100vw; height: 100vh;

    @include breakpoint(mdl) {
      width: 46vw; height: 100vh;
    }
  }

  .r {
    position: absolute;
    left: 16%;
    right: 32%;
    top: 2%;
    bottom: 28%;
    border-radius: 50%;

    background: #FFEDEB;
    opacity: 1;
    filter: blur(4rem);
  }

  .p {
    position: absolute;
    left: 40%;
    right: 4%;
    top: -6%;
    bottom: 8%;

    background: #FFD6FC;
    opacity: 1;
    filter: blur(10rem);
  }

  .o {
    left: 12%;
    right: 32%;
    top: 36%;
    bottom: -12%;

    background: #FFEDEB;
    opacity: 1;
    filter: blur(10rem);
  }

  .b {
    position: absolute;
    width: 163px;
    height: 436px;
    right: 0;
    top: 50%;

    background: #b4cdd4;
    opacity: 1;
    filter: blur(6.4rem);
    transform: rotate(90deg);
  }

  .i {
    position: absolute;
    left: 65.14%;
    right: -19.86%;
    top: 3.75%;
    bottom: 21.12%;

    background: #FFD6FC;
    opacity: 1;
    filter: blur(10rem);
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