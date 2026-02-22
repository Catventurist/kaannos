<script setup lang="ts">
const isPlaying = ref(false)
const source = ref('https://www.youtube.com/embed/155E3fSZHy0?autoplay=0')
</script>

<template>
  <UPageSection id="video" icon="lucide-video">
    <div class="grid gap-8 lg:grid-cols-2 items-center">
      <div class="flex flex-col gap-2 justify-center space-y-4">
        <UBadge variant="soft" class="max-w-30 text-center justify-center">
          {{ $t('video.badge') }}
        </UBadge>
        <div class="space-y-2">
          <h2 class="text-3xl sm:text-4xl md:text-5xl">
            {{ $t('video.title') }}
          </h2>
          <p class="text-muted md:text-xl">
            {{ $t('video.description') }}
          </p>
        </div>
        <ul class="space-y-2">
          <li class="flex items-center gap-2">
            <Icon name="lucide-map" class="text-primary size-4" />
            <span>
              {{ $t('video.location') }}
            </span>
          </li>
          <li class="flex items-center gap-2">
            <Icon name="lucide-heart" class="text-primary size-4" />
            <span>
              {{ $t('video.feeling') }}
            </span>
          </li>
          <li class="flex items-center gap-2">
            <Icon name="lucide-ear" class="text-primary size-4" />
            <span>
              {{ $t('video.sound') }}
            </span>
          </li>
        </ul>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <UButton
            :label="$t('video.youtube')"
            icon="lucide-video"
            variant="soft"
            to="https://www.youtube.com/@catventurist"
          />
          <UButton
            :label="$t('video.hive')"
            icon="simple-icons-hive-blockchain"
            variant="soft"
            to="https://3speak.tv/watch?v=micefy/vvypqjjamt"
          />
        </div>
      </div>
      <div class="relative aspect-video rounded-xl overflow-hidden shadow-sm shadow-primary">
        <div v-if="isPlaying" class="relative size-full">
          <button
            class="absolute top-0 inset-e-1 z-10 rounded-full bg-transparent p-1.5 duration-300 hover:backdrop-blur-sm"
            aria-label="Close video"
            @click="() => isPlaying = false"
          >
            <Icon name="lucide-x" class="size-5 text-transparent duration-300 hover:text-default" />
          </button>
          <iframe
            :src="source"
            title="Video"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            class="absolute inset-0 size-full" />
        </div>
        <div v-else class="relative size-full cursor-pointer group" @click="() => isPlaying = true">
          <NuxtImg
            src="/catbirchdark.webp"
            alt="video"
            :width="600"
            :height="340"
            class="object-cover duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="flex items-center justify-center size-8 rounded-full bg-primary/40 text-default duration-300 group-hover:scale-90">
              <Icon name="lucide-video" class="size-6" />
            </div>
          </div>
          <div class="absolute inset-0 bg-default/20 group-hover:bg-muted/40" />
        </div>
      </div>
    </div>
  </UPageSection>
</template>
