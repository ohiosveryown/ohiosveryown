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
      <h3 class="subtitle">If you’re reading this in the year 2020, you’re well aware of the seriousness of covid-19. You’re also probably aware of the racial and social tension that's been brewing in America for the last 300 or so years. If you're reading this in the future, let me know how and when these issues are resolved. Atlanta is my current home and one of my favorite things to do here is find new places to eat. Atlanta is so diverse in its culture, there are so many under the radar spots for good food –
        <a
          class="link"
          target="_blank"
          href="https://menu.black">
          menu.black</a><arrow class="arrow"
        />
      is a catalog of those places.</h3>
    </header>

    <section>
      <figure class="space">
        <div class="hero bleed--half">
          <img
            class="elevation-01 radius--small"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1623960677/menu/cover_g9xoj7.png"
            alt="Version 2020">
        </div>
        <figcaption>
          <span>Fig Nº01</span>
          Index
        </figcaption>
      </figure>
    </section>

    <section class="works">
      <p class="p">The simple experience of going to a local restaurant and sitting down and eating are just not possible now. One of the most dramatic shifts due to covid has been how small businesses have been forced to evolve their way of serving transaction.</p>
      <p class="p space">We’ve seen many restaurants pivot exclusively to a take-out model. Still, as a customer there’s a lot of uncertainty around, a: if a company is still open, and b: if a company that was traditionally a dine-in only experience, now offers the option for take-out.</p>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="elevation-02 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634089507/ovo-3.6/menu%5Bdot%5Dblack/menu-01_rm8uwv.png"
            alt="Restaurant Take Out Only">
        </div>
        <figcaption>
          <span>Fig Nº02</span>
          Take out only model
        </figcaption>
      </figure>

      <h4 class="subtitle space">I started out looking for an api or some sort of repository for black-owned businesses specifically in the food sector, but that type of information isn’t publicly available, or if it is I couldn’t find it. So after coming up empty-handed, I started to manually search for restaurants in the Atlanta area that were black-owned. I crowd source this task as well, asking friends and peers for restaurant options.</h4>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="elevation-00 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634089507/ovo-3.6/menu%5Bdot%5Dblack/menu-02_nebjan.png"
            alt="Creating a list">
        </div>
        <figcaption>
          <span>Fig Nº03</span>
          Creating a list
        </figcaption>
      </figure>

      <p class="p space">From there I started prototyping with the code to see how the functionality of searching and filtering would work. I find myself typically starting more and more in the browser first, before visually designing anything. This helps me surface some of the constraints I might have immediately rather than later down the road – constraints can be a good thing!</p>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="elevation-00 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634089506/ovo-3.6/menu%5Bdot%5Dblack/menu-03_gokash.jpg"
            alt="Codepen prototype">
        </div>
        <figcaption>
          <span>Fig Nº04</span>
          Codepen prototype
        </figcaption>
      </figure>

      <p class="p">I started to build out the list, with basic sorting for location and food type, but then I started thinking about how to make the site feel fresh, as well as the core principle of helping give more exposure to more businesses.</p>
      <p class="p space">Then I started to think about the whole stories metaphor that so many application have: snapchat, IG, YouTube, etc. Instead of trying to replicate the product thinking here, I stole the layout and structure and created a “discover” feature/component that live on the right side of the homepage.</p>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="smaller"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634089507/ovo-3.6/menu%5Bdot%5Dblack/menu-04_h7bbzp.png"
          alt="Stories">
        </div>
        <figcaption>
          <span>Fig Nº05</span>
          Stories
        </figcaption>
      </figure>

      <h4 class="subtitle space">Say you come to menu.black and you’re looking for a specific type of food, you can easily input a search to populate the results for pizza. But, what if you’re a visitor that isn’t really sure what you want, or you want to try something new? Well with discover, you can view a couple random places to eat, and just as easily cycle through more by clicking a text button.</h4>

      <figure class="space">
        <div class="bleed--full secondary">
          <video
            ref="vid"
            class="elevation-00 radius--big"
            autoplay="autoplay"
            playsinline=""
            muted="true"
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1634090777/ovo-3.6/menu%5Bdot%5Dblack/discover_isufzt.mp4#t=0.1"><source>
          </video>
        </div>
        <figcaption>
          <span>Fig Nº06</span>
          Random discovery
        </figcaption>
      </figure>

      <figure class="space">
        <div class="bleed--full secondary">
          <img
            class="elevation-00 radius--big"
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1634089506/ovo-3.6/menu%5Bdot%5Dblack/menu-06_j5jbeg.jpg"
          alt="Search provisions">
        </div>
        <figcaption>
          <span>Fig Nº07</span>
          Search provisions
        </figcaption>
      </figure>

      <p class="p space">My goals for the future are to keep adding more businesses to the list and to develop a more robust search and filtering system. What I have now is good for a v1, but have more complexity around how a user searches and filters was some of the initial feedback I got. I’m looking forward to iterating on menu.black and helping create maybe a little more awareness around some of the best food in Atlanta.</p>
    </section>

    <projectFooter
      link="/projects/mailchimp-wink-workshop"
      name="Wink Workshop"
      excerpt="Teaching designers and engineers how to use the Mailchimp design system"
      src="https://res.cloudinary.com/da32ufmnf/image/upload/v1632496102/ovo-3.6/mailchimp-wink-workshop/wink-poster_b6gy73.png"
    />

  </main>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';
  @import '~static/style/project-page.scss';

  .hero { background: #A8A6F8; }
  .secondary { background: #F6F4EB; }
</style>


<script>
  import arrow from '~/components/arrow'
  import projectFooter from '~/components/projectFooter'
  export default {
    head: () => ({
      title: 'ohiosveryown – menu[dot]black'
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
