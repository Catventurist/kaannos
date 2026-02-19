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

const searchVariants = {
  normal: {
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  animate: {
    x: [0, 0, -3, 0],
    y: [0, -4, 0, 0],
    transition: {
      duration: 1,
      bounce: 0.3
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
  stopAnimation,
})
</script>

<template>
  <div 
    :class="['cursor-pointer select-none rounded-md flex items-center justify-center', props.class]"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg 
      :width="size" :height="size" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" stroke-width="2" class="pointer-events-none"
      stroke-linecap="round" stroke-linejoin="round" style="overflow: visible">
      <motion.circle cx="11" cy="11" r="8" :variants="searchVariants as any" :animate="currentState" />
      <motion.path d="m21 21-4.3-4.3" :variants="searchVariants as any" :animate="currentState" />
    </svg>
  </div>
</template>