<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- header -->
    <header class="uc">
      <h6 class="roles mb-0 f-sm f-basismono">ux/ui/dev</h6>
      <h1 class="case-title mb-1 f-xl f-travelsdemi">Supersymmetry</h1>
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

    <section class="layout__copy-img">
      <article class="mb-6 copy">
        <h6 class="mb-2 uc f-sm f-basismono">situation</h6>
        <p class="mb-1 meas-8">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</p>
        <p class="tin meas-8">The main challenge was to create a brief repository for information of particular spaces. I wanted Supersymmetry to have brevity but highlight what makes these spaces special &amp; unique.</p>
      </article>
      <figure class="img gradient__01"><img src="../assets/img/supersymmetry/001@2x.png" alt="Supersymmetry Homepage Mobile"></figure>
    </section>

    <section class="layout__img">
      <figure><img src="../assets/img/supersymmetry/002@2x.png" alt="Early Explorations"></figure>
      <figcaption class="f-mabry op-6 tar">Some of the early explorations</figcaption>
    </section>

    <section class="layout__copy-img">
      <article class="mb-6 copy">
        <h6 class="mb-2 uc f-sm f-basismono">task</h6>
        <p class="mb-1 meas-8">The majority of the time when I begin a side-project, I start by defining requirements &amp; scope. Here, the first couple of things I outlined were purpose &amp; style.</p>
        <p class="tin meas-8">	Style outlines creative &amp; developmental scaffolding. The creative principles focus on things like type, color &amp; copywriting style, while development focuses on accessibility, optimization &amp; code writing style.</p>
      </article>
      <figure class="img gradient__02"><img src="../assets/img/supersymmetry/003@2x.png" alt="Requirements and Outline"></figure>
    </section>

    <section class="layout__img pb-2 pt-4">
      <figure class="img gradient__03"><img src="../assets/img/supersymmetry/004@2x.png" alt="Early Explorations"></figure>
      <figcaption class="f-mabry op-6">List View</figcaption>
    </section>

    <section class="layout__img-img">
      <figure class="gradient__04 mb-5"><img src="../assets/img/supersymmetry/005@2x.png" alt="Requirements and Outline"></figure>
      <figure class="gradient__04"><img src="../assets/img/supersymmetry/006@2x.png" alt="Requirements and Outline"></figure>
    </section>

    <section class="move-up layout__copy-img">
      <article class="mb-6 copy">
        <h6 class="mb-2 uc f-sm f-basismono">action</h6>
        <p class="mb-1 meas-8">One piece I'm really proud of was the design &amp; functionality of the Colophon "page." The concept was to create a component that gets triggered by a link on the list page &amp; have motion communicate the transition from the list page to the colophon page.</p>
      </article>
    </section>

    <section class="move-up layout__img">
      <figure><img src="../assets/img/supersymmetry/007@2x.png" alt="Detail Views"></figure>
    </section>

    <section class="move-up move-up-2 layout__copy-img">
      <article class="mb-6 copy">
        <h6 class="mb-2 uc f-sm f-basismono">results</h6>
        <p class="mb-1 meas-8">As I continue to update the entries throughout the year, I'm still developing the next steps for Supersymmetry. My initial thought was to update the layout annually and perhaps expand the scope as my familiarity with Vue grows. That may still be in play as I really enjoyed working on both the subject matter and the design for this project. </p>
        <p class="tin meas-8">One thing I'd like to improve upon is the detail pages. Currently, they're rather bland and I'd like to possibly highlight more imagery. In whatever route I decide to go in, I'm proud of basically having zero experience with Vue to now using it primarily as I build simple web applications.</p>
      </article>
    </section>

    <section class="finish move-up move-up-2">
      <h2 class="mb-2 f-mabry uc">fin</h2>
      <h6 class="mb-0 uc f-sm f-basismono">Read the Longform case study:</h6>
      <h5 class="f-md uc f-travelsdemi"><a class="link btn__tertiary" href="#" target="_blank">drp.pr/xcvjk</a></h5>
    </section>

    <section class="next move-up uc">
      <h6 class="mb-0 f-sm f-basismono">next case study</h6>
      <h1 style="display:inline;" class="btn__tertiary mb-1 f-xl f-travelsdemi"><router-link to="/">Questions About Space</router-link></h1>
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

  header, .hero {
    @include breakpoint(mdl) { margin-top: 16vw; width: grid-width(7); }
  }

  .hero {
    margin-bottom: 9.6rem;

    @include breakpoint(mdl) {
      margin-bottom: 14rem;
    }
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

  header, .abstract { transition: var(--ease); }
  figure { position: relative; }
  .move-up { @include breakpoint(mdl) { transform: translateY(-16.4rem); } }
  .move-up-2 { @include breakpoint(mdl) { transform: translateY(-36rem); } }

  .hide { opacity: 0; }
  .fade {
    opacity: 0.15;
    text-stroke: 1px var(--gravity);
    -webkit-text-stroke: 1px var(--gravity);
    color: transparent;
   }

  .gradient__01:after {
    content: '';
    position: absolute;
    z-index: var(--zmin);
    top: -12px; left: 0;
    width: 100%; height: calc(100% + 8px);
    background: linear-gradient(45deg, rgba(252,3,250,1) 0%, rgba(25,2,234,1) 100%);

    @include breakpoint(mdl) {
      top: -40px; left: -32px;
      width: calc(100% + 32px); height: calc(100% + 36px);
    }
  }

  .gradient__02:after {
    content: '';
    position: absolute;
    z-index: var(--zmin);
    top: -12px; left: 2px;
    width: 90%; height: calc(100% + 3px);
    background: linear-gradient(45deg, rgba(252,3,250,1) 0%, rgba(25,2,234,1) 100%);

    @include breakpoint(mdl) {
      top: 16px; left: -14px;
      width: calc(100% + 0px); height: calc(100% - 4px);
    }
  }

  .gradient__03:after {
    content: '';
    position: absolute;
    z-index: var(--zmin);
    top: -12px; right: 0;
    width: 90%; height: calc(100% + 0px);
    background: linear-gradient(45deg, rgba(252,3,250,1) 0%, rgba(25,2,234,1) 100%);

    @include breakpoint(mdl) {
      top: -16px; left: -14px;
      width: 55%; height: 66%;
    }
  }

  .gradient__04:after {
    content: '';
    position: absolute;
    z-index: var(--zmin);
    top: -12px; right: 1px;
    width: 90%; height: calc(100% + 0px);
    background: linear-gradient(45deg, rgba(252,3,250,1) 0%, rgba(25,2,234,1) 100%);

    @include breakpoint(mdl) {
      top: -16px; right: -14px;
      width: 75%; height: 66%;
    }
  }

  .layout__copy-img {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;

    @include breakpoint(mdl) {
      flex-direction: row;
      align-items: center;
      margin-bottom: 9.6rem;
    }

    .copy { @include breakpoint(mdl) { width: grid-width(6); } }
    .img  { @include breakpoint(mdl) { width: grid-width(4); } }
  }

  .layout__img {
    margin-bottom: 4rem;
    @include breakpoint(mdl) {
      margin-bottom: 9.6rem;
      width: grid-width(10);
    }
  }

  .layout__img-img {
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;

    @include breakpoint(md) { flex-direction: row; }

    @include breakpoint(mdl) {
      margin-bottom: 9.6rem;
      width: grid-width(10);
    }

    figure:nth-of-type(1) {
      @include breakpoint(md) { width: grid-width(8.5); }
    }

    figure:nth-of-type(2) {
      @include breakpoint(md) { margin-left: grid-width(.5); width: grid-width(3); }
    }

    img { box-shadow: 0 0 8px 0 rgba(0,0,0,.08); @include breakpoint(md) { box-shadow: 0 0 64px 0 rgba(0,0,0,.08); } }
  }

  .finish, .next {
    margin-bottom: 8rem;
    @include breakpoint(mdl) { margin: 0; }
  }

</style>


<!-- logic -->
<script>
  export default {
    name: 'supersymmetry',

    mounted() {

      let scrollpos = window.scrollY
      let abstract = document.querySelector('.abstract')
      let roles = document.querySelector('.roles')
      let caseTitle = document.querySelector('.case-title')


      function add_hide() {
        roles.classList.add('hide'),
        abstract.classList.add('hide'),
        caseTitle.classList.add('fade')
      }

      function remove_hide() {
        roles.classList.remove('hide')
        abstract.classList.remove('hide'),
        caseTitle.classList.remove('fade')
      }


      window.addEventListener('scroll', function(){
        scrollpos = window.scrollY
        if(scrollpos > 32){add_hide(), add_fade() }
        else { remove_hide(), remove_fade() }
      })

    }
  }
</script>
