<template>
  <main class="">
    <header class="title width">
      <h1>This is the case title</h1>
      <h3 class="button--next">Go to Three</h3>
    </header>
    <section class="wrapper--timeline">
      <ul class="">
        <li>
          <article class="width">
            <img src="~/static/img/mc-send/01@2x.jpg" alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam pariatur minima obcaecati? Voluptatum deleniti ea vero tempore totam repellat ducimus tenetur, suscipit dicta quaerat qui doloribus perferendis, nulla maiores optio.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam pariatur minima obcaecati? Voluptatum deleniti ea vero tempore totam repellat ducimus tenetur, suscipit dicta quaerat qui doloribus perferendis, nulla maiores optio.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam pariatur minima obcaecati? Voluptatum deleniti ea vero tempore totam repellat ducimus tenetur, suscipit dicta quaerat qui doloribus perferendis, nulla maiores optio.</p>
          </article>
        </li>
        <li>
          <article class="width">
            <p>Two</p>
          </article>
        </li>
        <li>
          <article class="width">
            <p>Three</p>
          </article>
        </li>
      </ul>
    </section>

  </main>
</template>


<style lang="scss" scoped>
  .hero { background: var(--mailchimp); }

  .title {
    position: fixed;
    z-index: var(--z2);
    top: 8rem; left: 0; right: 0;
    margin: auto;
  }

  p { font-size: 8vw; }
</style>


<script>
  import Next from '../components/Next'
  export default {
    components: { Next },
    layout: 'work',

    head: () => ({
      title: 'ovo – mc send'
    }),
  }
</script>