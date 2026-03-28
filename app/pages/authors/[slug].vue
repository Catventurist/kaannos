<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { AuthorsEnCollectionItem, AuthorsFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/* const { data: author } = await useAsyncData('authors-' + slug.value, () => queryCollection('authors_' + locale.value as keyof PageCollections).path(route.path).first(), { watch: [locale] })
 */
const { data: author } = await useAsyncData('authors-' + slug.value, async () => {
  const content = await queryCollection('authors_' + locale.value as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('authors_en').first()
  }
  return content as AuthorsEnCollectionItem | AuthorsFiCollectionItem
}, {
  watch: [locale]
})

const title = author.value?.seo?.title || author.value?.title
const description = author.value?.seo?.description || author.value?.description

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
      v-if="author"
      class="flex justify-center items-center"
      :title="author.title"
      :description="author.description"
    >
      <div class="flex justify-center items-center gap-3 mt-4">
        <UAvatar
          :src="author.avatar.src"
          alt="Avatar"
          size="2xl"
        />
        {{ author.name }}
        <!-- <UButton
          v-for="link in author.links"
          :key="link.title"
          variant="subtle"
          v-bind="link"
        /> -->
      </div>
    </UPageHeader>
    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="author"
          :value="author.body"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
