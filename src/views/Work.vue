<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- ✋🏼 -->
    <section class="left">
      <header>
        <h1 class="mb-2 uc f-xl f-mabry">Hi, I’m Matt—a product designer living in Atlanta, Ga.</h1>
        <h2 class="meas-8 uc f-lg f-mabry">I’m currently researching design systems &amp; machine learning.</h2>
      </header>

      <h6 class="mb-6 uc f-sm f-basismono">
        <span class="mr-3">case studies</span>
        <span>2016–2018</span>
      </h6>

      <ul>
        <li class="sp__galleries">
          <router-link to="/supersymmetry">
            <h6 class="mb-1 op-5 uc f-sm f-basismono">ux/ui</h6>
            <h2 class="mb-1 uc f-lg f-mabry">ShootProof Galleries</h2>
            <h3 class="f-md f-mabry">The biggest feature from my 9-5, used by a bunch of folks; Got to pay them billz.</h3>
          </router-link>
        </li>

        <li>
          <router-link to="/supersymmetry">
            <h6 class="mb-1 op-5 uc f-sm f-basismono">ux/ui/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry">Supersymmetry</h2>
            <h3 class="f-md f-mabry">A self-initiated project focusing on engineering, buildings, interior desing—basically spaces.</h3>
          </router-link>
        </li>

        <li>
          <router-link to="/supersymmetry">
            <h6 class="mb-1 op-5 uc f-sm f-basismono">ux/ui/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry">Questions About Space</h2>
            <h3 class="f-md f-mabry">A side project about space. Space is cool. And Vast. But mostly cold.</h3>
          </router-link>
        </li>

        <li>
          <router-link to="/supersymmetry">
            <h6 class="mb-1 op-5 uc f-sm f-basismono">ux/ui/dev</h6>
            <h2 class="mb-1 uc f-lg f-mabry">Vibes</h2>
            <h3 class="f-md f-mabry">I know what you’re thinking, “What about some mobile stuff?” I got you.</h3>
          </router-link>
        </li>

        <li>
          <router-link to="/supersymmetry">
            <h6 class="mb-1 op-5 uc f-sm f-basismono">ux/ui</h6>
            <h2 class="mb-1 uc f-lg f-mabry">ShootProof Uploader</h2>
            <h3 class="f-md f-mabry">Some more product work here. Uploading photos is suprisingly tough.</h3>
          </router-link>
        </li>
      </ul>
    </section>
    <!-- 🤚🏼 -->
    <section class="right"></section>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';

  .f-xl {
    font-size: 1.8rem;
    line-height: 1.1;
    @include breakpoint(sm) { font-size: 2rem; }
    @include breakpoint(md) { font-size: 3rem; }
  }

  .f-lg {
    font-size: 1.6rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 2.2rem; }
  }

  .f-md {
    font-size: 1.7rem;
    line-height: 1.3;
  }

  .f-sm {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .right {
    display: none;
    @include breakpoint(mdl) {
      display: inherit;
      position: fixed;
      z-index: var(--zmin);
      top: 0; right: 0;
      width: 50vw; height: 100vh;
      background: linear-gradient(90deg, rgb(255,255,255)0%, rgb(164,157,255)100%);
    }
  }

  .right.blue  { background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(244,3,249,1) 100%); }
  .right.green { background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(244,3,249,1) 100%); }

  .left {
    @include breakpoint(mdl) { width: grid-width(6); }
  }

  header {
    @include breakpoint(mdl) { margin: 16rem 0 5.6rem; }
  }

  ul > li {
    @include breakpoint(mdl) { margin-bottom: 4.8rem; width: grid-width(8.5); }
  }

  ul > li:last-child { margin-bottom: 9.6rem; }
  li:hover h2 { @include breakpoint(mdl) { text-decoration: underline; } }

  // backgrounds
  .sp__galleries-active {
    background: #ebeff8 url('../assets/gif/spg.gif') no-repeat center bottom;
    // background: #ebeff8 url('../assets/img/sp__galleries-01@2x.png') no-repeat center bottom;
    background-size: contain;
  }

</style>


<!-- logic -->
<script>
  export default {
    name: 'work',

    mounted() {
      const bg = document.querySelector('.right')
      const sp__galleries = document.querySelector('.sp__galleries')

      sp__galleries.addEventListener('mouseenter', () => { bg.classList.add('sp__galleries-active') })
      sp__galleries.addEventListener('mouseleave', () => { bg.classList.remove('sp__galleries-active') })
    }
  }
</script>
