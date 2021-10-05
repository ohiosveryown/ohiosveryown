<template>
  <main class="width">
    <header class="space">
      <h1 class="mb-1 title">menu.black</h1>
      <h2 class="brow">Celebrating Atlanta's diversity through food</h2>
      <ul class="caption--sm">
        <li class="mb-0">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Design, Front-end Development</span>
        </li>
        <li>
          <span class="op-6 mr-0 mb-00">Duration:</span>
          <span>2020–Present</span>
        </li>
      </ul>
      <h3 class="subtitle">If you’re reading this in the year 2020, you’re well aware of the seriousness of covid-19. You’re also probably aware of the racial and social tension that's been brewing in America for the last 300 or so years. If you're reading this in the future, let me know how and when these issues are resolved. Atlanta is my current home and one of my favorite things to do here is find new places to eat. Atlanta is so diverse in its culture, there are so many under the radar spots for good food – menu.black is a catalog of those places.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633406208/ovo-3.6/sp/index_kvl7ly.jpg"
            alt="Version 2020">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Index
        </figcaption>
      </figure>
    </section>

    <section class="works">
      <figure class="space">
        <div class="bleed--full green">
          <img
            class=""
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633406208/ovo-3.6/sp/small_ksqmqr.png"
            alt="Mobile screens">
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Mobile screens
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full green">
          <img
            class=""
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633406677/ovo-3.6/sp/ui-components_qygoko.png"
            alt="UI components">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          UI components
        </figcaption>
      </figure>

      <h5 class="subtitle space">Unfortunately I lost a lot of the original sources of design and research so this is all I have to offer from this experience. I do remember a goal of wanting the application UI to be subdued to allow the photography and source material to shine.</h5>

      <figure class="space">
        <div class="bleed--full green">
          <img
            class="elevation-02 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1633406846/ovo-3.6/sp/photo-detail_gofxna.jpg"
            alt="Photo detail">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Photo detail
        </figcaption>
      </figure>

      <figure class="space size--half">
        <div class="">
          <video
            ref="vid"
            class="radius--small"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1633405966/ovo-3.6/sp/gallery-album-photos__sm_zhtwji.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          Mobile interaction test
        </figcaption>
      </figure>

      <figure class="space size--half">
        <div class="">
          <video
            ref="vid"
            class="radius--small"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1633405965/ovo-3.6/sp/actions-dropdown_gol2aq.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Gallery photos test
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full green">
          <video
            ref="vid"
            class=""
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1633405966/ovo-3.6/sp/change-albums-o_ai9j0h.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº07</span>
          Album selection
        </figcaption>
      </figure>
    </section>

    <projectFooter
      link="/projects/supersymmetry"
      name="Supersymmetry"
      excerpt="A self-initiated project showcasing architecture & structural engineering and other interesting spaces"
      src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478423/supersymmetry/supersymmetry_2x_w1ol91.jpg"
    />

  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: var(--shootproof); }
  .green { background: #F4FAF7; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – menu[dot]black'
    }),
    data: () => ({
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    layout: 'project-page-layout',
    components: { arrow, projectFooter },
    methods: {
      // reducedMotion: function() {
      //   if (this.prm.matches) {
      //     this.$refs.vid.removeAttribute('autoplay')
      //     this.$refs.vid.controls = true
      //   } else {}
      // }
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
    }
  }
</script>
