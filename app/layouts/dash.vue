<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()
const appConfig = useAppConfig()
const open = ref(false)
const localePath = useLocalePath()

const links = [[{
  label: $t('dash.home'),
  icon: appConfig.ui.icons.house,
  to: localePath('/'),
  onSelect: () => {
    open.value = false
  }
}, {
  label: $t('dash.board'),
  icon: appConfig.ui.icons.layoutDashboard,
  to: localePath('/dash'),
  onSelect: () => {
    open.value = false
  }
}, {
  label: $t('dash.inbox.title'),
  icon: appConfig.ui.icons.inbox,
  to: localePath('/inbox'),
  badge: '4',
  onSelect: () => {
    open.value = false
  }
}, {
  label: $t('dash.customers'),
  icon: appConfig.ui.icons.users,
  to: localePath('/customers'),
  onSelect: () => {
    open.value = false
  }
}, {
  label: $t('dash.settings'),
  to: localePath('/settings'),
  icon: appConfig.ui.icons.settings,
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: $t('dash.general'),
    to: localePath('/settings'),
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: $t('dash.members'),
    to: localePath('/settings/members'),
    onSelect: () => {
      open.value = false
    }
  }, {
    label: $t('dash.notifications'),
    to: localePath('/settings/notifications'),
    onSelect: () => {
      open.value = false
    }
  }, {
    label: $t('dash.security'),
    to: localePath('/settings/security'),
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: $t('translation.title'),
  icon: appConfig.ui.icons.logs,
  to: localePath('/translate'),
  onSelect: () => {
    open.value = false
  }
}],
[{
  label: $t('dash.about'),
  icon: appConfig.ui.icons.messageCircle,
  to: localePath('/about')
}, {
  label: $t('dash.help'),
  icon: appConfig.ui.icons.info,
  to: localePath('/docs/getting-started/introduction')
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: $t('dash.goto'),
  items: links.flat()
}, {
  id: 'code',
  label: $t('dash.code'),
  items: [{
    id: 'source',
    label: $t('dash.viewsource'),
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: $t('cookie.title'),
    duration: 0,
    close: false,
    actions: [{
      label: $t('cookie.accept'),
      color: 'success',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: $t('cookie.optout'),
      color: 'warning',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />
    <div class="size-full">
      <slot />
    </div>
    <NotificationsSlideover />
  </UDashboardGroup>
</template>
