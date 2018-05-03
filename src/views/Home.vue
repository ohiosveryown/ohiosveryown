<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- ✋🏼 -->
    <section class="left"/>
    <!-- 🤚🏼 -->
    <section class="right">
      <!-- intro -->
      <header class="uc">
        <h1 class="mb-1 f-xl f-travelsdemi">Hi, I'm Matt—a product designer living in Atlanta.</h1>
        <h2 class="mb-4 meas-8 f-lg f-mabry">I'm currently researching design systems &amp; machine learning.</h2>
      </header>

      <h5 class="op-5 mb-2 uc f-sm f-basismono">Case Studies</h5>

      <!-- work list -->
      <ul>

        <!-- entry -->
        <router-link to="/about">
          <li class="mb-1 entry entry__sp-galleries">
            <!-- entry title -->
            <div class="entry__title">
              <h3 class="mb-0 f-md f-mabry">ShootProof Galleries</h3>
              <h5 class="op-5 uc f-sm f-basismono">ux/ui</h5>
            </div>
            <!-- entry description -->
            <div class="entry__description">
              <h4 class="meas-9 f-mabry">The biggest feature from my 9-5; Got to pay them billz.</h4>
            </div>
          </li>
        </router-link>

        <!-- entry -->
        <router-link to="/about">
          <li class="mb-1 entry entry__supersymmetry">
            <!-- entry title -->
            <div class="entry__title">
              <h3 class="mb-0 f-md f-mabry">Supersymmetry</h3>
              <h5 class="op-5 uc f-sm f-basismono">ux/dev</h5>
            </div>
            <!-- entry description -->
            <div class="entry__description">
              <h4 class="meas-9 f-mabry">A self-initiated project about &amp; spaces.</h4>
            </div>
          </li>
        </router-link>

        <!-- entry -->
        <router-link to="/about">
          <li class="mb-1 entry entry__qas">
            <!-- entry title -->
            <div class="entry__title">
              <h3 class="mb-0 f-md f-mabry">Questions About Space</h3>
              <h5 class="op-5 uc f-sm f-basismono">ux/dev</h5>
            </div>
            <!-- entry description -->
            <div class="entry__description">
              <h4 class="meas-9 f-mabry">A side project about space. Space is cool. And Vast. But also cold.</h4>
            </div>
          </li>
        </router-link>

        <!-- entry -->
        <router-link to="/about">
          <li class="mb-1 entry entry__vibes">
            <!-- entry title -->
            <div class="entry__title">
              <h3 class="mb-0 f-md f-mabry">Vibes</h3>
              <h5 class="op-5 uc f-sm f-basismono">ux/ui</h5>
            </div>
            <!-- entry description -->
            <div class="entry__description">
              <h4 class="f-mabry">I know what you’re thinking, “What about some mobile stuff?” Got you.</h4>
            </div>
          </li>
        </router-link>

        <!-- entry -->
        <router-link to="/about">
          <li class="mb-2 entry entry__sp-uploader">
            <!-- entry title -->
            <div class="entry__title">
              <h3 class="mb-0 f-md f-mabry">ShootProof Uploader</h3>
              <h5 class="op-5 uc f-sm f-basismono">ux/dev</h5>
            </div>
            <!-- entry description -->
            <div class="entry__description">
              <h4 class="meas-9 f-mabry">Some more product work here. Uploading photos is tough.</h4>
            </div>
          </li>
        </router-link>

      </ul>
    </section>

    <!-- footer 👣 -->
    <footer class="mw__lg">
      <ul class="uc f-sm f-basismono">
        <li class="footer__title"/>
        <li class="footer__currently">Currently</li>
        <li class="footer__date">2016—2018</li>
      </ul>
    </footer>

  </main>
</template>


