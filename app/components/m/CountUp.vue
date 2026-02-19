<script setup lang="ts">
import { animate, useMotionValue, useTransform, RowValue } from 'motion-v'
import type { AnimationPlaybackControlsWithThen } from 'motion-v'
import { onMounted, onUnmounted } from 'vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  min: number
  max: number
  class?: HTMLAttributes['class']
}>()
const count = useMotionValue(props.min)
const rounded = useTransform(() => Math.round(count.get()))

let controls: AnimationPlaybackControlsWithThen

onMounted(() => {
  controls = animate(count, props.max, { duration: 3 })
})

onUnmounted(() => {
  controls?.stop()
})
</script>

<template>
  <pre class="flex justify-center items-center text-primary" :class="props.class">
    <RowValue :value="rounded" />
  </pre>
</template>
