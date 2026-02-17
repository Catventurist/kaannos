<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: $t('signup.title'),
  description: $t('signup.description')
})

const localePath = useLocalePath()
const toast = useToast()

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: $t('login.name.title'),
  placeholder: $t('login.name.placeholder'),
  required: true
}, {
  name: 'email',
  type: 'text' as const,
  label: $t('login.email.title'),
  placeholder: $t('login.email.placeholder')
}, {
  name: 'password',
  type: 'password' as const,
  label: $t('login.password.title'),
  placeholder: $t('login.password.placeholder'),
  required: true
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: $t('signup.with.google') })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: $t('signup.with.google') })
  }
}, {
  label: 'GitLab',
  icon: 'i-simple-icons-gitlab',
  onClick: () => {
    toast.add({ title: 'GitLab', description: $t('login.with.gitlab') })
  }
}]

const schema = z.object({
  name: z.string().min(1, { error: $t('login.name.invalid') }),
  email: z.email({ error: $t('login.email.invalid') }).optional(),
  password: z.string().min(8, { error: $t('login.password.invalid') })
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  toast.add({ title: $t('signup.message') + payload.data.name })
}
</script>

<template>
  <div>
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :providers="providers"
      :title="$t('signup.create.title')"
      :submit="{ label: $t('signup.create.title') }"
      :separator="$t('login.or')"
      @submit="onSubmit"
    >
      <template #description>
        {{ $t('signup.create.description') }}
        <ULink
          :to="localePath('/login')"
          class="text-primary font-medium"
        >
          {{ $t('login.title') }}
        </ULink>.
      </template>

      <template #footer>
        {{ $t('login.disclaimer') }}
        <ULink
          :to="localePath('/')"
          class="text-primary font-medium"
        >
          {{ $t('login.terms') }}
        </ULink>.
      </template>
    </UAuthForm>
  </div>
</template>
