<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- card 🗂 -->
    <div class="card">
      <h4 class="op-5 mb-1 f-sm uc f-basismono">You’re Currently Reading About:</h4>
      <h2 class="mb-2 f-lg uc f-mabry-med">Miscellaneous</h2>
      <h4 class="op-5 mb-1 f-sm uc f-basismono">But Do You Want to Go:</h4>
      <ul class="f-md f-travels-med">
        <router-link to="/"><li class="btn__tertiary link">Home</li></router-link>
        <a @click="scrollMeTo('scroll-top-reference')"><li class="btn__tertiary link">To the Top</li></a>
      </ul>
    </div>

    <!-- hero 👰🏻 -->
    <section class="hero">
      <!-- header 💆 -->
      <header ref="scroll-top-reference" class="hero__header">
        <h4 class="mb-0 uc f-sm f-basismono">Mixed Medium</h4>
        <h1 class="mb-2 uc f-xl f-mabry-med">Miscellaneous</h1>
        <h2 class="meas-9 f-lg f-travels-med">Sometimes you just need a few different projects to keep your attention rather than long reads—amirite?</h2>
      </header>
      <!-- instructions 💬 -->
      <nav class="hero__scroll">
        <h2 class="f-md tar uc f-travels-med">Scroll Down</h2>
      </nav>
      <!-- date & stuff 📆 -->
      <aside class="hero__meta">
        <h4 class="mb-1 f-sm uc f-basismono">Timeline</h4>
        <h3 class="mb-4 f-md f-travels-med">2016 – 2018</h3>
        <h4 class="mb-1 f-sm uc f-basismono">Link</h4>
        <h3 class="f-md f-travels-med">N/A</h3>
      </aside>
    </section>

    <!-- full-width image 🖼 -->
    <section class="mt-7 img__full">
      <figure>
        <img src="../assets/__misc/img/02@2x.jpg" alt="ShootProof Poster">
      </figure>
      <figcaption class="tar">fig. 01</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>The above was a series of posters for an internal event hosted by ShootProof's design and quality assurance teams. Typically at ShootProof I work primary on the product so this was a fun exercise to create something weird and different.</p>
    </article>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 01:</span>
          <span>ShootProof Internal Poster</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 02:</span>
          <span>BSU Seniors Full Page</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 03:</span>
          <span>BSU Juniors Lg &amp; Sm</span>
        </li>
      </ul>
    </section>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure style="background-color: #d8daff;">
        <video class="mt-9 mb-9 img-shadow" autoplay playsinline loop src="../assets/__misc/mov/03.mp4"></video>
      </figure>
      <figcaption class="mt-0 tar">fig. 02</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>When I'm not working on personal projects, I like to switch it up and do some contract work. Here I worked through an agency to create a web experience for perspective students for Boise State University – Go Bronchos.</p>
    </article>

    <!-- full-width image 🖼 -->
    <section class="mt-7 img__full">
      <figure>
        <img src="../assets/__misc/img/03@2x.png" alt="Boise State Webpage">
      </figure>
      <figcaption class="tar">fig. 03</figcaption>
    </section>

    <!-- copy + img half and half 🍋🍹 -->
    <section class="pt-4 copy-img">
      <article class="mb-4 copy__half">
        <p>One thing I never understood about iOS notifications is how they're not in sequential order sorted by day.</p>
        <p>I also threw in the ability to snooze a notification in case you want to be reminded about it at a later time.</p>
      </article>

      <figure class="img__half">
        <video class="img-shadow__heavy" autoplay playsinline loop src="../assets/__misc/mov/04.mp4"></video>
      </figure>
    </section>
    <figcaption class="mt-0 tar">fig. 04</figcaption>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 04:</span>
          <span>iOS Notifications</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 05:</span>
          <span>ShootProof AR Application</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 06:</span>
          <span>Task Bar Application</span>
        </li>
      </ul>
    </section>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure style="background-color: #c5ffd2;">
        <img class="img-shadow mt-9 mb-9" src="../assets/__misc/img/04@2x.jpg" alt="iOS AR App">
      </figure>
      <figcaption class="tar">fig. 05</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>Working with a developer, I pitched and designed the idea to create an augmented reality application to allow users to project a sized image to their walls in realtime. I was able to learn some more React Native and scratch the surface on AR design principles.</p>
    </article>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure style="background-color: #f7f7f7;">
        <video class="mt-9 mb-9 img-shadow" autoplay playsinline loop src="../assets/__misc/mov/05.mp4"></video>
      </figure>
      <figcaption class="mt-0 tar">fig. 06</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <p>During a two-day hackathon, I designed and developed a task bar application for macOS. The shell was built with Electron and allows users to view notifications about their accounts, as well accessing various tools.</p>
    </article>

    <!-- finish line 🏁 -->
    <section class="fin tac">
      <h2 class="mb-3 f-lg uc f-travels-med">Check Back Later for More Work</h2>
    </section>

    <hr class="mb-8 op-2">

    <!-- footer 👣 -->
    <footer class="next-case">
      <h4 class="mb-0 f-sm uc f-basismono">Next Case Study:</h4>
      <h1 style="display: inline;" class="btn__tertiary f-xl uc f-mabry-med"><router-link to="/galleries">ShootProof Galleries</router-link></h1>
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

  // card
  .card {
    position: fixed;
    top: 1.6rem; right: 0; left: 0;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 1.6rem 2.4rem;
    max-width: 90vw; min-height: 8rem;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    box-shadow: 0 8px 40px 0 rgba(0,0,0,0.2);
    background: #fff;
    opacity: 1;
    transform: translateY(-180px);
    transition: all 300ms ease;
    will-change: transform, opacity;

    li { margin-right: 1.4rem; }

    @include breakpoint(xs) { li { margin-right: 2.4rem; } }

    @include breakpoint(md) {
      top: 2.4rem; right: 2.4rem; left: auto;
      margin: auto;
      max-width: 42.4rem;
      padding: 1.6rem 5.6rem 1.6rem 2.4rem;
      li { margin-right: 3.2rem; }
    }
  }

  .show { visibility: visible; display: flex; opacity: 1; z-index: var(--zmax); }
  .hide { opacity: 0; z-index: var(--zmin); }
  .move { transform: translateY(0); }

  // vacation
  .vacation {
    position: fixed;
    z-index: var(--zmin);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94vw; height: 100vh;
    opacity: 0;

    .content {
      cursor: pointer;
      position: relative;
      z-index: var(--zmax);
      transform: translateY(-4rem) scale(.48);
      opacity: 0;
      transition: all 300ms ease 100ms;

      @include breakpoint(md) { transform: translateY(0) scale(.88); }
    }

    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,.8);
      opacity: 0;
      transition: all 400ms ease;
    }
  }

  .vacation__show {
    z-index: var(--zmax);
    opacity: 1;
    .content, .overlay { opacity: 1; }
  }

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
  .img__half { @include breakpoint(md ) { margin-left: grid-width(1); width: grid-width(8); } }
  .img__three-four { @include breakpoint(mdl) { width: grid-width(9); } }
  .img__one-four   { @include breakpoint(mdl) { margin-left: 6rem; width: grid-width(3); } }
  .img__full, .img__w-bg { margin-bottom: 3.2rem; }

  .img__w-bg > figure > img, .img__w-bg > figure > video {
    margin-left: grid-width(1);
    width: grid-width(10);
    @include breakpoint(mdl) {
      margin-left: grid-width(2);
      width: grid-width(8);
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



</style>


<!-- logic -->
<script>
  export default {
    name: 'misc',

    methods: {
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;

        window.scrollTo(0, top);
      }
    },

    mounted() {
      let scrollpos = window.scrollY
      let lastScrollTop = 0
      let card = document.querySelector('.card')
      let content = document.querySelector('.content')
      let overlay = document.querySelector('.overlay')

      let hidden = () => card.classList.add("hide").classList.remove('show')
      let show = () => card.classList.add("show").classList.remove('hide')

      window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;

         if (st > lastScrollTop){
             card.classList.remove('move')
         } else {
            card.classList.add('move')
         }
         lastScrollTop = st;

        scrollpos = window.scrollY;
        if (scrollpos <= 800) {
          card.classList.add("hide")
        }
        else {
          card.classList.remove("hide")
          card.classList.add("show")
        }
      }, false);
    }
  }
</script>
