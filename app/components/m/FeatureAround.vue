<script setup lang="ts">
type FeatureItem = {
  icon: string
  title: string
  description: string
  position?: 'left' | 'right'
  cornerStyle?: string
}

const leftFeatures: FeatureItem[] = [
  {
    icon: 'lucide-user',
    title: $t('features.pro.title'),
    description: $t('features.pro.description'),
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]'
  },
  {
    icon: 'lucide-building',
    title: $t('features.needs.title'),
    description: $t('features.needs.description'),
    position: 'left',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-br-[2px]'
  },
  {
    icon: 'lucide-trophy',
    title: $t('features.hobbies.title'),
    description: $t('features.hobbies.description'),
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-tr-[2px]'
  }
]

const rightFeatures: FeatureItem[] = [
  {
    icon: 'lucide-screen-share',
    title: $t('features.online.title'),
    description: $t('features.online.description'),
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]'
  },
  {
    icon: 'lucide-message-circle-heart',
    title: $t('features.communication.title'),
    description: $t('features.communication.description'),
    position: 'right',
    cornerStyle: 'sm:translate-x-4 sm:rounded-bl-[2px]'
  },
  {
    icon: 'lucide-lightbulb',
    title: $t('features.intuition.title'),
    description: $t('features.intuition.description'),
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-tl-[2px]'
  }
]
</script>

<template>
  <UPageSection id="features" icon="lucide-bird">
    <div class="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
      <div class="flex flex-col gap-6">
        <div
          v-for="feature, index in leftFeatures"
          :key="`left-feature-${index}`"
          :feature="feature"
          :class="feature.cornerStyle"
          class="relative rounded-2xl px-4 pb-4 pt-4 text-sm group/left duration-300 hover:shadow-sm hover:shadow-primary bg-muted/20"
        >
          <div class="mb-3 text-[2rem] text-primary duration-300 group-hover/left:translate-x-2">
            <Icon :name="feature.icon" />
          </div>
          <h2 class="mb-2.5 text-2xl text-primary">
            {{ feature.title }}
          </h2>
          <p class="text-pretty text-base text-muted duration-300 group-hover/left:text-default">
            {{ feature.description }}
          </p>
          <span
            class="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-60"
          />
          <span
            class="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"
          />
        </div>
      </div>
      <div class="order1 group/mid mb-6 self-center sm:order-0 md:mb-0">
        <div
          class="mb-4.5 duration-300 group-hover/mid:scale-110 relative mx-auto w-fit rounded-full rounded-bl-[2px] bg-muted px-4 py-2 text-sm text-default ring ring-border"
        >
          <span class="z-1 relative flex items-center gap-2">
            {{ $t('features.highlight') }}
          </span>
          <span
            class="absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-linear-to-r from-transparent via-primary to-transparent"
          />
          <span
            class="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,hsl(var(--primary))_0%,transparent_100%)]"
          />
        </div>
        <h2 class="mb-2 text-center text-2xl text-primary sm:mb-2.5 md:text-[2rem]">
          {{ $t('features.title') }}
        </h2>
        <p class="mx-auto max-w-[18rem] duration-300 group-hover/mid:text-default text-pretty text-center text-muted">
          {{ $t('features.description') }}
        </p>
      </div>
      <div class="flex flex-col gap-6">
        <div
          v-for="feature, index in rightFeatures"
          :key="`right-feature-${index}`"
          :feature="feature"
          :class="feature.cornerStyle"
          class="relative rounded-2xl px-4 pb-4 pt-4 text-sm group/right duration-300 hover:shadow-sm hover:shadow-primary bg-muted/20"
        >
          <div class="mb-3 text-[2rem] text-primary duration-300 group-hover/right:-translate-x-2">
            <Icon :name="feature.icon" />
          </div>
          <h2 class="mb-2.5 text-2xl text-primary">
            {{ feature.title }}
          </h2>
          <p class="text-pretty text-base text-muted duration-300 group-hover/right:text-default">
            {{ feature.description }}
          </p>
          <span
            class="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-60"
          />
          <span
            class="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--primary)/0.15)_0%,transparent_100%)] opacity-60"
          />
        </div>
      </div>
    </div>
  </UPageSection>
</template>
