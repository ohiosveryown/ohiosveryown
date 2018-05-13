<!-- layout -->
<template>
  <main class="mw__lg">

    <section class="hero">
      <!-- header 💆 -->
      <header class="uc">
        <h4 class="f-sm f-basismono">ux/dev</h4>
        <h1 class="f-xl f-mabry-med">Supersymmetry</h1>
        <h2 class="f-lg f-travels-med">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</h2>
      </header>
      <!-- meta info -->
      <div class="hero__meta">
        <h4 class="mb-1 f-sm uc f-basismono">Timeline</h4>
        <h3 class="mb-4 f-md f-travels-med">Fall 2016 – Spring 2017</h3>
        <h4 class="mb-1 f-sm uc f-basismono">Link</h4>
        <h3 class="f-md f-travels-med">
          <a class="link btn__tertiary" href="http://supersymmetry.design" target="_blank">http://supersymmetry.design</a>
        </h3>
      </div>
    </section>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';
  @import '../assets/style/btn';

  .f-xl {
    font-size: 2.4rem;
    line-height: 1.2;
    @include breakpoint(md) { font-size: 4.8rem; }
  }

  .f-lg {
    font-size: 1.5rem;
    line-height: 1.4;
    @include breakpoint(sm) { font-size: 2rem; }
  }

  .f-md {
    font-size: 1.4rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 1.6rem; }
  }

  .f-sm {
    font-size: 1.2rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 1.4rem; }
  }

  p {
    font-size: 1.5rem;
    line-height: 1.75;
    @include breakpoint(md) { font-size: 1.8rem; }
  }

  .hero {
    position: relative;
    height: 100vh;
  }

  header {
    @include breakpoint(mdl) { padding-top: 20rem; width: grid-width(8.4); }
   }

   .hero__meta {
     position: absolute;
     @include breakpoint(mdl) { bottom: 6.4rem; }
   }

</style>


<!-- logic -->
<script>
  export default {
    name: 'supersymmetry',

    mounted() {

    }
  }
</script>
