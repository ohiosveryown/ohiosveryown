<template>
  <main class="">

    <section class="wrapper--timeline">
      <ul class="">
        <li>
          <article class="width">
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

  p { font-size: 10rem; }
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