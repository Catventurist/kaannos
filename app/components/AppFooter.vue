<script setup lang="ts">
const localePath = useLocalePath()
const appConfig = useAppConfig()
const columns = [{
  label: $t('header.resources'),
  children: [{
    label: $t('header.help'),
    to: localePath('/docs/essentials/markdown-syntax')
  }, {
    label: $t('header.docs.title'),
    to: localePath('/docs/getting-started')
  }, {
    label: $t('header.roadmap'),
    to: localePath('/roadmap')
  }, {
    label: $t('header.changelog.title'),
    to: localePath('/changelog')
  }]
/* }, {
  label: $t('header.features'),
  children: [{
    label: $t('header.affiliates')
  }, {
    label: $t('header.portal')
  }, {
    label: $t('header.hobbies')
  }, {
    label: $t('header.sponsors')
  }] */
}, {
  label: $t('header.company'),
  children: [{
    label: $t('header.about.title'),
    to: localePath('/about')
  }, {
    label: $t('header.pricing.title'),
    to: localePath('/pricing')
  }, {
    label: $t('header.guides.title'),
    to: localePath('/guides')
  }, {
    label: $t('header.blog.title'),
    to: localePath('/blog')
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: $t('header.subscribed.title'),
    description: $t('header.subscribed.description')
  })
}
</script>

<template>
  <USeparator
    :icon="appConfig.ui.icons.cat"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                :label="$t('header.subscribe.description')"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  :placeholder="$t('header.subscribe.enter')"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      variant="soft"
                      :trailing-icon="appConfig.ui.icons.send"
                      :label="$t('header.subscribe.title')"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        {{ appConfig.footer.credits }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://t.me/catventurists"
        target="_blank"
        icon="i-simple-icons-telegram"
        aria-label="Telegram"
        color="info"
        variant="ghost"
      />
      <UButton
        to="https://gitlab.com/catventurist"
        target="_blank"
        icon="i-simple-icons-gitlab"
        aria-label="Gitlab"
        color="warning"
        variant="ghost"
      />
      <UButton
        to="https://github.com/Catventurist"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
