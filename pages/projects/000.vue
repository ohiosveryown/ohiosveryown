<template>
  <main class="width">
    <header class="space">
      <h1 class="mb-1 title">000</h1>
      <h2 class="brow">A collection of portraits by photographer Roy Handy</h2>
      <ul class="caption--sm">
        <li class="mb-0">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Design, Front-end Development</span>
        </li>
        <li>
          <span class="op-6 mr-0 mb-00">Duration:</span>
          <span>2019</span>
        </li>
      </ul>
      <h3 class="subtitle">
        <a
          class="link"
          target="_blank"
          href="https://threezeros.co">
          000</a><arrow class="arrow"/>
        is a collection of portraits by photographer and friend of this website, Roy Handy. The project aimed to give women, specifically women of color, a platform to express the cultural appreciation of owning their true self, through their hair. Roy originally published a book of portraits of women talking about embracing their nature hair, and we eventually got on the path of creating a web presence to coincide with the book.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634093246/ovo-3.6/000/000-01_jd2pjm.jpg"
            alt="Homepage">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Homepage
        </figcaption>
      </figure>
    </section>

    <section>
      <figure class="space">
        <div class="bleed--full secondary">
          <video
            ref="vid"
            class="radius--big elevation-00"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597340695/000/IMG_3295_p5cpee.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Roy's after effects prototype
        </figcaption>
      </figure>

      <h4 class="subtitle mb-4">Roy initially made a prototype in After Effects showing what he was thinking for the interaction. After tweaking it a little bit, I started thinking about how I’d go about building the web app.</h4>

      <p class="p">I knew I’d use Vue to build, but I also wanted to create something that would be easy to update for someone that might not be super technical. So after doing some research, I decided to go with a static site generator for Vue, called Saber.</p>
      <p class="p space">Saber was really awesome to work with, in fact I’ve used it in another project you can read about: the Supersymmetry case study. I was able to setup the logic so all Roy needed to do was create a markdown file for each entry and populate the data so that it automatically gets pulled into the index list. That creates a unique page for the entry automatically – super slick.</p>

      <figure class="space">
        <div class="bleed--full secondary">
          <video
            ref="vid"
            class="radius--big elevation-00"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597340696/000/IMG_23399_vyxfls.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Initial prototype test
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="radius--big elevation-00"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343008/000/detail-to-index-lg_iyg2ps.gif"
            alt="Detail to index prototype interaction">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Detail to index prototype interaction
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="radius--big elevation-00"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343029/000/detail-to-detail-lg_mpc6ux.gif"
            alt="Detail to detail prototype interaction">
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          Detail to detail prototype interaction
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="smaller radius--big elevation-01"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634094274/ovo-3.6/000/000-04_ppcdd9.png"
            alt="Entry item file">
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Entry item file
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <video
            ref="vid"
            class="radius--big elevation-00"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597342801/000/home_rgjbbz.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº07</span>
          Live code – 😎
        </figcaption>
      </figure>

      <h4 class="space subtitle mb-4">I fleshed out the three main page layouts: the index page, detail pages and the about page. I also to thought about how the transitions happen across the page layouts. The goal for the visual design was to create an editorial type layout / experience.</h4>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634093246/ovo-3.6/000/000-02_px3og6.png"
            alt="About view on tablet">
        </div>
        <figcaption>
          <span>Fig Nº08</span>
          About view on tablet
        </figcaption>
      </figure>

      <figure class="space">
        <div>
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634093246/ovo-3.6/000/000-03_udeqvt.jpg"
            alt="All mobile everything">
        </div>
        <figcaption>
          <span>Fig Nº09</span>
          All mobile everything
        </figcaption>
      </figure>
    </section>

    <projectFooter
      link="/projects/mailchimp-core-journey"
      name="Mailchimp Core Journey"
      excerpt="Re-architecting the highest revenue journey to help users find and reach the right audience"
      src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596477789/mc-send/01_2x_ab9xk9.jpg"
      />
  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: #302821; }
  .secondary { background: #EFE7DE; }
  img, video { margin: 0 auto; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – 000'
    }),
    scrollToTop: true,
    data: () => ({
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    // layout: 'project-page-layout',
    components: { arrow, projectFooter },
    mounted() {
      const prm = window.matchMedia('(prefers-reduced-motion: reduce)')
      const videos = document.querySelectorAll('video')
      videos.forEach((video) => {
        video.removeAttribute('autoplay')
        video.controls = true
      })
    },
  }
</script>
