<template>
  <button
    @mouseenter = 'Enter()'
    @mouseleave = 'Leave()'
    class="fs--sm f--f uc"
  >
    <span>{{ label }}</span>
  </button>
</template>


<style lang='scss' scoped>
  button {
    display: inline-flex;
    margin-left: 1.6rem;
    padding: 2rem 1.4rem 1.4rem;
    border-radius: 3px;
    background: var(--gravity);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    transform: rotate(-3deg) translateY(-1.2rem);
    will-change: transform, box-shadow;

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

    methods: {
      Enter() {
        const tl = gsap.timeline()
        tl.to('button', {
          scale: 1.15,
          boxShadow: '0 4px 32px rgba(0,0,0,0.32)',
          rotate: '-6deg',
          ease: 'elastic.out(1,.3)',
          duration: 1.2,
        })
      },

      Leave() {
        const tl = gsap.timeline()
        tl.to('button', {
          scale: 1,
          rotate: '-3deg',
          ease: 'back.out(6)',
          duration: .6,
        })
      }
    }
  }
</script>