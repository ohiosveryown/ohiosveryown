<template>
  <menu>
    <header>
      <div class="header--container">
        <figure class="header--content">
          <video
            playsinline
            controls
            src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
          />
        </figure>
      </div>
    </header>

    <section>
      <div class="section--container">
        <div class="section--content">
          <p class="section--title">Your travel guide</p>
          <p class="section--description thin">
            Experience the website travel guide, brought to life in rich
            high-definition video, narrated by me: Matt.
          </p>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer--container">
        <div class="footer--content">
          <div class="footer--thumbnails">
            <img
              class="footer--thumbnail-cover"
              src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721314748/ovo-3.7/global/guide--cover_2x_cakm6t.webp"
              alt=""
            /><img
              class="footer--thumbnail-interior"
              src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721312846/ovo-3.7/global/guide--writing_2x_hu5ei6.webp"
              alt=""
            />
          </div>
          <article class="footer--article">
            <span class="footer--title">Video travel guide</span>
            <span class="thin">edition 3.7</span>
          </article>

          <figure class="footer--icon">
            <svg
              width="14"
              height="14"
              fill="none"
            >
              <path
                fill="#fff"
                fill-rule="evenodd"
                d="M10.42 1.06a6.493 6.493 0 0 1 3.406-.14.23.23 0 0 1 .174.22v10.148c0 .066-.03.128-.081.17a.22.22 0 0 1-.184.04 6.479 6.479 0 0 0-5.861 1.669.216.216 0 0 1-.239.053.216.216 0 0 1-.137-.201V3.063c0-.057.02-.113.058-.155a6.496 6.496 0 0 1 2.865-1.848ZM0 1.14A.23.23 0 0 1 .174.92a6.49 6.49 0 0 1 6.27 1.994.235.235 0 0 1 .058.155v9.956a.216.216 0 0 1-.137.201.216.216 0 0 1-.239-.052 6.476 6.476 0 0 0-5.861-1.67.22.22 0 0 1-.184-.04.218.218 0 0 1-.081-.17V1.14Z"
                clip-rule="evenodd"
              />
            </svg>
          </figure>
        </div>
      </div>
    </footer>
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  menu {
    position: fixed;
    right: 1.2rem;
    bottom: 1.2rem;
    border-radius: 19px;
    border: 0.5px solid rgba(255, 255, 255, 0.04);
    width: 38rem;
    padding: 0.8rem;
    height: auto;
    color: #fff;
    background: linear-gradient(rgba(0, 0, 0, 0.1) 10%, rgba(0, 0, 0, 0.9)) 6%,
      url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
        no-repeat center center;
    background-size: 110%;
    box-shadow: var(--shadow--md);
    transition: background-size 700ms ease;
    overflow: hidden;
  }

  video {
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: var(--shadow--lg);
    transform: translateY(4rem);
    transition: all 500ms ease 350ms;
    will-change: opacity;
    overflow: hidden;
  }

  header,
  section {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: all var(--ease--qubic);
  }

  .header--container,
  .section--container,
  .footer--container {
    min-height: 0;
  }

  // header styles
  .header--content {
    transform: translateY(4rem);
    transition: all 200ms ease 600ms;
  }

  // section styles
  section {
    text-align: center;
  }

  .section--content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 4rem 0 2rem;
  }

  .section--title {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.05;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
    // -webkit-backdrop-filter: blur(5px);
    // backdrop-filter: blur(5px);
    opacity: 0;
    transform: translateY(4rem);
    transition: all 500ms ease 350ms;
    will-change: opacity, transform;
  }

  .section--description {
    padding: 0 1.6rem;
    font-size: 2.2rem;
    line-height: 1.32;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.8);
    // -webkit-backdrop-filter: blur(5px);
    // backdrop-filter: blur(5px);
    opacity: 0;
    transform: translateY(4rem);
    transition: all 500ms ease 450ms;
    will-change: opacity, transform;
  }

  // footer styles
  .footer--content {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    padding: 1.2rem 1.2rem 1.2rem 1.8rem;
  }

  .footer--thumbnails {
    display: flex;
  }

  .footer--thumbnails img {
    border-radius: 5px;
    width: auto;
    height: 4.8rem;
    box-shadow: var(--shadow--xs);
    transform-origin: bottom;
    transition: transform 500ms ease;
  }

  .footer--thumbnail-cover {
    z-index: var(--z1);
    transform: rotate(-10deg);
  }

  .footer--thumbnail-interior {
    margin-left: -3.2rem;
    transform: rotate(10deg) translateX(-1rem) translateY(0.1rem);
  }

  .footer--title {
    font-weight: 532;
  }

  .footer--article {
    display: flex;
    flex-direction: column;
    flex: 1;
    transition: transform 400ms ease;
  }

  .footer--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    border: 0.6px solid rgba(255, 255, 255, 0.14);
    padding: 0.6rem 0.6rem 0.6rem 0.6rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow--sm);
  }

  // hover styles
  // menu:hover {
  //   background: linear-gradient(rgba(0, 0, 0, 0.1) 76%, rgba(0, 0, 0, 0.9)) 6%,
  //     url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
  //       no-repeat center center;
  //   background-size: 120%;
  // }

  menu:hover header,
  menu:hover section {
    grid-template-rows: 1fr;
  }

  menu:hover video {
    opacity: 1;
    transform: translateY(0);
    transition: transform 500ms ease 200ms, opacity 500ms ease 300ms;
  }

  menu:hover .section--title,
  menu:hover .section--description {
    opacity: 1;
    transform: translateY(0);
  }

  menu.hover .header--content {
    // transform: translateY(0);
    opacity: 1;
    transition: all 500ms ease 200ms;
  }

  menu:hover .footer--article {
    transform: translateX(0.4rem);
  }

  // menu:hover .footer--thumbnail-cover {
  //   transform: rotate(-15deg) translateX(-0.25rem);
  // }

  // menu:hover .footer--thumbnail-interior {
  //   transform: rotate(15deg) translateX(-0.5rem);
  // }
</style>

<script setup></script>
