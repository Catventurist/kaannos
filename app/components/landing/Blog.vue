<script setup lang="ts">
import type { AboutEnCollectionItem, AboutFiCollectionItem, Collections } from '@nuxt/content'
import { withLeadingSlash } from 'ufo'

defineProps<{
  page: AboutEnCollectionItem | AboutFiCollectionItem
}>()

const appConfig = useAppConfig()
const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const { data: posts } = await useAsyncData('about-blogs-' + slug.value, () => queryCollection('posts_' + locale.value as keyof Collections).order('title', 'DESC').limit(3).all())

/* const { data: posts } = await useAsyncData('about-blogs-', () =>
  queryCollection('posts').order('title', 'DESC').limit(3).all()
)
if (!posts.value) {
  throw createError({ status: 404, statusText: 'Posts not found', fatal: true })
} */
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-start text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-start mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #footer>
          <UButton
            size="xs"
            variant="link"
            class="px-0 gap-0"
            :label="$t('about.readarticle')"
          >
            <template #trailing>
              <UIcon
                :name="appConfig.ui.icons.arrowRight"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
