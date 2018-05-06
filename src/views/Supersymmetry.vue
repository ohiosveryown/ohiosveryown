<!-- layout -->
<template>
  <main style="min-height: 500vh" class="mw__lg">

    <!-- header -->
    <header class="uc">
      <h6 class="mb-0 f-sm f-basismono">ux/ui/dev</h6>
      <h1 class="mb-2 f-xl f-travelsdemi">Supersymmetry</h1>
      <h2 class="f-lg f-mabry">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</h2>
    </header>

    <section class="hero">
      <!-- meta -->
      <ul class="meta">
        <li class="mb-4">
          <h6 class="mb-0 uc f-sm f-basismono">timeline</h6>
          <h5 class="f-md f-travelsdemi">Fall 2016 – Spring 2017</h5>
        </li>
        <li>
          <h6 class="mb-0 uc f-sm f-basismono">link</h6>
          <h5 class="f-md f-travelsdemi"><a class="link btn__tertiary" href="http://supersymmetry.design" target="_blank">supersymmetry.design</a></h5>
        </li>
      </ul>
    </section>
    <!-- scroll -->
    <h3 class="scroll uc f-md f-mabry">scroll down</h3>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';
  @import '../assets/style/btn';

  .f-xl {
    font-size: 1.8rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 2rem; }
    @include breakpoint(md) { font-size: 4.8rem; }
  }

  .f-lg {
    font-size: 1.6rem;
    line-height: 1.3;
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

  header, .hero {
    @include breakpoint(mdl) {
      margin-top: 16vw;
      width: grid-width(7);
    }
  }

  header {
    position: -webkit-sticky;
  	position: sticky;
    top: 11.2rem;
    margin-top: 0;
    padding-bottom: 16.4rem;
    @include breakpoint(md)  { top: 24rem; padding-bottom: 32rem; }
    @include breakpoint(mdl) { padding-bottom: 12rem; }
  }

  .scroll {
    position: absolute;
    @include breakpoint(mdl) { top: 64%; right: 4rem; }
  }

  .meta {
    display: flex;
    flex-direction: column;
  }
</style>


<!-- logic -->
<script>
  export default { name: 'supersymmetry' }
</script>
