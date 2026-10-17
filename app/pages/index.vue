<template>
  <section class="home">
    <div
      class="home__bg"
      aria-hidden="true"
    >
      <img
        class="home__photo"
        :src="field"
        alt=""
      />
      <div class="home__shade" />
    </div>

    <p class="home__rail home__rail--left blush">
      *ohiosveryown*ohiosveryown*ohiosveryown*
    </p>
    <p class="home__rail home__rail--right blush">
      *not a portfolio of work—rather a collection of vignettes*
    </p>

    <div class="home__panel">
      <h1 class="home__title">Matthew Pence</h1>

      <div class="roles">
        <div class="roles__line">
          <div class="roles__item">
            <span class="roles__label">Currently: Square</span>
            <span class="roles__title roles__title--square blush">Principal product designer</span>
            <span class="roles__mark">
              <img
                class="roles__icon roles__icon--square"
                :src="iconSquare"
                alt=""
                width="16"
                height="16"
              />
            </span>
          </div>
          <div class="roles__item">
            <span class="roles__label">Previously at Slack</span>
            <span class="roles__title blush">Lead product designer</span>
            <span class="roles__mark">
              <img
                class="roles__icon roles__icon--slack"
                :src="iconSlack"
                alt=""
                width="16"
                height="16"
              />
            </span>
          </div>
        </div>

        <div class="roles__line">
          <div class="roles__item">
            <span class="roles__label">Erstwhile at GitHub</span>
            <span class="roles__title blush">Staff product designer</span>
            <span class="roles__mark">
              <img
                class="roles__icon roles__icon--github-sm"
                :src="iconGithubSm"
                alt=""
                width="16"
                height="16"
              />
              <img
                class="roles__icon roles__icon--github-lg"
                :src="iconGithub"
                alt=""
                width="17"
                height="17"
              />
            </span>
          </div>
          <div class="roles__item">
            <span class="roles__label">And Mailchimp</span>
            <span class="roles__title blush">Staff product designer</span>
            <span class="roles__mark roles__mark--chimp">
              <span class="chimp chimp--sm">
                <img
                  class="chimp__body chimp__body--sm"
                  :src="iconMailchimpSm"
                  alt=""
                  width="15.1213"
                  height="16.0973"
                />
                <img
                  class="chimp__dot chimp__dot--sm"
                  :src="iconMailchimpDotSm"
                  alt=""
                  width="0.701804"
                  height="1.4009"
                />
              </span>
              <span class="chimp chimp--lg">
                <img
                  class="chimp__body chimp__body--lg"
                  :src="iconMailchimp"
                  alt=""
                  width="17"
                  height="18.0973"
                />
                <img
                  class="chimp__dot chimp__dot--lg"
                  :src="iconMailchimpDot"
                  alt=""
                  width="0.788999"
                  height="1.57495"
                />
              </span>
            </span>
          </div>
          <p class="roles__more">
            Plus a <span class="home__dotted">couple more</span>.
          </p>
        </div>
      </div>

      <div
        class="home__marks"
        aria-hidden="true"
      >
        <img
          class="home__marks-sm"
          :src="marksSm"
          alt=""
          width="39.9996"
          height="12"
        />
        <img
          class="home__marks-lg"
          :src="marksLg"
          alt=""
          width="39.3183"
          height="11.951"
        />
      </div>

      <div class="home__copy">
        <p class="home__prose home__lead">
          Matt Pence is a craft and quality-conscious software designer and
          builder based in Atlanta, GA, working across brand, product, and code.
        </p>
        <div class="home__aside">
          <p class="home__prose">
            He also runs the furniture design studio:
            <a
              class="home__dotted has-tooltip"
              href="https://proportional.design"
              target="_blank"
              rel="noopener"
              data-tooltip="Furniture I've made"
              data-tooltip-image="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1784821939/pp_uthfbh.gif"
              >proportional design</a
            >.
          </p>
          <ContactButton variant="field" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: fixed;
    inset: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 4.8rem 2.4rem calc(3.7rem + var(--safe-bottom));
    color: #d2f976;
    background: #6f8d7a;

    @include breakpoint(md) {
      align-items: center;
      padding: 6rem 1.6rem calc(3.2rem + var(--safe-bottom));
    }
  }

  .home__bg {
    position: absolute;
    z-index: 0;
    inset: 0;
  }

  .home__photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;
    object-position: center;
  }

  .home__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.3)
    );
  }

  .home__rail {
    display: none;
    position: absolute;
    z-index: 1;
    top: 50%;
    margin: 0;
    color: #d2f976;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.11;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    pointer-events: none;
    font-variation-settings:
      "wdth" 100,
      "HGHT" 100;
    transform: translateY(-50%);

    @include breakpoint(md) {
      display: block;
    }
  }

  .home__rail--left {
    left: 1.2rem;
    transform: translateY(-50%) rotate(180deg);
  }

  .home__rail--right {
    right: 1.2rem;
  }

  .home__panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    position: relative;
    z-index: 1;
    width: 100%;
    animation: home-enter 0.7s var(--ease-qubic) backwards;
  }

  .home__title {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .home__copy {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    order: 1;
    width: 100%;

    @include breakpoint(md) {
      flex-direction: row;
      align-items: flex-start;
      gap: 2.2rem;
      order: 3;
      width: auto;
    }
  }

  .home__aside {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 100%;

    @include breakpoint(md) {
      gap: 1.4rem;
      width: 27rem;
    }
  }

  .home__lead {
    @include breakpoint(md) {
      width: 27rem;
    }
  }

  .home__prose {
    font-family: var(--system-font);
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: -0.08rem;
    line-height: 1.2;
    text-align: justify;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;

    @include breakpoint(md) {
      font-size: 1.7rem;
      letter-spacing: -0.05rem;
    }
  }

  .home__dotted {
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-thickness: 6%;
    text-underline-offset: 0.18em;
  }

  a.home__dotted {
    cursor: var(--cursor);
  }

  a.home__dotted:hover {
    text-decoration-color: #fff;
  }

  .home__marks {
    order: 2;
  }

  .home__marks-sm {
    display: block;
    width: 4rem;
    height: 1.2rem;
  }

  .home__marks-lg {
    display: none;
    width: 3.93183rem;
    height: 1.1951rem;
  }

  .roles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    order: 3;
    width: 100%;
    container-type: inline-size;

    @include breakpoint(md) {
      align-items: center;
      gap: 0.9rem;
      order: 1;
      width: 100%;
      container-type: normal;
    }
  }

  .roles__line {
    display: contents;

    @include breakpoint(md) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: center;
      gap: 0.4rem 0.5rem;
      max-width: 100%;
    }
  }

  .roles__item {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .roles__label,
  .roles__more {
    font-family: var(--system-font);
    font-size: clamp(1.2rem, 3.76cqi, 1.4rem);
    font-weight: 500;
    letter-spacing: -0.056rem;
    line-height: 0.87;
    white-space: nowrap;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;

    @include breakpoint(md) {
      font-size: clamp(1.2rem, 1.25vw, 1.8rem);
      letter-spacing: -0.05rem;
    }
  }

  .roles__title {
    font-size: clamp(1.8rem, 5.9cqi, 2.2rem);
    font-weight: 400;
    letter-spacing: -0.0275rem;
    line-height: 0.8;
    text-transform: uppercase;
    white-space: nowrap;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    font-variation-settings:
      'wdth' 82,
      'HGHT' 0;

    @include breakpoint(md) {
      font-size: clamp(1.8rem, 2.64vw, 3.8rem);
      letter-spacing: -0.0475rem;
      font-variation-settings:
        'wdth' 88,
        'HGHT' 100;
    }
  }

  .roles__title--square {
    font-variation-settings:
      'wdth' 82,
      'HGHT' 0,
      'slnt' -6;

    @include breakpoint(md) {
      font-variation-settings:
        'wdth' 88,
        'HGHT' 100,
        'slnt' -6;
    }
  }

  .roles__mark {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: stretch;
    flex-shrink: 0;
    width: 2.2rem;
  }

  .roles__mark--chimp {
    width: 1.9569rem;

    @include breakpoint(md) {
      width: 2.2rem;
    }
  }

  .roles__icon--square,
  .roles__icon--slack,
  .roles__icon--github-sm {
    width: 1.6rem;
    height: 1.6rem;
  }

  .roles__icon--github-lg {
    display: none;
    width: 1.7rem;
    height: 1.7rem;
  }

  .chimp--sm {
    display: block;
    position: relative;
    width: 1.51213rem;
    height: 1.60973rem;
  }

  .chimp--lg {
    display: none;
    position: relative;
    width: 1.7rem;
    height: 1.80973rem;
  }

  .chimp__body--sm {
    width: 1.51213rem;
    height: 1.60973rem;
  }

  .chimp__body--lg {
    width: 1.7rem;
    height: 1.80973rem;
  }

  .chimp__dot--sm {
    position: absolute;
    top: 0.7rem;
    left: 0.837rem;
    width: 0.07018rem;
    height: 0.14009rem;
  }

  .chimp__dot--lg {
    position: absolute;
    top: 0.787rem;
    left: 0.941rem;
    width: 0.0789rem;
    height: 0.1575rem;
  }

  @include breakpoint(md) {
    .home__marks-sm {
      display: none;
    }

    .home__marks-lg {
      display: block;
    }

    .roles__icon--github-sm {
      display: none;
    }

    .roles__icon--github-lg {
      display: block;
    }

    .chimp--sm {
      display: none;
    }

    .chimp--lg {
      display: block;
    }
  }

  @keyframes home-enter {
    from {
      opacity: 0;
      filter: blur(1rem);
    }
  }
</style>

<script setup lang="ts">
  import field from '~/assets/index/field.jpg'
  import blushWoff2 from '~/assets/type/blush.woff2'
  import iconSquare from '~/assets/index/square.svg'
  import iconSlack from '~/assets/index/slack.svg'
  import iconGithub from '~/assets/index/github.svg'
  import iconGithubSm from '~/assets/index/github-sm.svg'
  import iconMailchimp from '~/assets/index/mailchimp.svg'
  import iconMailchimpDot from '~/assets/index/mailchimp-dot.svg'
  import iconMailchimpSm from '~/assets/index/mailchimp-sm.svg'
  import iconMailchimpDotSm from '~/assets/index/mailchimp-dot-sm.svg'
  import marksLg from '~/assets/index/marks.svg'
  import marksSm from '~/assets/index/marks-sm.svg'

  useHead({
    link: [
      {
        rel: 'preload',
        href: blushWoff2,
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    ],
  })
</script>
