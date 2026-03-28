<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections, PageCollections, PostsEnCollectionItem, PostsFiCollectionItem } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

/* const { data: post } = await useAsyncData('posts-' + slug.value, () => queryCollection('posts_' + locale.value as keyof Collections).first(), { watch: [locale] }) */

const { data: post } = await useAsyncData('posts-' + slug.value, async () => {
  const collection = ('posts_' + locale.value) as keyof Collections
  const content = await queryCollection(collection).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('posts_en').first()
  }
  return content as PostsEnCollectionItem | PostsFiCollectionItem
}, {
  watch: [locale]
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings(('posts_' + locale.value) as keyof PageCollections, route.path, {
    fields: ['description']
  })
}, { watch: [locale] })

const title = post.value?.seo?.title || post.value?.title
const description = post.value?.seo?.description || post.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value?.image?.src) {
  defineOgImage({
    url: post.value.image.src
  })
} else {
  defineOgImageComponent('Saas', {
    headline: $t('header.blog.title')
  })
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-muted">
          &middot;
        </span>
        <time class="text-muted">
          {{ new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) }}
        </time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar
            v-bind="author.avatar"
            alt="Author avatar"
            size="2xs"
          />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
