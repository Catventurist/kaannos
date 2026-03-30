<script setup lang="ts">
const localePath = useLocalePath()
const appConfig = useAppConfig()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <AppHeader />
    <UButton
      :icon="appConfig.ui.icons.chevronLeft"
      :to="localePath('/')"
      size="xl"
      color="neutral"
      variant="subtle"
      class="fixed left-8 top-18 rounded-full z-10"
    />
    <UPageCard
      variant="subtle"
      class="max-w-sm w-full duration-300 hover:shadow-lg hover:shadow-primary"
    >
      <slot />
    </UPageCard>
  </div>
</template>
