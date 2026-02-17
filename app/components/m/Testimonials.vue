<script setup lang="ts">
import { AnimatePresence, Motion, useMotionValue, useSpring, useTransform } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  title?: string
  duration?: number
  testimonials: TestimonialItem[]
}

interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

const { title = 'Testimonials', testimonials, duration = 6000 } = defineProps<Props>()

const activeIndex = ref(0)
const containerRef = useTemplateRef('containerRef')

const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const springConfig = { damping: 25, stiffness: 200 }
const x = useSpring(mouseX, springConfig)
const y = useSpring(mouseY, springConfig)

const numberX = useTransform(x, [-200, 200], [-20, 20])
const numberY = useTransform(y, [-200, 200], [-10, 10])

function handleMouseMove(e: MouseEvent) {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  mouseX.set(e.clientX - centerX)
  mouseY.set(e.clientY - centerY)
}

function goNext() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

function goPrev() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

let timer: number | null = null
onMounted(() => {
  timer = window.setInterval(goNext, duration)
})
onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

const current = computed(() => testimonials[activeIndex.value])

const paddedIndex = computed(() => String(activeIndex.value + 1).padStart(2, '0'))

const progressHeight = computed(() => `${((activeIndex.value + 1) / testimonials.length) * 100}%`)
</script>

<template>
  <div class="flex min-h-screen items-center justify-center overflow-hidden">
    <div
      ref="containerRef"
      class="relative w-full max-w-5xl"
      @mousemove="handleMouseMove"
    >
      <Motion
        as="div"
        class="text-default/6 pointer-events-none absolute top-1/2 -left-8 z-0 -translate-y-1/2 text-[22rem] leading-none font-bold tracking-tighter select-none"
        :style="{ x: numberX, y: numberY }"
      >
        <AnimatePresence mode="wait">
          <Motion
            :key="activeIndex"
            as="span"
            class="block"
            :initial="{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }"
            :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
            :exit="{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }"
            :transition="{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }"
          >
            {{ paddedIndex }}
          </Motion>
        </AnimatePresence>
      </Motion>
      <div class="relative flex">
        <div class="border-r border-muted flex flex-col items-center justify-start mb-12">
          <Motion
            as="span"
            class="text-muted text-xl tracking-widest uppercase"
            :style="{ writingMode: 'vertical-rl', textOrientation: 'mixed' }"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.3 }"
          >
            {{ title }}
          </Motion>
          <div class="bg-muted/80 relative h-full mt-4 w-px">
            <Motion
              as="div"
              class="bg-linear-to-b from-info to-success absolute top-0 left-0 w-full origin-top"
              :animate="{ height: progressHeight }"
              :transition="{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }"
            />
          </div>
        </div>
        <div class="flex-1 py-12 pl-16">
          <AnimatePresence mode="wait">
            <Motion
              :key="activeIndex"
              as="div"
              class="mb-8"
              :initial="{ opacity: 0, x: -20 }"
              :animate="{ opacity: 1, x: 0 }"
              :exit="{ opacity: 0, x: 20 }"
              :transition="{ duration: 0.4 }"
            >
              <span
                v-if="current"
                class="text-muted border border-primary/70 inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs"
              >
                <span class="bg-info size-1 rounded-full" />
                {{ current.company }}
              </span>
            </Motion>
          </AnimatePresence>
          <div class="relative mb-12 min-h-35">
            <AnimatePresence>
              <Motion
                v-if="current"
                :key="activeIndex"
                as="p"
                class="text-default text-4xl tracking-tight"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Motion
                  v-for="(word, i) in current.quote.split(' ')"
                  :key="`${activeIndex}-${i}`"
                  as="p"
                  class="mr-[0.3em] inline-block"
                  :variants="{
                    hidden: { opacity: 0, y: 20, rotateX: 90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        duration: 0.5,
                        delay: i * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.2, delay: i * 0.02 }
                    }
                  }"
                >
                  {{ word }}
                </Motion>
              </Motion>
            </AnimatePresence>
          </div>
          <div class="flex items-end justify-between">
            <AnimatePresence mode="wait">
              <Motion
                v-if="current"
                :key="activeIndex"
                as="div"
                class="flex items-center gap-4"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -20 }"
                :transition="{ duration: 0.4, delay: 0.2 }"
              >
                <Motion
                  as="div"
                  class="bg-primary h-px w-8"
                  :initial="{ scaleX: 0 }"
                  :animate="{ scaleX: 1 }"
                  :transition="{ duration: 0.6, delay: 0.3 }"
                  :style="{ originX: 0 }"
                />
                <div>
                  <p class="text-default text-base font-medium">
                    {{ current.author }}
                  </p>
                  <p class="text-muted text-sm">
                    {{ current.role }}
                  </p>
                </div>
              </Motion>
            </AnimatePresence>
            <div class="flex items-center gap-4">
              <Motion
                as="button"
                class="group border border-muted relative flex size-12 items-center justify-center overflow-hidden rounded-full"
                :while-tap="{ scale: 0.95 }"
                @click="goPrev"
              >
                <Motion
                  as="div"
                  class="bg-default absolute inset-0"
                  :initial="{ x: '-100%' }"
                  :transition="{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }"
                />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="text-default group-hover:text-default/30 relative z-10 transition-colors"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Motion>
              <Motion
                as="button"
                class="group relative border border-muted flex size-12 items-center justify-center overflow-hidden rounded-full"
                :while-tap="{ scale: 0.95 }"
                @click="goNext"
              >
                <Motion
                  as="div"
                  class="bg-default absolute inset-0"
                  :initial="{ x: '100%' }"
                  :transition="{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }"
                />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="text-default group-hover:text-default/30 relative z-10 transition-colors"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Motion>
            </div>
          </div>
        </div>
      </div>
      <div
        class="pointer-events-none absolute right-0 bottom-0 left-0 overflow-hidden opacity-10"
      >
        <Motion
          as="div"
          class="flex text-4xl font-bold tracking-tight whitespace-nowrap"
          :animate="{ x: [0, -1000] }"
          :transition="{ duration: 20, repeat: Infinity, ease: 'linear' }"
        >
          <span
            v-for="i in 10"
            :key="i"
            class="ms-2"
          >
            {{ testimonials.map((t) => t.company).join(' • ') }} •
          </span>
        </Motion>
      </div>
    </div>
  </div>
</template>
