<script setup lang="ts">
import { Motion } from 'motion-v'

interface Props {
  size?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
  class: ''
})

const emit = defineEmits<{
  startAnimation: []
  stopAnimation: []
}>()

const svgVariants = {
  normal: {
    rotate: 0,
    transition: {
      stiffness: 120,
      damping: 14,
      duration: 0.8
    }
  },
  animate: {
    rotate: [-3, -33, -25, -28],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 0.8, 1]
    }
  }
}

const isControlled = ref(false)
const currentState = ref('normal')

const startAnimation = () => {
  currentState.value = 'animate'
}

const stopAnimation = () => {
  currentState.value = 'normal'
}

const handleMouseEnter = () => {
  if (!isControlled.value) {
    startAnimation()
  } else {
    emit('startAnimation')
  }
}

const handleMouseLeave = () => {
  if (!isControlled.value) {
    stopAnimation()
  } else {
    emit('stopAnimation')
  }
}

defineExpose({
  startAnimation,
  stopAnimation
})
</script>

<template>
  <div :class="['cursor-pointer select-none p-2 rounded-md flex items-center justify-center', props.class]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <Motion
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      as="svg"
      class="pointer-events-none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :animate="currentState"
      :variants="svgVariants"
      style="transform-origin: 30% 70%"
    >
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </Motion>
  </div>
</template>
