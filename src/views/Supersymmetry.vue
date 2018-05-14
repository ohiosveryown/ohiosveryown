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
    <section class="mt-7 img__w-bg">
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

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 01:</span>
          <span>Small List View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 02:</span>
          <span>Early Design Explorations</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__w-bg">
      <figure style="background-color: #f3f3f3;">
        <img src="../assets/__supersymmetry/img/02@2x.jpg" alt="Early Design Explorations">
      </figure>
      <figcaption class="mt-1 tar">fig. 02</figcaption>
    </section>

    <!-- copy + img half and half 🍋🍹 -->
    <section class="copy-img">
      <article class="copy__half">
        <header><h4 class="mb-3 f-sm uc f-basismono">Planning</h4></header>
        <p>The majority of the time when I begin a side- project, I start by defining requirements &amp; scope. Here, the first couple of things I outlined were purpose &amp; style.</p>
        <p class="mb-3">Style outlines creative &amp; developmental scaffolding. The creative principles focus on things like type, color &amp; copywriting style, while development focuses on accessibility, optimization &amp; code writing style.</p>
      </article>

      <figure class="img__half">
        <img src="../assets/__supersymmetry/img/03@2x.jpg" alt="Planning Word Document">
        <figcaption class="mt-1 tar">fig. 03</figcaption>
      </figure>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img class="img-shadow" src="../assets/__supersymmetry/img/04@2x.jpg" alt="Large List View">
      </figure>
      <figcaption class="mt-1 tar">fig. 04</figcaption>
    </section>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 04:</span>
          <span>Large List View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 05:</span>
          <span>Large Colophon View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 06:</span>
          <span>Small Colophon View</span>
        </li>
      </ul>
    </section>

    <!-- img + img half and half 🍋🍹 -->
    <section class="img-img">
      <figure class="img__three-four">
        <img class="img-shadow" src="../assets/__supersymmetry/img/05@2x.jpg" alt="Large List View">
        <figcaption class="show-mdl mt-1 tar">fig. 05</figcaption>
      </figure>
      <figure class="img__one-four hide-sm">
        <img class="img-shadow" src="../assets/__supersymmetry/img/06@2x.jpg" alt="Large List View">
        <figcaption class="mt-1 tar">fig. 05, fig. 06</figcaption>
      </figure>
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

  // img & copy sections
  .img__half { @include breakpoint(md ) { width: grid-width(9); } }
  .img__three-four { @include breakpoint(mdl) { width: grid-width(9); } }
  .img__one-four   { @include breakpoint(mdl) { margin-left: 6rem; width: grid-width(3); } }
  .img__full, .img__w-bg { margin-bottom: 3.2rem; }

  .img__w-bg > figure > img {
    @include breakpoint(mdl) {
      margin-left: grid-width(3);
      width: grid-width(6);
      transform: translateY(0.5rem);
    }
  }

  .copy__full { margin-bottom: 4rem; }
  .copy__half {
     @include breakpoint(md ) { margin-right: 1rem; width: grid-width(12); }
     @include breakpoint(mdl) { margin-right: 6rem; width: grid-width(10); }
   }

  .copy-img, .img-img {
    display: flex; flex-direction: column;
    margin-bottom: 4rem;
    @include breakpoint(md) { flex-direction: row; align-items: center; }
  }

  .img-img { align-items: flex-start; }

  // figure keyframes
  .fig-key { margin-bottom: 4rem; }
  .fig-key > ul { display: flex; flex-direction: column; }


</style>


<!-- logic -->
<script>
  export default {
    name: 'supersymmetry',

    mounted() {

    }
  }
</script>
