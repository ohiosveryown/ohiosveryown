<template>
  <div>
    <div
      class="area"
      :class = "{ active : easter }"
      @click = 'easter = true'
      @mouseleave = 'easter = false'
    />

    <aside class="rainbow">
      <div class="r"/>
      <div class="o"/>
      <div class="y"/>
      <div class="g"/>
    </aside>
  </div>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .active { cursor: url('../static/img/rainbow.svg'), auto; }

  .rainbow {
    position: fixed;
    z-index: var(--zmin);
    top: 0; right: 0; bottom: 0;
    width: 100vw; height: 100vh;
    filter: blur(80px) saturate(1.5);
    @include breakpoint(mdl) { width: 46vw; height: 100vh; }
  }

  .area {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 46vw; height: 100vh;
  }

  .rainbow > div {
    position: absolute;
    border-radius: 50%;
  }

  .r {
    left: 2%;
    width: 80%; height: 75%;
    background: #f8e1df;
  }

  .o {
    top: 8%; right: 0%;
    width: 60%; height: 60%;
    background: #ffbbfa;
  }

  .y {
    top: 2%; right: -12%;
    width: 60%; height: 60%;
    background: #ffbbfa;
  }

  .g {
    top: 60%; right: 0%;
    width: 60%; height: 30%;
    background: #dfedf1;
  }
</style>


<script>
  export default {
    data() {
      return {
        easter: false
      }
    },

    methods: {
      Entrance() {
        gsap.from('.rainbow', {
          opacity: 0,
          y: 200,
          skewY: 10,
          stagger: .075,
          duration: 1,
          ease: Power2.easeInOut
        })
      },

      EntranceFF() {
        gsap.from('.rainbow', {
          opacity: 0,
          duration: 1,
          ease: Power2.easeInOut
        })
      }
    },

    mounted() {
      const mq = matchMedia( '(min-width: 700px)' )
      // entrance
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        // this.EntranceFF()
      } else if (mq.matches) {
        this.Entrance()
      } else {

      }

      // for > md
      if (mq.matches) {
        const tl = gsap.timeline()
        tl.set('.r', {
          x: 'random(0, 400vw)',
          y: 'random(-400vh,400vh)',
        })

        tl.set('.o', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })

        tl.set('.y', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })

        tl.set('.g', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })
      } else {
        // for < md
        const tl = gsap.timeline()
        tl.set('.r', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })

        tl.set('.o', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })

        tl.set('.y', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })

        tl.set('.g', {
          x: 'random(0, 300vw)',
          y: 'random(-300vh,300vh)',
        })
      }
    }
  }
</script>