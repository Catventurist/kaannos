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

const variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -10, 10, -10, 0] }
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
      <circle cx="12" cy="12" r="10" />
      <motion.g :variants="variants" :animate="currentState" :transition="{ duration: 0.5, ease: 'easeInOut' }">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </motion.g>
    </svg>
  </div>
</template>
