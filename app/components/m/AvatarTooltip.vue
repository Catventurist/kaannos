<script setup lang="ts">
import { Motion } from 'motion-v'

interface Item {
  id?: string
  title: string
  description?: string
  image: string
  to: string
}

const props = defineProps<{
  items: Item[]
}>()

const constructedItems = props.items.map(item => ({
  ...item,
  id: item.id || useId()
}))

const hoveredIndex = ref<string | null>(null)
const mouseX = ref<number>(0)

const rotation = computed<number>(() => {
  const x = mouseX.value
  return (x / 100) * 50
})

const translation = computed<number>(() => {
  const x = mouseX.value
  return (x / 100) * 50
})

function handleMouseEnter(event: MouseEvent, itemId: string) {
  hoveredIndex.value = itemId
  const rect = (event.target as HTMLElement)?.getBoundingClientRect()
  const halfWidth = rect.width / 2
  mouseX.value = event.clientX - rect.left - halfWidth
}

function handleMouseMove(event: MouseEvent) {
  const rect = (event.target as HTMLElement)?.getBoundingClientRect()
  const halfWidth = rect.width / 2
  mouseX.value = event.clientX - rect.left - halfWidth
}
</script>

<template>
  <Motion
    v-for="item in constructedItems"
    :key="item.id"
    data-slot="animated-tooltip"
    class="group relative -mr-4"
    as="div"
    :transition="{
      type: 'spring',
      stiffness: 260,
      damping: 10,
      duration: 0.6
    }"
    :initial="{ opacity: 0, scale: 0.8 }"
    :in-view="{ opacity: 1, scale: 1 }"
    @mouseenter="(e) => handleMouseEnter(e, item.id)"
    @mouseleave="hoveredIndex = null"
    @mousemove="handleMouseMove"
  >
    <Motion
      v-if="hoveredIndex === item.id"
      :initial="{
        opacity: 0,
        y: 20,
        scale: 0.6
      }"
      :animate="{
        opacity: 1,
        y: 0,
        scale: 1
      }"
      :transition="{
        type: 'spring',
        stiffness: 260,
        damping: 10
      }"
      :exit="{
        opacity: 0,
        y: 20,
        scale: 0.6
      }"
      :style="{
        translateX: `${translation}px`,
        rotate: `${rotation}deg`
      }"
      class="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-xl bg-muted/80 px-4 py-2 text-xs whitespace-nowrap shadow-lg shadow-primary"
    >
      <div class="absolute right-1/2 -bottom-px z-30 me-1 h-px w-2/5 translate-x-1/2 bg-linear-to-r from-transparent via-success to-transparent" />
      <div class="absolute -bottom-px left-1/2 z-30 ms-1 h-px w-2/5 -translate-x-1/2 bg-linear-to-r from-transparent via-info to-transparent" />
      <div class="relative z-30 text-base font-bold">
        {{ item.title }}
      </div>
      <div
        v-if="item.description"
        class="text-xs"
      >
        {{ item.description }}
      </div>
    </Motion>
    <NuxtLink
      as-child
      :to="item.to"
    >
      <UAvatar
        data-slot="avatar"
        :src="item.image"
        :alt="item.title"
        class="relative m-0! p-0! size-14 rounded-full border-2 border-info hover:border-primary object-cover object-top transition duration-400 group-hover:z-30 group-hover:scale-105 group-hover:ring-2 group-active:scale-95"
      />
    </NuxtLink>
  </Motion>
</template>
