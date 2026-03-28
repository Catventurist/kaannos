<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { locale } = useI18n()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation-' + locale.value)
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
