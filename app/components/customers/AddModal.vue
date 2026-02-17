<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string().min(2, $t('settings.short')),
  email: z.email($t('settings.invalid.email'))
})
const open = ref(false)
const appConfig = useAppConfig()
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: $t('customers.modal.success'),
    description: $t('customers.modal.new') + `${event.data.name}` + $t('customers.modal.added'),
    color: 'success'
  })
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="$t('customers.modal.new')"
    :description="$t('customers.modal.description')"
  >
    <UButton
      :label="$t('customers.modal.new')"
      :icon="appConfig.ui.icons.plus"
      variant="ghost"
    />
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="$t('customers.modal.name.title')"
          :placeholder="$t('customers.modal.name.placeholder')"
          name="name"
        >
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField
          :label="$t('customers.modal.email.title')"
          :placeholder="$t('customers.modal.email.placeholder')"
          name="email"
        >
          <UInput v-model="state.email" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            :label="$t('customers.modal.cancel')"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="$t('customers.modal.create')"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
