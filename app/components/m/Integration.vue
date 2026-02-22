<script setup lang="ts">
const items = [
  {
    id: 1,
    icon: 'lucide-book',
    title: 'Etherpad',
    description: $t('integration.etherpad'),
    to: 'https://etherpad.wikimedia.org/'
  },
  {
    id: 2,
    icon: 'simple-icons:telegram',
    title: 'Telegram',
    description: $t('integration.telegram'),
    to: 'https://telegram.org/'
  },
  {
    id: 3,
    icon: 'simple-icons:codepen',
    title: 'Codepen',
    description: $t('integration.codepen'),
    to: 'https://codepen.io/'
  },
  {
    id: 4,
    icon: 'simple-icons:signal',
    title: 'Signal',
    description: $t('integration.signal'),
    to: 'https://signal.org/'
  },
  {
    id: 5,
    icon: 'simple-icons:gitlab',
    title: 'Gitlab',
    description: $t('integration.gitlab'),
    to: 'https://about.gitlab.com/'
  },
  {
    id: 6,
    icon: 'simple-icons:github',
    title: 'Github',
    description: $t('integration.github'),
    to: 'https://github.com/'
  }
]
</script>

<template>
  <div class="py-20">
    <div class="group/hea mx-auto flex flex-col items-center text-center">
      <div class="flex max-w-5xl flex-col items-center text-center">
        <Icon name="lucide:anvil" class="text-primary text-4xl duration-300 group-hover/hea:scale-110" />
        <h1 class="my-6 text-4xl font-bold text-pretty lg:text-6xl duration-300 group-hover/hea:text-primary">
          {{ $t('integration.title') }}
        </h1>
        <h2 class="mb-8 max-w-3xl text-muted lg:text-2xl duration-300 group-hover/hea:text-default">
          {{ $t('integration.description') }}
        </h2>
      </div>
      <div class="flex flex-col justify-center gap-4">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="item.to"
          class="group/int flex items-center gap-4 py-4"
        >
          <Icon :name="item.icon" class="shrink-0 text-primary text-3xl duration-300 group-hover/int:scale-110" />
          <div class="text-left">
            <div class="text-lg font-semibold duration-300 group-hover/int:text-primary">
              {{ item.title }}
            </div>
            <div class="text-sm text-muted duration-300 group-hover/int:text-default">
              {{ item.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
