<template>
  <nuxt/>
</template>

<script>
  // smooth scroll
  document.querySelector('body').style = 'height: 100vh;'
  if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  } else {
    const scrollbar = Scrollbar.init(document.querySelector('body'), {
      damping: 0.05,
      renderByPixels: true,
      continuousScrolling: true,
      // syncCallbacks: true,
    })
  }
</script>
