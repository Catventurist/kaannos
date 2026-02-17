import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isNotificationsSlideoverOpen = ref(false)
  const { locale } = useI18n()
  defineShortcuts({
    'g-h': () => router.push('/' + locale.value + '/dash'),
    'g-i': () => router.push('/' + locale.value + '/inbox'),
    'g-c': () => router.push('/' + locale.value + '/customers'),
    'g-s': () => router.push('/' + locale.value + '/settings'),
    'n': () => isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value
  })

  watch(() => route.fullPath, () => {
    isNotificationsSlideoverOpen.value = false
  })

  return {
    isNotificationsSlideoverOpen
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
