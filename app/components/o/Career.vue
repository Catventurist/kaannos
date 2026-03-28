<script lang='ts' setup>
import { stagger, Motion } from 'motion-v'
import type { MotionProps } from 'motion-v'
import type { TabsItem } from '@nuxt/ui'

const card = [{
  tag: 'Design',
  icon: 'lucide-bookmark',
  title: 'Senior Product Designer',
  description: 'Lead design initiatives for our flagship products and mentor junior designers.',
  type: 'Remote',
  location: 'Anywhere',
  length: 'Full-time',
  level: 'Senior level',
  currency: '$',
  moneyfrom: '120k',
  moneyto: '160k',
  highlights: [
    'Health insurance',
    '401(k)',
    'Remote'
  ]
}]

const items: TabsItem[] = [
  {
    label: 'All positions',
    icon: 'i-lucide-list',
    items: card
  }, {
    label: 'Engineering',
    icon: 'i-lucide-wrench'
  }, {
    label: 'Design',
    icon: 'i-lucide-palette'
  }, {
    label: 'Product',
    icon: 'i-lucide-shopping-cart'
  }, {
    label: 'Learning',
    icon: 'i-lucide-lightbulb'
  }
]

const childVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}
</script>

<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1)
        }
      }
    }"
  >
    <UContainer class="py-16 lg:py-24">
      <div class="mb-12 text-center lg:mb-16">
        <Motion
          as="p"
          :variants="childVariant"
          class="mb-2 font-semibold text-primary"
        >
          Careers
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mb-4 text-4xl font-bold lg:text-5xl"
        >
          Find your next role
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-2xl text-lg text-muted lg:text-xl"
        >
          Join a team of passionate individuals working on cutting-edge products
        </Motion>
      </div>
      <Motion
        :variants="childVariant"
        class="mb-12"
      >
        <UTabs
          :items="items"
          class="w-full"
        >
          <template #content="{ item }">
            <div class="mx-auto w-full justify-start">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Motion
                  v-for="ch in item.items"
                  :key="ch.title"
                  :variants="childVariant"
                  :transition="{ delay: 0.05 }"
                >
                  <UCard class="group h-full py-0 transition-all hover:border-primary/50 hover:shadow-lg">
                    <div class="p-6">
                      <div class="mb-4 flex items-start justify-between">
                        <UBadge
                          :label="ch.tag"
                          variant="outline"
                        />
                        <UButton
                          :icon="ch.icon"
                          variant="ghost"
                          size="sm"
                        />
                      </div>
                      <h3 class="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                        {{ ch.title }}
                      </h3>
                      <p class="mb-4 text-sm text-muted">
                        {{ ch.description }}
                      </p>
                      <div class="mb-4 space-y-2 text-sm">
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:map-pin"
                            class="size-4"
                          />
                          {{ ch.type }} · {{ ch.location }}
                        </div>
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:briefcase"
                            class="size-4"
                          />
                          {{ ch.length }} · {{ ch.level }}
                        </div>
                        <div class="flex items-center gap-2 text-muted">
                          <Icon
                            name="lucide:dollar-sign"
                            class="size-4"
                          />
                          {{ ch.currency }}{{ ch.moneyfrom }} - {{ ch.moneyto }}
                        </div>
                      </div>
                      <USeparator class="my-4" />
                      <div class="flex flex-wrap gap-2">
                        <UBadge
                          v-for="b in ch.highlights"
                          :key="b"
                          :label="b"
                          variant="outline"
                          size="sm"
                        />
                      </div>
                      <UButton
                        label="View details"
                        trailing-icon="lucide-arrow-right"
                        class="mt-6 w-full justify-center"
                        variant="subtle"
                      />
                    </div>
                  </UCard>
                </Motion>
              </div>
              <Motion
                :variants="childVariant"
                class="mt-12 text-center"
              >
                <UButton
                  label="Load more positions"
                  size="lg"
                  variant="outline"
                />
              </Motion>
            </div>
          </template>
        </UTabs>
      </Motion>
    </UContainer>
  </Motion>
</template>
