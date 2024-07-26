<template>
  <div>
    <NuxtLayout>
      <ContentDoc>
        <template #not-found>
          <h1>
            Looks like you've lost your way. Trying heading
            <NuxtLink to="/">home.</NuxtLink>
          </h1>
        </template>
      </ContentDoc>
    </NuxtLayout>
  </div>
</template>
