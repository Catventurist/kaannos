<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'

const ratingStyles = tv({
  slots: {
    rating: 'inline-flex items-center',
    star: '',
    value: 'w-5 text-muted'
  },
  variants: {
    size: {
      sm: { rating: 'gap-2', star: 'size-4', value: 'text-xs' },
      md: { rating: 'gap-2.5', star: 'size-5', value: 'text-sm' },
      lg: { rating: 'gap-3', star: 'size-6', value: 'text-base' }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

type RatingProps = {
  maxRating?: number
  class?: HTMLAttributes['class']
  valueClass?: HTMLAttributes['class']
  emptyIconClass?: HTMLAttributes['class']
  filledIconClass?: HTMLAttributes['class']
  size?: VariantProps<typeof ratingStyles>['size']
  showValue?: boolean
  editable?: boolean
  onRatingChange?: (rating: number) => void
  icon?: string
}

const props = withDefaults(defineProps<RatingProps>(), {
  maxRating: 5,
  size: 'md',
  showValue: false,
  editable: true,
  icon: 'lucide-star',
  class: '',
  valueClass: '',
  emptyIconClass: '',
  filledIconClass: ''
})

const modelValue = defineModel<number>({ default: 0 })

if (modelValue.value < 0 || modelValue.value > props.maxRating) {
  console.warn(`Rating value ${modelValue.value} is out of bounds (0 - ${props.maxRating})`)
}
if (!props.icon) {
  console.warn(`No icon provided for Rating component, defaulting to 'lucide:star'`)
}

const emit = defineEmits<{
  ratingChange: [payload: number]
  starHover: [payload: number | null]
}>()

const hoveredRating = ref<number | null>(null)
const displayRating = computed(() =>
  props.editable && hoveredRating.value !== null ? hoveredRating.value : modelValue.value
)

const ratingClasses = computed(() =>
  ratingStyles().rating({ class: props.class, size: props.size })
)
const emptyStarClasses = computed(() =>
  ratingStyles().star({
    class: ['text-muted/30', props.emptyIconClass],
    size: props.size
  })
)
const filledStarClasses = computed(() =>
  ratingStyles().star({
    class: ['fill-yellow-400 text-yellow-400', props.filledIconClass],
    size: props.size
  })
)
const valueClasses = computed(() =>
  ratingStyles().value({ class: props.valueClass, size: props.size })
)

const starWidths = computed(() => {
  const rating = displayRating.value
  return Array.from({ length: props.maxRating }, (_, i) => {
    const star = i + 1
    if (rating >= star) return '100%'
    if (rating > star - 1 && rating < star) return `${(rating - (star - 1)) * 100}%`
    return '0%'
  })
})

const handleStarClick = (starRating: number) => {
  if (props.editable) {
    props.onRatingChange?.(starRating)
    emit('ratingChange', starRating)
    modelValue.value = starRating
  }
}

const handleStarMouseEnter = (starRating: number) => {
  if (props.editable) {
    hoveredRating.value = starRating
    emit('starHover', starRating)
  }
}

const handleStarMouseLeave = () => {
  if (props.editable) {
    hoveredRating.value = null
    emit('starHover', null)
  }
}

defineExpose({ displayRating, starWidths, modelValue })
</script>

<template>
  <div :class="ratingClasses">
    <div class="flex items-center">
      <div
        v-for="(star, index) in props.maxRating"
        :key="star"
        :class="['relative', props.editable ? 'cursor-pointer' : '']"
        @click="handleStarClick(star)"
        @mouseenter="handleStarMouseEnter(star)"
        @mouseleave="handleStarMouseLeave"
      >
        <Icon
          v-if="props.icon"
          :name="props.icon"
          :class="emptyStarClasses"
        />
        <div class="absolute inset-0 overflow-hidden" :style="{ width: starWidths[index] }">
          <Icon
            v-if="props.icon"
            :name="props.icon"
            :class="filledStarClasses"
          />
        </div>
      </div>
    </div>
    <template v-if="showValue">
      <span :class="valueClasses">
        {{ displayRating?.toFixed(1) }}
      </span>
    </template>
  </div>
</template>
