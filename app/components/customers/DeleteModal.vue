<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
}>(), {
  count: 0
})

const open = ref(false)

async function onSubmit() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="$t('customers.modal.delete') + ` ${count} ` + $t('customers.title') + `${count > 1 ? $t('customers.modal.multiple') : ''}`"
    :description="$t('customers.modal.confirm')"
  >
    <slot />

    <template #body>
      <div class="flex justify-end gap-2">
        <UButton
          :label="$t('customers.modal.cancel')"
          color="neutral"
          variant="subtle"
          @click="open = false"
        />
        <UButton
          :label="$t('customers.modal.delete')"
          color="error"
          variant="soft"
          loading-auto
          @click="onSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
