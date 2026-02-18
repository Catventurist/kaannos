<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Motion } from 'motion-v'

type Item = { name: string, src: string }
const list = [
  { name: 'minimal studio', src: '/hero/random-1.avif' },
  { name: 'vintage street', src: '/hero/random-2.avif' },
  { name: 'gentle waves', src: '/hero/random-3.avif' },
  { name: 'colorful market', src: '/hero/random-4.avif' },
  { name: 'golden hour glow', src: '/hero/random-5.avif' },
  { name: 'cozy corner', src: '/hero/random-6.avif' }
] as Item[]

const thumbnail = reactive<{ front: Item | null, back: Item | null }>({
  front: null,
  back: null
})

const activeIndex = ref<number>(0)
const isSlowMode = ref<boolean>(false)

function updateThumbnail(content: Item, i: number) {
  const isBack = Boolean(i % 2)
  const pos = isBack ? 'back' : 'front'
  thumbnail[pos] = content
  activeIndex.value = i
}

function toggleSlowMode() {
  isSlowMode.value = !isSlowMode.value
}

onMounted(() => {
  const firstContent = list[0]
  thumbnail.front = firstContent as Item
  thumbnail.back = firstContent as Item
})
</script>

<template>
  <div class="wrapper">
    <div class="thumbs w-[720px] max-w-full mx-auto my-12 flex flex-col items-stretch text-2xl md:text-4xl font-medium relative text-dimmed perspective-midrange">
      <div
        v-for="(e, i) in list"
        :key="e.name"
        class="h-20 px-6 md:h-30 md:px-12 flex items-center cursor-pointer border-b border-b-default group duration-300 hover:text-primary"
        @mouseenter="updateThumbnail(e, i)"
      >
        <div class="transition-all duration-300 group-hover:translate-x-4">
          {{ e.name }}
        </div>
      </div>

      <Motion
        v-if="thumbnail.front && thumbnail.back"
        class="absolute top-0 right-6 md:right-12 h-20 md:h-30 aspect-4/3 pointer-events-none transform-3d"
        :initial="{ translateY: '0%', rotateX: 0 }"
        :animate="{
          translateY: `${activeIndex * 100}%`,
          rotateX: -180 * activeIndex
        }"
        :transition="{ duration: isSlowMode ? 1 : 0.3 }"
        as="div"
      >
        <NuxtImg
          :src="thumbnail.front.src"
          :alt="thumbnail.front.name"
          class="size-full object-cover backface-hidden"
        />
        <NuxtImg
          :src="thumbnail.back.src"
          :alt="thumbnail.back.name"
          class="size-full object-cover absolute top-0 backface-hidden rotate-180"
        />
      </Motion>
    </div>
    <div class="fixed top-20 right-4 flex items-center gap-2 cursor-pointer" @click="toggleSlowMode">
      <div
        class="w-12 h-7 p-1 rounded-full border flex border-default text-warning bg-muted"
        :class="{ grayscale: !isSlowMode }"
        :style="{ justifyContent: isSlowMode ? 'flex-end' : 'flex-start' }"
      >
        <div class="h-full aspect-square rounded-full bg-default" />
      </div>
      <div>slow mode</div>
    </div>
  </div>
</template>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
.perspective-midrange {
  perspective: 1000px;
}
.rotate-180 {
  transform: rotateX(180deg);
}
</style>
