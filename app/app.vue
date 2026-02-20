<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { withLeadingSlash } from 'ufo'
import type { PageCollections } from '@nuxt/content'
import * as locales from '@nuxt/ui/locale'

const appConfig = useAppConfig()
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? (colors as never)[appConfig.ui.colors?.neutral as string][900] : 'white')
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`)
const blackAsPrimary = computed(() => appConfig.theme.blackAsPrimary ? `:root { --ui-primary: black; } .dark { --ui-primary: white; }` : ':root {}')
const font = computed(() => `:root { --font-sans: '${appConfig.theme.font}', sans-serif; }`)
const localePath = useLocalePath()
const { finalizePendingLocaleChange } = useI18n()
const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}
const { locale } = useI18n()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }
  ],
  style: [
    { innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimary, id: 'nuxt-ui-black-as-primary', tagPriority: -2 },
    { innerHTML: font, id: 'nuxt-ui-font', tagPriority: -2 }
  ],
  htmlAttrs: {
    lang,
    dir
  }
})

useSeoMeta({
  titleTemplate: '%s - Kaannos',
  ogImage: '/docs-light.png',
  twitterImage: '/docs-light.png',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: navigation } = useAsyncData('navigation-' + slug.value, async () => {
  const content = await (await queryCollectionNavigation('docs_' + locale.value as keyof PageCollections))
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').first()
  }
  return content
}, {
  watch: [locale]
})

const { data: files } = useLazyAsyncData('search-' + slug.value, async () => {
  const content = await queryCollectionSearchSections('docs_' + locale.value as keyof PageCollections)
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en')
  }
  return content
}, {
  server: false,
  watch: [locale]
})

const links = [{
  label: $t('header.about.title'),
  to: localePath('/about'),
  icon: appConfig.ui.icons.info
}, {
  label: $t('header.authors.title'),
  to: localePath('/authors'),
  icon: appConfig.ui.icons.users
}, {
  label: $t('header.docs.title'),
  to: localePath('/docs'),
  icon: appConfig.ui.icons.book
}, {
  label: $t('header.blog.title'),
  to: localePath('/blog'),
  icon: appConfig.ui.icons.bookOpen
}, {
  label: $t('header.guides.title'),
  to: localePath('/guides'),
  icon: appConfig.ui.icons.notebook
}, {
  label: $t('header.pricing.title'),
  to: localePath('/pricing'),
  icon: appConfig.ui.icons.bitcoin
}, {
  label: $t('header.changelog.title'),
  to: localePath('/changelog'),
  icon: appConfig.ui.icons.list
}, {
  label: $t('header.dashboard.title'),
  to: localePath('/dash'),
  icon: appConfig.ui.icons.layoutDashboard
}]

provide('navigation-' + slug.value, navigation)
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'my',
          mode: 'out-in',
          onBeforeEnter
        }"
      />
    </NuxtLayout>
    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
