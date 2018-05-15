<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- ✋🏼 -->
    <section class="left">
      <!-- sweet, sweet welcome text -->
      <header>
        <h1 class="mb-1 uc f-xl f-mabry-med">
          <div class="wrapper">
            <span class="keyword">Information</span>
            <figure class="information"></figure>
          </div>
        </h1>
        <h2 class="meas-8 f-lg f-travels-med">Emails can be sent to
          <a class="info__img" href="mailto:matt@ohiosveryown.co?Subject=Hi, this is not Clark from invision" target="_top">
            <span class="btn__tertiary">matt@ohiosveryown.co.</span>
          </a>
        </h2>
      </header>
      <!-- oh look, it's more text 😒 -->
      <article>
        <h3 class="info__text f-md">
          Hi again—I’m presently a design
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
            <span class="keyword">confuse</span>
            <figure class="confuse"></figure>
          </div>
          myself with code;
          <div class="wrapper">
            <span class="keyword">Math is hard.</span>
            <figure class="math"></figure>
          </div>
          Enjoy the
          <div class="wrapper">
            <span class="keyword">adventure...</span>
            <figure class="adventure"></figure>
          </div>&amp;
          <span class="info__img-easter">easter eggs.</span>
        </h3>
      </article>

      <article class="facts__wrapper f-sm f-basismono uc">
        <h3 class="reload btn__tertiary">PS—<span class="facts__query pointer"></span></h3>
      </article>
    </section>

    <!-- 🤚🏼 -->
    <section class="right"/>

    <!-- social 🦋 -->
    <aside class="info__social">
      <ul class="f-sm f-basismono uc">
        <li class="btn__tertiary link mr-7"><a href="http://twitter.com/cmykw_" target="_blank">Twitter</a></li>
        <li class="btn__tertiary link mr-7"><a href="http://github.com/ohiosveryown" target="_blank">Github</a></li>
        <li><a class="btn__tertiary link" href="http://dribbble.com/cmykw" target="_blank">Dribbble</a></li>
      </ul>
    </aside>

    <!-- 👟 -->
    <footer>
      <ul class="uc f-sm f-basismono">
        <li class="footer__date">0512</li>
        <li class="footer__currently">beep. beep. boop.</li>
        <li class="footer__title"></li>
      </ul>
    </footer>

    <!-- -->
    <div class="rainbow"/>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';
  @import '../assets/style/btn';

  .f-xl {
    font-size: 1.9rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 2rem; }
    @include breakpoint(md) { font-size: 2.4rem; }
    @include breakpoint(lg) { font-size: 2.6rem; }
  }

  .f-lg {
    font-size: 1.8rem;
    line-height: 1.24;
    @include breakpoint(sm) { font-size: 2rem; }
    @include breakpoint(md) { font-size: 2rem; }
    @include breakpoint(lg) { font-size: 2.2rem; }
  }

  .f-md {
    font-weight: normal;
    font-size: 1.7rem;
    line-height: 1.5;
    letter-spacing: -.5px;
  }

  .f-sm {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .left { @include breakpoint(mdl) { width: grid-width(6); } }

  .right {
    display: none;
    @include breakpoint(mdl) {
      display: inherit;
      position: fixed;
      z-index: var(--z0);
      top: 0; right: 0;
      width: 50vw; height: 100vh;
      // background: linear-gradient(90deg, rgb(255,255,255)0%, rgb(164,157,255)100%);
    }
  }

  .rainbow {
    display: inherit;
    position: fixed;
    z-index: var(--zmin);
    top: -16rem; right: 0; left: 0;
    transform-origin: top;
    width: 100vh; height: 100vw;
    transform: rotate(-90deg) translateY(-50vh);

    @include breakpoint(mdl) {
      position: fixed;
      z-index: var(--zmin);
      top: 0; right: 0; left: inherit;
      width: 50vw; height: 100vh;
      transform: none;
    }
  }

  header {
    margin: 12rem 0 3.2rem;
    @include breakpoint(md)  { margin-top: 20rem; width: grid-width(8); }
    @include breakpoint(mdl) { width: grid-width(12); }
    @include breakpoint(lg)  { width: grid-width(10.5); }
  }

  .info__text {
    margin-bottom: 4rem;
    @include breakpoint(md)  { margin-left: grid-width(1); width: grid-width(7); }
    @include breakpoint(mdl) { margin-left: 0; width: grid-width(9.6); }
  }

  // keyword easter eggs ...shhh
  .wrapper { display: inline; position: relative; }

  span.keyword {
    display: inline;
    position: relative;
    overflow: hidden;
    will-change: transform;
  }

  span.keyword:hover {
    @include breakpoint(mdl) {
      color: transparent;
      text-stroke: .75px var(--gravity);
      -webkit-text-stroke: .75px var(--gravity);
    }
  }

  span.keyword:hover ~ figure {
    @include breakpoint(mdl) {
      opacity: 1;
      transform: translate(-50%,-50%) scale(1);
      transition: all 600ms cubic-bezier(0.2,-2,0,4);
    }
  }

  figure {
    position: absolute;
    top: 50%; left: 50%;
    z-index: var(--zmin);
    display: inline;
    opacity: 0;
    transform: translate(-50%,-50%) scale(0.94);
    transition: all 150ms ease;
    will-change: transform;
  }

  figure.information {
    width: 140px; height: 140px;
    background: white url('../assets/__info/gif/information.gif') no-repeat center center;
    background-blend-mode: difference;
    background-size: cover;
  }

  figure.manager {
    width: 140px; height: 112px;
    background: url('../assets/__info/gif/manager.gif') no-repeat center center;
    background-size: cover;
  }

  figure.drawing {
    width: 140px; height: 112px;
    background: url('../assets/__info/gif/drawing.gif') no-repeat center center;
    background-size: cover;
  }

  figure.confuse {
    width: 140px; height: 112px;
    background: url('../assets/__info/gif/confuse.gif') no-repeat center center;
    background-size: cover;
  }

  figure.math {
    width: 164px; height: 112px;
    background: url('../assets/__info/img/math.jpg') no-repeat center center;
    background-size: cover;
  }

  figure.adventure {
    width: 164px; height: 112px;
    background: url('../assets/__info/gif/adventure.gif') no-repeat center center;
    background-size: cover;
  }

  // info backgrounds
  .info__img-active {
    background: url('../assets/__info/img/me.jpg') no-repeat center center;
    background-size: cover;
  }

  .info__easter-img-active {
    background: #ebeff8 url('../assets/__info/gif/easter.gif') no-repeat center center;
    background-size: cover;
  }

  .facts__wrapper {
    width: grid-width(12);
    @include breakpoint(md)  { margin-left: grid-width(1); width: grid-width(7); }
    @include breakpoint(mdl) { margin-left: grid-width(0); width: grid-width(9); }
  }

  // social
  .info__social {
    position: absolute;
    top: 40rem;
    margin: 0 auto 4rem;
    @include breakpoint(md)  { top: 48rem; }
    @include breakpoint(mdl) { top: 0rem; bottom: inherit; right: 0rem; text-align: right; }
  }

  footer {
    display: none;
    @include breakpoint(mdl) {
      position: fixed;
      bottom: 0rem;
      display: flex;
      margin: 0 auto 3.2rem;
      max-width: var(--max_width);
      width: 88vw;
    }
  }

  footer > ul { width: 100%; }
  .footer__title { text-align: right; @include breakpoint(mdl) { width: grid-width(4); } }
  .footer__currently { opacity: 0; @include breakpoint(mdl) { width: grid-width(2); } }
  .footer__date { @include breakpoint(mdl) { width: grid-width(6); } }
  .cloud { color: #fff; }

</style>


<!-- logic -->
<script>
  export default {
    name: 'info',

    mounted() {
      // constance
      const bg = document.querySelector('.right')
      const rainbow = document.querySelector('.rainbow')
      const info__social = document.querySelector('.info__social')
      const info__img = document.querySelector('.info__img')
      const info__easter__img = document.querySelector('.info__img-easter')
      const facts__query = document.querySelector('.facts__query')
      const footer__title = document.querySelector('.footer__title')

      // rainbow colors
      let blue = 'linear-gradient(90deg, rgb(255,255,255) 0%, rgb(164,157,255) 100%)'
      let chartreuse = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(148,249,3,1) 100%)'
      let green = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(3,249,171,1) 100%)'
      let orange = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(249,69,3,1) 100%)'
      let pink = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(244,3,249,1) 100%)'
      let yellow = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(223,249,3,1) 100%)'

      // rainbow logic
      let bgs = [ blue, chartreuse, green, orange, pink, yellow ]
      let rando = bgs[(Math.random() * (bgs.length) | 0) % (bgs.length)]
      rainbow.style.background = rando

      // queries
      let queries = [
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
        "I hoop 🏀—put $20 on it, 1:1",
      ]

      const queries__cycle = queries[(Math.random() * (queries.length) | 0) % (queries.length)];
      facts__query.innerHTML = queries__cycle;

      document.querySelector('.reload').addEventListener('click', () => {
        const queries__cycle = queries[(Math.random() * (queries.length) | 0) % (queries.length)];
        facts__query.innerHTML = queries__cycle;
      })

      // info logic
      let greetings = [
        'Hey There',
        'What Up',
        'Yooo00o0o0o',
        'What Is Good',
        'Yuuuurrrrr',
        'Keep Going',
        'What It Do',
        'Buongiorno',
        'Allora',
        'Again Dude?'
      ]

      footer__title.innerText = 'Profile'

      info__img.addEventListener('mouseenter', () => {
        bg.classList.add('info__img-active')
        let greetings__cycle = greetings[(Math.random() * (greetings.length) | 0) % (greetings.length)];
        footer__title.innerText = greetings__cycle, footer__title.classList.add('cloud')
        info__social.style.opacity = '0'
      })

      info__img.addEventListener('mouseleave', () => {
        bg.classList.remove('info__img-active')
        footer__title.innerText = 'Profile', footer__title.classList.remove('cloud')
        info__social.style.opacity = '1'
      })

      info__easter__img.addEventListener('mouseenter', () => {
        bg.classList.add('info__easter-img-active')
        info__social.style.opacity = '0'
      })

      info__easter__img.addEventListener('mouseleave', () => {
        bg.classList.remove('info__easter-img-active')
        info__social.style.opacity = '1'
      })

    }
  }
</script>
