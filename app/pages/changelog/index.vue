<script setup lang="ts">
/* const route = useRoute()

const { data: page } = await useAsyncData('changelog', () => queryCollection('changelog').first())
const { data: versions } = await useAsyncData(route.path, () => queryCollection('versions').order('date', 'DESC').all())
 */
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: page } = await useAsyncData('changelog-' + slug.value, () => queryCollection('changelog_' + locale.value as keyof Collections).first(), { watch: [locale] })
const { data: versions } = await useAsyncData('versions-' + slug.value, () => queryCollection('versions_' + locale.value as keyof Collections).all(), { watch: [locale] })

/* const { data: page } = await useAsyncData('changelog-' + slug.value, async () => {
  const content = await queryCollectionNavigation(('changelog_' + locale.value) as keyof Collections)
  if (!content && locale.value !== 'en') {
    return await queryCollection('changelog_en').first()
  }
  return content
}, {
  watch: [locale]
})
const { data: versions } = await useAsyncData('versions-' + slug.value, async () => {
  const content = await queryCollectionNavigation(('versions_' + locale.value) as keyof Collections)
  if (!content && locale.value !== 'en') {
    return await queryCollection('versions_en').order('title', 'DESC').all()
  }
  return content
}, {
  watch: [locale]
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
