<template>
  <div
    ref="containerBtnSecondary"
    class="container"
  >
    <button
      class="sans"
      role="button"
      @click="randomSkill()"
      @mouseenter="showing = true"
      @mouseleave="showing = false"
    >
      <span class="dot" />
      {{ buttonLabel }}
      <svg
        width="14"
        height="14"
        fill="none"
      >
        <g>
          <rect
            width="13"
            height="13"
            x=".5"
            y=".5"
            stroke="var(--color--secondary)"
            rx="6.5"
          />
          <path
            fill="var(--color--secondary)"
            d="M7.75 4.85c-.38 0-.67-.28-.67-.67s.29-.67.67-.67c.38 0 .67.28.67.67s-.29.67-.67.67Zm-1.57 5.64c-.34 0-.6-.18-.6-.59 0-.19.05-.43.17-.7L6.8 6.75c.12-.29.08-.43-.08-.43-.19 0-.4.23-.71.79l-.32-.1c.37-.81.83-1.47 1.47-1.47.35 0 .6.18.6.59 0 .19-.05.42-.17.7L6.54 9.28c-.12.29-.07.43.08.43.19 0 .4-.23.72-.79l.32.1c-.38.81-.84 1.47-1.48 1.47Z"
          />
        </g>
      </svg>
    </button>

    <img
      class="tooltip--thumbnail"
      :class="{ tooltipShowImg: showing }"
      :src="skill.bg"
      :alt="skill.tooltipLabel"
    />

    <small
      ref="label"
      :class="{ tooltipShowLabel: showing }"
      class="label tooltip--label"
    >
      {{ skill.tooltipLabel }}
    </small>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    position: relative;
  }

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    border-radius: var(--border-radius--full);
    padding: 1.2rem 1.6rem;
    font-size: 1.45rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.25px;
    color: var(--color--primay);
    cursor: inherit;
    overflow: hidden;
    transition: background 200ms ease;
  }

  button:hover {
    background: var(--color--tertiary);
  }

  button:active {
    transform: scale(0.96);
  }

  img {
    object-fit: cover;
  }

  .dot {
    margin-right: 0.2rem;
    border-radius: 100px;
    width: 8px;
    height: 8px;
    background: #4ed70e;
    filter: drop-shadow(0 3px 4px rgba(29, 167, 34, 0.5));
  }

  svg {
    margin-top: -0.1rem;
  }
</style>

<script setup>
  defineProps({
    buttonLabel: String,
  })

  const showing = ref(false)
  const skills = [
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286749/ovo-3.7/skills/shade_pl6hcw.webp",
      tooltipLabel: "GLSL",
    },
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286740/ovo-3.7/skills/design-systems_wlwn7l.webp",
      tooltipLabel: "Design systems",
    },
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286746/ovo-3.7/skills/machine-learning_xtcsod.webp",
      tooltipLabel: "Machine learning",
    },
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286736/ovo-3.7/skills/chairmaking_qlkr2n.webp",
      tooltipLabel: "Chairmaking",
    },
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286752/ovo-3.7/skills/vue_xchvhk.webp",
      tooltipLabel: "Vue 3",
    },
    {
      bg: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722286743/ovo-3.7/skills/kobe_ae3dkp.webp",
      tooltipLabel: "3 level scoring",
    },
  ]

  const containerBtnSecondary = ref("")
  const skill = ref("")
  const label = ref("")
  const tracking = ref(false)

  const randomSkill = () => {
    skill.value = skills[~~(Math.random() * skills.length)]
  }

  const moveLabel = (e) => {
    if (tracking.value) {
      const rect = containerBtnSecondary.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      label.value.style.transform = `translate(${x + 18}px, ${y + 10}px)`
    }
  }

  onMounted(() => {
    randomSkill()
    containerBtnSecondary.value.addEventListener("pointermove", moveLabel)
    containerBtnSecondary.value.addEventListener("pointerenter", () => {
      tracking.value = true
    })
    containerBtnSecondary.value.addEventListener("pointerleave", () => {
      tracking.value = false
    })
  })

  onUnmounted(() => {
    document.removeEventListener("pointermove", moveLabel)
  })
</script>
