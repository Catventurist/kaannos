<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { withLeadingSlash } from 'ufo'

const route = useRoute()
const slug = computed(() => Array.isArray(route.params.slug) ? withLeadingSlash(String(route.params.slug.join('/'))) : withLeadingSlash(String(route.params.slug)))
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation-' + slug.value)
</script>

<template>
  <div>
    <AppHeader />
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton :collapsed="false" />
              </template>

              <UContentNavigation
                :navigation="navigation"
                highlight
              />
            </UPageAside>
          </template>
          <slot />
        </UPage>
      </UContainer>
    </UMain>
    <AppFooter />
  </div>
</template>
