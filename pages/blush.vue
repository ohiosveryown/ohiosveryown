<template>
  <main class="width">
    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">Blush</h1>
      <div class="anim--in meta">
        <h3 class="mb-0 uc fs--sm f--f">
          <span class="pt-0 op-5">typography design</span>
          2018–2020
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="pt-0 op-5">url</span>
          itscalledblu.sh
        </h3>
      </div>
    </header>

    <!-- page hero -->
    <section class="mb-9">
      <ul class="anim--in process mb-3 uc fs--sm f--f">
        <li>process</li>
        <span>
          <svg width="60" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.556V4.444h55.848a8.054 8.054 0 01-.702-.515C53.97 2.957 53 1.565 53 0h1.111c0 1.102.698 2.21 1.743 3.071 1.044.862 2.311 1.373 3.257 1.373v1.112c-.946 0-2.213.511-3.257 1.373-1.045.861-1.744 1.97-1.744 3.071H53c0-1.565.969-2.957 2.146-3.929.224-.184.459-.356.702-.515H0z" fill="#000"/></svg>
        </span>
        <li @click="scrollTo('research')">research</li>
        <li @click="scrollTo('design')">design</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">Designing a geometric typeface with bright tones and simple quirks; inspired by s p a c e ✨</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597077102/blush/blush-01_2x_ndkg4j.png" alt="blush type nameplate">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            Nameplate
          </span>
        </figcaption>
      </figure>
    </section>

    <section class="intro mb-4">
      <article class="pb-9">
        <header>
          <h4 class="mb-1 pt-4 uc fs--sm f--f">
            Introduction
          </h4>
          <h5 class="mb-4 fs--md f--g">“Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind”</h5>
        </header>
        <p>Creating a typeface has been on my to-do list for awhile. I never got to formally study type, but have always observed and admired type and type design.</p>
        <p>I remember the first time I really became conscious about the design of a typeface: it was when I saw the Lunar Plaque that accompanied Apollo 11 to the moon. The font used was Futura.</p>
      </article>

      <figure class="not-wide">
        <div style="background: #e6e6e6" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597091081/blush/nasa_lvlajw.jpg" alt="Apollo 11 Lunar Plaque">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            Apollo 11 Lunar Plaque
          </span>
        </figcaption>
      </figure>
    </section>

    <section class="research mb-4">
      <article class="pb-9">
        <header>
          <h4
            ref="research"
            class="mb-1 pt-4 uc fs--sm f--f">
            Research
          </h4>
          <h5 class="mb-4 fs--md f--g">Familiar, but with a twist</h5>
        </header>
        <p>Blush is influenced slightly by Futura, but the biggest distinction is that I wanted to optimize it specifically for digital media. I also wanted to take away the sharpness and starkness of Futura, while giving Blush a little more course outside of traditional, restrictive letterforms.</p>
        <p>These were my baseline principles and the foundation for my research. I began here and started creating a repository of fonts that followed these concepts.</p>
      </article>

      <figure class="not-wide">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597091653/blush/blush_xtksjb.png" alt="Blush Moodboard">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Blush Moodboard
          </span>
        </figcaption>
      </figure>
    </section>

    <section class="design mb-9">
      <article class="pb-9">
        <header>
          <h4
            ref="design"
            class="mb-1 pt-4 uc fs--sm f--f">
            Design
          </h4>
        </header>
        <p>The current design for Blush is ongoing. I’m currently refining the book weight while concurrently working on medium and bold weights. </p>
        <p>To get a feel for the font in application, you can view some of the mockups below.</p>
      </article>

      <figure class="not-wide pb-9">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597092057/blush/glyphs_ykkx3t.png" alt="Blush Letterforms">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº04</span>
            Letterforms
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pt-4 pb-9">
        <div style="background: #e6e6e6" class="img--w-bg mt-2">
          <img class="shadow-01 br-3" src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597092339/blush/glyphs_iiso1y.jpg" alt="Glyphs">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº05</span>
            Glyphs
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pt-4 pb-9">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597092187/blush/app_defzub.png" alt="Space Application">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº06</span>
            Space Application
          </span>
        </figcaption>
      </figure>

      <figure class="pb-9 not-wide">
        <div style="background: #000" class="img--w-bg mt-2">
          <video
            autoplay="autoplay"
            playsinline=""
            loop="loop">
            <source data-v-501ae7c2="" src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597081255/blush/blush_d2t8sk.mp4"><source>
          </video>
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº07</span>
            Blush is nice
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- footer / next -->
    <Next
      name = 'menu.black'
      excerpt = "Celebrating the diversity of Atlanta's culture and food"
      img = 'https://res.cloudinary.com/da32ufmnf/image/upload/v1596435569/menu/menu_tw8tqd.jpg'
      link = '/menu-black'
    />

  </main>
</template>



<style lang="scss" scoped>
  @import '../style/grid.scss';

  .img--hero {
    background: var(--blushlight);
    @include breakpoint(mdl) { padding: 12rem 12rem 8rem; }
    @include breakpoint(lg)  { padding: 12rem 12rem 8rem; }
    img { box-shadow: none; }
   }
</style>


<script>
  import { works } from '../static/works'
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – blush'
    }),

    methods: {
      scrollTo(refName) {
        let element = this.$refs[refName]
        let top = element.offsetTop
        window.scrollTo(0, top)
      }
    },

    beforeDestroy() {
      // this.Exit()
      const index = document.querySelector('main')
      index.style.cssText = `
        opacity: 0;
        transition: opacity 300ms ease;
      `
    }
  }
</script>