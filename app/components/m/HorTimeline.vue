<script setup lang="ts">
import { motion, AnimatePresence, type PanInfo } from 'motion-v'

type Events = Array<{
  year: number
  periodType: 'Q' | 'H'
  periodNumber: number
  isChecked: boolean
  events: Array<{
    title: string
    isChecked: boolean
    type?: string
  }>
}>
const events: Events = [
  {
    year: 2021,
    periodType: 'Q',
    periodNumber: 4,
    isChecked: true,
    events: [
      { title: 'Platform Conceptualization', isChecked: true, type: 'Development' },
      { title: 'Smart Contract Audit', isChecked: true, type: 'Security' },
      { title: 'Initial Coin Offering', isChecked: true, type: 'Marketing' },
      { title: 'First Exchange Listing', isChecked: true, type: 'Marketing' },
      { title: 'Partnership Announcements', isChecked: true, type: 'Partnerships' }
    ]
  },
  {
    year: 2022,
    periodType: 'H',
    periodNumber: 1,
    isChecked: true,
    events: [
      { title: 'Community Governance Launch', isChecked: true, type: 'Community' },
      { title: 'DeFi Protocol (testnet)', isChecked: true, type: 'Development' },
      { title: 'Security Enhancement Update', isChecked: true, type: 'Security' },
      { title: 'Mainnet Deployment', isChecked: true, type: 'Deployment' },
      { title: 'Early Adopter Program', isChecked: true, type: 'Community' },
      { title: 'Strategic Alliances', isChecked: true, type: 'Partnerships' },
      { title: 'Brand Identity Finalization', isChecked: true, type: 'Marketing' }
    ]
  },
  {
    year: 2022,
    periodType: 'H',
    periodNumber: 2,
    isChecked: true,
    events: [
      { title: 'Payment Gateway Development', isChecked: true, type: 'Development' },
      { title: 'New Platform Website', isChecked: true, type: 'Marketing' },
      { title: 'Beta Version Release', isChecked: true, type: 'Deployment' },
      { title: 'Native Token Swap', isChecked: true, type: 'Development' },
      { title: 'Additional Exchange Listings', isChecked: true, type: 'Marketing' }
    ]
  },
  {
    year: 2023,
    periodType: 'H',
    periodNumber: 1,
    isChecked: true,
    events: [
      { title: 'Cross-chain Integration Research', isChecked: true, type: 'Development' },
      { title: 'Multi-chain Deployment', isChecked: true, type: 'Deployment' },
      { title: 'Centralized Exchange Development', isChecked: true, type: 'Development' },
      { title: 'Decentralized Exchange Protocol', isChecked: true, type: 'Development' },
      { title: 'DEX Mainnet Launch', isChecked: true, type: 'Deployment' }
    ]
  },
  {
    year: 2023,
    periodType: 'H',
    periodNumber: 2,
    isChecked: true,
    events: [
      { title: 'Mobile App (Beta)', isChecked: true, type: 'Development' },
      { title: 'Mobile App (Official Release)', isChecked: true, type: 'Deployment' }
    ]
  },
  {
    year: 2024,
    periodType: 'H',
    periodNumber: 1,
    isChecked: true,
    events: [
      { title: 'Platform V1 Release', isChecked: true, type: 'Deployment' },
      { title: 'Developer Portal Launch', isChecked: true, type: 'Development' },
      { title: 'Mobile App V2', isChecked: true, type: 'Development' },
      { title: 'Platform V2 Upgrade', isChecked: true, type: 'Development' },
      { title: 'New Feature Modules', isChecked: true, type: 'Development' },
      { title: 'EVM Chain Integration', isChecked: true, type: 'Development' },
      { title: 'E-commerce Plugin Development', isChecked: true, type: 'E-commerce' },
      { title: 'Payment Link Service', isChecked: true, type: 'E-commerce' }
    ]
  },
  {
    year: 2024,
    periodType: 'H',
    periodNumber: 2,
    isChecked: false,
    events: [
      { title: 'Liquidity Oracle Service', isChecked: false, type: 'Development' },
      { title: 'Token Distribution Tool', isChecked: false, type: 'Development' },
      { title: 'Decentralized Raffle System', isChecked: false, type: 'Development' },
      { title: 'Digital Gift Card Platform', isChecked: false, type: 'E-commerce' },
      { title: 'Platform Alpha Testing', isChecked: false, type: 'Development' }
    ]
  },
  {
    year: 2025,
    periodType: 'H',
    periodNumber: 1,
    isChecked: false,
    events: [
      { title: 'Multi-network Expansion', isChecked: false, type: 'Deployment' },
      { title: 'Platform Beta Testing', isChecked: false, type: 'Development' },
      { title: 'DAO Implementation', isChecked: false, type: 'Community' }
    ]
  }
]

