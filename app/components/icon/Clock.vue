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

const handTransition = {
  duration: 0.6
}

const handVariants = {
  initial: {
    rotate: 0,
    originX: '50%',
    originY: '100%'
  },
  animate: {
    rotate: 180
  }
}

const minuteHandTransition = {
  duration: 0.3
}

const minuteHandVariants = {
  initial: {
    rotate: 0,
    originX: '0%',
    originY: '50%'
  },
  animate: {
    rotate: 45
  }
}

const isControlled = ref(false)
const currentState = ref('initial')

const startAnimation = () => {
  currentState.value = 'animate'
}

const stopAnimation = () => {
  currentState.value = 'initial'
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
  <div
    :class="['cursor-pointer select-none p-2 rounded-md flex items-center justify-center',
             props.class]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="12"
        y1="12"
        x2="12"
        y2="6"
        :variants="handVariants"
        :animate="currentState"
        initial="initial"
        :transition="handTransition"
      />
      <motion.line
        x1="12"
        y1="12"
        x2="16"
        y2="12"
        :variants="minuteHandVariants"
        :animate="currentState"
        initial="initial"
        :transition="minuteHandTransition"
      />
    </svg>
  </div>
</template>
