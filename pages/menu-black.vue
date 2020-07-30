<template>
  <main class="width">

    <header class="anim--in title tac">
      <div class="meta">
        <h1 class="uc mb-2 fs--lg f--c">menu.black</h1>
        <h2 class="mb-3 fs--md f--g">Bringing awareness and celebrating the diversity of Atlanta and it's food</h2>

        <h4 class="mb-0 uc fs--sm f--f">
          <span class="pt-0 op-5">design/development</span>
          2020
        </h4>

        <h4 class="uc fs--sm f--f">
          <span class="pt-0 op-5">url</span>
          menu.black
        </h4>
      </div>

      <figure>
        <div class="anim--in hero">
          <img src="~/static/img/placeholder/menu.jpg" alt="mailchimp homepage">
        </div>
        <figcaption class="mt-2 tar uc fs--sm f--f"><span class="mr-0 pt-0 op-5">Fig</span>Nº01</figcaption>
      </figure>
    </header>

    <!-- section -->
    <section>
      <header>
        <h3 class="mb-4 fs--md f--g">Introduction</h3>
      </header>
      <article>
        <p>As we started the redesign, I helped scope the project as well as be a product owner to help define what all we'd be incorporating.</p>
        <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
        <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
      </article>
    </section>

    <!-- caption -->
    <section class="caption tac">
      <h4 class="mb-0 uc fs--sm f--f">
        <span class="pt-0 op-5">Fig</span>
        Nº01 ShootProof Galleries v3
      </h4>

      <h4 class="uc fs--sm f--f">
        <span class="pt-0 op-5">Fig</span>
        Nº02 ShootProof Galleries v2
      </h4>
    </section>

    <figure class="figure">
      <img src="~/static/img/mc-send/02@2x.jpg" alt="mailchimp checklist">
      <figcaption class="mt-2 tar uc fs--sm f--f"><span class="mr-0 pt-0 op-5">Fig</span>Nº02</figcaption>
    </figure>

    <!-- section -->
    <section>
      <header>
        <h3 class="mb-4 fs--md f--g">Conclusion / Next Steps</h3>
      </header>
      <article>
        <p>As we started the redesign, I helped scope the project as well as be a product owner to help define what all we'd be incorporating.</p>
        <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
        <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
        <p>As we started the redesign, I helped scope the project as well as be a product owner to help define what all we'd be incorporating.</p>
        <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
        <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
      </article>
    </section>

    <!-- footer / next -->
    <Next
      name = 'ShootProof Galleries'
      excerpt = 'Rethinking how users share, sell and organizer their photos'
      img = '../img/placeholder/galleries.jpg'
      link = '/'
    />

  </main>
</template>


<style lang="scss" scoped>
  .hero { background: var(--menu); }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – menu.black'
    }),
  }
</script>