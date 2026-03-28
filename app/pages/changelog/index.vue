<script setup lang="ts">
/* const route = useRoute()

const { data: page } = await useAsyncData('changelog', () => queryCollection('changelog').first())
const { data: versions } = await useAsyncData(route.path, () => queryCollection('versions').order('date', 'DESC').all())
 */
import { withLeadingSlash } from 'ufo'
import type { ChangelogEnCollectionItem, ChangelogFiCollectionItem, PageCollections, VersionsEnCollectionItem, VersionsFiCollectionItem } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/* const { data: page } = await useAsyncData('changelog-' + slug.value, () => queryCollection('changelog_' + locale.value as keyof Collections).first(), { watch: [locale] })
const { data: versions } = await useAsyncData('versions-' + slug.value, () => queryCollection('versions_' + locale.value as keyof Collections).all(), { watch: [locale] })
 */
const { data: page } = await useAsyncData('changelog-' + slug.value, async () => {
  const collection = 'changelog_' + locale.value as keyof PageCollections
  const content = await queryCollection(collection).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('changelog_en').path(route.path).first()
  }
  return content as ChangelogEnCollectionItem | ChangelogFiCollectionItem
}, {
  watch: [locale]
})
const { data: versions } = await useAsyncData('versions-' + slug.value, async () => {
  const collection = 'versions_' + locale.value as keyof PageCollections
  const content = await queryCollection(collection).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('versions_en').all()
  }
  return content as VersionsEnCollectionItem[] | VersionsFiCollectionItem[]
}, {
  watch: [locale]
})

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
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <UChangelogVersions>
        <UChangelogVersion
          v-for="(version, index) in versions"
          :key="index"
          v-bind="version"
        >
          <template #body>
            <ContentRenderer :value="version" />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </UPageBody>
  </UContainer>
</template>
