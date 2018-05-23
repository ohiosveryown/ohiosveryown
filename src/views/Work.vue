<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- ✋🏼 -->
    <section class="left">
      <!-- sweet, sweet welcome text -->
      <header>
        <h1 class="mb-1 uc f-xl f-mabry-med">Hello, I’m
          <div class="wrapper">
            <span class="keyword">Matt—</span>
            <figure class="matt"></figure>
          </div>a product designer living in
          <div class="wrapper">
            <span class="keyword">Atlanta,</span>
            <figure class="atlanta"></figure>
          </div>
          Ga.</h1>
        <h2 class="meas-8 f-lg f-travels-med">I’m currently researching design
          <div class="wrapper">
            <span class="keyword">systems</span>
            <figure class="design-systems"></figure>
          </div>
          &amp;
          <div class="wrapper">
            <span class="keyword">machine learning.</span>
            <figure class="machine-learning"></figure>
          </div>
        </h2>
      </header>
      <!-- how old are these case studies again? -->
      <h6 class="case__date uc f-sm f-basismono">
        <span class="mr-4">case studies</span>
        <span class="op-5">2016–2018</span>
      </h6>
      <!-- that work 🦄 -->
      <ul>

        <li class="case__galleries">
          <router-link to="/galleries">
            <h6 class="mb-0 op-5 uc f-sm f-basismono">ux</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">ShootProof Galleries</h2>
            <h3 class="f-md f-system">The biggest feature from my 9-5, used by a bunch of folks; Got to pay them billz.</h3>
          </router-link>
        </li>

        <li class="case__supersymmetry">
          <router-link to="/supersymmetry">
            <h6 class="mb-0 op-5 uc f-sm f-basismono">ux/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">Supersymmetry</h2>
            <h3 class="f-md f-system">A self-initiated project showcasing architecture, interior design &amp; structural engineering—basically spaces.</h3>
          </router-link>
        </li>

        <li class="case__qas">
          <router-link to="/qas">
            <h6 class="mb-0 op-5 uc f-sm f-basismono">ux/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">Questions ABout Space</h2>
            <h3 class="f-md f-system">Another side project, this time about space. Space is cool. And Vast. But mostly cold.</h3>
          </router-link>
        </li>

        <li class="case__vibes">
          <router-link to="/vibes">
            <h6 class="mb-0 op-5 uc f-sm f-basismono">ux/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">Vibes</h2>
            <h3 class="f-md f-system">I know what you're thinking, "I want to see some mobile app stuff." Got you covered B.</h3>
          </router-link>
        </li>

        <li class="disabled case__uploader">
          <!-- <router-link to="/supersymmetry"> -->
            <h6 class="mb-0 op-5 uc f-sm f-basismono">Coming Soon</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">ShootProof Uploader</h2>
            <h3 class="f-md f-system">Some more product work here; uploading photos is far from a cake walk.</h3>
          <!-- </router-link> -->
        </li>

        <hr class="mb-7 op-2">

        <li class="case__archive">
          <!-- <a href="http://gd.ohiosveryown.co" target="_blank"> -->
          <a href="http://archives.veryown.co" target="_blank">
            <h6 class="mb-0 op-5 uc f-sm f-basismono">Various</h6>
            <h2 class="mb-1 uc f-lg f-mabry-med">Archived Projects</h2>
            <h3 class="f-md f-system">Projects from graveyard past 👻 – not so spooky, but old. Things may be broken so enter at your own peril.</h3>
          </a>
        </li>

      </ul>
    </section>

    <!-- 📼 -->
    <div class="video__wrapper">
      <video class="video video__spg" autoplay playsinline loop src="../assets/__galleries/mov/05.mp4"></video>
      <video class="video video__ss" autoplay playsinline loop src="../assets/__work/mov/03.mp4"></video>
      <video class="video video__qas" autoplay playsinline loop src="../assets/__work/mov/04.mp4"></video>
      <video class="video video__vibes" autoplay playsinline loop src="../assets/__vibes/mov/01.mp4"></video>
      <video class="video video__spu" autoplay playsinline loop src="../assets/__work/mov/soon.mp4"></video>
      <div class="video__bg"/>
    </div>

    <!-- 🤚🏼 -->
    <section class="right"/>

    <!-- 👟 -->
    <footer class="op-5 uc f-sm f-basismono">
      <span class="case__subtitle tar"></span>
    </footer>

    <!-- 🦄 -->
    <div class="rainbow"/>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';

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

  .disabled { cursor: not-allowed; opacity: 0.5; }

  header {
    margin: 12rem 0 5.6rem;
    @include breakpoint(md)  { margin-top: 20rem; width: grid-width(8); }
    @include breakpoint(mdl) { margin: 20rem 0 7.2rem; width: grid-width(12); }
    @include breakpoint(lg)  { width: grid-width(10.5); }
  }

  .case__date {
    margin-bottom: 4rem;
    @include breakpoint(mdl) { margin-bottom: 4.8rem; }
  }

  ul > li {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
    @include breakpoint(md)  { margin-bottom: 5.2rem; margin-left: grid-width(1); width: grid-width(7); }
    @include breakpoint(mdl) { margin-bottom: 5.2rem; margin-left: 0; width: grid-width(8.5); }
  }

  ul > li:last-child { margin-bottom: 9.6rem; }
  li:hover h2 { @include breakpoint(mdl) { text-decoration: underline; } }

  li h2::before {
    @include breakpoint(mdl) {
      content: '↝';
      position: absolute;
      top: .8rem; left: -4.8rem;
      opacity: 0;
      font-size: 4rem;
      line-height: 1;
      transform: translateX(-1rem);
      transition: var(--ease);
      will-change: transform;
    }
  }

  li:hover h2::before {
    @include breakpoint(mdl) {
      opacity: 1;
      transform: translateX(0);
    }
  }

  hr { @include breakpoint(mdl) { margin-left: 0; width: grid-width(7); } }

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

  figure.matt {
    width: 172px; height: 164px;
    background: url('../assets/__work/img/matt@2x.jpg') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.atlanta {
    width: 200px; height: 145px;
    background: url('../assets/__work/gif/atlanta.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.design-systems {
    width: 200px; height: 190px;
    background: url('../assets/__work/img/scaffold.jpeg') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  figure.machine-learning {
    width: 220px; height: 145px;
    background: url('../assets/__work/gif/machine-learning.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

  // case studies + bgs

  .video__wrapper {
    display: none;

    @include breakpoint(mdl) {
      display: inherit;
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 50vw; height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  // disable hover on touch
  @media (hover: none) { .video__wrapper { display: none; } }

  .video {
    position: relative;
    max-width: 88%; max-height: 72%;
    box-shadow: 0 10px 40px 0 rgba(0,0,0,.4);
    z-index: var(--zmax);
  }

  .video__spg, .video__ss, .video__qas, .video__vibes, .video__spu {
    position: absolute;
    visibility: hidden;
  }

  .video__bg {
    content: '';
    position: absolute;
    z-index: var(--z1);
    top: 0; right: 0;
    width: 50vw; height: 100vh;
    background: #fff;
    opacity: 0;
  }

  .video__bg-spg   { background: #f4f5fa; opacity: 1; }
  .video__bg-ss    { background: #f8f5eb; opacity: 1; }
  .video__bg-qas   { background: black; opacity: 1; }
  .video__bg-vibes { background: mediumslateblue; opacity: 1; }
  .video__bg-spu   { background: cornflowerblue; opacity: 1; }
  .video__active   { visibility: visible; }

  footer {
    display: none;
    @include breakpoint(mdl) {
      display: flex;
      justify-content: flex-end;
      position: sticky;
      position: -webkit-sticky;
      bottom: 5.2rem;
    }
  }

  // case subtitles
  .case__subtitle:before { content: 'Featured Work'; }
  .case__subtitle-galleries:before { content: 'SP Galleries 2017'; }
  .case__subtitle-supersymmetry:before { content: 'Supersymmetry 2016'; }
  .case__subtitle-qas:before { content: 'QAS 2018'; color: #fff; }
  .case__subtitle-vibes:before { content: 'Vibes 2017'; }
  .case__subtitle-uploader:before { content: 'Uploader 2016'; }

</style>


<!-- logic -->
<script>
  export default {
    name: 'work',

    mounted() {
      // constance
      const bg = document.querySelector('.right')
      const case__galleries = document.querySelector('.case__galleries')
      const case__supersymmetry = document.querySelector('.case__supersymmetry')
      const case__qas = document.querySelector('.case__qas')
      const case__vibes = document.querySelector('.case__vibes')
      const case__uploader = document.querySelector('.case__uploader')
      const case__sub = document.querySelector('.case__subtitle')
      const rainbow = document.querySelector('.rainbow')

      const video__spg = document.querySelector('.video__spg')
      const video__ss = document.querySelector('.video__ss')
      const video__qas = document.querySelector('.video__qas')
      const video__vibes = document.querySelector('.video__vibes')
      const video__spu = document.querySelector('.video__spu')
      const video__bg = document.querySelector('.video__bg')

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

      // case studies logic
      case__galleries.addEventListener('mouseenter', () => {
        // bg.classList.add('case__galleries-active')
        video__spg.classList.add('video__active')
        video__bg.classList.add('video__bg-spg')
        case__sub.classList.add('case__subtitle-galleries')
      })

      case__galleries.addEventListener('mouseleave', () => {
        // bg.classList.remove('case__galleries-active')
        video__spg.classList.remove('video__active')
        video__bg.classList.remove('video__bg-spg')
        case__sub.classList.remove('case__subtitle-galleries')
      })

      case__supersymmetry.addEventListener('mouseenter', () => {
        // bg.classList.add('case__supersymmetry-active')
        video__ss.classList.add('video__active')
        video__bg.classList.add('video__bg-ss')
        case__sub.classList.add('case__subtitle-supersymmetry')
      })

      case__supersymmetry.addEventListener('mouseleave', () => {
        // bg.classList.remove('case__supersymmetry-active')
        video__ss.classList.remove('video__active')
        video__bg.classList.remove('video__bg-ss')
        case__sub.classList.remove('case__subtitle-supersymmetry')
      })

      case__qas.addEventListener('mouseenter', () => {
        // bg.classList.add('case__qas-active')
        video__qas.classList.add('video__active')
        video__bg.classList.add('video__bg-qas')
        case__sub.classList.add('case__subtitle-qas')
        // video__bg.classList.add('video__active')
      })

      case__qas.addEventListener('mouseleave', () => {
        // bg.classList.remove('case__qas-active')
        video__qas.classList.remove('video__active')
        video__bg.classList.remove('video__bg-qas')
        case__sub.classList.remove('case__subtitle-qas')
      })

      case__vibes.addEventListener('mouseenter', () => {
        // bg.classList.add('case__vibes-active')
        video__vibes.classList.add('video__active')
        video__bg.classList.add('video__bg-vibes')
        case__sub.classList.add('case__subtitle-vibes')
      })

      case__vibes.addEventListener('mouseleave', () => {
        // bg.classList.remove('case__vibes-active')
        video__vibes.classList.remove('video__active')
        video__bg.classList.remove('video__bg-vibes')
        case__sub.classList.remove('case__subtitle-vibes')
      })

      case__uploader.addEventListener('mouseenter', () => {
        // bg.classList.add('case__uploader-active')
        video__spu.classList.add('video__active')
        video__bg.classList.add('video__bg-spu')
        case__sub.classList.add('case__subtitle-uploader')
      })

      case__uploader.addEventListener('mouseleave', () => {
        // bg.classList.remove('case__uploader-active')
        video__spu.classList.remove('video__active')
        video__bg.classList.remove('video__bg-spu')
        case__sub.classList.remove('case__subtitle-uploader')
      })

    }
  }
</script>