<!-- style -->
<style scoped lang="scss">
  @import '../assets/style/mq';
  @import '../assets/style/type';

  .f-xl {
    font-size: 2.6rem;
    line-height: 1.2;
    @include breakpoint(mdl) { font-size: 2.6rem; }
  }

  .f-lg {
    font-size: 2rem;
    line-height: 1.2;
    @include breakpoint(mdl) { font-size: 2rem; }
  }

  .f-md {
    font-size: 1.8rem;
    line-height: 1.2;
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

  .right {
    display: flex;
    flex-direction: column;
    margin-top: 10rem;
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

  header {
    @include breakpoint(lg) { width: grid-width(11); }
  }

  .entry {
    display: flex;
    flex-direction: column;
    width: grid-width(12);

    @include breakpoint(md) {
      flex-direction: column;
      margin-left: grid-width(1);
    }

    @include breakpoint(mdl) {
      flex-direction: row;
      margin-left: 0;
    }
  }

  .entry__title {
    @include breakpoint(mdl) {
      width: grid-width(5.5);
    }
  }

  .entry__description {
    @include breakpoint(mdl) {
      width: grid-width(6);
    }
  }

  .entry__sp-galleries-bg {
    background: cornflowerblue;
    background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-size: cover;
  }

  .entry__supersymmetry-bg {
    background: tomato;
    // background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-size: cover;
  }

  .entry__qas-bg {
    background: black;
    // background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-size: cover;
  }

  .entry__vibes-bg {
    background: mediumslateblue;
    // background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-size: cover;
  }

  .entry__sp-uploader-bg {
    background: lightblue;
    // background: url('../assets/gif/atlanta.gif') no-repeat center center;
    background-size: cover;
  }

  footer {
    @include breakpoint(md) {
      display: inherit;
      position: relative;
      ul { display: flex; }
    }

    @include breakpoint(mdl) {
      position: fixed;
      bottom: 2.4rem;
    }
  }

  .footer__title {
    @include breakpoint(mdl) {
      width: grid-width(6);
    }
  }

  .footer__currently {
    @include breakpoint(mdl) {

    }

    @include breakpoint(lg) {
      width: grid-width(2);
      padding-left: 4rem;
    }
  }

  .footer__date {
    @include breakpoint(mdl) {
      width: grid-width(4);
      text-align: right;
    }
  }
</style>


<!-- logic -->
<script>
  export default {
    name: 'home',

    mounted() {
      const bg = document.querySelector('.left')
      const spgTrigger = document.querySelector('.entry__sp-galleries')
      const ssTrigger = document.querySelector('.entry__supersymmetry')
      const qasTrigger = document.querySelector('.entry__qas')
      const vibesTrigger = document.querySelector('.entry__vibes')
      const spuTrigger = document.querySelector('.entry__sp-uploader')

      const footerTitle = document.querySelector('.footer__title')
      const featuredReset = footerTitle.innerText = 'Featured Work'


      spgTrigger.addEventListener('mouseenter', () => { bg.classList.add('entry__sp-galleries-bg'), footerTitle.innerText = 'ShootProof Galleries–2016' })
      spgTrigger.addEventListener('mouseleave', () => { bg.classList.remove('entry__sp-galleries-bg'), footerTitle.innerText = 'Featured Work' })

      ssTrigger.addEventListener('mouseenter', () => { bg.classList.add('entry__supersymmetry-bg'), footerTitle.innerText = 'Supersymmetry–2016' })
      ssTrigger.addEventListener('mouseleave', () => { bg.classList.remove('entry__supersymmetry-bg'), footerTitle.innerText = 'Featured Work' })

      qasTrigger.addEventListener('mouseenter', () => { bg.classList.add('entry__qas-bg'), footerTitle.innerText = 'Questions About Space—2017', footerTitle.style.color = 'White' })
      qasTrigger.addEventListener('mouseleave', () => { bg.classList.remove('entry__qas-bg'), footerTitle.innerText = 'Featured Work', footerTitle.style.color = 'inherit' })

      vibesTrigger.addEventListener('mouseenter', () => { bg.classList.add('entry__vibes-bg'), footerTitle.innerText = 'Vibes–2016' })
      vibesTrigger.addEventListener('mouseleave', () => { bg.classList.remove('entry__vibes-bg'), footerTitle.innerText = 'Featured Work' })

      spuTrigger.addEventListener('mouseenter', () => { bg.classList.add('entry__sp-uploader-bg'), footerTitle.innerText = 'ShootProof Uploader–2016' })
      spuTrigger.addEventListener('mouseleave', () => { bg.classList.remove('entry__sp-uploader-bg'), footerTitle.innerText = 'Featured Work' })
    }
  }
</script>
