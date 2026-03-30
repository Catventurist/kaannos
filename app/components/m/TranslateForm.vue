<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import { z } from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  fromLocale: z.string($t('translation.error.locale')),
  toLocale: z.string($t('translation.error.locale')),
  original: z.string($t('translation.error.text')),
  translated: z.string($t('translation.error.text'))
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  fromLocale: 'en',
  toLocale: 'fi',
  original: undefined,
  translated: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: $t('translation.success'), description: $t('translation.submitted'), color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="bg-default/80 rounded-lg p-8 w-full max-w-3xl">
      <h2 class="text-2xl font-bold mb-4">
        {{ $t('translation.title') }}
      </h2>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField :label="$t('translation.from.title')" name="fromLocale">
            <ULocaleSelect v-model="state.fromLocale as string" :locales="Object.values(locales)" class="w-60" />
          </UFormField>
          <UFormField :label="$t('translation.to.title')" name="toLocale">
            <ULocaleSelect v-model="state.toLocale as string" :locales="Object.values(locales)" class="w-60" />
          </UFormField>
        </div>
        <div class="mt-4 grid md:grid-cols-2 gap-4">
          <UFormField :label="$t('translation.from.description')" name="original">
            <UTextarea v-model="state.original" :rows="5" class="size-full" />
          </UFormField>
          <UFormField :label="$t('translation.to.description')" name="translated">
            <UTextarea v-model="state.translated" :rows="5" class="size-full" />
          </UFormField>
        </div>
        <div class="mt-4 flex justify-around">
          <UButton
            :label="$t('translation.dictionary')"
            icon="lucide-list"
            variant="outline"
            disabled
          />
          <UButton
            :label="$t('translation.reset')"
            trailing-icon="lucide-rotate-cw"
            variant="soft"
            disabled
          />
          <UButton
            :label="$t('translation.switch')"
            trailing-icon="lucide-arrow-right-left"
            variant="outline"
            disabled
          />
          <UButton
            type="submit"
            :label="$t('translation.submit')"
            trailing-icon="lucide-send"
            variant="subtle"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
