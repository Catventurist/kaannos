<script setup lang="ts">
const time = ref(Date.now() - 3 * 24 * 60 * 60 * 1000)
</script>

<template>
  <UCard class="rounded-2xl py-4">
    <template #header>
      <div class="bg-muted flex size-8 items-center justify-center gap-2 rounded-md">
        <Icon
          name="lucide-briefcase"
          class="size-4"
        />
      </div>
      <UButton
        label="Save"
        icon="lucide-bookmark"
        size="sm"
        variant="ghost"
      />
    </template>
    <div class="flex flex-col gap-4 px-4">
      <div class="flex flex-col gap-3 border-b border-dashed pb-4">
        <div class="flex items-baseline gap-2">
          <span class="text-base font-medium">
            Nuxt
          </span>
          <NuxtTime
            :datetime="time"
            numeric="auto"
            relative
            class="text-muted text-xs"
          />
        </div>
        <h3 class="text-2xl font-semibold">
          Full Stack Developer
        </h3>
        <div class="flex items-center gap-2">
          <UBadge
            label="Contract"
            variant="outline"
          />
          <UBadge
            label="Remote"
            variant="outline"
          />
          <UBadge
            label="Full Time"
            variant="outline"
          />
        </div>
      </div>
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-col">
          <span class="font-semibold">
            $160k/year
          </span>
          <p class="text-muted text-sm font-medium">
            San Francisco, CA
          </p>
        </div>
        <UButton
          label="Apply"
          icon="lucide-arrow-right"
        />
      </div>
    </div>
  </UCard>
</template>
