<script setup lang="ts">
/**
 * @title Advanced Localized Glossary
 * @description Interactive glossary with copy-to-clipboard, audio, and search capabilities.
 * @icon i-lucide-book-open-check
 */

interface GlossaryEntry {
  definition: string
  category?: string
  synonyms?: string[]
  audioUrl?: string
  source?: string
}

interface LocalizedData {
  [key: string]: GlossaryEntry
}

const props = withDefaults(defineProps<{
  term: string
  data: LocalizedData
  fallbackLocale?: string
  size?: 'sm' | 'sm' | 'md' | 'lg'
  variant?: 'dotted' | 'solid' | 'highlight'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | undefined
  showCopy?: boolean
  showSearch?: boolean
  enableAudio?: boolean
  title?: string
  description?: string
  icon?: string
}>(), {
  fallbackLocale: 'en',
  size: 'sm',
  variant: 'dotted',
  color: 'primary',
  showCopy: true,
  showSearch: true,
  enableAudio: false,
  title: 'Glossary Term',
  description: 'Find definitions',
  icon: 'i-ludide-file-badge'
})

const { locale } = useI18n()
const toast = useToast()

const entry = computed(() => {
  return props.data[locale.value] || props.data[props.fallbackLocale]
})

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(`${props.term}: ${entry.value?.definition}`)
    toast.add({
      title: 'Copied to clipboard',
      icon: 'i-lucide-check-circle',
      color: 'success'
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    toast.add({
      title: 'Failed to copy',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
}

const openExternalSearch = () => {
  const query = encodeURIComponent(props.term)
  window.open(`https://www.startpage.com/sp/search?q=define+${query}`, '_blank')
}

const playAudio = () => {
  if (entry.value?.audioUrl) {
    new Audio(entry.value.audioUrl).play()
  }
}

const variantClasses = {
  dotted: 'border-b border-dotted',
  solid: 'border-b-2',
  highlight: 'bg-opacity-10 px-1 rounded'
}
</script>

<template>
  <UPopover mode="hover" :popper="{ placement: 'top', offsetDistance: 12 }">
    <UButton
      :label="term"
      :class="[
        'block font-semibold transition-colors duration-200 text-left',
        variantClasses[variant],
        `text-${color}`,
        variant === 'highlight' ? `bg-${color}/20` : `border-${color}/40`
      ]"
    />
    <template #content>
      <div v-if="entry" class="p-4 min-w-80 rounded-xl space-y-4 shadow-md shadow-primary">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <h4 class="font-bold">
              {{ term }}
            </h4>
            <div v-if="entry.category" class="flex gap-2">
              <UBadge size="sm" variant="subtle" :color="color">
                {{ entry.category }}
              </UBadge>
            </div>
          </div>
          <div class="flex gap-1">
            <UButton
              v-if="enableAudio && entry.audioUrl"
              icon="i-lucide-volume-2"
              variant="ghost"
              color="info"
              size="sm"
              @click="playAudio"
            />
            <UButton
              v-if="showCopy"
              icon="i-lucide-copy"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="handleCopy"
            />
          </div>
        </div>

        <p class="text-sm leading-relaxed text-muted">
          {{ entry.definition }}
        </p>

        <div v-if="entry.synonyms?.length" class="flex flex-wrap gap-1 items-center">
          <span class="text-sm uppercase font-bold text-muted mr-1">
            Synonyms:
          </span>
          <UBadge
            v-for="s in entry.synonyms"
            :key="s"
            variant="outline"
            size="sm"
            class="opacity-80"
          >
            {{ s }}
          </UBadge>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-muted">
          <span class="text-sm text-muted italic">
            Source: {{ entry.source || 'Internal' }}
          </span>
          <UButton
            v-if="showSearch"
            label="Search Web"
            icon="i-lucide-search"
            variant="link"
            size="sm"
            :color="color"
            @click="openExternalSearch"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>

<!-- ::trans-glossary{term=Hydration variant=highlight color=blue :enableAudio=true}
---
data:
  en:
    definition: The process of client-side JavaScript taking over the static HTML sent by the server to make it interactive.
    category: Performance
    synonyms: [Client-side Bootstrapping, Rehydration]
    source: Nuxt Docs
    audioUrl: /
  fi:
    definition: Prosessi, jossa asiakaspuolen JavaScript ottaa haltuunsa palvelimen lähettämän staattisen HTML-koodin tehden siitä interaktiivisen.
    category: Suorituskyky
    synonyms: [Hydraatio, Uudelleenaktivointi]
    source: Nuxt Dokumentaatio
    audioUrl: /
---
:: -->
