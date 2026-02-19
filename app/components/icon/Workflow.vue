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
  animate: (custom: unknown) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      opacity: { delay: 0.15 },
      delay: Number(custom) * 0.1,
    },
  }),
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
      :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="pointer-events-none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <motion.rect width="8" height="8" x="3" y="3" rx="2" :variants="variants" :animate="currentState" :custom="0" />
      <motion.path d="M7 11v4a2 2 0 0 0 2 2h4" :variants="variants" :animate="currentState" :custom="3" />
      <motion.rect width="8" height="8" x="13" y="13" rx="2" :variants="variants" :animate="currentState" :custom="0" />
    </svg>
  </div>
</template>