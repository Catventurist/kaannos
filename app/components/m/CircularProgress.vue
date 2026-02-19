<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import type { AnimationPlaybackControlsWithThen } from 'motion-v'

const props = defineProps<{
  min: number
  max: number
  interval: number
  duration: number
}>()

const RADIUS = 45
const circumference = 2 * Math.PI * RADIUS

const count = useMotionValue(props.min)
const rounded = useTransform(() => Math.round(count.get()))
const progress = ref(props.min)
const dashOffset = computed(() =>
  (progress.value / props.max) * circumference
)
const timing = computed(() =>
  props.duration * 80
)
const trackPath = computed(() => {
  const r = RADIUS
  return `
          M 50 50
          m 0 -${r}
          a ${r} ${r} 0 1 1 0 ${r * 2}
          a ${r} ${r} 0 1 1 0 -${r * 2}
          `
})

let controls: AnimationPlaybackControlsWithThen

watchEffect((cleanup) => {
  controls = animate(count, props.max, { duration: props.duration })
  cleanup(() => {
    controls?.stop()
  })
})

onMounted(() => {
  setInterval(() => {
    if (progress.value < props.max) {
      progress.value += props.interval
    // eslint-disable-next-line @stylistic/brace-style
    }
    else {
      progress.value = props.max
    }
  }, timing.value)
})
onUnmounted(() => {
  controls?.stop()
})
</script>

<template>
  <div class="relative size-40">
    <ProgressRoot
      v-model="progress"
      as-child
    >
      <svg
        class="size-full"
        viewBox="0 0 100 100"
      >
        <path
          :d="trackPath"
          class="fill-none stroke-muted stroke-[6px]"
        />
        <ProgressIndicator as-child>
          <path
            :d="trackPath"
            class="fill-none stroke-primary stroke-[6px] transition-[stroke-dasharray,opacity] data-[value='0']:opacity-0"
            :style="{
              'stroke-linecap': 'round',
              'stroke-dasharray': `${dashOffset}px, ${circumference}px`,
              'stroke-dashoffset': '0px'
            }"
          />
        </ProgressIndicator>
      </svg>
      <div class="absolute inset-0 flex text-2xl text-primary items-center justify-center">
        <RowValue :value="rounded" />
        <!--  <span class="text-lg font-bold text-foreground">
          {{ progress }}
          %
        </span>  -->
      </div>
    </ProgressRoot>
  </div>
</template>
