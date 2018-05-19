<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- hero 👰🏻 -->
    <section class="hero">
      <!-- header 💆 -->
      <header class="hero__header uc">
        <h4 class="mb-0 f-sm f-basismono">ux/dev</h4>
        <h1 class="mb-2 f-xl f-mabry-med">Questions About Space</h1>
         <h2 class="f-lg f-travels-med">In the fall of 2016 I began a self-initiated project to design &amp; develop a photo-blog in Vue JS focusing on architecture, interior design &amp; structural engineering.</h2>
      </header>
      <!-- instructions 💬 -->
      <nav class="hero__scroll">
        <h2 class="f-md tar uc f-travels-med">Scroll Down</h2>
      </nav>
      <!-- date & stuff 📆 -->
      <aside class="hero__meta">
        <h4 class="mb-1 f-sm uc f-basismono">Timeline</h4>
        <h3 class="mb-4 f-md f-travels-med">Fall 2016 – Spring 2017</h3>
        <h4 class="mb-1 f-sm uc f-basismono">Link</h4>
        <h3 class="f-md f-travels-med">
          <a class="link btn__tertiary" href="http://questionsabout.space" target="_blank">questionsabout.space</a>
        </h3>
      </aside>
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
    font-size: 1.7rem;
    line-height: 1.4;
    @include breakpoint(md) { font-size: 2.4rem; line-height: 1.44; }
  }

  p + p { margin-top: 1.6rem; text-indent: 2ch; }
  .fig-key__label, figcaption { font-size: 1.4rem; }
  .hide-sm  { display: none; @include breakpoint(mdl) { display: block; } }
  .show-mdl { display: block; @include breakpoint(mdl) { display: none; } }

  // hero section
  .hero__header {
    padding-top: 12rem;
    @include breakpoint(md)  { padding-top: 20rem; width: grid-width(10); }
    @include breakpoint(mdl) { width: grid-width(8); }
  }

  .hero__scroll {
    margin-top: 4.8rem;
    @include breakpoint(md) { margin-top: 9.6rem; }
  }

  .hero__meta { margin-top: 8.8rem; }

  // main sections
  .img__half { @include breakpoint(md ) { width: grid-width(9); } }
  .img__three-four { @include breakpoint(mdl) { width: grid-width(9); } }
  .img__one-four   { @include breakpoint(mdl) { margin-left: 6rem; width: grid-width(3); } }
  .img__full, .img__w-bg { margin-bottom: 3.2rem; }

  .img__w-bg > figure > img, .img__w-bg > figure > video {
    @include breakpoint(mdl) {
      margin-left: grid-width(3);
      width: grid-width(6);
      transform: translateY(0.5rem);
    }
  }

  .copy__full { margin-bottom: 4rem; }
  .copy__half {
     @include breakpoint(md)  { margin-right: 1rem; width: grid-width(12); }
     @include breakpoint(mdl) { margin-right: 6rem; width: grid-width(10); }
   }

  .copy-img, .img-img {
    display: flex; flex-direction: column;
    margin-bottom: 4rem;
    @include breakpoint(md) { flex-direction: row; align-items: center; }
  }

  .img-img { align-items: flex-start; }
  .fin { margin: 6.4rem 0 8rem; @include breakpoint(md) { margin: 16rem 0 16rem; } }
  .next-case { margin-bottom: 8rem; }

  // figure keyframes
  .fig-key { margin-bottom: 4rem; }
  .fig-key > ul { display: flex; flex-direction: column; }

  .show-card { opacity: 1; z-index: var(--z4); }
  .change-card { transform: translateY(0); }

</style>


<!-- logic -->
<script>
  export default {
    name: 'qas',

    mounted() {

    }
  }
</script>
