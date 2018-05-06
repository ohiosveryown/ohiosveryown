<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- ✋🏼 -->
    <section class="left"/>
    <!-- 🤚🏼 -->
    <section class="right">
      <!-- intro -->
      <header class="uc">
        <h1 class="mb-1 f-xl f-travelsdemi">
          <div class="wrapper">
            <span class="keyword">Information</span>
            <figure class="information"></figure>
          </div>
        </h1>
        <h2 class="mb-4 meas-8 f-lg f-mabry">Emails can be sent to:
          <a class="me-trigger" href="mailto:matt@ohiosveryown.co?Subject=Hi, this is not Clark from invision" target="_top">
            <span class="keyword btn__tertiary">matt@ohiosveryown.co.</span>
            <figure class="me"></figure>
          </a>
        </h2>
      </header>

      <h5 class="op-5 mb-2 uc f-sm f-basismono">Hello</h5>

      <!-- salutations -->
      <article class="bio mb-4">
        <h4 class="meas-9 f-md f-mabry">Hi again—I’m presently a design
          <div class="wrapper">
            <span class="keyword">manager</span>
            <figure class="manager"></figure>
          </div>
          @ <a class="btn__tertiary" target="_blank" href="http://shootproof.com">ShootProof</a>. I spend half my time
          <div class="wrapper">
            <span class="keyword">drawing boxes</span>
            <figure class="drawing"></figure>
          </div>
          &amp; the other half explaining them—the other half I’m trying to
          <div class="wrapper">
            <span class="keyword">confuse myself</span>
            <figure class="confuse"></figure>
          </div>
          with code;
          <div class="wrapper">
            <span class="keyword">Math is hard.</span>
            <figure class="ts"></figure>
          </div>
          Enjoy the&nbsp;
          <div class="wrapper">
            <span class="keyword">adventure...</span>
            <figure class="adventure"></figure>
          </div>
          &amp;
          <span class="easter">easter eggs.</span>
        </h4>
      </article>

      <article class="facts__wrapper mb-9 f-sm f-basismono uc">
        <h3 class="reload btn__tertiary meas-8">PS—<span class="pointer facts__query"></span></h3>
      </article>

      <div class="social mt-0 mb-9">
        <ul class="uc f-basismono">
          <li class="btn__tertiary mr-6"><a href="http://twitter.com/cmykw_" target="_blank">Twitter</a></li>
          <li class="btn__tertiary mr-6"><a href="http://github.com/ohiosveryown" target="_blank">Github</a></li>
          <li class="btn__tertiary"><a href="http://dribbble.com/cmykw" target="_blank">Dribbble</a></li>
        </ul>
      </div>
    </section>

    <!-- footer 👣 -->
    <footer class="mw__lg">
      <ul class="uc f-sm f-basismono">
        <li class="footer__title"></li>
        <li class="footer__currently">beep. beep. boop.</li>
        <li class="footer__date">0512</li>
      </ul>
    </footer>

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
    @include breakpoint(md) { font-size: 2.3rem; }
  }

  .f-lg {
    font-size: 1.6rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 1.8rem; }
  }

  .f-md {
    font-size: 1.8rem;
    line-height: 1.5;
  }

  .f-sm {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .left {
    display: none;
    position: fixed;
    top: 0; left: 0;
    z-index: var(--zmin);
    width: 40vw; height: 100vh;
    background: #f3f3f3;

    @include breakpoint(mdl) { display: inherit; }
    @include breakpoint(lg) { width: 50vw; }
  }

  .ugly-img {
    background: url('../assets/img/me.jpg') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  .easter-img {
    background: url('../assets/gif/easter-egg.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  .right {
    display: flex;
    flex-direction: column;
    margin-top: 9.2rem;
    width: grid-width(12);

    @include breakpoint(md) {
      margin-top: 16rem;
      width: grid-width(10);
    }

    @include breakpoint(mdl) {
      margin-left: grid-width(5);
      padding-left: 1.2rem;
      width: grid-width(7);
      // justify-content: center;
    }

    @include breakpoint(lg) {
      margin-left: grid-width(6);
      // padding-top: 4rem;
      padding-left: 4rem;
      width: grid-width(6.4);
    }
  }

  .bio {
    width: grid-width(12);
    @include breakpoint(md)  { margin-left: grid-width(1); width: grid-width(10); }
    @include breakpoint(mdl) { margin-left: grid-width(0); width: grid-width(12); }
  }

  header { @include breakpoint(lg) { width: grid-width(11); } }

  .wrapper {
    display: inline-block;
    position: relative;
  }

  span.keyword {
    display: inline;
    position: relative;
    overflow: hidden;
    // transition: var(--ease);
    will-change: transform;
  }

  span.keyword:hover ~ figure {
    @include breakpoint(mdl) {
      opacity: 1;
      transform: translate(-50%,-50%) scale(1);
      transition: all 600ms cubic-bezier(0.2, -2, 0, 4);
    }
  }

  figure {
    position: absolute;
    top: 50%; left: 50%;
    z-index: var(--zmin);
    display: inline;
    transform: translate(-50%,-50%) scale(0.94);

    opacity: 0;
    transition: all 150ms ease;
    will-change: transform;
  }

  figure.information {
    width: 210px; height: 145px;
    background: mediumslateblue url('../assets/gif/info.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.manager {
    width: 224px; height: 126px;
    background: url('../assets/gif/tito.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.drawing {
    width: 224px; height: 126px;
    background: url('../assets/gif/drawing.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.confuse {
    width: 210px; height: 164px;
    background: url('../assets/gif/confuse.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.ts {
    width: 224px; height: 126px;
    background: url('../assets/img/ts.jpg') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.adventure {
    width: 224px; height: 126px;
    background: url('../assets/gif/adventure.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  .facts__wrapper {
    width: grid-width(12);
    @include breakpoint(md)  { margin-left: grid-width(1); width: grid-width(7); }
    @include breakpoint(mdl) { margin-left: grid-width(0); width: grid-width(12); }
  }

  .cloud { color: #fff; }
  .social { font-size: 1.4rem; }

  footer {
    padding: 4rem 0;
    @include breakpoint(md) {
      position: fixed;
      bottom: 2.4rem;
      padding: 0;
      ul { display: flex; }
    }
  }

  .footer__title {
    display: none;
    @include breakpoint(mdl) { display: inherit; width: grid-width(6); }
  }

  .footer__currently {
    width: grid-width(6);
    @include breakpoint(mdl) { width: grid-width(4); }

    @include breakpoint(lg) {
      width: grid-width(2);
      padding-left: 4rem;
    }
  }

  .footer__date {
    width: grid-width(6);
    text-align: right;
    @include breakpoint(mdl) { width: grid-width(4); }
  }

</style>


<!-- logic -->
<script>
  export default {
    name: 'info',

    mounted() {
      const bg = document.querySelector('.left')
      const profile = document.querySelector('.footer__title')
      const meTrigger = document.querySelector('.me-trigger')
      const easter = document.querySelector('.easter')
      let greetings = [ 'Hey There', 'What Up', 'Yoooo', 'What Is Good', 'Yuuuurrrrr', 'Keep Going', 'What It Do' ]

      profile.innerText = 'Profile'

      meTrigger.addEventListener('mouseenter', () => {
        let greetingsCycle = greetings[(Math.random() * (greetings.length) | 0) % (greetings.length)];
        profile.innerText = greetingsCycle
        profile.classList.add('cloud')
        bg.classList.add('ugly-img')
      })

      meTrigger.addEventListener('mouseleave', () => {
        profile.innerText = 'Profile'
        profile.classList.remove('cloud')
        bg.classList.remove('ugly-img')
      })


      easter.addEventListener('mouseenter', () => {
        bg.classList.add('easter-img')
      })

      easter.addEventListener('mouseleave', () => {
        bg.classList.remove('easter-img')
      })


      const queries = [
        "I am left-handed 👈🏼",
        "I prefer water over La Croix 🤢",
        "🔥 &amp; 🤔 are my most used emoji",
        "I'm fascinated with machine learning & wonder if it'll put me out of a job one day 🙃",
        "Good UI is like a metronome; It should keep you on track but it shouldn't distract",
        "I've never eaten a Tide Pod 😵",
        "Design is the process of taking available data &amp; coming up with its visual representation",
        "I've been in the digital design game for 8 years 👴🏼",
        "I'm originally from Ohio 🌰",
        "I listen to a lot of Taylor Swift 🎤",
        "I listen to a lot of Isaiah Rashad 🎤",
        "I listen to a lot of Toro y Moi 🎤",
        "I listen to a lot of Alvvways 🎤",
        "In most cases I'm a proponent of system fonts 🤖",
      ]

      const factsQuery = document.querySelector('.facts__query')

      const queriesCycle = queries[(Math.random() * (queries.length) | 0) % (queries.length)];
      factsQuery.innerHTML = queriesCycle;

      document.querySelector('.reload').addEventListener('click', () => {
        const queriesCycle = queries[(Math.random() * (queries.length) | 0) % (queries.length)];
        factsQuery.innerHTML = queriesCycle;
      })

    }
  }
</script>
