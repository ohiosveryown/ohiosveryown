<template>
  <main class="width">
    <header class="space">
      <h1 class="mb-1 title">Mailchimp Motion & Interaction</h1>
      <h2 class="brow">Let's create (a) movement</h2>
      <ul class="caption--sm">
        <li class="mb-1">
          <span class="op-6 mr-0">Contributions:</span>
          <span>Design, Front-end Development</span>
        </li>
        <li>
          <span class="op-6 mr-0 mb-00">Duration:</span>
          <span>2020–Present</span>
        </li>
        <!-- <li>
          <span class="op-6 mr-0">As a forewarning, this page has muted video autoplaying</span>
        </li> -->
      </ul>
      <h3 class="subtitle">As a self-initiated project, I began thinking about how interaction and motion work in the Mailchimp product. Working from our internal design themes of "combined tasks", "helpful & educational", and "personalization", it become obvious that we needed interaction guidance for fostering and guiding a user along a virtuous marketing cycle, while doing so consistently across design and engineering.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
          src="https://res.cloudinary.com/da32ufmnf/image/upload/v1630705997/ovo-3.6/mailchimp-motion-interaction/motion-poster_ujbl4a.jpg"
          alt="Interaction & Motion Guidelines">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Interaction & Motion Guidelines
        </figcaption>
      </figure>
    </section>

    <section class="works">
      <p class="p">Before I started exploring a framework, there was nothing to help guide designers, engineers and content strategists in relation to interaction and motion. To begin, I met with design directors and our VP of design to make a case for the importance of a system: why it would help both our designers and customers who use the Mailchimp web app.</p>
      <p class="p space">Along with tying our interaction rules to our design principles, I made the case that interaction and animation in our product should be unobtrusive, helpful and accessible.</p>

      <figure class="space">
        <div class="bleed--full peach">
          <video
            ref="vid"
            class="radius--big"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1632337458/ovo-3.6/mailchimp-motion-interaction/ixd-presentation2_hhamy6.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Prototype from my initial presentation with design leadership showing how we might leverage interaction and design in the Mailchimp app. I wanted to illustrate the different areas in the app using unique interaction characteristics, but showing how they still could feel homogeneous
        </figcaption>
      </figure>

      <p class="p">In a conversation with one of our design directors, I remember him saying how we could leverage cinematic metaphors for how we use the interaction system in our product. This made a lot of sense to me. These metaphors were ubiquitous, standardized and they help leverage patterns and verbiage that had been established through the history of film. I began to map cinematic themes with our how customers in the app might experience forms of interaction: i.e. opening a scene to a page or component entering.</p>
      <p class="p space">Once I got buy-in from leadership, I began refining the various elements of the interaction system: starting with primitives such as easing and duration.</p>

      <figure class="space">
        <div class="peach">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1632334584/ovo-3.6/mailchimp-motion-interaction/primitives_gfxl0q.png"
            alt="Easing values">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Easing and timing values are akin to font-family and font-size. I find this level of abstraction is always a good place to start for any type of design system.
        </figcaption>
      </figure>

      <figure class="space">
        <div class="peach bleed--full">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1632334951/ovo-3.6/mailchimp-motion-interaction/card_wcru6s.png"
            alt="Individual motion elements">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Distinguishing the individual elements and piecing them together; part of the education from the guidelines
        </figcaption>
      </figure>

      <figure class="space">
        <div class="peach bleed--full">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1632411156/ovo-3.6/mailchimp-motion-interaction/cards_lptbkl.png"
            alt="Cinematic metaphors and customer experiences mapped to UI">
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          Cinematic metaphors and customer experiences mapped to UI
        </figcaption>
      </figure>

      <p class="p">After defining the interaction values and components, I turned to our internal engineering prototyping tool, and opened up my code editor. Because interaction, animation and transition is dynamic, I felt it was import to highlight how the experience felt, and this just isn't something you can do with a static comp or mockup.</p>
      <p class="p space">Finally, I built a place for our interaction framework to live and talk to our greater design system. I wanted to validate the interplay of both systems and create a documented source for designers and engineers to reference.</p>

      <figure class="space">
        <div class="bleed--full peach">
          <video
            ref="vid"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1632338087/ovo-3.6/mailchimp-motion-interaction/bench_yizrns.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Motion & Interaction guidelines on the web
        </figcaption>
      </figure>

      <p class="subtitle space">While the guidelines live on the web where they can be experienced, interpreted, and evolved, I also wanted to make them easily accessible for everyone, not just designers and engineers. I built a little Slack integration to quickly find values and timings that might be required just by typing "[slash] motion". Up next is the Figma plug-in 🎨.</p>

      <figure class="space">
        <div class="peach bleed--full">
          <img
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1632335610/ovo-3.6/mailchimp-motion-interaction/slack_hdk2x7.png"
            alt="Slack integration ">
        </div>
        <figcaption>
          <span>Fig Nº07</span>
          Slack integration
        </figcaption>
      </figure>

      <p class="p space">I should also mention accessibility was top of mind when working through the animation and transition values. Just like this site, if a user has a preference for reduced-motion, the amount of non-essential motion is either reduced significantly or removed all together.</p>

      <projectFooter
        link="/"
        name="ShootProof"
        excerpt="Rethinking how photographers organize, share, and sell their photos – 'Focus On What Matters Most'"
        src="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478389/sp-galleries/galleries_2x_zkgn70.jpg"
      />

    </section>
  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: #C14953; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – mailchimp motion & interaction'
    }),
    data: () => ({
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    layout: 'project-page-layout',
    components: { arrow, projectFooter },
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
