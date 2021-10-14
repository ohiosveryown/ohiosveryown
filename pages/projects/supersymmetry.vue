<template>
  <main ref="index" class="anim--out width">
    <header class="space">
      <h1 class="mb-1 title">Supersymmetry</h1>
      <h2 class="brow">From Wegner to Zaha Hadid</h2>
      <ul class="caption--sm">
        <li class="mb-0">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Design, Front-end Development</span>
        </li>
        <li>
          <span class="op-6 mr-0 mb-00">Duration:</span>
          <span>2019–2020</span>
        </li>
      </ul>
      <h3 class="subtitle">
        <a
          class="link"
          target="_blank"
          href="https://supersymmetry.design">
          Supersymmetry</a><arrow class="arrow"/> is a photo blog built on Vue and Saber showcasing architecture, interior design and structural engineering – basically spaces. The origins for the project were to actually learn Angular to be able to better communicate with the engineers I worked with at the time. I soon realized Angular has it's issues and switched to Vue. Take a trip down memory lane and view previous iterations of this project. My hope is to continue to iterate and have a refresh soon.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402199/ovo-3.6/supersymmetry/super-cover_ycslo2.png"
            alt="Version 2020">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Version 2020
        </figcaption>
      </figure>
    </section>

    <section class="works">
      <figure class="space">
        <div class="bleed--full gray">
          <img
            class="elevation-02 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402384/ovo-3.6/supersymmetry/iterations-01_a7nrij.png"
            alt="Adaptive screens">
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Adaptive screens
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full gray">
          <img
            class="elevation-02 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402384/ovo-3.6/supersymmetry/colophon_nbvrzn.png"
            alt="Colophon screen">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Colophon screen
        </figcaption>
      </figure>

      <p class="p space">Originally my plan was to update the blog monthly with new entries of varying architectural styles. I plan to hopefully stick with that cadence in the future with one of the design choices from below.</p>

      <figure class="space">
        <div class="bleed--half gray">
          <img
            class="elevation-02 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402383/ovo-3.6/supersymmetry/iterations-02_o5jekv.png"
            alt="Versioning">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Versioning
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full gray">
          <img
            class="elevation-02 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402384/ovo-3.6/supersymmetry/social_hkwbb1.png"
            alt="Social screens">
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          Social screens
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full gray">
          <img
            class="radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633402384/ovo-3.6/supersymmetry/footer_pz1syw.png"
            alt="Page footer">
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Page footer
        </figcaption>
      </figure>

      <h3 class="space subtitle">If you’re curious to checkout the current version of the project, visit
        <a
        class="link"
        target="_blank"
        href="https://supersymmetry.design">
        supersymmetry.design</a><arrow class="arrow"/> and dig around.
      </h3>
    </section>

    <projectFooter
      link="/projects/blush"
      name="Blush"
      excerpt="Designing a geometric typeface with bright tones and simple quirks; inspired by space ✨"
      src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597077102/blush/blush-01_2x_ndkg4j.png"
    />

  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: maroon; }
  .gray { background: #f5f5f5; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – supersymmetry'
    }),
    scrollToTop: true,
    data: () => ({
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    // layout: 'project-page-layout',
    components: { arrow, projectFooter },
    methods: {
      // reducedMotion: function() {
      //   if (this.prm.matches) {
      //     this.$refs.vid.removeAttribute('autoplay')
      //     this.$refs.vid.controls = true
      //   } else {}
      // },
      Exit() {
        if (this.prm.matches) {
        } else {
          gsap.to('.anim--out', {
            opacity: 0,
            duration: .8,
            ease: Power2.easeInOut
          })
        }
      },
    },
    mounted() {
      // this.reducedMotion()
      const prm = window.matchMedia('(prefers-reduced-motion: reduce)')
      const videos = document.querySelectorAll('video')
      videos.forEach((video) => {
        if (prm.matches) {
          video.removeAttribute('autoplay')
          video.controls = true
        } else {
          video.addEventListener('mouseenter', () => {
            video.controls = true
          })
          video.addEventListener('mouseleave', () => {
            video.controls = false
          })
        }
      })
    },
    beforeDestroy() {
      // this.Exit()
      // if (this.prm.matches) {
      // } else {
      //   this.$refs.index.style.cssText = `
      //     opacity: 0;
      //     transition: opacity 900ms ease;
      //   `
      // }
    },
  }
</script>
