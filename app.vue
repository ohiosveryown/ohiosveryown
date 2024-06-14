<template>
  <CmdMenu />
  <Navigation />
  <NuxtPage />
</template>

<style>
  /* Enter and leave-active classes */
  .pagee-enter-active,
  .pagee-leave-active {
    transition: opacity 1.75s, filter 1.75s;
  }

  /* Enter-from and leave-to classes */
  .pagee-enter-from,
  .pagee-leave-to {
    opacity: 0;
    filter: blur(2px);
  }

  /* Enter-to and leave-from classes (optional if you need specific styles) */
  .pagee-enter-to,
  .pagee-leave-from {
    opacity: 1;
    filter: blur(0);
  }
</style>
