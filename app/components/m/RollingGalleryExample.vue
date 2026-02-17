<script setup lang="ts">
const customImages = [
  '/hero/random-1.avif',
  '/hero/random-2.avif',
  '/hero/random-3.avif',
  '/hero/random-4.avif',
  '/hero/random-5.avif',
  '/hero/random-6.avif',
  '/hero/random-7.avif'
]
</script>

<template>
  <MRollingGallery
    :autoplay="true"
    :pause-on-hover="true"
    :images="customImages"
  />
</template>
