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

const pathVariants = {
  normal: { x: 0, translateX: 0 },
  animate: {
    x: -2,
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4,
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
  <div 
    class="cursor-pointer select-none p-2 rounded-md flex items-center justify-center" :class="props.class"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg 
      :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="pointer-events-none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <motion.polyline points="12 17 7 12 12 7" :variants="pathVariants" :animate="currentState" />
      <motion.line x1="9" x2="17" y1="12" y2="12" :variants="pathVariants" :animate="currentState" />
    </svg>
  </div>
</template>
