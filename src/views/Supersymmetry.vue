<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- hero 👰🏻 -->
    <section class="hero">
      <!-- header 💆 -->
      <header class="hero__header uc">
        <h4 class="mb-0 f-sm f-basismono">ux/dev</h4>
        <h1 class="mb-2 f-xl f-mabry-med">Supersymmetry</h1>
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
          <a class="link btn__tertiary" href="http://supersymmetry.design" target="_blank">supersymmetry.design</a>
        </h3>
      </aside>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure style="background-color: #f3f4fb;">
        <img src="../assets/__supersymmetry/img/01@2x.png" alt="List View for Small Devices">
      </figure>
      <figcaption class="mt-1 tar">fig. 01</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>The main challenge was to create a brief repository for information of particular spaces. I wanted Supersymmetry to have brevity but highlight what makes these spaces special &amp; unique.</p>
      <p>I wanted to structure Supersymmetry this way for the sake of brevity and maintenance, while highlighting what makes these specific spaces special (...that alliteration though 👀👏🏼).</p>
    </article>

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

  figcaption { font-size: 1.4rem; }

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

  // img + copy sections
  .img__full { margin: 6.4rem 0 3.2rem; }

  .img__full > figure > img {
    @include breakpoint(mdl) {
      margin-left: grid-width(3);
      width: grid-width(6);
      transform: translateY(0.5rem);
    }
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
