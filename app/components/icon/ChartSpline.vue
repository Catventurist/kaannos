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

const variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15,
      duration: 0.3,
      opacity: { delay: 0.1 },
    },
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
  <div :class="[ 'cursor-pointer select-none p-2 rounded-md flex items-center justify-center', props.class ]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg 
      :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="pointer-events-none"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" :variants="variants" :animate="currentState" />
    </svg>
  </div>
</template>