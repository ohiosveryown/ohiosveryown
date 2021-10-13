<template>
  <main class="width">
    <header class="space">
      <h1 class="mb-1 title">Blush</h1>
      <h2 class="brow">“Why is it called grotesque?”</h2>
      <ul class="caption--sm">
        <li class="mb-0">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Typography Design</span>
        </li>
        <li>
          <span class="op-6 mr-0 mb-00">Duration:</span>
          <span>2019–Present</span>
        </li>
      </ul>
      <h3 class="subtitle">“Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind.” I remember the first time I really became cognizant of the design of a typeface: it was when I saw the Lunar Plaque that accompanied Apollo 11 to the moon. The font used was Futura. While I never formally studied type design, creating a typeface has been something I've wanted to do for awhile now.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634144722/ovo-3.6/blush/blush-00_jubtlf.png"
            alt="Nameplate">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Nameplate
        </figcaption>
      </figure>
    </section>

    <section>
      <p class="p">Blush is influenced slightly by Futura, with the biggest distinction is that I wanted to optimize it specifically for digital media. I also wanted to take away the sharpness and starkness of Futura, while giving Blush a little more course outside of traditional, restrictive letterforms.</p>
      <p class="p space">These were my baseline principles and the foundation for my research. I began here and started creating a repository of fonts that followed these concepts.</p>

      <figure class="space">
        <div class="">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145241/ovo-3.6/blush/lp_xdjbyr.jpg"
            alt="Apollo 11 Lunar Plaque">
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Apollo 11 Lunar Plaque
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="radius--big elevation-01"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145105/ovo-3.6/blush/blush-03_vvwo35.jpg"
            alt="Moodboard">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Moodboard
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--half secondary">
          <img
            class="radius--small elevation-01"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145105/ovo-3.6/blush/blush-04_nnjmmd.jpg"
            alt="Glyphs">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Glyphs – 😎
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="radius--big elevation-01"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145105/ovo-3.6/blush/blush-05_joov5a.jpg"
            alt="More glyphs">
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          More glyphs
        </figcaption>
      </figure>

      <h4 class="space subtitle mb-4">Originally I had designed the face in a slightly different style. I wanted the curves to have a much tighter radius or shape. But, after playing with it in application, I didn't like the direction it was heading, so I abandoned the tighter shaping.</h4>

      <figure class="space size--half">
        <div class="bleed--full secondary">
          <img
            class="elevation-00 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145106/ovo-3.6/blush/blush-06_rin3tr.jpg"
            alt="Original style in different renders">
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Original style in different renders
        </figcaption>
      </figure>

      <figure class="space size--half">
        <div class="bleed--full secondary">
          <img
            class="elevation-00 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145106/ovo-3.6/blush/blush-07_t48ye6.jpg"
            alt="More rendering">
        </div>
        <figcaption>
          <span>Fig Nº07</span>
          More rendering
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="radius--big elevation-00"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634145106/ovo-3.6/blush/blush-08_zfsouj.jpg"
            alt="Type sample">
        </div>
        <figcaption>
          <span>Fig Nº08</span>
          Ultimately, this is the direction I ended up going
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full mailchimp-02">
          <video
            ref="vid"
            class="radius--big elevation-00"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1634146105/ovo-3.6/blush/blush1_uxwu1m.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº09</span>
          Type test sample
        </figcaption>
      </figure>

      <h4 class="space subtitle">The current design for Blush is still a work in progress. I’m currently refining the book weight while concurrently working on medium and bold weights.</h4>

    </section>

    <projectFooter
      link="/projects/000"
      name="000"
      excerpt="Building the web presence for 000 – a collection of portraits by photographer Roy Handy"
      src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597339051/000/01_sfrbbm.jpg"
      />
  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: #EBE0DC; }
  .secondary { background: #F5F2F1; }
  img, video { margin: 0 auto; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – Blush'
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
