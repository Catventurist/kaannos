Submit

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  confirmed: z.string('Must be the same as above')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  password: undefined,
  confirmed: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The password has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="flex w-full max-w-md flex-col gap-4 rounded-lg border p-8 shadow-md">
      <div class="flex flex-col items-center gap-2 pb-2">
        <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
          <Icon name="lucide-mail" />
        </div>
        <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
          <h1 class="text-lg leading-none font-semibold tracking-tight sm:text-center">
            Reset your password
          </h1>
          <p class="text-muted text-center text-sm">
            Enter your new password to reset your account.
          </p>
        </div>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormField>
        <UFormField
          label="Confirm Password"
          name="confirmed"
        >
          <UInput
            v-model="state.confirmed"
            type="password"
          />
        </UFormField>
        <UButton
          type="submit"
          label="Reset Password"
          class="w-full"
        />
      </UForm>
    </div>
  </div>
</template>
