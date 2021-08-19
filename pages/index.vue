<template>
  <main class="width">
    <h1 class="mb-1 title">Mailchimp Experience Vision</h1>
    <h2 class="mb-6 brow">Email is dead; long live email</h2>
    <h3 class="mb-9 subtitle">Mailchimp helps users send over a million emails a day, but as our users become more sophisticated marketers, we want to empower them to be able to reach a larger audience through channels and platforms they may be intimidated by. Collaborating and getting everyone onboard and on the same page.</h3>

    <p class="mb-3 p">While this is just an abridged showcase of the crazy amount of work that went into this project, I’d be happy to extrapolate and share more if you’re curious. In the old, previous experience, getting started and sending a campaign was entirely isolated and a disjointed experience. More importantly:</p>

    <h4 class="mb-9 pb-9 subtitle">“...researched show 5 out of 7 people failed to send a campaign. With the redesigned effort, customers now have a 85% on average success rate for sending a campaign.”</h4>

    <ul class="pt-9">
      <li class="mb-7" v-for="work in works" :key="work.id">
        <h5 class="caption--sm">{{ work.contribution }}</h5>
        <h4 class="p">{{ work.name }}</h4>
        <p class="caption">{{ work.excerpt }}</p>
      </li>
    </ul>
  </main>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  li:nth-child(-n+2) { display: none; }

  h1 {
    margin-top: 11.2rem;
    color: red;
    @include breakpoint(md) { color: var(--gravity); }
  }
</style>


<script>
  import { works } from '~/static/works'
  export default {
    head: () => ({
      title: 'ohiosveryown'
    }),
    data: () => ({
      works
    }),
  }
</script>
