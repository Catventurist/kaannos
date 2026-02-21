<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const props = withDefaults(defineProps<{
  text: string
  revealDelayMs?: number
  charset?: string
  flipDelayMs?: number
  class?: string
  encryptedClass?: string
  revealedClass?: string
}>(), {
  revealDelayMs: 50,
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?',
  flipDelayMs: 50
})

const containerRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(containerRef)
const hasStarted = ref(false)

const revealCount = ref(0)
const scrambleChars = ref<string[]>([])
let animationFrameId: number | null = null

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length)
  return charset.charAt(index)
}

function generateGibberish(original: string, charset: string): string[] {
  return original.split('').map(char =>
    char === ' ' ? ' ' : generateRandomCharacter(charset)
  )
}

const startAnimation = () => {
  revealCount.value = 0
  scrambleChars.value = generateGibberish(props.text, props.charset)

  const startTime = performance.now()
  let lastFlipTime = startTime

  const update = (now: number) => {
    const elapsed = now - startTime
    const totalLength = props.text.length
    const currentReveal = Math.floor(elapsed / Math.max(1, props.revealDelayMs))
    revealCount.value = Math.min(totalLength, currentReveal)
    if (revealCount.value >= totalLength) {
      return
    }
    if (now - lastFlipTime >= props.flipDelayMs) {
      scrambleChars.value = scrambleChars.value.map((char, index) => {
        if (index < revealCount.value) return props.text[index]
        if (props.text[index] === ' ') return ' '
        return generateRandomCharacter(props.charset)
      }) as string[]
      lastFlipTime = now
    }

    animationFrameId = requestAnimationFrame(update)
  }

  animationFrameId = requestAnimationFrame(update)
}

watch(isVisible, (visible) => {
  if (visible && !hasStarted.value) {
    hasStarted.value = true
    startAnimation()
  }
})

onUnmounted(() => {
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
})

const characters = computed(() => {
  return props.text.split('').map((char, index) => {
    const isRevealed = index < revealCount.value
    return {
      char: isRevealed ? char : (scrambleChars.value[index] || char),
      isRevealed
    }
  })
})
</script>

<template>
  <span
    ref="containerRef"
    class="inline-block whitespace-pre-wrap"
    :class="props.class"
    :aria-label="text"
    role="text"
  >
    <span
      v-for="(item, index) in characters"
      :key="index"
      :class="item.isRevealed ? revealedClass : encryptedClass"
    >{{ item.char }}
    </span>
  </span>
</template>
