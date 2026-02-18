<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.email('Invalid email')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The mail has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="flex w-full max-w-md flex-col gap-4 rounded-lg border p-8 shadow-md"
    >
      <div class="flex flex-col items-center gap-2 pb-2">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Icon name="lucide-mail" />
        </div>
        <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
          <h1
            class="text-lg leading-none font-semibold tracking-tight sm:text-center"
          >
            Forgot your password?
          </h1>
          <p class="text-muted text-center text-sm">
            Enter your email to reset your password.
          </p>
        </div>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email">
          <UInput
            id="email"
            placeholder="Enter your email"
            type="email"
            required
          />
        </UFormField>
        <UButton
          type="submit"
          label="Send reset link"
          class="w-full"
        />
        <p class="text-muted text-sm">
          Remember your password?
          <NuxtLink
            to="/login"
            class="text-primary font-medium hover:underline"
          >
            Login
          </NuxtLink>
        </p>
      </UForm>
    </div>
  </div>
</template>
