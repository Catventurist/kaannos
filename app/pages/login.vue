<script setup lang="ts">
import * as z from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: $t('login.title'),
  description: $t('login.description')
})

const appConfig = useAppConfig()
const localePath = useLocalePath()
const toast = useToast()

const fields = [{
  name: 'name',
  label: $t('login.name.title'),
  placeholder: $t('login.name.placeholder'),
  type: 'text' as const,
  required: true
}, {
  name: 'email',
  label: $t('login.email.title'),
  placeholder: $t('login.email.placeholder'),
  type: 'text' as const,
  required: false
}, {
  name: 'password',
  label: $t('login.password.title'),
  placeholder: $t('login.email.placeholder'),
  type: 'password' as const,
  required: true
}, {
  name: 'remember',
  label: $t('login.remember'),
  type: 'checkbox' as const
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: $t('login.with.google') })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: $t('login.with.github') })
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
  toast.add({ title: $t('login.message') + payload.data.name })
}
</script>

<template>
  <div>
    <UAuthForm
      :fields="fields"
      :schema="schema"
      :providers="providers"
      :title="$t('login.welcome.title')"
      :separator="$t('login.or')"
      :icon="appConfig.ui.icons.lock"
      @submit="onSubmit"
    >
      <template #description>
        {{ $t('login.welcome.description') }}
        <ULink
          :to="localePath('/signup')"
          class="text-primary font-medium"
        >
          {{ $t('login.signup') }}
        </ULink>.
      </template>

      <template #password-hint>
        <ULink
          :to="localePath('/')"
          class="text-primary font-medium"
          tabindex="-1"
        >
          {{ $t('login.forgot') }}
        </ULink>
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
