<template>
  <div>
    <span class="trigger">{{ trigger }}</span>
    <img :src="img" />
    <span class="label">{{ label }}</span>
  </div>
</template>

<style scoped>
  div {
    position: relative;
    margin: 0 4px;
  }

  .trigger {
    opacity: 0.56;
    text-decoration: underline;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    padding: 4px 8px;
    width: max-content;
    border-radius: 100px;
    color: #fff;
    font-size: 12px;
    background: #354138;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.32);
    opacity: 0;
  }

  img {
    --unit: 92px;
    position: absolute;
    z-index: -999;
    top: calc(var(--unit) * -1);
    left: 50%;
    margin: 0 auto;
    max-width: var(--unit);
    height: auto;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
  }

  .show {
    opacity: 1;
  }
</style>

<script setup>
  const props = defineProps({
    trigger: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  })
  const { review, img, label } = props

  onMounted(() => {
    const trigger = document.querySelector(".trigger")
    const img = document.querySelector("img")
    const ball = document.querySelector(".label")

    let mouseX = 0,
      mouseY = 0,
      ballX = 0,
      ballY = 0,
      speed = 0.1

    let track = () => {
      ball.style.transform = `translate(calc(${ballX}px + 0px), calc(${ballY}px + 8px))`

      let distX = mouseX - ballX
      let distY = mouseY - ballY

      ballX = ballX + distX * speed
      ballY = ballY + distY * speed

      requestAnimationFrame(track)
    }

    track()

    trigger.addEventListener("mousemove", (e) => {
      let rect = trigger.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      ball.style.opacity = "1"
      ball.style.transition = "opacity 400ms ease"
    })

    let notTracking = (e) => {
      ball.style.opacity = 0
    }

    trigger.addEventListener("mouseleave", notTracking, false)

    trigger.addEventListener("mouseenter", () => {
      img.classList.add("show")
    })

    trigger.addEventListener("mouseleave", () => {
      img.classList.remove("show")
    })
  })
</script>
