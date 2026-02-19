<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()
const appConfig = useAppConfig()

const { finalizePendingLocaleChange } = useI18n()
const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

useSeoMeta({
  title: $t('header.settings.title'),
  description: $t('header.settings.description')
})

const links = [[{
  label: $t('dash.general'),
  icon: appConfig.ui.icons.user,
  to: localePath('/settings')
}, {
  label: $t('dash.members'),
  icon: appConfig.ui.icons.users,
  to: localePath('/settings/members')
}, {
  label: $t('dash.notifications'),
  icon: appConfig.ui.icons.bell,
  to: localePath('/settings/notifications')
}, {
  label: $t('dash.security'),
  icon: appConfig.ui.icons.shield,
  to: localePath('/settings/security')
}], [{
  label: $t('dash.documentation'),
  icon: appConfig.ui.icons.bookOpen,
  to: localePath('/docs/getting-started/installation')
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <div>
    <UDashboardPanel id="settings" :ui="{ body: 'lg:py-8' }">
      <template #header>
        <UDashboardNavbar :title="$t('dash.settings')">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
        </UDashboardNavbar>
        <UDashboardToolbar>
          <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
        </UDashboardToolbar>
      </template>
      <template #body>
        <UScrollArea
          orientation="vertical"
          class="w-full h-110"
        >
          <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
            <NuxtPage :transition="{ onBeforeEnter }" />
          </div>
        </UScrollArea>
      </template>
    </UDashboardPanel>
  </div>
</template>
