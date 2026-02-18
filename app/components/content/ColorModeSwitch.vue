<script setup>
const colorMode = useColorMode()
const appConfig = useAppConfig()
const isLight = computed({
  get() {
    return colorMode.value === 'light'
  },
  set(_isLight) {
    colorMode.preference = _isLight ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <div class="flex items-center justify-center">
      <USwitch
        v-model="isLight"
        :unchecked-icon="appConfig.ui.icons.dark"
        :checked-icon="appConfig.ui.icons.light"
        aria-label="Toggle color mode"
        size="xl"
        color="neutral"
        :ui="{
          base: 'w-50 h-25 rounded-lg rotate-90 data-[state=checked]:bg-(--ui-color-neutral-200)',
          thumb: 'data-[state=checked]:translate-x-25 data-[state=checked]:rtl:-translate-x-25 rounded-lg size-24',
          icon: 'rotate-270 size-8',
        }"
        @click="isDark = !isDark"
      />
    </div>
  </ClientOnly>
</template>
