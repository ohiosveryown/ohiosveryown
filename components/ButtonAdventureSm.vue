<template>
  <div class="adventure">
    <!-- <nuxt-link to = '/test'> -->
    <nuxt-link :to=" '/' + selectedRoute">
      <button class="fs--sm f--f uc">
        <span>{{ label }}</span>
      </button>
    </nuxt-link>
  </div>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .adventure {
    display: inline-flex;
    position: relative;
    width: 100%;
    @include breakpoint(md) { display: none; }
  }

  a { width: 100%; }

  // don't display on non-touch devices
  // @media (pointer: fine) { .adventure { display: none; }}


  button {
    display: flex;
    justify-content: center;
    position: relative;
    margin: 0 auto 1.2rem;
    padding: 2rem 1.4rem 1.4rem;
    border-radius: 3px;
    width: 100%;
    background: var(--gravity);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);

    span {
      line-height: 1.3;
      background: linear-gradient(90deg, #FF3EF2 0%, #00C6FF 50%, #00FF14 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>


<script>
  export default {
    props: [ 'label' ],

    data() {
      return {
        routes: [
          'one',
          'two'
        ],
        selectedRoute: ''
      }
    },

    created() {
      const route = Math.floor(Math.random() * this.routes.length)
      this.selectedRoute = this.routes[route]
    },
  }
</script>