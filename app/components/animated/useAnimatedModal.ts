import { inject } from 'vue'
import { MODAL_KEY } from './ModalContext'

export function useAnimatedModal() {
  const modal = inject(MODAL_KEY, null)
  if (!modal) {
    throw new Error('useAnimatedModal must be used within <AnimatedModal>')
  }
  return modal
}
