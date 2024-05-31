<template>
  <div
    ref="container"
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
            stroke="#000"
            rx="6.5"
          />
          <path
            fill="#000"
            d="M7.75 4.85c-.38 0-.67-.28-.67-.67s.29-.67.67-.67c.38 0 .67.28.67.67s-.29.67-.67.67Zm-1.57 5.64c-.34 0-.6-.18-.6-.59 0-.19.05-.43.17-.7L6.8 6.75c.12-.29.08-.43-.08-.43-.19 0-.4.23-.71.79l-.32-.1c.37-.81.83-1.47 1.47-1.47.35 0 .6.18.6.59 0 .19-.05.42-.17.7L6.54 9.28c-.12.29-.07.43.08.43.19 0 .4-.23.72-.79l.32.1c-.38.81-.84 1.47-1.48 1.47Z"
          />
        </g>
      </svg>
    </button>

    <img
      ref="img"
      class="tooltip--thumbnail"
      :class="{ tooltipShowImg: showing }"
      :src="skill.bg"
      :alt="skill.label"
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
    letter-spacing: 0.25px;
    line-height: 1;
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

  .dot {
    margin-right: 0.2rem;
    border-radius: 100px;
    width: 8px;
    height: 8px;
    background: #4ed70e;
    filter: drop-shadow(0 3px 4px rgba(29, 167, 34, 0.3));
    /* animation: pulse 2s ease alternate infinite; */
  }
</style>

<script setup>
  defineProps({
    buttonLabel: String,
  })

  const showing = ref(false)
  const skills = [
    {
      bg: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/shade.webp",
      tooltipLabel: "GLSL",
    },
    {
      bg: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/design-systems.webp",
      tooltipLabel: "Design systems",
    },
    {
      bg: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/machine-learning.webp",
      tooltipLabel: "Machine learning",
    },
    {
      bg: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/chairmaking.webp",
      tooltipLabel: "Chairmaking",
    },
    {
      bg: "https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/vue.webp",
      tooltipLabel: "Vue 3",
    },
  ]

  const container = ref("")
  const skill = ref("")
  const label = ref("")
  const tracking = ref(false)

  const randomSkill = () => {
    skill.value = skills[~~(Math.random() * skills.length)]
  }

  const moveLabel = (e) => {
    if (tracking.value) {
      const rect = container.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      label.value.style.transform = `translate(${x + 18}px, ${y + 10}px)`
    }
  }

  onMounted(() => {
    randomSkill()
    container.value.addEventListener("pointermove", moveLabel)
    container.value.addEventListener("pointerenter", () => {
      tracking.value = true
    })
    container.value.addEventListener("pointerleave", () => {
      tracking.value = false
    })
  })

  onUnmounted(() => {
    document.removeEventListener("pointermove", moveLabel)
  })
</script>
