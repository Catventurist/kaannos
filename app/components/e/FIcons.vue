<script setup lang="ts">
const icon = 'lucide:circle-check'
const sizes = ['sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="flex items-start justify-center gap-3">
    <template
      v-for="s in sizes"
      :key="s"
    >
      <MFancyIcon
        theme="modern-neue"
        :size="s"
        :icon
      />
    </template>
  </div>
</template>
