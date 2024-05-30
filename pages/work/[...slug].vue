<script setup lang="ts">
import { NuxtLayout } from '#build/components';
</script>

<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <header>
        <h1>{{ doc.name }}</h1>
        <h2>{{ doc.caption }}</h2>
      </header>

      <ul class="meta">
        <li class="sans">
          <span class="op-6">Contributions:</span>
          {{ doc.kicker }}
        </li>
        <li class="sans">
          <span class="op-6">Timeline:</span>
          {{ doc.date }}
        </li>
      </ul>

      <ContentRenderer :value="doc" />
    </ContentDoc>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "/assets/style/grid.scss";
</style>
