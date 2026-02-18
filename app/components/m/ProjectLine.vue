<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items: TimelineItem[] = [
  {
    date: '1.1.2026',
    title: $t('steps.start.title'),
    description: $t('steps.start.description'),
    icon: 'i-lucide-rocket',
    value: 'kickoff'
  },
  {
    date: '1.2.2026',
    title: $t('steps.design.title'),
    description: $t('steps.design.description'),
    icon: 'i-lucide-palette',
    value: 'design'
  },
  {
    date: '1.3.2026',
    title: $t('steps.dev.title'),
    description: $t('steps.dev.description'),
    icon: 'i-lucide-code',
    value: 'development'
  },
  {
    date: '1.6.2026',
    title: $t('steps.dep.title'),
    description: $t('steps.dep.description'),
    icon: 'i-lucide-check-circle',
    value: 'deployment'
  }
]
</script>

<template>
  <UTimeline
    :items="items"
    :default-value="0"
    :ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-end' }"
    class="translate-x-[calc(50%-1rem)]"
  />
</template>
