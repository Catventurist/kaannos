<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="size-full flex flex-col justify-center text-center bg-radial from-muted/80 p-8">
    <div class="relative">
      <h1 class="text-8xl mb-4 text-default">
        {{ title }}
      </h1>
      <p class="text-5xl text-muted leading-tight">
        {{ description }}
      </p>
    </div>
  </div>
</template>
