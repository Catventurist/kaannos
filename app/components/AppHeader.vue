<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const appConfig = useAppConfig()

const items = computed(() => [{
  label: $t('header.about.title'),
  to: localePath('/about'),
  icon: appConfig.ui.icons.info
}, {
  label: $t('header.authors.title'),
  to: localePath('/authors'),
  icon: appConfig.ui.icons.users
}, {
  label: $t('header.docs.title'),
  to: localePath('/docs/getting-started/introduction'),
  icon: appConfig.ui.icons.book,
  active: route.path.startsWith(localePath('/docs'))
}, {
  label: $t('header.blog.title'),
  to: localePath('/blog'),
  icon: appConfig.ui.icons.bookOpen
}, {
  label: $t('header.guides.title'),
  to: localePath('/guides'),
  icon: appConfig.ui.icons.notebook
}, {
  label: $t('header.pricing.title'),
  to: localePath('/pricing'),
  icon: appConfig.ui.icons.bitcoin
}, {
  label: $t('header.changelog.title'),
  to: localePath('/changelog'),
  icon: appConfig.ui.icons.list
}, {
  label: $t('header.dashboard.title'),
  to: localePath('/dash'),
  icon: appConfig.ui.icons.layoutDashboard
}, {
  label: $t('header.projects.title'),
  to: localePath('/projects'),
  icon: appConfig.ui.icons.light
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <UColorModeAvatar dark="/logo-dark.webp" light="/logo-light.webp" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <ThemePicker />
      <ColorModeButton />
      <LangSwitcher />
      <UButton
        :title="$t('header.login')"
        color="neutral"
        variant="ghost"
        :icon="appConfig.ui.icons.login"
        class="hidden lg:inline-flex"
        :to="localePath('/login')"
      />
      <UButton
        :title="$t('header.signup')"
        color="neutral"
        variant="ghost"
        :icon="appConfig.ui.icons.signup"
        class="hidden lg:inline-flex"
        :to="localePath('/signup')"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <USeparator class="my-6" />
      <UButton
        :label="$t('header.signin')"
        color="neutral"
        variant="subtle"
        :to="localePath('/login')"
        block
        class="mb-3"
      />
      <UButton
        :label="$t('header.signup')"
        color="neutral"
        variant="subtle"
        :to="localePath('/signup')"
        block
      />
    </template>
  </UHeader>
</template>
