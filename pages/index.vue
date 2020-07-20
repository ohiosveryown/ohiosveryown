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
      <div class="o"></div>
      <div class="y"></div>
      <div class="g"></div>


      <!-- <div class="g"></div>
      <div class="b"></div>
      <div class="i"></div> -->
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
    filter: blur(80px);

    @include breakpoint(mdl) {
      width: 46vw; height: 100vh;
    }
  }


  .r {
    position: absolute;
    left: 2%;
    border-radius: 50%;
    width: 80%; height: 75%;
    background: #f8e1df;
    transform: scale(.9);
    // opacity: .8;
  }

  .o {
    position: absolute;
    top: 8%; right: 0%;
    border-radius: 50%;
    width: 60%; height: 60%;
    background: #ffbbfa;
    // opacity: .6;
  }

  .y {
    position: absolute;
    top: 2%; right: -12%;
    border-radius: 50%;
    width: 60%; height: 60%;
    background: #ffbbfa;
    // opacity: .6;
  }

  .g {
    position: absolute;
    top: 60%; right: 0%;
    border-radius: 50%;
    width: 60%; height: 30%;
    background: #dfedf1;
    // opacity: .9;
  }



  // .r {
  //   border-radius: 50%;
  //   width: 60%; height: 75%;
  //   background: #FFEDEB;
  //   opacity: .8;
  // }

  // .o {
  //   position: absolute;
  //   top: -4rem; right: 0rem;
  //   border-radius: 50%;
  //   width: 60%; height: 100%;
  //   background: #FFD6FC;
  //   opacity: .8;
  // }

  // .y {
  //   position: absolute;
  //   top: 3rem; right: -20%;
  //   border-radius: 50%;
  //   width: 60%; height: calc(100% - 14rem);
  //   background: #FFD6FC;
  //   opacity: .8;
  // }

  // .g {
  //   position: absolute;
  //   top: 16%; left: 20%;
  //   border-radius: 40%;
  //   width: 60%; height: 70%;
  //   background: #FFEDEB;
  //   opacity: .8;
  // }

  // .b {
  //   position: absolute;
  //   top: 40%; left: 0%;
  //   border-radius: 50%;
  //   width: 60%; height: 70%;
  //   background: #FFEDEB;
  //   opacity: .8;
  // }

  // .i {
  //   position: absolute;
  //   top: 80%; left: 30%;
  //   border-radius: 50%;
  //   width: 60%; height: 30%;
  //   background: #EBF2F4;
  //   opacity: .8;
  // }

</style>


<script>
  import WorkItem from '../components/WorkItem'
  import works from '../static/works'

  export default {
    components: { WorkItem },

    data: () => ({
      works
    }),

    mounted() {
      const tl = gsap.timeline()
      tl.set('.r', {
        scale: 1,
        x: 'random(0, 400vw)',
        y: 'random(-400vh,400vh)',
        ease: Power2.easeInOut,
        duration: 0,
      })

      tl.set('.o', {
        scale: 1,
        x: 'random(0, 400vw)',
        y: 'random(-400vh,400vh)',
        ease: Power2.easeInOut,
        duration: 0,
      })

      tl.set('.y', {
        scale: 1,
        x: 'random(0, 400vw)',
        y: 'random(-400vh,400vh)',
        ease: Power2.easeInOut,
        duration: 0,
      })

      tl.set('.g', {
        scale: 1,
        x: 'random(0, 400vw)',
        y: 'random(-400vh,400vh)',
        ease: Power2.easeInOut,
        duration: 0,
      })
    }
  }
</script>