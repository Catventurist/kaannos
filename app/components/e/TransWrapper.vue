<script setup lang="ts">
/**
 * @title Glossary Wrapper
 * @description A block component that supports YAML data and wraps a phrase.
 * @icon i-lucide-text-cursor-input
 */

interface GlossaryEntry {
  definition: string
  category?: string
}

interface LocalizedData {
  [key: string]: GlossaryEntry
}

const props = defineProps<{
  term: string
  data: LocalizedData
  color?: string
}>()
</script>

<template>
  <p class="inline-block leading-relaxed">
    <slot name="before" />
    <UPopover mode="hover" :popper="{ placement: 'top' }">
      <span :class="[`font-bold border-b-2 border-dotted border-muted cursor-help text-${props.color}`]">
        {{ props.term }}
      </span>
      <template #content>
        <div class="p-4 w-64 text-sm">
          <p>{{ props.data[$i18n.locale]?.definition || props.data['en']?.definition }}</p>
        </div>
      </template>
    </UPopover>
    <slot name="after" />
  </p>
</template>
