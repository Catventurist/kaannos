<script setup lang="ts">
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
})

const sections = [{
  title: $t('settings.notifications.title'),
  description: $t('settings.notifications.title'),
  fields: [{
    name: 'email',
    label: $t('settings.email.title'),
    description: $t('settings.email.notification')
  }, {
    name: 'desktop',
    label: $t('settings.desktop.title'),
    description: $t('settings.desktop.description')
  }]
}, {
  title: $t('settings.updates.title'),
  description: $t('settings.updates.description'),
  fields: [{
    name: 'weekly_digest',
    label: $t('settings.updates.weekly.title'),
    description: $t('settings.updates.weekly.description')
  }, {
    name: 'product_updates',
    label: $t('settings.updates.product.title'),
    description: $t('settings.updates.product.description')
  }, {
    name: 'important_updates',
    label: $t('settings.updates.important.title'),
    description: $t('settings.updates.important.description')
  }]
}]

async function onChange() {
  console.log(state)
}
</script>

<template>
  <div>
    <div v-for="(section, index) in sections" :key="index">
      <UPageCard
        :title="section.title"
        :description="section.description"
        variant="naked"
        class="mb-4"
      />
      <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
        <UFormField
          v-for="field in section.fields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :description="field.description"
          class="flex items-center justify-between not-last:pb-4 gap-2"
        >
          <USwitch
            v-model="state[field.name]"
            @update:model-value="onChange"
          />
        </UFormField>
      </UPageCard>
    </div>
  </div>
</template>
