<template>
  <nuxt-link :to = "link">
    <footer>
      <h6 class="pt-5 tac uc fs--sm f--f">Up Next</h6>
      <section>
        <div class="content">
          <h5 class="mb-2 fs--md f--g">{{ name }}</h5>
          <h6 class="fs--sm f--f">{{ excerpt }}</h6>
        </div>
        <figure>
          <!-- <img src="../static/img/placeholder/supersymmetry.jpg" alt=""> -->
          <img :src = "img" />
        </figure>
      </section>
    </footer>
  </nuxt-link>
</template>


<style lang="scss" scoped>
  @import '../style/grid.scss';

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 11.2rem 0;
    padding: 2rem;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 4px 32px rgba(0,0,0,.08);
    cursor: pointer;
    transition: box-shadow 400ms ease;
    @include breakpoint(md) { width: grid-width(5); }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 60%;
  }

  figure {
    padding: .1rem;
    border-radius: 3px;
    width: 33%;
    overflow: hidden;
    background: #e7e7e7;
    // box-shadow: 0px 0px 20px rgba(0,0,0,.1);
  }

  img {
    filter: saturate(0);
    transition: filter 300ms ease;
   }

  @media(pointer: fine) {
    section:hover {
      box-shadow: 0 4px 64px rgba(0,0,0,.12);
      img { filter: saturate(100%); }
      // img { transform: scale(1.1); }
    }
  }

</style>


<script>
  export default {
    // props: [ 'name', 'excerpt', 'img' ]
    props: {
      name: { type: String },
      excerpt: { type: String },
      img: { type: String },
      link: { type: String }
    }
  }
</script>