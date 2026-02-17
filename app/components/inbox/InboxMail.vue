<script setup lang="ts">
import { format } from 'date-fns'
import type { Mail } from '~/types'

defineProps<{
  mail: Mail
}>()

const emits = defineEmits(['close'])
const appConfig = useAppConfig()

const dropdownItems = [[{
  label: $t('mail.mark.unread'),
  icon: appConfig.ui.icons.checkCircle
}, {
  label: $t('mail.mark.important'),
  icon: appConfig.ui.icons.triangleAlert
}], [{
  label: $t('mail.star'),
  icon: appConfig.ui.icons.star
}, {
  label: $t('mail.mute'),
  icon: appConfig.ui.icons.circlePause
}]]

const toast = useToast()

const reply = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    reply.value = ''

    toast.add({
      title: $t('mail.sent.title'),
      description: $t('mail.sent.description'),
      icon: appConfig.ui.icons.checkCircle,
      color: 'success'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UDashboardPanel id="inbox-2">
    <UDashboardNavbar :title="mail.subject" :toggle="false">
      <template #leading>
        <UButton
          :icon="appConfig.ui.icons.x"
          color="neutral"
          variant="ghost"
          class="-ms-1.5"
          @click="emits('close')"
        />
      </template>

      <template #right>
        <UTooltip :text="$t('mail.archive')">
          <UButton
            :icon="appConfig.ui.icons.inbox"
            color="neutral"
            variant="ghost"
          />
        </UTooltip>

        <UTooltip :text="$t('mail.archive')">
          <UButton :icon="appConfig.ui.icons.reply" color="neutral" variant="ghost" />
        </UTooltip>

        <UDropdownMenu :items="dropdownItems">
          <UButton
            :icon="appConfig.ui.icons.ellipsis"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UDashboardNavbar>

    <div class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default">
      <div class="flex items-start gap-4 sm:my-1.5">
        <UAvatar
          v-bind="mail.from.avatar"
          :alt="mail.from.name"
          size="3xl"
        />

        <div class="min-w-0">
          <p class="font-semibold text-highlighted">
            {{ mail.from.name }}
          </p>
          <p class="text-muted">
            {{ mail.from.email }}
          </p>
        </div>
      </div>

      <p class="max-sm:pl-16 text-muted text-sm sm:mt-2">
        {{ format(new Date(mail.date), 'dd MMM HH:mm') }}
      </p>
    </div>

    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <p class="whitespace-pre-wrap">
        {{ mail.body }}
      </p>
    </div>

    <div class="px-4 sm:px-6 shrink-0">
      <UCard variant="subtle" class="mt-auto" :ui="{ header: 'flex items-center gap-1.5 text-dimmed' }">
        <template #header>
          <UIcon :name="appConfig.ui.icons.reply" class="size-5" />

          <span class="text-sm truncate">
            {{ $t('mail.replyto') }} {{ mail.from.name }} ({{ mail.from.email }})
          </span>
        </template>

        <form @submit.prevent="onSubmit">
          <UTextarea
            v-model="reply"
            color="neutral"
            variant="none"
            required
            autoresize
            :placeholder="$t('mail.replyplaceholder')"
            :rows="3"
            :disabled="loading"
            class="w-full"
            :ui="{ base: 'p-0 resize-none' }"
          />

          <div class="flex items-center justify-between">
            <UTooltip :text="$t('mail.attach')">
              <UButton
                color="neutral"
                variant="ghost"
                :icon="appConfig.ui.icons.paperclip"
              />
            </UTooltip>

            <div class="flex items-center justify-end gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                :label="$t('mail.savedraft')"
                :icon="appConfig.ui.icons.save"
              />
              <UButton
                type="submit"
                variant="soft"
                color="info"
                :loading="loading"
                :label="$t('mail.send')"
                :icon="appConfig.ui.icons.send"
              />
            </div>
          </div>
        </form>
      </UCard>
    </div>
  </UDashboardPanel>
</template>
