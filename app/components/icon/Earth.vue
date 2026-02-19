<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  size?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
  class: '',
})

const emit = defineEmits<{
  startAnimation: []
  stopAnimation: []
}>()

const circleVariants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
}

const pathVariants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    pathOffset: 0,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
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
  stopAnimation,
})
</script>

<template>
  <div :class="['cursor-pointer select-none p-2 rounded-md flex items-center justify-center', props.class]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg 
      :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="pointer-events-none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <motion.path 
        d="M21.54 15H17a2 2 0 0 0-2 2v4.54" :variants="pathVariants" :animate="currentState"
        :transition="{ duration: 0.7, delay: 0.5, opacity: { delay: 0.5 } }" />
      <motion.path 
        d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"
        :variants="pathVariants" :animate="currentState"
        :transition="{ duration: 0.7, delay: 0.5, opacity: { delay: 0.5 } }" />
      <motion.path 
        d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" :variants="pathVariants"
        :animate="currentState" :transition="{ duration: 0.7, delay: 0.5, opacity: { delay: 0.5 } }" />
      <motion.circle 
        cx="12" cy="12" r="10" :variants="circleVariants" :animate="currentState"
        :transition="{ duration: 0.3, delay: 0.1, opacity: { delay: 0.15 } }" />
    </svg>
  </div>
</template>