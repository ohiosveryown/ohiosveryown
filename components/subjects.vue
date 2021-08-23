<template>
  <figure
    class="link"
    @mouseenter = 'hover = true'
    @mouseleave = 'hover = false'>
    <figcaption>{{ subject.label }}.</figcaption>
    <img
      :class = "{ hoverClass : hover }"
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

  .hoverClass {
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
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727400/ovo-3.6/subjects/machine-learning_q26myx.png",
        },
        {
          label: "design systems",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727398/ovo-3.6/subjects/design-systems_hunt47.png",
        },
        {
          label: "Vue 3",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727540/ovo-3.6/subjects/vue_qdcweu.png",
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
