<script setup lang="ts">
const localePath = useLocalePath()
const cards = ref([
  {
    title: 'Motion',
    description: 'Module for making almost any kind of animations',
    icon: 'i-lucide-vibrate',
    to: localePath('/docs/getting-started/motion'),
    variant: 'soft' as const
  },
  {
    title: 'Images',
    description: 'In data-saving formats',
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
    title: 'Human-made',
    description: 'No power or time wasted in uncreative tools',
    icon: 'i-lucide-user',
    to: localePath('/docs/getting-started/info'),
    variant: 'soft' as const
  },
  {
    title: 'Theme',
    description: 'Learn how to customize components using Tailwind CSS.',
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
    title: 'Fonts',
    description: 'Integrations with Nuxt Fonts to provide plug-and-play font optimization.',
    icon: 'i-lucide-a-large-small',
    to: localePath('/docs/getting-started/integrations/fonts'),
    variant: 'soft' as const
  },
  {
    title: 'Color Mode',
    description: 'Works with Nuxt Color Mode to switch between light and dark.',
    icon: 'i-lucide-sun-moon',
    to: localePath('/docs/getting-started/integrations/color-mode'),
    variant: 'soft' as const
  },
  {
    title: 'Icons',
    description: 'Nuxt Icon allows access to over 200,000+ icons from Iconify.',
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
    title: 'Content Creation',
    description: 'Make pretty content using various components.',
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
    title: 'Internationalization',
    description: 'Finnish and English languages by default, automated routing and handmade translations',
    icon: 'i-lucide-earth',
    to: localePath('/docs/getting-started/integrations/localization'),
    variant: 'soft' as const
  }
])
/*
const features = ref<PageFeatureProps[]>([
  {
    title: 'Icons',
    description: 'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
    icon: 'i-lucide-smile',
    to: localePath('/docs/getting-started/integrations/icons')
  },
  {
    title: 'Fonts',
    description: 'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
    icon: 'i-lucide-a-large-small',
    to: localePath('/docs/getting-started/integrations/fonts')
  },
  {
    title: 'Color Mode',
    description: 'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
    icon: 'i-lucide-sun-moon',
    to: localePath('/docs/getting-started/integrations/color-mode')
  }
])
const links = ref<ButtonProps[]>([
  {
    label: 'Learn about components',
    to: localePath('/docs/getting-started/theme/components'),
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
]) */
</script>

<template>
  <UPage class="mx-2">
    <!--     <template #left>
      <UPageAside>
        <UContentNavigation :navigation="cards as any" class="ps-4" />
      </UPageAside>
    </template> -->
    <UPageHero
      :title="$t('steps.title')"
      :description="$t('steps.description')"
      :headline="$t('steps.headline')"
    >
      <MProjectLine class="mt-20" />
    </UPageHero>
    <UPageHero
      :title="$t('header.animations.title')"
      :description="$t('header.animations.description')"
      headline="Motion"
    />
    <UPageGrid>
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
    <UPageSection
      :title="$t('translation.title')"
      :description="$t('translation.description')"
      icon="i-lucide-earth"
      orientation="vertical"
    >
      <ClientOnly>
        <MTranslateTable />
        <MTranslateForm />
      </ClientOnly>
    </UPageSection>
  </UPage>
</template>
