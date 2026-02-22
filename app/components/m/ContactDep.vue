<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { Motion, stagger } from 'motion-v'
import type { MotionProps } from 'motion-v'
import { ref } from 'vue'
import * as z from 'zod/v4'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const childVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}
const formVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}
const textVariant: MotionProps['variants'] = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}

const botVariant: MotionProps['variants'] = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}

const selectedDepartment = ref('sales')
/* const isUrgent = ref(false) */

const departments = [
  { label: $t('contact.sales'), value: 'sales', icon: 'lucide:shopping-cart', responseTime: '1-2' },
  { label: $t('contact.support'), value: 'support', icon: 'lucide:headphones', responseTime: '2-4' },
  { label: $t('contact.billing'), value: 'billing', icon: 'lucide:credit-card', responseTime: '1-3' },
  { label: $t('contact.technical'), value: 'technical', icon: 'lucide:code', responseTime: '3-6' },
  { label: $t('contact.general'), value: 'general', icon: 'lucide:mail', responseTime: '4-8' }
]

const getResponseTime = (dept: string) => {
  return departments.find(d => d.value === dept)?.responseTime || '4-8'
}

const schema = z.object({
  department: z.object({
    label: z.string().optional,
    value: z.string().optional,
    icon: z.string().optional,
    responseTime: z.string().optional
  }),
  firstName: z.string('Invalid name'),
  lastName: z.string('Invalid lastname'),
  email: z.email('Invalid email'),
  subject: z.string('Need a subject'),
  message: z.string('Write a message'),
  isUrgent: z.boolean().optional()
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  subject: undefined,
  message: undefined,
  isUrgent: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.firstName) errors.push({ name: 'firstName', message: 'Required' })
  if (!state.lastName) errors.push({ name: 'lastName', message: 'Required' })
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.subject) errors.push({ name: 'subject', message: 'Required' })
  if (!state.message) errors.push({ name: 'message', message: 'Required' })
  return errors
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{ initial: { opacity: 0 }, animate: { opacity: 1, transition: { when: 'beforeChildren', delayChildren: stagger(0.1) } } }"
  >
    <UContainer class="py-16">
      <div class="mx-auto max-w-[700px]">
        <div class="text-center">
          <Motion as="p" :variants="childVariant" class="font-semibold text-primary">
            {{ $t('contact.headline') }}
          </Motion>
          <Motion as="h2" :variants="childVariant" class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">
            {{ $t('contact.title') }}
          </Motion>
          <Motion as="p" :variants="childVariant" class="mb-10 text-lg text-muted lg:text-xl">
            {{ $t('contact.description') }}
          </Motion>
        </div>
        <Motion :variants="childVariant" as-child>
          <UCard class="p-8">
            <UForm
              :validate="validate"
              :schema="schema"
              :state="state"
              class="space-y-4"
              @error="onError"
              @submit="onSubmit"
            >
              <UFormField :label="$t('contact.description')" name="department" class="flex flex-col gap-4">
                <Motion
                  initial="initial"
                  in-view="animate"
                  :variants="formVariant"
                  class="flex flex-wrap justify-around gap-2"
                >
                  <UBadge
                    v-for="dept in departments"
                    :key="dept.value"
                    :icon="dept.icon"
                    :label="dept.label"
                    :variant="selectedDepartment === dept.value ? 'solid' : 'outline'"
                    class="cursor-pointer"
                    size="lg"
                    color="primary"
                    @click="selectedDepartment = dept.value"
                  />
                </Motion>
                <p v-if="selectedDepartment" class="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <Icon name="lucide:clock" class="size-4" />
                  {{ $t('contact.responsetime') }}: {{ getResponseTime(selectedDepartment) }} {{ $t('contact.hours') }}
                </p>
              </UFormField>
              <Motion
                initial="initial"
                in-view="animate"
                :variants="textVariant"
                class="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <UFormField :label="$t('contact.firstname')" name="firstName">
                  <UInput v-model="state.firstName" :placeholder="$t('contact.firstname')" class="w-full" />
                </UFormField>
                <UFormField :label="$t('contact.lastname')" name="lastName">
                  <UInput v-model="state.lastName" :placeholder="$t('contact.lastname')" class="w-full" />
                </UFormField>
              </Motion>
              <Motion
                initial="initial"
                in-view="animate"
                :variants="botVariant"
              >
                <UFormField :label="$t('contact.email')" name="email" class="w-full">
                  <UInput
                    v-model="state.email"
                    placeholder="cat@example.com"
                    type="email"
                    class="w-full"
                  />
                </UFormField>
                <UFormField :label="$t('contact.subject')" name="subject">
                  <UInput
                    v-model="state.subject"
                    :placeholder="$t('contact.subjectdesc')"
                    name="subject"
                    class="w-full"
                  />
                </UFormField>
                <UFormField :label="$t('contact.message')" name="message">
                  <UTextarea
                    v-model="state.message"
                    :rows="5"
                    :placeholder="$t('contact.messagedesc')"
                    name="message"
                    class="w-full"
                  />
                </UFormField>
                <UCheckbox
                  id="urgent"
                  v-model="state.isUrgent"
                  name="isUrgent"
                  :label="$t('contact.urgent')"
                />
                <Motion
                  as-child
                  :while-hover="{ scale: 1.1, transition: { duration: 0.3, ease: 'easeInOut' } }"
                  :while-press="{ scale: 0.9, transition: { duration: 0.3, ease: 'easeInOut' } }"
                >
                  <UButton
                    trailing-icon="lucide:send"
                    variant="soft"
                    class="w-full text-center justify-between"
                    type="submit"
                  >
                    <span>{{ $t('contact.sendto') }}</span>
                    {{ selectedDepartment ? departments.find((d) => d.value === selectedDepartment)?.label : "support" }}
                  </UButton>
                </Motion>
              </Motion>
            </UForm>
          </UCard>
        </Motion>
      </div>
    </UContainer>
  </Motion>
</template>
