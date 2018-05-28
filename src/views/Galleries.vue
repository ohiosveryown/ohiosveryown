<!-- layout -->
<template>
  <main class="mw__lg">

    <!-- card -->
    <div class="card">
      <h4 class="op-5 mb-0 f-sm uc f-basismono">You’re Currently Reading About:</h4>
      <h2 class="mb-2 f-lg uc f-mabry-med">SP Galleries</h2>
      <h4 class="op-5 mb-0 f-sm uc f-basismono">But Do You Want to Go:</h4>
      <ul class="f-md f-travels-med">
        <router-link to="/"><li class="mr-5 btn__tertiary link">Home</li></router-link>
        <a @click="scrollMeTo('hh')"><li class="mr-5 btn__tertiary link">To the Top</li></a>
        <li class="btn__tertiary link">On Vacation</li>
      </ul>
    </div>

    <!-- hero 👰🏻 -->
    <section class="hero">
      <!-- header 💆 -->
      <header ref="hh" class="hero__header uc">
        <h4 class="mb-0 f-sm f-basismono">ux</h4>
        <h1 class="mb-2 f-xl f-mabry-med">ShootProof Galleries</h1>
         <h2 class="f-lg f-travels-med">Before the digital age, managing photos was much more straight-forward. Now, things are much more complicated. At ShootProof, the goal is to take away the nuance and allow photographers to Focus on What Matters Most.</h2>
      </header>
      <!-- instructions 💬 -->
      <nav class="hero__scroll">
        <h2 class="f-md tar uc f-travels-med">Scroll Down</h2>
      </nav>
      <!-- date & stuff 📆 -->
      <aside class="hero__meta">
        <h4 class="mb-1 f-sm uc f-basismono">Timeline</h4>
        <h3 class="mb-4 f-md f-travels-med">Summer 2016 – Fall 2017</h3>
        <h4 class="mb-1 f-sm uc f-basismono">Link</h4>
        <h3 class="f-md f-travels-med">
          <a class="link btn__tertiary" href="http://shootproof.com" target="_blank">shootproof.com</a>
        </h3>
      </aside>
    </section>

    <!-- full-width image 🖼 -->
    <section class="mt-7 img__full">
      <figure>
        <img src="../assets/__galleries/img/01@2x.png" alt="ShootProof Galleries v3 and v2">
      </figure>
      <figcaption class="tar">fig. 01, fig. 02</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>The version two of ShootProof Galleries had been around for over five years and was quickly becoming outdated. Our users are becoming more adept in running businesses and they need software that is feature rich while being simple, straight-forward and modern.</p>
      <p>My biggest challenge was to create an interface and experience that allowed photographers at any level to do things as simple as replacing an image, to managing tens-of-thousands of photos across hundreds of albums.</p>
    </article>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 01:</span>
          <span>ShootProof Galleries v3</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 02:</span>
          <span>ShootProof Galleries v2</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img src="../assets/__galleries/img/02@2x.png" alt="Requirements &amp; User Stories">
      </figure>
      <figcaption class="tar">fig. 03</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>At the beginning of the redesign I was instrumental to scoping the project as well as being a product owner into what features we'd be incorporating as well.</p>
      <p>Throughout the life cycle of the project redesign, I played a large role in determining not only the visual design language, but also what features would be added and depreciated.</p>
      <p>Scoping the project was instrumental in informing my design direction and cultivating a seamless user experience.</p>
    </article>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 03:</span>
          <span>Requirements &amp; User Stories</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 04:</span>
          <span>Various UI Components</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img src="../assets/__galleries/img/03@2x.jpg" alt="Various UI Components">
      </figure>
      <figcaption class="tar">fig. 04</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>Working apart of a larger requirements and research team, I was the sole user interface designer. Given that fact, it was still extremely vital to create a homogeneous and consistent system of components.</p>
      <p>Because this is ShootProof's largest feature, I knew going forward the visual language would inform any work we did moving forward for other features.</p>
      <p>I wanted to created a design language that could be repurposed and functional throughout ShootProof's application. I specifically chose to strip away veneer and superfluous UI elements to allow the user to focus on the results they're trying to achieve, rather than the tool they're using.</p>
    </article>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure class="pt-9 pb-9" style="background-color: #dee2ff;">
        <video class="img-shadow" autoplay playsinline loop src="../assets/__galleries/mov/05.mp4"></video>
      </figure>
      <figcaption class="tar">fig. 05</figcaption>
    </section>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 05:</span>
          <span>Changing Albums</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 06:</span>
          <span>Galleries List View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 07:</span>
          <span>Albums List View</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 08:</span>
          <span>Photos List View</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img src="../assets/__galleries/img/06@2x.png" alt="Changing Galleries">
      </figure>
      <figcaption class="tar">fig. 06, fig. 07, fig. 08</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>One of the biggest improvements made for the Manage Galleries feature-set was creating a seamless experience across various devices. The v2 experience was completely fragmented and unresponsive. In our user research, we found more and more photographers are wanting to manage their galleries on the fly with their mobile devices.</p>
    </article>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img src="../assets/__galleries/img/07@2x.png" alt="Photo Detail from Actions">
      </figure>
      <figcaption class="tar">fig. 09</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>A big interaction shift from v2 to v3 was allowing a user to view all of their galleries, albums and photos all at once. Speaking with a number of photographers, I found that even after a gallery structure was setup, they'd often want to move photos to different albums, and even to different galleries.</p>
      <p>This helped drive the user interface to a three panel layout with galleries, albums and photos being sequentially in view at all times. This allowed a user to simply drag a photo or even an album to different locations. The feedback received on this new interaction was very positive.</p>
    </article>

    <!-- figure key 🔑 -->
    <section class="fig-key">
      <ul class="tac">
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 09:</span>
          <span>Photo Detail from Actions</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 10:</span>
          <span>Actions</span>
        </li>
        <li>
          <span class="fig-key__label mr-1 uc f-bold">fig 11:</span>
          <span>Launch Feedback 🎈</span>
        </li>
      </ul>
    </section>

    <!-- full-width image 🖼 -->
    <section class="img__full">
      <figure>
        <img class="img-shadow" src="../assets/__galleries/img/09@2x.jpg" alt="Actions">
      </figure>
      <figcaption class="tar">fig. 10</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <!-- <header><h4 class="mb-1 f-sm uc f-basismono">Task</h4></header> -->
      <p>A consistent interface is the easiest to use and because of that, I wanted all the sorting and tools to be located in the same general areas across galleries, albums and photos. Each tool set is located conveniently under the display titles in each panel.</p>
      <p>The single actions are also executed in the same way. Actions are found directly in the same general area as the module they're being applied to. This seems like an obvious solution, however throughout a large application, this isn't always feasible.</p>
    </article>

    <!-- image with bg 🖼 -->
    <section class="img__w-bg">
      <figure class="pt-9 pb-9" style="background-color: #f7f7f7;">
        <img src="../assets/__galleries/img/08@2x.png" alt="Launch Feedback">
      </figure>
      <figcaption class="tar">fig. 11</figcaption>
    </section>

    <!-- stand-alone article 📝 -->
    <article class="copy__full">
      <header><h4 class="mb-1 f-sm uc f-basismono">Next Steps</h4></header>
      <p>The redesign of this Galleries feature-set was a complete overhaul focusing on new functionality, interaction and visual design. It was a large effort that took a lot of teamwork and communication, especially across design and development.</p>
      <p>When the redesign was finally released, we quickly heard back from our user base. One of the best things when working at a company where people's livelihoods depend on the tools your building is that the feedback is very vocal. Of course we didn't do everything right and there are things we're building on, but the general consensus was very positive.</p>
      <p>I'll never forget the next day after the redesign started to rollout our support team forwarded an email they received. It was a user recording himself and his screen while using the interface for the first time. That type of feedback is truly invaluable and not something you often get anywhere else.</p>
    </article>

    <!-- finish line 🏁 -->
    <section class="fin tac">
      <h2 class="mb-3 f-lg uc f-travels-med">Fin</h2>
    </section>

    <hr class="mb-8 op-2">

    <!-- footer 👣 -->
    <footer class="next-case">
      <h4 class="mb-0 f-sm uc f-basismono">Next Case Study:</h4>
      <h1 style="display: inline;" class="btn__tertiary f-xl uc f-mabry-med"><router-link to="/supersymmetry">Supersymmetry</router-link></h1>
    </footer>

  </main>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';
  @import '../assets/style/btn';

  .card {
    position: fixed;
    top: 0; right: 0;
    display: flex;
    flex-direction: column;
    padding: 1.6rem 5.6rem 1.6rem 2.4rem;
    min-width: 11.2rem; min-height: 8rem;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    box-shadow: 0 8px 40px 0 rgba(0,0,0,0.2);
    background: #fff;
    opacity: 1;
    transform: translateY(-180px);
    transition: all 300ms ease;
    will-change: transform, opacity;

    @include breakpoint(md) { top: 2.4rem; right: 2.4rem; }
  }

  .show { display: flex; opacity: 1; z-index: 999; }
  .hide { opacity: 0; }
  .move { transform: translateY(0); }

  .f-xl {
    font-size: 2.4rem;
    line-height: 1.2;
    @include breakpoint(md) { font-size: 4.8rem; }
  }

  .f-lg {
    font-size: 1.5rem;
    line-height: 1.4;
    @include breakpoint(sm) { font-size: 2rem; }
  }

  .f-md {
    font-size: 1.4rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 1.6rem; }
  }

  .f-sm {
    font-size: 1.2rem;
    line-height: 1.2;
    @include breakpoint(sm) { font-size: 1.4rem; }
  }

  p {
    font-size: 1.7rem;
    line-height: 1.4;
    @include breakpoint(md) { font-size: 2.4rem; line-height: 1.44; }
  }

  p + p { margin-top: 1.6rem; text-indent: 2ch; }
  .fig-key__label, figcaption { font-size: 1.4rem; }
  .hide-sm  { display: none; @include breakpoint(mdl) { display: block; } }
  .show-mdl { display: block; @include breakpoint(mdl) { display: none; } }

  // hero section
  .hero__header {
    padding-top: 12rem;
    @include breakpoint(md)  { padding-top: 20rem; width: grid-width(10); }
    @include breakpoint(mdl) { width: grid-width(8); }
  }

  .hero__scroll {
    margin-top: 4.8rem;
    @include breakpoint(md) { margin-top: 9.6rem; }
  }

  .hero__meta { margin-top: 8.8rem; }

  // main sections
  .img__half { @include breakpoint(md ) { width: grid-width(9); } }
  .img__three-four { @include breakpoint(mdl) { width: grid-width(9); } }
  .img__one-four   { @include breakpoint(mdl) { margin-left: 6rem; width: grid-width(3); } }
  .img__full, .img__w-bg { margin-bottom: 3.2rem; }

  .img__w-bg > figure > img, .img__w-bg > figure > video {
    margin-left: grid-width(1);
    width: grid-width(10);
    @include breakpoint(mdl) {
      margin-left: grid-width(2);
      width: grid-width(8);
      transform: translateY(0.5rem);
    }
  }

  .copy__full { margin-bottom: 4rem; }
  .copy__half {
     @include breakpoint(md)  { margin-right: 1rem; width: grid-width(12); }
     @include breakpoint(mdl) { margin-right: 6rem; width: grid-width(10); }
   }

  .copy-img, .img-img {
    display: flex; flex-direction: column;
    margin-bottom: 4rem;
    @include breakpoint(md) { flex-direction: row; align-items: center; }
  }

  .img-img { align-items: flex-start; }
  .fin { margin: 6.4rem 0 8rem; @include breakpoint(md) { margin: 16rem 0 16rem; } }
  .next-case { margin-bottom: 8rem; }

  // figure keyframes
  .fig-key { margin-bottom: 4rem; }
  .fig-key > ul { display: flex; flex-direction: column; }

</style>


<!-- logic -->
<script>
  export default {
    name: 'galleries',

    methods: {
      scrollMeTo(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;

        window.scrollTo(0, top);
      }
    },

    mounted() {
      let scrollpos = window.scrollY
      let lastScrollTop = 0
      const card = document.querySelector('.card')

      let hidden = () => card.classList.add("hide").classList.remove('show')
      let show = () => card.classList.add("show").classList.remove('hide')

      window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;

         if (st > lastScrollTop){
             card.classList.remove('move')
         } else {
            card.classList.add('move')
         }
         lastScrollTop = st;

        scrollpos = window.scrollY;
        if (scrollpos <= 800) {
          card.classList.add("hide")
        }
        else {
          card.classList.remove("hide")
          card.classList.add("show")
        }
      }, false);
    }
  }
</script>
