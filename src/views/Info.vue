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

      <!-- work list -->
      <article class="bio">
        <p class="meas-8 f-md f-mabry">Hi again—I’m presently a design manager @ <a class="btn__tertiary" href="http://shootproof.com" target="_blank">ShootProof</a>. I spend half my time drawing boxes &amp; the other half explaining them – the other half I’m trying to confuse myself with code; Math is hard. Enjoy the adventure…</p>
      </article>
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
    background: url('../assets/img/me5-2.jpg') no-repeat center center;
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
      margin-top: 0;
      margin-left: grid-width(5);
      padding-left: 1.2rem;
      width: grid-width(7); height: 100vh;
      justify-content: center;
    }

    @include breakpoint(lg) {
      margin-left: grid-width(6);
      // padding-top: 4rem;
      padding-left: 4rem;
      width: grid-width(6.4);
    }
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

  span.keyword:hover {
    @include breakpoint(mdl) {
      // color: transparent;
      // text-stroke: .75px var(--gravity);
      // -webkit-text-stroke: .75px var(--gravity);
    }
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

  figure.atlanta {
    width: 200px; height: 145px;
    background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-blend-mode: soft-light;
    background-size: cover;
  }

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

  .cloud { color: #fff; }
</style>


<!-- logic -->
<script>
  export default {
    name: 'info',

    mounted() {
      const bg = document.querySelector('.left')
      const profile = document.querySelector('.footer__title')
      const meTrigger = document.querySelector('.me-trigger')

      let me01 = "tomato"
      let me02 = "papayawhip"
      let me03 = "mediumslateblue"
      let me04 = "dodgerblue"
      let photos = [ me01, me02, me03, me04 ]
      // let reset = bg.style.background = "#f3f3f3"

      let g01 = 'Hey There'
      let g02 = 'What Up'
      let g03 = 'Yooooo'
      let g04 = 'Whats Good'
      let g05 = 'Yurrrrrr'
      let g06 = 'Keep Going'
      let g07 = 'What it Do'

      let greetings = [ g01, g02, g03, g04, g05, g06, g07 ]

      profile.innerText = 'Profile'

      meTrigger.addEventListener('mouseenter', () => {
        let cycle = photos[(Math.random() * (photos.length) | 0) % (photos.length)];
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

    }
  }
</script>
