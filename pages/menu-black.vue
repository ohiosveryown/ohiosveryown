<template>
  <main class="width">
    <!-- page header -->
    <header class="mb-9">
      <h1 class="anim--in mb-3 fs--xl f--c">menu.black</h1>
      <div class="anim--in meta">
        <h3 class="mb-1 uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">design/development</span>
          2020
        </h3>
        <h3 class="uc fs--sm f--f">
          <span class="mr-0 pt-0 op-6">url</span>
          <a href="https://menu.black" target="_blank">menu.black</a>
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
        <li @click="scrollTo('planning')">planning</li>
        <li @click="scrollTo('ideating')">ideating</li>
        <li @click="scrollTo('implementing')">implementing</li>
        <li @click="scrollTo('next')">next steps</li>
      </ul>
      <header class="case-header mb-7">
        <h2 class="anim--in mb-3 fs--md f--g">Bringing awareness, and celebrating the diversity of Atlanta, it’s food and it’s people</h2>
      </header>
      <figure>
        <div class="anim--in img--hero">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1623960677/menu/cover_g9xoj7.png" alt="homepage">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº01</span>
            Homepage
          </span>
        </figcaption>
      </figure>
    </section>


    <section class="intro">
      <article>
        <header>
          <h4 class="mb-2 pt-4 uc fs--sm f--f">
            Introduction
          </h4>
          <h5 class="mb-5 fs--md f--g">If you’re reading this in the year 2020, you’re well aware of the seriousness of covid-19. You’re also probably aware of the racial and social tension that's been brewing in America for the last 300 or so years.</h5>
        </header>
        <p>If you're reading this in the future, let me know how and when these issues are resolved. I currently live in Atlanta, Georgia and I love food. One of my favorite things to do here is explore new places to eat. Atlanta is so diverse in culture and because of that, there’s so much good food that we have available to us, and so many of these places are under the radar.</p>
        <p>But, the simple experience of going to a local restaurant and sitting down and eating are just not possible now. One of the most dramatic shifts due to covid has been how small businesses have been forced to evolve their strategic model.</p>
        <p>We’ve seen many restaurants pivot exclusively to a take-out model. Still, as a customer there’s a lot of uncertainty around, a: if a company is still open, and b: if a company that was traditionally a dine-in only experience, now offers the option for take-out.</p>
      </article>

      <figure class="not-wide">
        <div style="background: #B49BFB" class="mt-2 img--w-bg">
          <img class="shadow-01" src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597692381/menu/03_vglufi.png" alt="Codepen Prototype">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº02</span>
            To-Go Order Promo
          </span>
        </figcaption>
      </figure>
    </section>


    <section class="planning">
      <article>
        <header>
          <h4
            ref="planning"
            class="mb-2 pt-4 uc fs--sm f--f"
          >
            Planning
          </h4>
          <h5 class="mb-4 fs--md f--g">My goal for menu.black was to make something to help create awareness and celebrate the diversity of Atlanta and it’s food</h5>
        </header>
        <p>I knew I wanted to help small businesses in the restaurant industry communicate whether they’re still open, and give exposure to the ones that not everyone has heard about, but I also knew that disproportionately black businesses are underrepresented dramatically; even in a city as diverse as Atlanta. When you put two and two together, the idea of creating a collection of black-owned restaurants in the Atlanta area was the product – menu.black.</p>
        <p>I started out looking for an api or some sort of repository for black-owned businesses specifically in the food sector, but that type of information isn’t publicly available, or if it is I couldn’t find it. So after coming up empty-handed, I started to manually search for restaurants in the Atlanta area that were black-owned. I crowd source this task as well, asking friends and peers for any options that they were aware of.</p>
      </article>

      <figure class="not-wide">
        <div style="background: #B49BFB" class="mt-2 pt-4 pb-4">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597687785/menu/02_kkqbpi.jpg" alt="JSON File Image">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº03</span>
            Creating a List
          </span>
        </figcaption>
      </figure>

      <article class="pt-6">
        <p>From there I started prototyping with the code to see how the functionality of searching and filtering would work. I find myself typically starting more and more in the browser first, before visually designing anything. This helps me surface some of the constraints I might have immediately rather than later down the road – constraints can be a good thing!</p>
      </article>

      <figure class="not-wide">
        <div style="background: #B49BFB" class="mt-2 img--w-bg">
          <img class="shadow-01" src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597688612/menu/03_ucnnui.jpg" alt="Codepen Prototype">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº04</span>
            Codepen Prototype
          </span>
        </figcaption>
      </figure>
    </section>


    <section class="ideating">
      <article>
        <header>
          <h4
            ref="ideating"
            class="mb-2 pt-4 uc fs--sm f--f"
          >
            Ideating
          </h4>
          <h5 class="mb-4 fs--md f--g">Brushing off the illustration pen and finding a visual identity</h5>
        </header>
        <p>Once I had a solid understanding of how I’d build the web app, I started working on the visual feel and style. I knew right away I wanted to use a pretty stark color as the main element of the home page, and after playing around with different shades, I went with a pale green color. I chose this because I liked the metaphor of using kale as a UI element – really it makes no sense, but it felt right at the time.</p>
        <p>I also knew that I wanted to draw some type of icons or abstract elements to incorporate into the site to have a more human feel. I like drawing and illustrating, but I don’t really have much of an opportunity being a product designer. So, this was a perfect opportunity. I used the procreate app on an iPad to sketch out some abstract vegetables and shapes to incorporate in the web app.</p>
      </article>

      <figure class="not-wide">
        <div style="background: #B49BFB" class="mt-2 img--w-bg">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597692775/menu/veggies_adyxhd.png" alt="Veggies Illustration">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº05</span>
            Veggies
          </span>
        </figcaption>
      </figure>
    </section>


    <section class="implementing">
      <article>
        <header>
          <h4
            ref="implementing"
            class="mb-2 pt-4 uc fs--sm f--f"
          >
            Implementing
          </h4>
          <h5 class="mb-4 fs--md f--g">Design isn’t a straight line, or a double diamond</h5>
        </header>
        <p>Once I felt good about the design and having the concept of how I would build the web app in good standing, I opened vs code and got to work. I actually really enjoy starting an engineering project and picking the stack and setting up the project structure. I tend to spend too much time on that when it should probably be automated but nevertheless, I made progress.</p>
        <p>I started to build out the list, with basic sorting for location and food type, but then I started thinking about how to make the site feel fresh, as well as the core principle of helping give more exposure to more businesses.</p>
        <p>I started to think about the whole stories metaphor that so many application have: snapchat, IG, YouTube, etc. Instead of trying to replicate the product thinking here, I stole the layout and structure and created a “discover” feature/component that live on the right side of the homepage.</p>
      </article>

      <figure class="not-wide">
        <div style="background: #B49BFB" class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597693090/menu/stories_nlodmi.jpg" alt="Veggies Illustration">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº06</span>
            Stories
          </span>
        </figcaption>
      </figure>

      <article class="pt-9">
        <p>Say you come to menu.black and you’re looking for a specific type of food. You can easily input a search to populate the results for pizza. But what if you’re a visitor that isn’t really sure what you want, or you want to try something new. Well with discover, you can view a couple random places to eat, and just as easily cycle through more by clicking a text button.</p>
      </article>

      <figure class="not-wide pb-9">
        <div style="background: var(--menu)" class="img--w-bg mt-2">
          <video
            autoplay="autoplay"
            playsinline=""
            loop="loop">
            <source src="https://res.cloudinary.com/da32ufmnf/video/upload/v1597693634/menu/discover_bcd16z.mp4"><source>
          </video>
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº07</span>
            Discover
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide pb-6">
        <div style="background: #e6e6e6" class="mt-2">
          <img class="shadows-01 br-3" src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597942248/menu/index_vkuflg.jpg" alt="Home page">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº08</span>
            Home
          </span>
        </figcaption>
      </figure>

      <figure class="not-wide">
        <div class="mt-2">
          <img src="https://res.cloudinary.com/da32ufmnf/image/upload/v1597693968/menu/sm_ozol2h.png" alt="Mobile Views">
        </div>
        <figcaption class="pt-0 tar">
          <span class="uc fs--sm f--f">
            <span class="mr-0 pt-0 op-5">fig Nº09</span>
            Mobile Views
          </span>
        </figcaption>
      </figure>
    </section>


    <section class="next">
      <article>
        <header>
          <h4
            ref="next"
            class="mb-2 pt-4 uc fs--sm f--f"
          >
            Next Steps
          </h4>
        </header>
        <p>My goals for the future are to keep adding more businesses to the list and to develop a more robust search and filtering system. What I have now is good for a v1, but have more complexity around how a user searches and filters was some of the initial feedback I got. I’m looking forward to iterating on menu.black and helping create maybe a little more awareness around some of the best food in Atlanta.</p>
      </article>
    </section>

    <!-- footer / next -->
    <Next
      name = 'ShootProof Galleries'
      excerpt = 'Rethinking how users share, sell and organizer their photos'
      img = 'https://res.cloudinary.com/da32ufmnf/image/upload/v1596478389/sp-galleries/galleries_2x_zkgn70.jpg'
      link = '/sp-galleries'
    />
  </main>
</template>


<style lang="scss" scoped>
  .img--hero { background: var(--menu); }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – menu.black'
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
