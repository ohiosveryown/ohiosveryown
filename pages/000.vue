<template>
  <main class="width">
    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">000</h1>
      <div class="anim--in meta">
        <h3 class="mb-0 uc fs--sm f--f">
          <span class="pt-0 op-5">design/development</span>
          2019
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="pt-0 op-5">url</span>
          three-zeros.com
        </h3>
      </div>
    </header>

    <!-- page hero -->
    <section>
      <ul class="anim--in process mb-3 uc fs--sm f--f">
        <li>process</li>
        <span>
          <svg width="60" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.556V4.444h55.848a8.054 8.054 0 01-.702-.515C53.97 2.957 53 1.565 53 0h1.111c0 1.102.698 2.21 1.743 3.071 1.044.862 2.311 1.373 3.257 1.373v1.112c-.946 0-2.213.511-3.257 1.373-1.045.861-1.744 1.97-1.744 3.071H53c0-1.565.969-2.957 2.146-3.929.224-.184.459-.356.702-.515H0z" fill="#000"/></svg>
        </span>
        <li @click="scrollTo('planning')">planning & designing & building</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">Building the web presence for 000 – a collection of portraits by photographer Roy Handy</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597339051/000/01_sfrbbm.jpg" alt="000 Home">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            000 Home
          </span>
        </figcaption>
      </figure>
    </section>

    <section class="intro">
      <article>
        <header>
          <h4 class="mb-1 pt-4 uc fs--sm f--f">
            Introduction
          </h4>
          <h5 class="mb-4 fs--md f--g">Women are pretty amazing. 000 gives them a platform to express the cultural appreciation of owning their true self, through their hair</h5>
        </header>
        <p><a class="link" href="http://roy-handy.com" target="_blank">Roy Handy</a> is a friend and a pretty great photographer and designer. Awhile back he was sharing some of his work with me and we started kicking ideas back and forth around some simple interactions for some of the photos he had taken.</p>
        <p>He published a book of portraits of women talking about embracing their nature hair, and we eventually got on the path of creating a web presence to coincide with the book.</p>
      </article>


      <figure class="not-wide">
        <video
          style = "width: 100%;"
          autoplay="autoplay"
          playsinline=""
          loop="loop">
          <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597340695/000/IMG_3295_p5cpee.mp4"><source>
        </video>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            Roy's Initial Affter Effect Prototype
          </span>
        </figcaption>
      </figure>
    </section>

    <section class="planning mb-9">
      <article>
        <header>
          <h4
            ref="planning"
            class="mb-1 pt-4 uc fs--sm f--f">
            Planning & Designing & Building
          </h4>
          <h5 class="mb-4 fs--md f--g">From After Effects to website – Using Vue and Saber to build a static site that’s easy to maintain</h5>
        </header>
        <p>The video above is an interaction Roy made in After Effects showing what he was thinking for the interaction. After tweaking it a little bit, I started thinking about how I’d go about building the web app.</p>
        <p>I knew I’d use Vue to build, but I also wanted to create something that would easy to update for someone that might not be super technical. So, after doing some research, I decided to go with a static site generator for Vue, called <a href="https://saber.land" target="_blank" class="link">Saber</a>.</p>
      </article>

      <figure class="not-wide pb-6">
        <div style="background: var(--zero)" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597341834/000/code_jpdyoc.png" alt="Item File for Entries">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Item File for Entries
          </span>
        </figcaption>
      </figure>

      <article>
        <p>Saber was really awesome to work with, in fact I’ve used it in another project you can read about in the Supersymmetry case study. I was able to setup the logic so all Roy needed to do was create a markdown file for each entry and populate the data so that it automatically gets pulled into the index list and creates a unique page for the entry – super slick.</p>
        <p>I should also mentioned that the site is hosted on Github pages so there’s no hosting cost. All Roy had to do was purchase a domain and I set everything up.</p>
      </article>

      <figure class="not-wide mt-2 pb-9">
        <video
          autoplay="autoplay"
          playsinline=""
          loop="loop">
          <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597340696/000/IMG_23399_vyxfls.mp4"><source>
        </video>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº04</span>
            Initial JS Prototype
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pb-9">
        <div style="background: var(--zero)" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343008/000/detail-to-index-lg_iyg2ps.gif" alt="Apollo 11 Lunar Plaque">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº05</span>
            Detail to Index Principle Interaction
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pb-9">
        <div style="background: var(--zero)" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343029/000/detail-to-detail-lg_mpc6ux.gif" alt="Apollo 11 Lunar Plaque">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº06</span>
            Detail to Detail Principle Interaction
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide mt-2 pb-9">
        <video
          autoplay="autoplay"
          playsinline=""
          loop="loop">
          <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597342801/000/home_rgjbbz.mp4"><source>
        </video>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº07</span>
            Live Code
          </span>
        </figcaption>
      </figure>

      <article>
        <p>From there I went ahead and fleshed out the three main page layouts for the index page, detail pages and the about page. And also to think about how the transitions happen from unique page to unique page, and for detail to detail pages. The goal was to create a very editorial type layout / experience.</p>
      </article>

      <figure class="not-wide pb-9">
        <div style="background: var(--zero)" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343029/000/detail-to-detail-lg_mpc6ux.gif" alt="Apollo 11 Lunar Plaque">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº08</span>
            Detail to Detail Principle Interaction
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pb-6">
        <div style="background: var(--zero)" class="img--w-bg mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343774/000/md_oa1zkw.png" alt="About on Medium Screens">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº09</span>
            About on Md
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide">
        <div>
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597343684/000/sm_j5wows.jpg" alt="All Screens on Small Devices">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº10</span>
            All on Sm
          </span>
        </figcaption>
      </figure>
    </section>


    <!-- footer / next -->
    <Next
      name = '000'
      excerpt = "Building the web presence for 000 – a collection of portraits by photographer Roy Handy"
      img = 'https://res.cloudinary.com/da32ufmnf/image/upload/v1597339051/000/01_sfrbbm.jpg'
      link = '/000'
    />

  </main>
</template>


<style lang="scss" scoped>
  @import '../style/grid.scss';

  .img--hero {
    padding: 2rem 2rem 0rem;
    background: var(--zero);
    @include breakpoint(mdl) { padding: 10rem 8rem 0rem; }
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
      title: 'ovo – 000'
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