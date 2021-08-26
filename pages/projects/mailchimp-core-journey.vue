<template>
  <main class="width">
    <header class="space">
      <h1 class="mb-1 title">Mailchimp Core Journey</h1>
      <h2 class="brow">Email is dead; long live email</h2>
      <ul class="caption--sm">
        <li class="mb-0">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Design, Front-end Development</span>
        </li>
        <li>
          <span class="op-6 mr-0">Duration:</span>
          <span>2019–2020</span>
        </li>
      </ul>
      <h3 class="subtitle">
        <a
          class="link"
          target="_blank"
          href="https://mailchimp.com">
          Mailchimp</a><arrow class="arrow"/> helps users send over a million emails per day, but as they become more sophisticated marketers, they need support to reach larger audiences via channels and platforms that they may be intimidated by. How might we create a connective, intuitive experience to support these needs for Mailchimp's most profitable product?</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 border--half"
          src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629946707/ovo-3.6/mailchimp-core-journey/hero_u8dmae.jpg"
          alt="Campaign Review">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Campaign Review
        </figcaption>
      </figure>
    </section>

    <section class="works">
      <figure class="space">
        <div class="bleed--full mailchimp-02">
          <img
            class="elevation-00 border--full smaller"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629946961/ovo-3.6/mailchimp-core-journey/challenges_ugzsoc.png"
            alt="Campaign Review">
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          My first tasks were working with research and product to define user and business challenges. I then facilitated a design studio with cross-functional peers to create alignment and generate ideas; inclusivity 🤲
        </figcaption>
      </figure>

      <figure class="space size--half">
        <div>
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629956049/ovo-3.6/mailchimp-core-journey/studio-01_t5l4st.jpg"
            alt="Campaign Review">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Coordinating a design studio with stakeholders from design, product, marketing, research, support, and engineering – a whole lot of folks
        </figcaption>
      </figure>

      <figure class="space size--half">
        <div>
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629956049/ovo-3.6/mailchimp-core-journey/studio-02_qklqzi.jpg"
            alt="Campaign Review">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Obligatory dot voting
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--half mailchimp-02">
          <video
            class="elevation-00 smaller border--half"
            autoplay="autoplay"
            playsinline=""
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1630012387/ovo-3.6/mailchimp-core-journey/paper_mfltkg.mp4"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          User Scenarios, stories, etc.
        </figcaption>
      </figure>

    </section>

  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: var(--mailchimp); }
</style>


<script>
  import arrow from '~/components/arrow'
  export default {
    head: () => ({
      title: 'ohiosveryown – mailchimp core journey'
    }),
    layout: 'project-page-layout',
    components: { arrow },
  }
</script>
