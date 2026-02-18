<script setup lang="ts">
import { motion, type PanInfo } from 'motion-v'

interface DraggableAvatarProps {
  image?: string
  borderColor?: string
  range?: number
  size?: number
}

const props = withDefaults(defineProps<DraggableAvatarProps>(), {
  image: '/cat.png',
  borderColor: '#60A5FA',
  range: 300,
  size: 100
})

const isHolding = ref(false)
const constraints = ref({
  left: -props.range,
  right: props.range,
  top: -props.range,
  bottom: props.range
})
const containerRef = ref<HTMLDivElement | null>(null)
const motionRef = ref<HTMLDivElement | null>(null)
const lineLength = 45
const lineLengthHolding = 30
const markerSize = 12

watchEffect(() => {
  const updateConstraints = () => {
    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect()
      const maxX = Math.min(props.range, window.innerWidth - rect.left - props.size)
      const maxY = Math.min(
        props.range,
        window.innerHeight - rect.top - props.size - lineLength - markerSize
      )
      const minX = Math.max(-props.range, -rect.left)
      const minY = Math.max(-props.range, -rect.top)

      constraints.value = ({
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY
      })
    }
  }

  updateConstraints()
  window.addEventListener('resize', updateConstraints)
  return () => window.removeEventListener('resize', updateConstraints)
})

const handleDragEnd = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => {
  isHolding.value = (false)
  const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2)

  if (distance > props.range && motionRef.value) {
    const angle = Math.atan2(info.offset.y, info.offset.x)
    const newX = Math.cos(angle) * props.range
    const newY = Math.sin(angle) * props.range

    motionRef.value.style.transform = `translate(${newX}px, ${newY}px)`
  }
}

const currentLineLength = isHolding.value ? lineLengthHolding : lineLength
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <motion.div
      ref="motionRef"
      drag
      :drag-elastic="0"
      :drag-momentum="false"
      :drag-constraints="constraints"
      :on-pointer-down="() => isHolding = (true)"
      :on-pointer-up="() => isHolding = (false)"
      :on-drag-end="handleDragEnd"
      :transition="{ type: 'spring', stiffness: 400, damping: 35 }"
      class="cursor-grab active:cursor-grabbing relative"
      :style="{ width: size, height: size }"
      :while-tap="{ scale: 1.05 }"
    >
      <motion.div
        class="relative size-full rounded-full overflow-hidden"
        :style="{ border: `3px solid ${borderColor}` }"
        :animate="{ boxShadow: isHolding ? '0 20px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15)' : '0 8px 30px rgba(0,0,0,0.12)' }"
        :transition="{ duration: 0.2 }"
      >
        <NuxtImg
          :src="image"
          alt="Avatar"
          class="size-full object-cover"
          :draggable="false"
        />
      </motion.div>
      <motion.span
        class="absolute left-1/2"
        :style="{ bottom: `-${currentLineLength + markerSize + 4}px`, transform: 'translateX(-50%)' }"
        :animate="{ bottom: `-${currentLineLength + markerSize + 4}px` }"
        :transition="{ duration: 0.2 }"
      >
        <motion.span
          class="block"
          :style="{ width: '2px', backgroundColor: borderColor, marginLeft: `${(markerSize - 2) / 2}px` }"
          :animate="{ height: `${currentLineLength}px` }"
          :transition="{ duration: 0.2 }"
        />
        <span
          class="block rounded-full"
          :style="{ width: `${markerSize}px`, height: `${markerSize}px`, backgroundColor: borderColor }"
        />
      </motion.span>
    </motion.div>
  </div>
</template>
