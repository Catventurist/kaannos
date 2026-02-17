<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormError } from '@nuxt/ui'

const appConfig = useAppConfig()
const passwordSchema = z.object({
  current: z.string().min(8, $t('settings.security.password.limit')),
  new: z.string().min(8, $t('settings.security.password.limit'))
})

type PasswordSchema = z.output<typeof passwordSchema>

const password = reactive<Partial<PasswordSchema>>({
  current: undefined,
  new: undefined
})

const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: $t('settings.security.password.different') })
  }
  return errors
}
</script>

<template>
  <div>
    <UPageCard
      :title="$t('settings.security.password.title')"
      :description="$t('settings.security.password.description')"
      variant="subtle"
    >
      <UForm
        :schema="passwordSchema"
        :state="password"
        :validate="validate"
        class="flex flex-col gap-4 max-w-xs"
      >
        <UFormField name="current">
          <UInput
            v-model="password.current"
            type="password"
            :placeholder="$t('settings.security.password.current')"
            class="w-full"
          />
        </UFormField>

        <UFormField name="new">
          <UInput
            v-model="password.new"
            type="password"
            :placeholder="$t('settings.security.password.new')"
            class="w-full"
          />
        </UFormField>

        <UButton
          :label="$t('settings.security.update')"
          :trailing-icon="appConfig.ui.icons.send"
          variant="soft"
          class="w-fit"
          type="submit"
        />
      </UForm>
    </UPageCard>

    <UPageCard
      :title="$t('settings.security.account.title')"
      :description="$t('settings.security.account.description')"
      class="bg-linear-to-tl from-error/10 from-5% to-default"
    >
      <template #footer>
        <UButton
          :label="$t('settings.security.account.delete')"
          :icon="appConfig.ui.icons.trash"
          variant="soft"
          color="error"
        />
      </template>
    </UPageCard>
  </div>
</template>
