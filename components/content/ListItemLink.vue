<template>
  <li>
    <span class="kicker thin">{{ kicker }}</span>
    <NuxtLink :to="{ linz }">
      <header class="name sans">
        {{ name }}
        <svg width="12" height="32" fill="none">
          <g clip-path="url(#a)" opacity=".56">
            <path
              fill="#000"
              fill-rule="evenodd"
              d="M1.02 24.999 0 23.979l7.208-7.21c-.37.078-.744.135-1.118.171-1.975.19-4.143-.2-5.58-1.637l1.02-1.02c1.012 1.012 2.671 1.388 4.422 1.22 1.75-.167 3.385-.862 4.253-1.73l1.02 1.02c-.868.868-1.562 2.503-1.73 4.253-.168 1.751.209 3.41 1.22 4.422l-1.02 1.02c-1.437-1.436-1.826-3.604-1.637-5.579.036-.374.093-.748.17-1.118L1.02 24.999Z"
              clip-rule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h11.225v32H0z" />
            </clipPath>
          </defs>
        </svg>
      </header>
      <p class="caption sans">{{ caption }}</p>
    </NuxtLink>
  </li>
</template>

<style lang="scss" scoped>
  @import "/assets/style/list.scss";
</style>

<script setup>
  defineProps({
    linz: String,
    kicker: String,
    name: String,
    caption: String,
  })
</script>
