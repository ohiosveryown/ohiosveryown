<template>
  <div class="about width">
    <main>
      <header class="intro">
        <h1 class="anim--in mb-2 fs--lg f--c">Information</h1>
        <h2 class="anim--in fs--md f--g">📨 or 👋🏼's can be sent to:
          <span
            @mouseenter = 'hover = true'
            @mouseleave = 'hover = false'
          >matt@ohiosveryown.co</span>
        </h2>
      </header>

      <article class="anim--in f--f">
        <h3 class="mb-1">Hi again, just a reminder in case you didn’t read the first page (who reads anymore, anyway?) – my name is Matt and I'm presently a designer at Mailchimp.</h3>
        <h3 class="mb-1">I spend half my time drawing boxes & the other half explaining them—the other half
          <span class="code-trigger">trying to confuse myself with code;</span>
          <picture ref='code' class="code">
            <source media="(min-width: 1000px)" srcset="https://media3.giphy.com/media/l3fZLMbuCOqJ82gec/giphy.gif">
            <img src="">
          </picture>
          I’m Math is hard.</h3>
        <h3>I designed and built this site to share some of the things I’ve worked on and/or made. Enjoy the adventure
        </h3>
      </article>

      <picture  :class = "{ active : hover }" class="me">
        <source media="(min-width: 1000px)" srcset="../static/img/placeholder/about.jpg">
        <img src="">
      </picture>

      <Rainbow/>
    </main>

    <aside>
      <ul class="mt-2 mb-9 f--f fs--sm uc">
        <li class="anim--in"><a href="https://twitter.com/cmykw_" target="_blank">Twitter</a></li>
        <li class="anim--in"><a href="https://github.com/ohiosveryown" target="_blank">Github</a></li>
        <li class="anim--in"><a href="https://dribbble.com/cmykw" target="_blank">Dribbble</a></li>
        <li class="anim--in"><a href="https://github.com/ohiosveryown/ohiosveryown" target="_blank">Source</a></li>
      </ul>
    </aside>
  </div>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .me {
    width: 100vw; height: 100vh;
    opacity: 0;
  }

  .active {
    opacity: 1;
    // transform: rotate(3deg) translateY(0);
    transition: opacity 400ms ease 100ms;
  }

  .about {
    display: flex;
    flex-direction: column;
    @include breakpoint(mdl) { flex-direction: row; justify-content: space-between; }
  }

  main {
    margin-top: 16rem;
    @include breakpoint(mdl) { width: grid-width(6); }

    h1 { display: inline-flex; }
  }

  header {
    margin-bottom: 6rem;
    @include breakpoint(md) { width: grid-width(6); }
    @include breakpoint(mdl) { width: 100%; }
  }

  article {
    @include breakpoint(md) { margin-left: grid-width(1.5); width: grid-width(7); }
    @include breakpoint(mdl) { margin-left: 0; width: 100%; }
    h3 + h3 { text-indent: 3ch; }
  }

  aside {
    position: relative;
    z-index: var(--z2);
    margin: 16rem 0 0;
  }

  ul { display: flex; justify-content: space-between; }

  @media (pointer: fine) { li:hover { text-decoration: underline; }}

  li { margin-left: 3.2rem; }
  li:first-of-type { margin-left: 0; }
  li:last-of-type { display: none; @include breakpoint(md) { display: inherit; } }

  li:after {
    display: inline-block;
    content: '';
    margin-left: .6rem;
    margin: 0 .8rem 0 .4rem;
    width: 1rem; height: 1rem;
    background-image: url('../static/img/tab.svg');
    background-size: 1rem 1rem;
    transform: rotate(-135deg);
  }

  picture {
    width: 200px; height: 176px;
    position: fixed;
    z-index: var(--zmin);
    top: 0; left: 0;
    object-fit: cover;
    transition: 1200ms cubic-bezier(0.075, 0.82, 0.165, 1) all;
    opacity: 0;
    will-change: transform;
  }

  picture:before {
    content: '';
    position: absolute;
    top: 0; right: 0; left: 0; bottom: 0;
    z-index: 1;
    background: rgba(255, 214, 252, 1);
    mix-blend-mode: hard-light;
  }

  img { width: 100%; height: 100%; object-fit: cover; }

  @media(pointer: fine) { .code-trigger:hover ~ picture { opacity: 1; }}
  @media(pointer: fine) { span:hover { text-decoration: underline; }}

</style>


<script>
  import Rainbow from '../components/Rainbow'
  export default {
    components: { Rainbow, },

    head: () => ({
      title: 'ovo – about'
    }),

    data: () => ({
      hover: false,
    }),

    methods: {
      Entrance() {
        gsap.from('.anim--in', {
          opacity: 0,
          stagger: .075,
          duration: .4,
          ease: Power2.easeInOut
        })
      },
    },

    mounted() {
      this.Entrance()

      const code = document.querySelector('.code')
      document.addEventListener('mousemove', (e) => {
        code.setAttribute(
          'style',
          `transform: translate(${e.pageX - 100}px, ${e.pageY - 88}px) scale(.88);`
        )
      })
    },

    beforeDestroy() {
      // this.Exit()
      const index = document.querySelector('.about')
      index.style.cssText = `
        opacity: 0;
        transition: opacity var(--animbase) ease;
      `
    }
  }
</script>