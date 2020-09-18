<template>
  <main class="width">

    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">ShootProof Galleries</h1>
      <div class="anim--in meta">
        <h3 class="mb-1 uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">user experience design</span>
          2018
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">url</span>
          shootproof.com
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
        <li @click="scrollTo('discover')">discover</li>
        <li @click="scrollTo('define')">define</li>
        <li>develop</li>
        <li>deliver</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">Rethinking how users share, sell and organizer their albums and photos</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478389/sp-galleries/galleries_2x_zkgn70.jpg" alt="mailchimp email reveiw">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            ShootProof Galleries
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
            Discover / Research
          </h4>
          <h5 class="mb-4 fs--md f--g">Good user research is key to designing a great user experience and a great product</h5>
        </header>
        <p>As we started the redesign, I helped scope the project as well as be a product owner to help define what all we'd be incorporating.</p>
        <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
        <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
      </article>
      <figure class="img--not-wide pb-9">
        <div class="img--shadow mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596426547/mc-send/research_erwd6u.png" alt="">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            Research 01
          </span>
        </figcaption>
      </figure>
      <figure class="img--not-wide">
        <div class="img--shadow mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596426547/mc-send/research_erwd6u.png" alt="">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Research 02
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-9">
      <article class="pb-9">
        <header>
          <h4
            ref="define"
            class="mb-2 pt-4 uc fs--sm f--f">
            Define
          </h4>
          <h5 class="mb-4 fs--md f--g">Good user research is key to designing a great user experience and a great product</h5>
        </header>
        <p>As we started the redesign, I helped scope the project as well as be a product owner to help define what all we'd be incorporating.</p>
        <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
        <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
      </article>
    </section>

    <!-- footer / next -->
    <Next
      name = 'supersymmetry'
      excerpt = "A project showcasing architecture & structural engineering"
      img = 'https://res.cloudinary.com/da32ufmnf/image/upload/v1596478423/supersymmetry/supersymmetry_2x_w1ol91.jpg'
      link = '/supersymmetry'
    />
  </main>
</template>


<style lang="scss" scoped>
  .img--hero { background: var(--shootproof); }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – sp galleries'
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
