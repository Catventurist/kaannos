<script setup lang="ts">
/**
 * @title Localized Media
 * @description A multi-language media switcher for images and videos with subtitle and transcript support.
 * @icon i-lucide-monitor-play
 */

interface SubtitleTrack {
  label: string
  srclang: string
  src: string
  default?: boolean
}

interface MediaSources {
  [key: string]: {
    url: string
    alt: string
    type: 'image' | 'video'
    description?: string
    transcript?: string
    subtitles?: SubtitleTrack[]
  }
}

const props = withDefaults(defineProps<{
  sources: MediaSources
  title?: string
  description?: string
  fallbackLocale?: string
  aspectRatio?: 'square' | 'video' | 'auto'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  objectFit?: 'cover' | 'contain' | 'fill'
  showBadge?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  enableTranscript?: boolean
}>(), {
  fallbackLocale: 'en',
  aspectRatio: 'video',
  rounded: 'md',
  objectFit: 'cover',
  showBadge: true,
  autoPlay: false,
  muted: true,
  loop: true,
  enableTranscript: true
})

const { locale } = useI18n()
const isTranscriptOpen = ref(false)

const currentMedia = computed(() => {
  return props.sources[locale.value] || props.sources[props.fallbackLocale]
})

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  auto: 'aspect-auto'
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}
</script>

<template>
  <div v-if="currentMedia" class="space-y-4">
    <div v-if="title || description" class="space-y-1">
      <h3 v-if="title" class="text-lg font-bold">
        {{ title }}
      </h3>
      <p v-if="description" class="text-sm text-muted">
        {{ description }}
      </p>
    </div>

    <div
      :class="[
        'relative overflow-hidden group border border-muted',
        aspectClasses[aspectRatio],
        roundedClasses[rounded]
      ]"
    >
      <template v-if="currentMedia.type === 'image'">
        <NuxtImg
          :src="currentMedia.url"
          :alt="currentMedia.alt"
          :class="[
            'w-full h-full transition-transform duration-500 group-hover:scale-105',
            objectFit === 'cover' ? 'object-cover' : 'object-contain'
          ]"
        />
      </template>

      <template v-else-if="currentMedia.type === 'video'">
        <video
          :src="currentMedia.url"
          :autoplay="autoPlay"
          :muted="muted"
          :loop="loop"
          controls
          crossorigin="anonymous"
          :class="[
            'w-full h-full',
            objectFit === 'cover' ? 'object-cover' : 'object-contain'
          ]"
        >
          <track
            v-for="track in currentMedia.subtitles"
            :key="track.srclang"
            kind="subtitles"
            :label="track.label"
            :srclang="track.srclang"
            :src="track.src"
            :default="track.default"
          >
        </video>
      </template>

      <div class="absolute top-3 left-3 flex gap-2 z-10">
        <UBadge
          v-if="showBadge"
          color="success"
          variant="subtle"
          class="flex items-center gap-1.5 backdrop-blur-md bg-opacity-70"
        >
          <UIcon name="i-lucide-globe" class="size-4" />
          <span class="text-sm font-medium uppercase tracking-wider">{{ locale }}</span>
        </UBadge>

        <UButton
          v-if="currentMedia.subtitles?.length"
          icon="i-lucide-captions"
          size="sm"
          color="info"
          variant="soft"
          class="backdrop-blur-md bg-opacity-70"
        />
      </div>
    </div>

    <!-- <div v-if="enableTranscript && currentMedia.transcript" class="flex justify-end">
      <UButton
        v-if="enableTranscript && currentMedia.transcript"
        label="View Transcript"
        icon="i-lucide-file-text"
        color="neutral"
        variant="ghost"
        size="sm"
        @click="isTranscriptOpen = true"
      />
    </div> -->

    <UModal
      v-model="isTranscriptOpen"
      scrollable
      :title="`Transcript (${locale})`"
      close-icon="i-lucide-arrow-right"
    >
      <UButton
        v-if="enableTranscript && currentMedia.transcript"
        label="View Transcript"
        icon="i-lucide-file-text"
        color="neutral"
        variant="ghost"
        @click="isTranscriptOpen = true"
      />
      <template #content>
        <div class="flex p-4 text-sm text-pretty leading-relaxed whitespace-pre-line">
          {{ currentMedia.transcript }}
        </div>
        <!-- <UCard>
           <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 flex items-center gap-2">
                <UIcon name="i-lucide-file-text" />
                Transcript ({{ locale }})
              </h3>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-x"
                @click="isTranscriptOpen = false"
              />
            </div>
          </template>
          <div class="p-4 text-sm text-pretty leading-relaxed text-muted whitespace-pre-line">
            {{ currentMedia.transcript }}
          </div>
        </UCard>  -->
      </template>
    </UModal>
  </div>
</template>

<!-- ::trans-media
---
title: Platform Introduction
description: A comprehensive guide to getting started with our tools.
aspectRatio: video
rounded: lg
sources:
  en:
    url: /
    type: video
    alt: English introduction video overview
    transcript: |
      Welcome to the platform introduction.
      In this session, we will explore the core features.
      You will learn how to set up your first project efficiently.
    subtitles:
      - label: English
        srclang: en
        src: /vtt/intro-en.vtt
        default: true
  fi:
    url: /
    type: video
    alt: Suomenkielinen esittelyvideo
    transcript: |
      Tervetuloa alustan esittelyyn.
      Tässä osiossa tutustumme keskeisiin ominaisuuksiin.
      Opit kuinka määrität ensimmäisen projektisi tehokkaasti.
    subtitles:
      - label: Suomi
        srclang: fi
        src: /vtt/intro-fi.vtt
---
:: -->
