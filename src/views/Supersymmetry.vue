<!-- layout -->
<template>
  <main style="min-height: 500vh" class="mw__lg">

    <!-- header -->
    <header class="uc">
      <h6 class="mb-0 f-sm f-basismono">ux/ui/dev</h6>
      <h1 class="mb-2 f-xl f-travelsdemi">Supersymmetry</h1>
      <h2 class="abstract f-lg f-mabry">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</h2>
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
    <!-- <h3 class="scroll uc f-md f-mabry">scroll down</h3> -->
    <section class="situation">
      <article class="situation__copy">
        <h6 class="mb-2 uc f-sm f-basismono">situation</h6>
        <p class="mb-1 meas-9">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</p>
        <p class="tin meas-9">The main challenge was to create a brief repository for information of particular spaces. I wanted Supersymmetry to have brevity but highlight what makes these spaces special &amp; unique.</p>
      </article>
      <figure class="situation__img"><img src="../assets/img/supersymmetry/001@2x.png" alt="Supersymmetry Homepage Mobile"></figure>
    </section>

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

  p { font-size: 1.8rem; line-height: 1.75; }

  header, .hero {
    @include breakpoint(mdl) { margin-top: 16vw; width: grid-width(7); }
  }

  header {
    position: -webkit-sticky;
    position: sticky;
    z-index: var(--zmin);
    top: 11.2rem;
    margin-top: 0;
    padding-bottom: 16.4rem;
    @include breakpoint(md)  { top: 20rem; padding-bottom: 32rem; }
    @include breakpoint(mdl) { padding-bottom: 8rem; }
  }

  .scroll {
    position: absolute;
    @include breakpoint(mdl) { top: 64%; right: 4rem; }
  }

  .meta {
    display: flex;
    flex-direction: column;
  }

  header { transition: var(--ease); }

  .hide { opacity: 0; }
  .fade { opacity: 0.1; }

  .situation {
    display: flex;
    flex-direction: column;

    @include breakpoint(mdl) {
      flex-direction: row;
      align-items: center;
    }
  }

  .situation__copy {

    @include breakpoint(mdl) { width: grid-width(6); }
  }

  .situation__img {

    @include breakpoint(mdl) { width: grid-width(4); }
  }
</style>


<!-- logic -->
<script>
  export default {
    name: 'supersymmetry',

    mounted() {
      let scrollpos = window.scrollY
      let abstract = document.querySelector('.abstract')
      let header = document.querySelector('header')


      function add_hide() { abstract.classList.add('hide') }
      function remove_hide() { abstract.classList.remove('hide') }

      function add_fade() { header.classList.add('fade') }
      function remove_fade() { header.classList.remove('fade') }


      window.addEventListener('scroll', function(){
        scrollpos = window.scrollY
        if(scrollpos > 40){add_hide(), add_fade() }
        else { remove_hide(), remove_fade() }
      })
    }
  }
</script>
