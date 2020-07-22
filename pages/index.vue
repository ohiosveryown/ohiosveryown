<template>
  <main class="width">

    <header class="intro">
      <h1 class="mb-2 fs--lg f--c">My name is&nbsp;
        <span class="matt-trigger">Matt</span>.
        <img ref='matt' class="easter matt" src="~/static/img/matt.jpg" alt="">
      </h1>
      <ButtonAdventure label = 'Adventure Time' />
      <h2 class="fs--md f--g">I’m a product designer in Atlanta, Ga. Presently I’m researching design systems & machine learning.
      </h2>
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

    <Rainbow/>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .intro {
    margin: 16rem 0 8rem;
    @include breakpoint(md) { width: grid-width(10); }
    @include breakpoint(mdl) { width: grid-width(6); }
    h1 { display: inline-flex; }
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

  .easter {
    position: fixed;
    z-index: var(--zmin);
    top: 0; left: 0;
    object-fit: cover;
    transition: 1200ms cubic-bezier(0.075, 0.82, 0.165, 1) all;
    opacity: 0;
    will-change: transform;
  }

  .matt { width: 200px; height: 175px; }
  @media(pointer: fine) { .matt-trigger:hover ~ img { opacity: 1; }}

</style>


<script>
  import ButtonAdventure from '../components/ButtonAdventure'
  import Rainbow from '../components/Rainbow'
  import WorkItem from '../components/WorkItem'
  import works from '../static/works'
  export default {
    components: { ButtonAdventure, Rainbow, WorkItem },

    head: () => ({
      title: 'ovo – home'
    }),

    data: () => ({
      works
    }),

    mounted() {
      const matt = document.querySelector('.matt')

      document.addEventListener('mousemove', (e) => {
        matt.setAttribute(
          'style',
          `transform: translate(${e.pageX - 100}px, ${e.pageY - 88}px) scale(.88);`
        )
      })
    }
  }
</script>