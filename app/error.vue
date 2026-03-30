<script setup lang="ts">
import type { NuxtError } from '#app'
import { withLeadingSlash } from 'ufo'
import type { PageCollections } from '@nuxt/content'
import * as locales from '@nuxt/ui/locale'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const appConfig = useAppConfig()
const { locale } = useI18n()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})

useSeoMeta({
  title: $t('empty.page.title'),
  description: $t('empty.page.error')
})
const route = useRoute()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: navigation } = await useAsyncData('navigation-' + slug.value, async () => {
  const content = await queryCollectionNavigation(('docs_' + locale.value) as keyof PageCollections)
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

const localePath = useLocalePath()
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
  <div>
    <AppHeader />
    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>
    <AppFooter />
    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
    <UToaster />
  </div>
</template>
