<script setup lang="ts">
const localePath = useLocalePath()

useSeoMeta({
  title: $t('steps.title'),
  description: $t('steps.description')
})

const cards = ref([
  {
    title: $t('module.motion.title'),
    description: $t('module.motion.description'),
    icon: 'i-lucide-vibrate',
    to: localePath('/docs/getting-started/motion'),
    variant: 'soft' as const
  },
  {
    title: $t('module.images.title'),
    description: $t('module.images.description'),
    icon: 'i-lucide-image',
    to: localePath('/docs/getting-started/introduction'),
    class: '',
    image: {
      path: '/landing/nuxt-image',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const,
    reverse: true
  },
  {
    title: $t('module.human.title'),
    description: $t('module.human.description'),
    icon: 'i-lucide-user',
    to: localePath('/docs/getting-started/info'),
    variant: 'soft' as const
  },
  {
    title: $t('module.theme.title'),
    description: $t('module.theme.description'),
    icon: 'i-lucide-swatch-book',
    to: localePath('/docs/getting-started/theme/design-system'),
    class: 'lg:col-span-2',
    image: {
      path: '/landing/color-palette',
      width: 363,
      height: 152
    },
    orientation: 'horizontal' as const
  },
  {
    title: $t('module.fonts.title'),
    description: $t('module.fonts.description'),
    icon: 'i-lucide-a-large-small',
    to: localePath('/docs/getting-started/integrations/fonts'),
    variant: 'soft' as const
  },
  {
    title: $t('module.colormode.title'),
    description: $t('module.colormode.description'),
    icon: 'i-lucide-sun-moon',
    to: localePath('/docs/getting-started/integrations/color-mode'),
    variant: 'soft' as const
  },
  {
    title: $t('module.icons.title'),
    description: $t('module.icons.description'),
    icon: 'i-lucide-smile',
    to: localePath('/docs/getting-started/integrations/icons'),
    image: {
      path: '/landing/icon-library',
      width: 362,
      height: 184
    },
    class: 'lg:col-span-2',
    orientation: 'horizontal' as const,
    reverse: true
  },
  {
    title: $t('module.content.title'),
    description: $t('module.content.description'),
    icon: 'i-lucide-pen',
    to: localePath('/docs/getting-started/integrations/content'),
    variant: 'soft' as const,
    orientation: 'horizontal' as const,
    class: 'lg:col-span-2',
    image: {
      path: '/landing/fully-customizable',
      width: 362,
      height: 184
    }
  },
  {
    title: $t('module.international.title'),
    description: $t('module.international.description'),
    icon: 'i-lucide-earth',
    to: localePath('/docs/getting-started/integrations/localization'),
    variant: 'soft' as const
  }
])
</script>

<template>
  <div>
    <UPage class="mx-2">
      <!-- <template #left>
      <UPageAside>
        <UContentNavigation :navigation="cards as any" class="ps-4" />
      </UPageAside>
    </template> -->
      <UPageSection
        :title="$t('steps.title')"
        :description="$t('steps.description')"
        :headline="$t('steps.headline')"
      >
        <ClientOnly>
          <MProjectLine class="mt-20" />
          <SnowBg />
        </ClientOnly>
      </UPageSection>
      <UPageSection
        :title="$t('module.title')"
        :description="$t('module.description')"
      >
        <UPageGrid class="w-full">
          <UPageCard
            v-for="(card, index) in cards"
            :key="index"
            v-bind="card"
            class="group"
          >
            <UColorModeImage
              v-if="card.image"
              :light="`${card.image.path}-light.svg`"
              :dark="`${card.image.path}-dark.svg`"
              :width="card.image.width"
              :height="card.image.height"
              :alt="card.title"
              loading="lazy"
              class="w-full duration-300 group-hover:scale-110 group-active:scale-90"
            />
          </UPageCard>
        </UPageGrid>
      </UPageSection>
    </UPage>
  </div>
</template>
