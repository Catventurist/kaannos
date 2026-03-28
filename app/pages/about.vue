<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { AboutEnCollectionItem, AboutFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData('about-' + slug.value, async () => {
  const content = await queryCollection('about_' + locale.value as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('about_en').first()
  }
  return content as AboutEnCollectionItem | AboutFiCollectionItem
}, {
  watch: [locale]
})

/* const { data: page } = await useAsyncData('about-' + slug.value, async () => queryCollection('about_' + locale.value as keyof PageCollections).first(), { watch: [locale] })

const { data: page } = await useAsyncData('about-' + slug.value, async () => {
  return queryCollection('about_' + locale.value as keyof Collections).first()
})
if (!page.value) {
  throw createError({
    status: 404,
    statusText: 'About not found',
    fatal: true
  })
} */

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <div class="size-full">
    <UPage v-if="page">
      <LandingHero :page />
      <UPageSection :ui="{ container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8' }">
        <LandingAbout :page />
        <LandingWorkExperience :page />
      </UPageSection>
      <LandingBlog :page />
      <LandingTestimonials :page />
      <LandingFAQ :page />
    </UPage>
  </div>
</template>
