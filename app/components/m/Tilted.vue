<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { Motion } from 'motion-v'

interface TiltedCardProps {
  imageSrc?: string
  altText?: string
  captionText?: string
  containerHeight?: string
  containerWidth?: string
  imageHeight?: string
  imageWidth?: string
  scaleOnHover?: number
  rotateAmplitude?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  overlayContent?: boolean
  displayOverlayContent?: boolean
}

const props = withDefaults(defineProps<TiltedCardProps>(), {
  altText: 'Tilt',
  captionText: '',
  containerHeight: '300px',
  containerWidth: '100%',
  imageHeight: '300px',
  imageWidth: '300px',
  scaleOnHover: 1.1,
  rotateAmplitude: 14,
  showMobileWarning: true,
  showTooltip: true,
  overlayContent: false,
  displayOverlayContent: false,
  imageSrc: '/catbirchdark.webp'
})

const cardRef = useTemplateRef<HTMLElement>('cardRef')
const xValue = ref(0)
const yValue = ref(0)
const rotateXValue = ref(0)
const rotateYValue = ref(0)
const scaleValue = ref(1)
const opacityValue = ref(0)
const rotateFigcaptionValue = ref(0)
const lastY = ref(0)

const springTransition = computed(() => ({
  type: 'spring' as const,
  damping: 30,
  stiffness: 100,
  mass: 2
}))

const tooltipTransition = computed(() => ({
  type: 'spring' as const,
  damping: 30,
  stiffness: 350,
  mass: 1
}))

function handleMouse(e: MouseEvent) {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left - rect.width / 2
  const offsetY = e.clientY - rect.top - rect.height / 2

  const rotationX = (offsetY / (rect.height / 2)) * -props.rotateAmplitude
  const rotationY = (offsetX / (rect.width / 2)) * props.rotateAmplitude

  rotateXValue.value = rotationX
  rotateYValue.value = rotationY

  xValue.value = e.clientX - rect.left
  yValue.value = e.clientY - rect.top

  const velocityY = offsetY - lastY.value
  rotateFigcaptionValue.value = -velocityY * 0.6
  lastY.value = offsetY
}

function handleMouseEnter() {
  scaleValue.value = props.scaleOnHover
  opacityValue.value = 1
}

function handleMouseLeave() {
  opacityValue.value = 0
  scaleValue.value = 1
  rotateXValue.value = 0
  rotateYValue.value = 0
  rotateFigcaptionValue.value = 0
}
</script>

<template>
  <figure
    ref="cardRef"
    class="relative size-full perspective-midrange flex flex-col items-center justify-center"
    :style="{ height: containerHeight, width: containerWidth }"
    @mousemove="handleMouse"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="showMobileWarning" class="absolute top-4 text-center text-sm block sm:hidden">
      This effect is not optimized for mobile. Check on desktop.
    </div>
    <Motion
      as="div"
      class="relative transform-3d"
      :style="{ width: imageWidth, height: imageHeight }"
      :animate="{ rotateX: rotateXValue, rotateY: rotateYValue, scale: scaleValue }"
      :transition="springTransition"
    >
      <NuxtImg
        :src="imageSrc"
        :alt="altText"
        :style="{ width: imageWidth, height: imageHeight }"
        class="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform transform-[translateZ(0)]"
      />
      <Motion
        v-if="displayOverlayContent && overlayContent"
        as="div"
        class="absolute top-0 left-0 z-2will-change-transform transform-[translateZ(30px)]"
      >
        <slot name="overlay" />
      </Motion>
    </Motion>
    <Motion
      v-if="showTooltip && captionText"
      as="figcaption"
      class="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-muted/80 px-[10px] py-[4px] text-xl text-default opacity-0 z-3 hidden sm:block"
      :animate="{ x: xValue, y: yValue, opacity: opacityValue, rotate: rotateFigcaptionValue }"
      :transition="tooltipTransition"
    >
      {{ captionText }}
    </Motion>
  </figure>
</template>
