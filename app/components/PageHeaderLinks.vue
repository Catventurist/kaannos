<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()
const site = useSiteConfig()
const { locale } = useI18n()
const mdPath = computed(() => `${site.url}/raw/${locale.value}${route.path}.md`)
const appConfig = useAppConfig()
const items = [
  {
    label: $t('links.copymd'),
    icon: appConfig.ui.icons.link,
    onSelect() {
      copy(mdPath.value)
      toast.add({
        title: $t('links.copyclip'),
        icon: appConfig.ui.icons.checkCircle
      })
    }
  },
  {
    label: $t('links.viewmd'),
    icon: 'i-simple-icons-markdown',
    target: '_blank',
    to: `/raw/${locale.value}${route.path}.md`
  }
]

async function copyPage() {
  copy(await $fetch<string>(`/raw/${locale.value}${route.path}.md`))
}
</script>

<template>
  <UFieldGroup>
    <UButton
      :label="$t('links.copypage')"
      :icon="copied ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: [copied ? 'text-primary' : 'text-neutral', 'size-3.5']
      }"
      @click="copyPage"
    />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'w-48'
      }"
    >
      <UButton
        :icon="appConfig.ui.icons.chevronDown"
        size="sm"
        color="neutral"
        variant="outline"
        :aria-label="$t('header.actionsmenu')"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
