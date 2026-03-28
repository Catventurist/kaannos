<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { DocsEnCollectionItem, DocsFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/* const { data: page } = await useAsyncData('docs-' + slug.value, () => queryCollection('docs_' + locale.value as keyof Collections).path(route.path).first(), { watch: [locale] }) */
const { data: page } = await useAsyncData('docs-' + slug.value, async () => {
  const content = await queryCollection('docs_' + locale.value as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').first()
  }
  return content as DocsEnCollectionItem | DocsFiCollectionItem
}, {
  watch: [locale]
})
/* const { data: page } = await useAsyncData('docs-' + slug.value, async () => {
  const content = await queryCollection('docs_' + locale.value as keyof Collections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('docs_en').first()
  }
  return content
}, {
  watch: [locale]
}) */

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings(('docs_' + locale.value) as keyof PageCollections, route.path, {
    fields: ['description']
  })
})

definePageMeta({
  layout: 'docs'
})

/* const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description']
  })
}) */

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <div>
    <UPage v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />
      <UPageBody>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </UPageBody>
      <template
        v-if="page?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="page.body.toc.links" />
      </template>
    </UPage>
  </div>
</template>
