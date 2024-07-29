<template>
  <header class="container">
    <h1>Welcome traveler.</h1>
    <h2>
      I'm
      <Tooltip
        trigger="Matt"
        img="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722282626/ovo-3.7/global/me_3x_flmgnn.webp"
        alt="Illustration of me"
        tooltipLabel="Hey there 👋"
      />, a staff designer at
      <Tooltip
        trigger="Github"
        img="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722282621/ovo-3.7/global/gh_3x_uswjpl.webp"
        alt="GitHub illustration"
        tooltipLabel="Copilot"
      />
      🐙,
      <br />
      living in always peachy,
      <Tooltip
        trigger="Atlanta, Ga"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp"
        alt="Atlanta illustration"
        tooltipLabel="The city in a forest"
      />
      🍑.
    </h2>
  </header>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .box {
    width: 50px;
    height: 50px;
    background: red;
  }

  .container {
    @include breakpoint(lg) {
      margin-bottom: 4rem;
    }
  }

  h1 {
    margin-bottom: 1.6rem;
    @include breakpoint(md) {
      margin-bottom: 2rem;
    }
  }

  br {
    display: none;
    @include breakpoint(md) {
      display: initial;
    }
  }
</style>
