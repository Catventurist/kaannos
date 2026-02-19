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
  normal: { d: 'M6 9h6V5l7 7-7 7v-4H6V9z', translateX: 0 },
  animate: {
    d: 'M6 9h6V5l7 7-7 7v-4H6V9z',
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4
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
  <div
    class="cursor-pointer select-none rounded-md flex items-center justify-center"
    :class="props.class"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      class="pointer-events-none"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <motion.path
        d="M6 9h6V5l7 7-7 7v-4H6V9z"
        :variants="pathVariants"
        :animate="currentState"
      />
    </svg>
  </div>
</template>
