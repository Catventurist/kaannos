<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/*
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData('blog-' + slug.value, async () => {
  const collection = 'blog_' + locale.value as keyof Collections
  const content = await queryCollection(collection).path(slug.value).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('blog_en').path(slug.value).first()
  }
  return content
}, {
  watch: [locale]
})

const { data: posts } = await useAsyncData('posts-' + slug.value, async () => {
  const collection = ('posts_' + locale.value) as keyof Collections
  const content = await queryCollection(collection).path(slug.value).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('posts_en').path(slug.value).all()
  }
  return content
}, {
  watch: [locale]
})
*/
const { data: page } = await useAsyncData('blog-' + slug.value, () => queryCollection('blog_' + locale.value as keyof Collections).first(), { watch: [locale] })
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts_' + locale.value as keyof Collections).all(), { watch: [locale] })

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
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2'
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
