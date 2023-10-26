<template>
  <main ref="index" class="width">
    <header class="anim--in">
      <h1 class="mb-1 title">Information</h1>
      <h2 class="brow">
        📨 or 👋🏼's can be sent to:
        <span
        @mouseenter= 'hoverEmail = true'
        @mouseleave= 'hoverEmail = false'
        class="link--fine">
          matt@ohiosveryown.co
        </span>
      </h2>
    </header>

    <section class="anim--in p">
      <p>Hi again. Just a reminder in case you didn’t read the first page (who reads anymore, anyway?) – my name is Matt and I'm presently a staff designer at GitHub 🐙</p>
      <p>
        I spend half my time drawing and explaining boxes; the other half I'm trying to confuse myself with code. I also make furniture at
        <a
          target="_blank"
          href="https://proportional.design">
          <hover
            class="link link--coarse"
            label="proportional.design"
            img="https://res.cloudinary.com/da32ufmnf/image/upload/v1629742674/ovo-3.6/subjects/thumbnail-prop_lqkcba.jpg"
          />
          <arrow/>
        </a>
        🪑
      </p>
      <p>
        I designed and built this site to share some of the things I’ve worked on and/or made. Enjoy the adventure, and the
        <hover
          class="link"
          label="easter eggs"
          img="https://res.cloudinary.com/da32ufmnf/image/upload/v1629742815/ovo-3.6/subjects/thumb-easter_wjpekr.gif"
        />
        🥚
      </p>
    </section>

    <footer class="anim--in caption">
      <ul>
        <li><a target="_blank" href="https://twitter.com/cmykw_">Twitter <arrow/></a></li>
        <li><a target="_blank" href="https://github.com/ohiosveryown">Github <arrow/></a></li>
        <li><a target="_blank" href="http://instagram.com/proportional.design">IG <arrow/></a></li>
        <li><a target="_blank" href="https://dribbble.com/cmykw">Dribbble <arrow/></a></li>
      </ul>
    </footer>

    <div
      :class = "{ active : hoverEmail }"
      class="bg"/>
    <!-- <rainbow/> -->
  </main>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';

  header { margin-bottom: 7.2rem; }

  h1 {
    display: inline-flex;
    margin-bottom: 2rem;
    @include breakpoint(md) { margin-bottom: 2rem; color: var(--gravity); }
  }

  section {
    margin-bottom: 12.4rem;
    @include breakpoint(mdl) { width: grid-width(7); }
  }

  .p {
    @include breakpoint(md) { font-size: 2vw; }
  }

  p + p { text-indent: 2ch; @include breakpoint(mdl) { text-indent: 3ch; }}
  a, figcaption, figure { text-indent: 0ch; }

  footer {
    position: relative;
    z-index: var(--z3);
  }

  ul {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4rem;
    width: 100%;
  }

  svg { transform: rotate(-135deg); }

  .bg:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: #ffd6fc;
    mix-blend-mode: hard-light;
  }

  .bg {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: var(--zmin);
    background: url('https://res.cloudinary.com/da32ufmnf/image/upload/v1629744613/ovo-3.6/subjects/az1_pinac8.jpg') no-repeat center center;
    background-size: cover;
    opacity: 0;
    transition: opacity 300ms ease;
    will-change: opacity;
  }

  .active { opacity: 1; }


  @media (pointer: coarse) {
    .bg { display: none; }
    .link--fine { border-bottom: none; opacity: 1; }
    .link--coarse { border-bottom: 1px solid var(--gravity); opacity: .64; }
  }
</style>


<script>
  import rainbow from '~/components/rainbow'
  import arrow from '~/components/arrow'
  import hover from '~/components/hover'
  export default {
    head: () => ({
      title: 'ohiosveryown – about'
    }),
    data: () => ({
      hoverEmail: false,
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    components: { rainbow, arrow, hover },
    methods: {
      Entrance() {
        if (this.prm.matches) {
        } else {
          gsap.from('.anim--in', {
            opacity: 0,
            stagger: .05,
            duration: .2,
            ease: Power2.easeInOut
          })
        }
      },
    },
    mounted() {
      this.Entrance()
    },
    beforeDestroy() {
      if (this.prm.matches) {
      } else {
        this.$refs.index.style.cssText = `
          opacity: 0;
          transition: opacity 200ms ease;
        `
      }
    },
  }
</script>
