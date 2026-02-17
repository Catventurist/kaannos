<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { useClipboard } from '@vueuse/core'

const appConfig = useAppConfig()
const colorMode = useColorMode()
const localePath = useLocalePath()
const { copy: copyCSS, copied: copiedCSS } = useClipboard()
const { copy: copyAppConfig, copied: copiedAppConfig } = useClipboard()

const {
  neutral,
  primary,
  setBlackAsPrimary,
  radiuses,
  radius,
  fonts,
  font,
  icon,
  icons,
  mode,
  hasCSSChanges,
  hasAppConfigChanges,
  exportCSS,
  exportAppConfig,
  resetTheme
} = useTheme()

const open = ref(false)

const neutralColors = [
  { name: $t('theme.slate'), label: 'slate' },
  { name: $t('theme.gray'), label: 'gray' },
  { name: $t('theme.zinc'), label: 'zinc' },
  { name: $t('theme.neutral'), label: 'neutral' },
  { name: $t('theme.stone'), label: 'stone' }
]

const primaryColors = [
  { name: $t('theme.red'), label: 'red', src: colors.red },
  { name: $t('theme.orange'), label: 'orange', src: colors.orange },
  { name: $t('theme.amber'), label: 'amber', src: colors.amber },
  { name: $t('theme.yellow'), label: 'yellow', src: colors.yellow },
  { name: $t('theme.lime'), label: 'lime', src: colors.lime },
  { name: $t('theme.green'), label: 'green', src: colors.green },
  { name: $t('theme.emerald'), label: 'emerald', src: colors.emerald },
  { name: $t('theme.teal'), label: 'teal', src: colors.teal },
  { name: $t('theme.cyan'), label: 'cyan', src: colors.cyan },
  { name: $t('theme.sky'), label: 'sky', src: colors.sky },
  { name: $t('theme.blue'), label: 'blue', src: colors.blue },
  { name: $t('theme.indigo'), label: 'indigo', src: colors.indigo },
  { name: $t('theme.violet'), label: 'violet', src: colors.violet },
  { name: $t('theme.purple'), label: 'purple', src: colors.purple },
  { name: $t('theme.fuchsia'), label: 'fuchsia', src: colors.fuchsia },
  { name: $t('theme.pink'), label: 'pink', src: colors.pink },
  { name: $t('theme.rose'), label: 'rose', src: colors.rose }
]

const modes = [
  { label: 'light', name: $t('theme.light'), icon: appConfig.ui.icons.light },
  { label: 'dark', name: $t('theme.dark'), icon: appConfig.ui.icons.dark },
  { label: 'system', name: $t('theme.system'), icon: appConfig.ui.icons.system }
]
</script>

<template>
  <UPopover
    v-model:open="open"
    :ui="{ content: 'min-w-82 px-6 py-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-5rem)]' }"
  >
    <template #default>
      <UButton
        :icon="appConfig.ui.icons.swatch"
        color="neutral"
        :variant="open ? 'soft' : 'ghost'"
        square
        :aria-label="$t('theme.title')"
        :title="$t('theme.title')"
        :ui="{ leadingIcon: 'text-primary' }"
      />
    </template>

    <template #content>
      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.primary') }}
          <UButton
            :to="localePath('/getting-started/theme/css-variables#colors')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            :label="$t('theme.black')"
            :selected="appConfig.theme.blackAsPrimary"
            @click="setBlackAsPrimary(true)"
          >
            <template #leading>
              <span class="inline-block size-2 rounded-full bg-black dark:bg-white" />
            </template>
          </ThemePickerButton>

          <ThemePickerButton
            v-for="color in primaryColors"
            :key="color.label"
            :label="color.name"
            :chip="color.label"
            :selected="!appConfig.theme.blackAsPrimary && primary === color.label"
            @click="primary = color.label"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.tone') }}
          <UButton
            :to="localePath('/getting-started/theme/css-variables#text')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="color in neutralColors"
            :key="color.label"
            :label="color.name"
            :chip="color.label === 'neutral' ? 'old-neutral' : color.label"
            :selected="neutral === color.label"
            @click="neutral = color.label"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.radius') }}
          <UButton
            :to="localePath('/getting-started/theme/css-variables#radius')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="grid grid-cols-5 gap-1 -mx-2">
          <ThemePickerButton
            v-for="r in radiuses"
            :key="r"
            :label="String(r)"
            class="justify-center px-0"
            :selected="radius === r"
            @click="radius = r"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.font') }}
          <UButton
            :to="localePath('/getting-started/integrations/fonts')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="-mx-2">
          <USelect
            v-model="font"
            size="sm"
            color="neutral"
            :icon="appConfig.ui.icons.font"
            :items="fonts"
            class="w-full ring-default rounded-sm hover:bg-elevated/50 text-xs data-[state=open]:bg-elevated/50"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.icons') }}
          <UButton
            :to="localePath('/getting-started/integrations/icons')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="-mx-2">
          <USelect
            v-model="icon"
            size="sm"
            color="neutral"
            :icon="icons.find((i: { value: any }) => i.value === icon)?.icon"
            :items="icons"
            class="w-full ring-default rounded-sm hover:bg-elevated/50 capitalize text-xs data-[state=open]:bg-elevated/50"
            :ui="{ item: 'capitalize text-xs', trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-xs leading-none font-semibold mb-2 select-none flex items-center gap-1">
          {{ $t('theme.mode') }}
          <UButton
            :to="localePath('/getting-started/integrations/color-mode')"
            size="xs"
            color="neutral"
            variant="link"
            :icon="appConfig.ui.icons.help"
            class="p-0 -my-0.5"
            :ui="{ leadingIcon: 'size-3' }"
          />
        </legend>

        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="m in modes"
            :key="m.label"
            :label="m.name"
            :icon="m.icon"
            :selected="colorMode.preference === m.label"
            @click="mode = m.label"
          />
        </div>
      </fieldset>

      <fieldset v-if="hasCSSChanges || hasAppConfigChanges">
        <legend class="text-xs leading-none font-semibold mb-2 select-none">
          {{ $t('theme.export') }}
        </legend>

        <div class="flex items-center justify-between gap-1 -mx-2">
          <UButton
            v-if="hasCSSChanges"
            color="neutral"
            variant="soft"
            size="sm"
            label="main.css"
            class="flex-1 text-xs"
            :icon="copiedCSS ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
            @click="copyCSS(exportCSS())"
          />
          <UButton
            v-if="hasAppConfigChanges"
            color="neutral"
            variant="soft"
            size="sm"
            label="app.config.ts"
            :icon="copiedAppConfig ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
            class="flex-1 text-xs"
            @click="copyAppConfig(exportAppConfig())"
          />
          <UTooltip :text="$t('theme.reset')">
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              :icon="appConfig.ui.icons.reload"
              class="ms-auto ring-default hover:bg-elevated/50"
              @click="resetTheme"
            />
          </UTooltip>
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>
