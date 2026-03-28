<script setup lang="ts">
import { motion } from 'motion-v'

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

const pathVariants = {
  normal: {
    translateX: 0,
    transition: {
      stiffness: 200,
      damping: 13
    }
  },
  animate: {
    translateX: [-6, 0],
    transition: {
      delay: 0.1,
      stiffness: 200,
      damping: 13
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
  <div :class="['cursor-pointer select-none p-2rounded-md flex items-center justify-center', props.class]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      class="pointer-events-none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.path d="M22 21v-2a4 4 0 0 0-3-3.87" :variants="pathVariants" :animate="currentState" />
      <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" :variants="pathVariants" :animate="currentState" />
    </svg>
  </div>
</template>
