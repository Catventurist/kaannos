import type { InjectionKey, Ref } from 'vue'

export interface ModalContext {
  open: Ref<boolean>
  setOpen: (open: boolean) => void
  openModal: () => void
  closeModal: () => void
  toggle: () => void
}

export const MODAL_KEY: InjectionKey<ModalContext> = Symbol('AnimatedModal')