const height = '30em '
const expandedIndex = ref<number | null>(null)
const currentIndex = ref(0)
const expandedHeight = ref<number>(100)
const carouselRef = ref<HTMLDivElement>()
const headerRef = ref<HTMLDivElement>()

watchEffect(() => {
  if (carouselRef.value && headerRef.value) {
    const totalHeight = carouselRef.value.getBoundingClientRect().height
    const headerHeight = headerRef.value.getBoundingClientRect().height
    const availableHeight = totalHeight - headerHeight - 110
    expandedHeight.value = (Math.max(availableHeight, 50))
  }
})

const toggleExpand = (index: number) => {
  if (index === currentIndex.value) {
    expandedIndex.value = (expandedIndex.value === index ? null : index)
  }
}

const formatPeriod = (item: (typeof events)[0]) => {
  if (item.periodType === 'Q') {
    return `Q${item.periodNumber} ${item.year}`
  } else if (item.periodType === 'H') {
    return `H${item.periodNumber} ${item.year}`
  }
  return `${item.year}`
}

const nextSlide = () => {
  currentIndex.value = currentIndex.value === events.length - 1
    ? 0
    : currentIndex.value + 1
  expandedIndex.value = (null)
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0
    ? events.length - 1
    : currentIndex.value - 1
  expandedIndex.value = (null)
}

const goToSlide = (index: number) => {
  currentIndex.value = (index)
  expandedIndex.value = (null)
}

const handleDragEnd = (
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
  index: number
) => {
  const SWIPE_THRESHOLD = 50
  if (info.offset.x > SWIPE_THRESHOLD && index === currentIndex.value) {
    prevSlide()
  } else if (info.offset.x < -SWIPE_THRESHOLD && index === currentIndex.value) {
    nextSlide()
  }
}

