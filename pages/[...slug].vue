<template>
  <div>
    <NuxtLayout>
      <ContentDoc>
        <template #not-found>
          <h2 class="tac">
            Looks like you've lost your way. <br />Trying heading back
            <NuxtLink
              class="underline"
              to="/"
              >home</NuxtLink
            >.
          </h2>
        </template>
      </ContentDoc>
    </NuxtLayout>
  </div>
</template>
