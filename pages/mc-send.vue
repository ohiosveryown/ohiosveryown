<template>
  <main class="width">
    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">Mailchimp First–time&nbsp;Send</h1>
      <div class="anim--in meta">
        <h3 class="mb-1 uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">user experience design</span>
          2020–2021
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">url</span>
          mailchimp.com
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
        <li @click="scrollTo('planning')">planning</li>
        <li @click="scrollTo('define')">define</li>
        <li>develop</li>
        <li>deliver</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">Rearchitecting Mailchimp’s highest revenue journey to help users find the right audience at the right moment</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596477789/mc-send/01_2x_ab9xk9.jpg" alt="mailchimp email review">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            Mailchimp Templates
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-4">
      <article>
        <header>
          <h4
            class="mb-1 pt-4 uc fs--sm f--f">
            Introduction
          </h4>
          <h5 class="mb-4 fs--md f--g">Email is dead; long live email</h5>
        </header>
        <p>Mailchimp helps users send over a million emails a day, but as our users become more sophisticated marketers, we want to empower them to be able to reach a larger audience through channels and platforms they may be intimidated by.</p>
      </article>
      <figure class="img--not-wide pt-4 pb-0">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1602557098/mc-send/3k6Ejdql_gcdqcu.png" alt="Matt running a workshop">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            Me, running a cross-department design studio
          </span>
        </figcaption>
      </figure>
    </section>

    <!-- section -->
    <section class="mb-9">
      <article class="pb-9">
        <header>
          <h4
            ref="planning"
            class="mb-1 pt-4 uc fs--sm f--f">
            Planning
          </h4>
          <h5 class="mb-4 fs--md f--g">Collaborating and getting everyone onboard and on the same page</h5>
        </header>
        <p>One of the first things I did was partner with content strategy to map out the current customer journey – from making an account, creating your first template in the editor, to adding a list and testing / sending your first campaign. Mapping out the current experience was important to understand where we might be failing our customers, or where there might be opportunities for improvement.</p>
        <p>I also partnered with our research department to help coordinate interviews with both current and prospective users. Again, I wanted to establish a baseline of the current experience (and current industry standards) to not only help shape the new journey, but to also put together tangible artifacts to bubble up to leadership to help create alignment of goals and expectations.</p>
      </article>
      <figure class="img--not-wide pt-0 pb-9">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1602648888/mc-send/outline_qzdyll.png" alt="Studio outline document">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Part of the studio outline doc
          </span>
        </figcaption>
      </figure>
      <article class="pt-4 pb-9">
        <p>Once I had a solid understanding of where we currently were at, I coordinated a design studio with stakeholders from product design, product management, product marketing, research, support, engineering and brand design – a whole lot of folks with a whole lot of good opinions.</p>
        <p>Because this would be an extremely expensive meeting, it was important to pre-plan extensively and make that the meeting would be ran as efficiently as possible.</p>
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
  .img--hero { background: var(--mailchimp); }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – mc send'
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
