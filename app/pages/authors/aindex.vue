<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { PageCollections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => withLeadingSlash(String(route.params.slug)))

const { data: authors } = await useAsyncData('authors-' + slug.value, () => queryCollection('authors_' + locale.value as keyof PageCollections).all(), {
  watch: [locale]
})

const appConfig = useAppConfig()
const title = $t('header.users.title')
const description = $t('header.users.description')

defineI18nRoute({
  paths: {
    en: '/authors',
    fi: '/julkaisijat'
  }
})

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UPageSection
    :title="title"
    :description="description"
    :icon="appConfig.ui.icons.users"
  >
    <div
      v-if="authors"
      class="min-h-40 flex flex-col gap-2 items-center justify-around"
    >
      <UUser
        v-for="author in authors"
        :key="author.name"
        :to="author.to"
        :name="author.name"
        :description="author.username ? `@${author.username}` : ''"
        :avatar="author.avatar"
      >
        <template #name>
          <div class="flex gap-2">
            <span class="text-sm font-medium">
              {{ author.name }}
            </span>
            <span class="text-sm text-muted">
              - {{ author.username ? `@${author.username}` : '' }}
            </span>
          </div>
        </template>
        <template #description>
          <div class="flex gap-2">
            <UBadge
              v-for="local in author.locales"
              :key="local"
              variant="soft"
              size="sm"
              color="primary"
            >
              {{ local }}
            </UBadge>
          </div>
        </template>
      </UUser>
    </div>
  </UPageSection>
</template>
