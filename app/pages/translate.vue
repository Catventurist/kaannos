<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()
const { finalizePendingLocaleChange } = useI18n()
const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

const nav: NavigationMenuItem[][] = [
  [
    {
      label: $t('translation.main'),
      icon: 'i-lucide-earth',
      to: localePath('/translate')
    },
    {
      label: $t('translation.table'),
      icon: 'i-lucide-table',
      to: localePath('/translate/table')
    },
    {
      label: $t('translation.form'),
      icon: 'i-lucide-form',
      to: localePath('/translate/form')
    }
  ],
  [
    {
      label: $t('dash.documentation'),
      icon: 'i-lucide-book-open',
      to: localePath('/docs/getting-started/localization')
    },
    {
      label: $t('dash.help'),
      icon: 'i-lucide-help-circle',
      to: 'https://github.com/catventurist/kaannos/issues',
      target: '_blank'
    }
  ]
]

useSeoMeta({
  title: $t('translation.main'),
  description: $t('translation.description')
})

const { isNotificationsSlideoverOpen } = useDashboard()
const appConfig = useAppConfig()
const items = [[{
  label: $t('dash.new.mail'),
  icon: appConfig.ui.icons.send,
  to: localePath('/inbox')
}, {
  label: $t('dash.new.user'),
  icon: appConfig.ui.icons.userPlus,
  to: localePath('/customers')
}]] satisfies DropdownMenuItem[][]
</script>

<template>
  <div>
    <UDashboardPanel id="translate">
      <template #header>
        <UDashboardNavbar :title="$t('dash.home')" :ui="{ right: 'gap-3' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <UTooltip :text="$t('dash.notifications')" :shortcuts="['N']">
              <UButton
                color="neutral"
                variant="ghost"
                square
                @click="isNotificationsSlideoverOpen = true"
              >
                <UChip color="error" inset>
                  <UIcon :name="appConfig.ui.icons.bell" class="size-5 shrink-0" />
                </UChip>
              </UButton>
            </UTooltip>

            <UDropdownMenu :items="items">
              <UButton
                :icon="appConfig.ui.icons.plus"
                size="md"
                variant="ghost"
                class="rounded-full"
              />
            </UDropdownMenu>
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <UNavigationMenu :items="nav" highlight class="flex-1" />
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
        <ClientOnly>
          <MTranslateTable v-if="nav" />
          <MTranslateForm />
        </ClientOnly>
      </template>
    </UDashboardPanel>
  </div>
</template>
