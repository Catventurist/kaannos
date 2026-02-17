<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

useSeoMeta({
  title: $t('header.dashboard.title'),
  description: $t('header.dashboard.description')
})

const { isNotificationsSlideoverOpen } = useDashboard()
const appConfig = useAppConfig()
const localePath = useLocalePath()
const items = [[{
  label: $t('dash.new.mail'),
  icon: appConfig.ui.icons.send,
  to: localePath('/inbox')
}, {
  label: $t('dash.new.user'),
  icon: appConfig.ui.icons.userPlus,
  to: localePath('/customers')
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <div class="size-full">
  <UDashboardPanel id="home">
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
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ms-1" />
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</div>
</template>
