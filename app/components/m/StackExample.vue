<script setup lang="ts">
const images = [
  { id: 1, img: '/hero/random-1.avif' },
  { id: 2, img: '/hero/random-2.avif' },
  { id: 3, img: '/hero/random-3.avif' },
  { id: 4, img: '/hero/random-4.avif' }
]
</script>

<template>
  <MStack
    :random-rotation="true"
    :sensitivity="180"
    :send-to-back-on-click="false"
    :card-dimensions="{ width: 200, height: 200 }"
    :cards-data="images"
  />
</template>
