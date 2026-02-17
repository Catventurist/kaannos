<script setup lang="ts">
import type { ModalContext } from './ModalContext.ts'
import { useEventListener } from '@vueuse/core'
import { computed, provide, ref } from 'vue'
import { MODAL_KEY } from './ModalContext'

interface Props {
  open?: boolean
  defaultOpen?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  closeOnEsc: true
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'open' | 'close'): void
}>()

const internalOpen = ref(Boolean(props.defaultOpen))
const isControlled = computed(() => props.open !== undefined)
const open = computed<boolean>({
  get() {
    return isControlled.value ? Boolean(props.open) : internalOpen.value
  },
  set(value) {
    if (!isControlled.value) internalOpen.value = value
    emit('update:open', value)
  }
})

const setOpen = (value: boolean) => {
  open.value = value
}

const openModal = () => {
  if (open.value) return
  setOpen(true)
  emit('open')
}

const closeModal = () => {
  if (!open.value) return
  setOpen(false)
  emit('close')
}

const toggle = () => {
  if (open.value) closeModal()
  else openModal()
}

const ctx: ModalContext = { open, setOpen, openModal, closeModal, toggle }
provide(MODAL_KEY, ctx)

if (import.meta.client) {
  useEventListener(window, 'keydown', (event) => {
    if (!props.closeOnEsc) return
    if (!open.value) return
    if (event.key !== 'Escape') return
    event.preventDefault()
    closeModal()
  })
}
</script>

<template>
  <slot
    :open="open"
    :open-modal="openModal"
    :close-modal="closeModal"
    :toggle="toggle"
  />
</template>
