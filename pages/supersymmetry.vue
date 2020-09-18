<template>
  <main class="width">

    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">Supersymmetry</h1>
      <div class="anim--in meta">
        <h3 class="mb-1 uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">Design/Development</span>
          2019
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">url</span>
          <a href="https://supersymmetry.design" target="_blank">supersymmetry</a>
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
        <li @click="scrollTo('discover')">planning</li>
        <li @click="scrollTo('storyboarding')">storyboarding</li>
        <li @click="scrollTo('implementation')">implementation</li>
        <li @click="scrollTo('interating')">iterating</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">A self-initiated project showcasing architecture & structural engineering</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478423/supersymmetry/supersymmetry_2x_w1ol91.jpg" alt="supersymmetry website">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            Home
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-4">
      <article class="pb-9">
        <header>
          <h4
            ref="discover"
            class="mb-2 pt-4 uc fs--sm f--f">
            Planning / Discovery
          </h4>
          <h5 class="mb-4 fs--md f--g">Supersymmetry is a photo blog built on Vue and Saber showcasing architecture, interior design and structural engineering – basically spaces</h5>
        </header>
        <p>The majority of the time when I begin a side project, I start by defining requirements & scope. Here, the first couple of things I outlined were purpose & style.</p>
        <p>The style outlines creative & developmental scaffolding. The creative principles focus on things like type, color & copyediting style, while development focuses on accessibility, optimization & code writing style.</p>
      </article>
      <figure class="img--not-wide pb-9">
        <div class="img--shadow mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596518763/supersymmetry/02_2x_ndqjlx.jpg" alt="">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            Various Designs
          </span>
        </figcaption>
      </figure>

      <figure class="img--not-wide">
        <video
          ref = 'storyboarding'
          class = "img--shadow"
          autoplay = "autoplay"
          playsinline = ""
          loop = "loop"
          poster = "https://res.cloudinary.com/da32ufmnf/image/upload/v1596520300/supersymmetry/03_2x_dzp5kw.jpg"
        >
          <source
            src = "https://res.cloudinary.com/da32ufmnf/video/upload/v1596519645/supersymmetry/02_uxvcj5.mp4"
          >
          <source >
        </video>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Motion / Interaction Storyboard
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-9">
      <article class="pb-9">
        <header>
          <h4
            ref="implementation"
            class="mb-2 pt-4 uc fs--sm f--f">
            Implementation
          </h4>
          <h5 class="mb-4 fs--md f--g">When is design finished?</h5>
        </header>
        <p>A big challenge for me when it comes to visual design is iteration. I tend to over-iterate and try to design for perfect. Of course designing for perfect is impossible, but that doesn't stop me from trying.</p>
        <p>One piece I'm really proud of was the design & functionality of the Colophon "page." The concept was to create a component that gets triggered by a link on the list page & have motion communicate the transition from the list page to the colophon page.</p>
      </article>
      <figure class="img--not-wide">
        <div class="img--shadow mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596520427/supersymmetry/04_2x_yvg6hf.jpg" alt="">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº04</span>
            Colophon Page
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-9">
      <article class="pb-9">
        <header>
          <h4
            ref="interating"
            class="mb-3 pt-4 uc fs--sm f--f">
            Interating
          </h4>
        </header>
        <p>I can say I'm quite confident where I ended up all the while on the other end of the spectrum I'm quite embarrassed with where I started. But that's iteration in a nutshell: progressing intermittently to push the boundaries of complacency.</p>
        <p>The goal for the visual design in this project was to create an intuitive interface while being somewhat opinionated in the aesthetics. Opinionated meaning taking some liberties when it comes to practical design standards.</p>
        <p>As I continue to update the entries throughout the year, I'm still developing the next steps for Supersymmetry. My initial thought was to update the layout annually and perhaps expand the scope as my familiarity with Vue grows. That may still be in play as I really enjoyed working on both the subject matter & the design for this project.</p>
      </article>
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
  .img--hero { background: maroon; }
  .img--shadow { padding: 0; }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – supersymmetry'
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
