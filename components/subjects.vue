<template>
  <figure
    class="link"
    @mouseenter = 'hover = true'
    @mouseleave = 'hover = false'>
    <figcaption>{{ subject.label }}.</figcaption>
    <img
      :class = "{ active : hover }"
      :src = "subject.img"
      :alt="subject.label">
  </figure>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  .link { position: relative; }

  figure { display: inline-block; }

  img {
    --width: 18vw;
    position: absolute;
    top: 6.4rem; left: 50%;
    transform: translate(-50%,-2.4rem);
    margin: auto;
    min-width: var(--width);
    width: var(--width); height: auto;
    object-fit: cover;
    transition: transform 200ms ease, opacity 100ms ease;
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .active {
    transform: translate(-50%,0);
    transition: transform 200ms ease, opacity 320ms ease;
    opacity: 1;
  }

  @media (pointer: coarse) {
    img { display: none; }
    .link { border-bottom: none; opacity: 1; }
  }
</style>


<script>
  export default {
    data: () => ({
      hover: false,
      subjects: [
        {
          label: "machine learning",
          img: "https://miro.medium.com/max/1000/1*x7P7gqjo8k2_bj2rTQWAfg.jpeg",
        },
        {
          label: "design systems",
          img: "https://miro.medium.com/max/1838/1*vI3VLuqj0NPUjI6MX25RuQ.jpeg",
        },
        {
          label: "Vue 3",
          img: "https://www.dotcom-monitor.com/blog/wp-content/uploads/sites/3/2020/05/Vue-logo-1.png",
        },
      ],
      subject: ''
    }),
    methods: {
      randomSubject : function() {
        this.subject = this.subjects[~~(Math.random() * this.subjects.length)]
      }
    },
    created() {
      this.randomSubject()
    }
  }
</script>
