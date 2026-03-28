<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { GuidesEnCollectionItem, GuidesFiCollectionItem, PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData('guides-' + slug.value, async () => {
  const content = await queryCollection('guides_' + locale.value as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('guides_en').first()
  }
  return content as GuidesEnCollectionItem | GuidesFiCollectionItem
}, {
  watch: [locale]
})
/* const { data: page } = await useAsyncData('guides-' + slug.value, () => queryCollection('guides_' + locale.value as keyof Collections).path(route.path).first(), { watch: [locale] })
if (!page.value) {
  throw createError({ status: 404, statusText: 'Guide not found', fatal: true })
} */

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '%s - Kaannos',
  title,
  ogTitle: `${title} - Kaannos`,
  description,
  ogDescription: description
})

if (page.value?.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('Saas', {
    headline: $t('guides.headline'),
    title,
    description
  })
}

const tree = ref<Record<string, Node>>({})
const activePath = ref()

provide('tree', tree)
provide('activePath', activePath)

const items = computed(() => Object.entries(tree.value).map(([key, value]) => ({ label: key, component: value })))
</script>

<template>
  <UPage v-if="page" :ui="{ center: 'lg:col-span-5 px-4 sm:px-6 lg:pl-8 lg:pr-0', right: 'lg:col-span-5' }" class="lg:gap-8">
    <UPageHeader :title="page.title" :description="page.description" :ui="{ title: 'relative flex items-center' }">
      <template #headline>
        <UButton
          :icon="appConfig.ui.icons.arrowLeft"
          :label="$t('guides.back')"
          :to="localePath('/guides')"
          variant="link"
          class="p-0"
          :ui="{ leadingIcon: 'size-4' }"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted font-normal">
          {{ new Date(page.date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) }}
        </time>
      </template>

      <div v-if="page.authors?.length" class="flex items-center gap-6 mt-6">
        <template v-for="author in page.authors" :key="author.name">
          <ULink
            v-if="author.to"
            :to="author.to"
            target="_blank"
            class="flex items-center gap-3 group"
          >
            <UAvatar :src="author.avatar?.src" :alt="author.name" size="lg" />
            <div class="flex flex-col">
              <span class="text-sm font-medium text-highlighted">
                {{ author.name }}
              </span>
              <span class="text-xs text-muted group-hover:text-primary transition-colors">
                @{{ author.to.split('/').pop() }}
              </span>
            </div>
          </ULink>
          <div v-else class="flex items-center gap-3">
            <UAvatar :src="author.avatar?.src" :alt="author.name" size="lg" />
            <span class="text-sm font-medium text-highlighted">{{ author.name }}</span>
          </div>
        </template>
      </div>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />
    </UPageBody>

    <template #right>
      <div>
        <UContentToc
          :links="page.body.toc?.links"
          class="z-2 lg:hidden mx-0!"
        />

        <nav class="h-full sticky top-(--ui-header-height) max-h-[calc(100vh-var(--ui-header-height))] hidden lg:block">
          <ProseCodeTree
            v-if="activePath"
            :model-value="activePath"
            class="lg:h-full my-0 rounded-none border-y-0 border-r-0 border-default"
            :items="items"
            expand-all
            :ui="{ list: 'border-default', content: '[&>div>pre]:bg-muted/50 [&>div>pre]:border-default [&>div>pre]:rounded-none' }"
          />
          <div v-else class="size-full border-l border-default flex items-center justify-center">
            <UIcon :name="appConfig.ui.icons.arrowDown" class="size-12 text-dimmed animate-bounce" />
          </div>
        </nav>
      </div>
    </template>
  </UPage>
</template>
