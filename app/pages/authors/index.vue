<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { AutEnCollectionItem, AutFiCollectionItem, AuthorsEnCollectionItem, AuthorsFiCollectionItem, PageCollections } from '@nuxt/content'

const appConfig = useAppConfig()
const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
/* const { data: page } = await useAsyncData('aut-' + slug.value, () => queryCollection('aut_' + locale.value as keyof PageCollections).path(route.path).first(), { watch: [locale] })
 const { data: authors } = await useAsyncData('authors-list-' + slug.value, () => queryCollection('authors_' + locale.value as keyof PageCollections).order('title', 'ASC').all(), { watch: [locale] }) */
const { data: page } = await useAsyncData('aut-' + slug.value, async () => {
  const content = await queryCollection('aut_' + locale.value as keyof PageCollections).path(route.path).first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('aut_en').first()
  }
  return content as AutEnCollectionItem | AutFiCollectionItem
}, {
  watch: [locale]
})
const { data: authors } = await useAsyncData('authors-kist-' + slug.value, async () => {
  const content = await queryCollection('authors_' + locale.value as keyof PageCollections).all()
  if (!content && locale.value !== 'en') {
    return await queryCollection('authors_en').all()
  }
  return content as AuthorsEnCollectionItem[] | AuthorsFiCollectionItem[]
}, {
  watch: [locale]
})
const roleConfig: Record<string, { color: 'warning' | 'info' | 'success', icon: string }> = {
  creator: { color: 'warning', icon: appConfig.ui.icons.crown },
  maintainer: { color: 'info', icon: appConfig.ui.icons.shieldCheck },
  contributor: { color: 'success', icon: appConfig.ui.icons.gitPullRequest }
}

function formatDate(date: string | Date | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString(locale.value, { month: 'short', year: 'numeric' })
}
const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div class="size-full">
    <UPageHero
      v-if="page"
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      class="md:border-b border-default"
      :ui="{ container: 'relative py-10 sm:py-16 lg:py-24', title: 'prose' }"
    >
      <template #top>
        <div class="absolute z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80" />
      </template>
      <LazyStarsBg />
      <template #title>
        <MDC :value="page.hero.title" unwrap="p" cache-key="authors-hero-title" />
      </template>
      <template #description>
        <MDC :value="page.hero.description" unwrap="p" cache-key="authors-hero-description" />
      </template>
      <div aria-hidden="true" class="hidden md:block absolute z-[-1] border-x border-default inset-0 mx-4 sm:mx-6 lg:mx-8" />
    </UPageHero>
    <UPageSection :ui="{ container: '!pt-0' }">
      <UPageGrid>
        <UPageCard
          v-for="author in authors"
          :key="author.name"
          spotlight
          class="group relative overflow-visible"
        >
          <UBadge
            v-if="author.isOpenSourceLover"
            color="primary"
            size="sm"
            class="absolute -top-2 -right-2 z-10"
            :title="$t('authors.lover')"
          >
            <UIcon :name="appConfig.ui.icons.heart" class="size-3" />
          </UBadge>
          <div class="flex flex-col items-center text-center gap-4">
            <div class="relative">
              <UAvatar
                :src="author.avatar?.src"
                :alt="author.avatar?.alt || author.name"
                size="3xl"
                class="ring-4 ring-muted group-hover:ring-primary/30 transition-all duration-200"
              />
              <div
                v-if="author.icon"
                class="absolute -bottom-2 -left-2 size-7 flex items-center justify-center bg-elevated rounded-full ring-2 ring-default"
              >
                <UIcon :name="author.icon" class="size-4 text-primary" />
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <NuxtLink
                :to="author.to"
                class="text-lg font-semibold text-highlighted hover:text-primary transition-colors"
              >
                {{ author.name }}
              </NuxtLink>
              <span v-if="author.username" class="text-sm text-muted">
                @{{ author.username }}
              </span>
              <UBadge
                v-if="author.role"
                :color="roleConfig[author.role]?.color || 'neutral'"
                variant="subtle"
                size="xs"
                class="capitalize"
              >
                <UIcon :name="roleConfig[author.role]?.icon || appConfig.ui.icons.user" class="size-3 mr-1" />
                {{ author.role }}
              </UBadge>
              <span v-if="author.birthDate" class="text-xs text-dimmed flex items-center gap-1">
                <UIcon :name="appConfig.ui.icons.cake" class="size-3" />
                {{ formatDate(author.birthDate) }}
              </span>
            </div>
            <div v-if="author.modules?.length" class="flex flex-wrap justify-center gap-1.5">
              <UBadge
                v-for="module in author.modules"
                :key="module"
                :label="module"
                variant="outline"
                size="sm"
                color="neutral"
              />
            </div>
            <!-- <div v-if="author.links?.length" class="flex flex-wrap justify-center gap-1.5">
              <UButton
                v-for="link in author.links"
                :key="link"
                :to="link.to"
                :label="link.title"
                :target="link.target"
                color="neutral"
                :trailing-icon="link.icon"
                :size="link.size"
                :variant="link.variant"
                class="mt-2"
              />
            </div> -->
            <UButton
              :to="author.to"
              :label="$t('authors.viewprofile')"
              target="_blank"
              variant="subtle"
              color="neutral"
              size="sm"
              :trailing-icon="appConfig.ui.icons.external"
              class="mt-2"
            />
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>
  </div>
</template>