const cardVariants = {
  active: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  inactive: {
    scale: 0.9,
    opacity: 0.7,
    zIndex: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
}
</script>

<template>
  <div class="mx-auto px-4 py-12 max-w-7xl">
    <motion.h1
      class="text-3xl md:text-4xl font-bold mb-2 text-center"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
    >
      Project Timeline
    </motion.h1>

    <motion.p
      class="text-muted text-center"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.2 }"
    >
      Our development journey and milestones
    </motion.p>

    <div class="relative">
      <UButton
        icon="lucide-chevron-left"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-default/80p-2 rounded-full shadow-md hover:bg-primary/10 transition-colors"
        @click="prevSlide"
      />
      <UButton
        icon="lucide-chevron-right"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-default/80p-2 rounded-full shadow-md hover:bg-primary/10 transition-colors"
        @click="nextSlide"
      />
      <div class="absolute left-0 right-0 top-1/2 h-0.5 bg-primary/20 z-0" />
      <div ref="carouselRef" class="relative overflow-hidden touch-pan-x" :style="{ height }">
        <div class="flex h-full items-center justify-center">
          <motion.div
            v-for="(item, index) in events"
            :key="item.periodNumber"
            class="absolute w-64 mx-4"
            :variants="cardVariants as any"
            initial="inactive"
            :animate="index === currentIndex ? 'active' : 'inactive'"
            :style="{
              x: `${Math.round((index - currentIndex) * 300)}px`,
              willChange: 'transform',
              transform: 'translateZ(0)'
            }"
            drag="x"
            :drag-constraints="{ left: -50, right: 50 }"
            :drag-elastic="0.1"
            :on-drag-end="(e, info) => handleDragEnd(e, info, index)"
          >
            <motion.div
              :variants="cardVariants as any"
              initial="inactive"
              :animate="index === currentIndex ? 'active' : 'inactive'"
              class="absolute left-1/2 -top-4 size-6 rounded-full transform -translate-x-1/2 z-10"
              :class="`${index === currentIndex
                ? 'bg-primary'
                : 'border-2 border-primary bg-transparent'
              }`"
              :style="{
                willChange: 'transform',
                transform: 'translateZ(0)'
              }"
            />
            <motion.div layout class="w-full" :transition="{ duration: 0.3, ease: 'easeInOut' }">
              <UCard class="overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  ref="index === 0 ? headerRef : null"
                  class="p-6 flex flex-col items-center text-center"
                  :class="`${index === currentIndex
                    ? 'cursor-pointer'
                    : 'cursor-default'
                  }`"
                  @click="() => toggleExpand(index)"
                >
                  <UBadge
                    :label="formatPeriod(item)"
                    icon="lucide-calendar"
                    variant="outline"
                    class="text-sm py-1 px-3 bg-primary/5 border-primary/20 mb-2"
                  />
                  <h3 class="text-xl font-bold text-primary">
                    {{ item.year }} Milestones
                  </h3>
                  <p class="text-lg font-medium">
                    {{ item.periodType === 'Q' ? `Quarter ${item.periodNumber}` : `Half ${item.periodNumber}` }}
                  </p>
                  <div class="flex items-center text-sm text-muted mt-1">
                    <Icon
                      name="lucide-check-circle"
                      :class="`size-4 mr-1 ${item.isChecked
                        ? 'text-success'
                        : 'text-dimmed'
                      }`"
                    />
                    {{ item.isChecked ? 'Completed' : 'Planned' }}
                  </div>
                  <motion.div
                    :animate="{
                      rotate: expandedIndex === index ? 180 : 0,
                      opacity: index === currentIndex ? 1 : 0.5
                    }"
                    :transition="{ duration: 0.3 }"
                  >
                    <Icon name="lucide-chevron-down" class="size-5 text-muted mt-2" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  <motion.div
                    v-if="expandedIndex === index && index === currentIndex"
                    :initial="{ height: 0, opacity: 0 }"
                    :animate="{ height: expandedHeight, opacity: 1 }"
                    :exit="{ height: 0, opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeInOut' }"
                    class="overflow-y-auto"
                  >
                    <div class="px-6 pb-6 pt-2 border-t border-border/50">
                      <div class="mb-4">
                        <h4 class="text-sm font-semibold flex items-center justify-center mb-2">
                          Events
                        </h4>
                        <ul class="grid grid-cols-1 gap-2">
                          <motion.li
                            v-for="(event, i) in item.events"
                            :key="i"
                            class="flex items-start"
                            :initial="{ opacity: 0, x: -20 }"
                            :animate="{ opacity: 1, x: 0 }"
                            :transition="{
                              duration: 0.3,
                              delay: i * 0.1,
                              ease: 'easeOut'
                            }"
                          >
                            <Icon
                              name="lucide-check-circle"
                              :class="`size-4 mr-2 ${event.isChecked
                                ? 'text-success'
                                : 'text-dimmed'
                              } mt-0.5 shrink-0`"
                            />
                            <span class="text-sm">
                              {{ event.title }}
                            </span>
                          </motion.li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </UCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div class="flex justify-center mt-8 gap-2">
        <UButton
          v-for="(i, index) in events"
          :key="index"
          class="size-3 rounded-full transition-colors"
          :class="`${index === currentIndex ? 'bg-primary' : 'bg-primary/20'}`"
          :aria-label="`Go to slide ${index + 1}`"
          @click="() => goToSlide(index)"
        />
      </div>
    </div>
  </div>
</template>
