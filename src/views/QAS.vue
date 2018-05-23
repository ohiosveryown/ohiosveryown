<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- hero 👰🏻 -->
    <section class="hero">
      <!-- header 💆 -->
      <header class="hero__header uc">
        <h4 class="mb-0 f-sm f-basismono">ux/dev</h4>
        <h1 class="mb-2 f-xl f-mabry-med">Questions About Space</h1>
         <h2 class="f-lg f-travels-med">We keep moving forward, opening new doors, and doing new things, because we're curious &amp; curiosity keeps leading us down new paths.</h2>
      </header>
      <!-- instructions 💬 -->
      <nav class="hero__scroll">
        <h2 class="f-md tar uc f-travels-med">Scroll Down</h2>
      </nav>
      <!-- date & stuff 📆 -->
      <aside class="hero__meta">
        <h4 class="mb-1 f-sm uc f-basismono">Timeline</h4>
        <h3 class="mb-4 f-md f-travels-med">Spring 2017</h3>
        <h4 class="mb-1 f-sm uc f-basismono">Link</h4>
        <h3 class="f-md f-travels-med">
          <a class="link btn__tertiary" href="http://questionsabout.space" target="_blank">questionsabout.space</a>
        </h3>
      </aside>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full mt-7">
      <figure>
        <img src="../assets/__qas/img/01@2x.jpg" alt="Questions About Space Initial Home Page">
      </figure>
      <figcaption class="mt-0 tar">fig. 01</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>People who know me best know I've been fascinated with space ever since I was little. I'm the person going around spewing random facts about space to anyone who'll listen. That's normal, right?</p>
      <p>I wanted to marry my curiosity of space and design, and Questions About Space (QAS) is where I landed. It's essentially a repository of queries regarding space, astronomy and astrophysics.</p>
    </article>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 01:</span>
          <span>Home View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 02:</span>
          <span>CSS Grid for an Early Home Page Iteration</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img class="img-shadow" src="../assets/__qas/img/02@2x.jpg" alt="CSS Grid for an Early Home Page Iteration">
      </figure>
      <figcaption class="mt-0 tar">fig. 02</figcaption>
    </section>

    <!-- copy + img half and half 🍋🍹 -->
    <section class="copy-img copy-img-unique">
      <article class="copy__half copy__half-unique">
        <header><h4 class="mb-3 f-sm uc f-basismono">Planning</h4></header>
        <p>The biggest challenges working on this project I assumed would be technical. I knew going in I wanted to store the questions, answers and sources of a list of queries in a json file and pull randomly from this list. This was completely new to me and actually was quite easy.</p>
        <p>The biggest challenge in reality was fighting a recurring theme for me of over-designing and shipping something as a work in progress vs. a final, polished thing.</p>
        <p class="mb-3">I knew I wanted the web-app to be simple in structure and just consist of basically two "views" – a home view and a detail view.</p>
      </article>

      <figure class="img__half">
        <img src="../assets/__qas/img/03@2x.jpg" alt="Small Detail View, Small Home View, Small Home View Again">
        <figcaption class="mt-0 tar">fig. 03, fig. 04, fig. 05</figcaption>
      </figure>
    </section>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure style="background-color: #111213;">
        <video class="pt-9 pb-9 img-shadow__heavy" autoplay playsinline loop src="../assets/__qas/mov/06.mp4"></video>
      </figure>
      <figcaption class="mt-0 tar">fig. 06</figcaption>
    </section>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 03:</span>
          <span>Small Detail View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 04:</span>
          <span>Small Home View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 05:</span>
          <span>Another Small Home View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 06:</span>
          <span>Another Early Home Page Iteration</span>
        </li>
      </ul>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <header><h4 class="mb-1 f-sm uc f-basismono">Execution</h4></header>
      <p>I started designing the aesthetic for QAS in the browser, something I've grown more accustomed to lately with the main requirement that I wanted to incorporate CSS Grid and three.js. Outside of that, I wanted the palette to be very simple black and white with strong typography and layout being the main visual attractors.</p>
      <p>I began working with the typeface Sectra from Grilli Type as the main display, but it didn't give the "science-y" feel I was going for so I transitioned to Akkurat by Lineto. Eventually too Akkurat was replaced, this time with America by Grilli Type. I chose America because of the numerous weights and styles it offered, which were necessary for the different subtexts and headings of a text-based layout.</p>
    </article>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <video autoplay playsinline loop src="../assets/__qas/mov/07.mp4"></video>
      </figure>
      <figcaption class="mt-0 tar">fig. 07</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>The initial homepage went through some change as well. The first iteration featured a logotype "Questions About Space" on a white palette. I didn't want to overthink this one, so I chose to instead work with the most common color in space, black, as the primary color for the background.</p>
      <p>Above you can see the three.js "star field" without any of the  homepage copy; below is everything put together.</p>
    </article>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <video autoplay playsinline loop src="../assets/__qas/mov/08.mp4"></video>
      </figure>
      <figcaption class="mt-0 tar">fig. 08</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>There is some beautiful imagery shot by various NASA satellites that I wanted to use to give more visual appeal to an otherwise text heavy interface. They're all open-sourced and mostly black and white so they fit the overall theme perfectly.</p>
      <p>One cool feature I incorporated is every time the homepage is loaded, a new set of images are generated so you sort of get a different feel and experience.</p>
      <p>The detail view comes equipped with a header that comes into view after a user scrolls down, so as to give reference to what question they're on (and a link to the next question) without having to scroll all the way back to the top (space is complex, some of these answers are loooong).</p>
    </article>

    <!-- img + img half and half 🍋🍹 -->
    <!-- <section class="img-img">
      <figure class="img__half-left">
        <img class="img-shadow__heavy" src="../assets/__qas/img/09@2x.jpg" alt="Large List View">
      </figure>
      <figure class="img__half-right">
        <img class="img-shadow" src="../assets/__qas/img/10@2x.jpg" alt="Large List View">
      </figure>
      <figcaption class="figcaption-unique mt-0 tar">fig. 09, fig. 10</figcaption>
    </section> -->

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img src="../assets/__qas/img/11@2x.jpg" alt="Detail View and Detail View on Scroll">
      </figure>
      <figcaption class="mt-0 tar">fig. 09, fig. 10</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <!-- <article class="copy__full">
      <p>The main challenge was to create a brief repository for information of particular spaces. I wanted Supersymmetry to have brevity but highlight what makes these spaces special &amp; unique.</p>
    </article> -->

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 07:</span>
          <span>Three.js Exploration</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 08:</span>
          <span>Home View with Three.js</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 09:</span>
          <span>Detail View on Scroll</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 10:</span>
          <span>Detail View</span>
        </li>
      </ul>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <header><h4 class="mb-1 f-sm uc f-basismono">Next Steps</h4></header>
      <p>Right now the current json file I'm pulling from consists of about 20 or 30 queries (questions / answers / sources) and going forward I'd like to get the number much higher. Because the next question that gets loaded is completely random, there's a chance that you could land on a query you just visited. The higher the number of queries, the less likely this outcome would be possible.</p>
      <p>I also want to incorporate more of the awesome imagery that's available, specifically on the detail views. I'm pondering the idea of adding embedded videos to the various questions to sort of expand the interactivity and disrupt the same experience on every query.</p>
      <p>There's certainly plenty to do to expand this project and I'm sure as my technical chops grow, I'll use that as a tool to continue to iterate and make Questions About Space a unique and informative experience.</p>
    </article>

    <!-- finish line 🏁 -->
    <section class="fin tac">
      <h2 class="mb-3 f-lg uc f-travels-med">Fin</h2>
    </section>

    <hr class="mb-8 op-2">

    <!-- footer 👣 -->
    <footer class="next-case">
      <h4 class="mb-0 f-sm uc f-basismono">Next Case Study:</h4>
      <h1 style="display: inline;" class="btn__tertiary f-xl uc f-mabry-med"><router-link to="/vibes">Vibes</router-link></h1>
    </footer>

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
    margin-left: grid-width(2);
    width: grid-width(8);
    @include breakpoint(mdl) { transform: translateY(0.5rem); }
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

  .img__half-left {
    margin-bottom: 7.2rem;
    width: grid-width(10);
    z-index: var(--z1);
    @include breakpoint(md) { margin-bottom: 8.8rem; }
  }

  .img__half-right {
    position: absolute;
    right: 0;
    margin-top: 7.2rem;
    width: grid-width(10);
    @include breakpoint(md) { margin-top: 8.8rem; }
  }

  .img__half-left:hover, .img__half-right:hover { z-index: var(--z2); }

  .figcaption-unique {
    position: absolute;
    bottom: 13.2rem; right: 0;
    @include breakpoint(md) { bottom: 8.8rem; right: 0; }
  }

  // figure keyframes
  .fig-key { margin-bottom: 4rem; }
  .fig-key > ul { display: flex; flex-direction: column; }


</style>


<!-- logic -->
<script>
  export default {
    name: 'qas',

    mounted() {

    }
  }
</script>
