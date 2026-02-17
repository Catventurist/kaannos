<script setup lang="ts">
import type { AboutEnCollectionItem, AboutFiCollectionItem } from '@nuxt/content'

defineProps<{
  page: AboutEnCollectionItem | AboutFiCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: 'text-start text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-start mt-3 text-sm sm:text-md lg:text-sm text-muted'
    }"
  />
</template>
