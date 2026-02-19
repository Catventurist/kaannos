<script setup lang="ts">
const hasReadToBottom = ref(false)
const contentRef = ref<HTMLDivElement | null>(null)
const open = ref(false)
const handleScroll = () => {
  const content = contentRef.value
  if (!content) return

  const scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight)
  if (scrollPercentage >= 0.99 && !hasReadToBottom.value) {
    hasReadToBottom.value = true
  }
}
</script>

<template>
  <UModal v-model:open="open" :overlay="false" :title="$t('terms.title')">
    <UButton variant="ghost" icon="lucide:scale" />
    <template #body>
      <div class="flex flex-col justify-center sm:max-h-[min(640px,60vh)] [&>button:last-child]:top-3.5">
        <div ref="contentRef" class="overflow-y-auto" @scroll="handleScroll">
          <div class="">
            <div class="space-y-4">
              <h2 class="text-xl">
                {{ $t('terms.accept') }}
              </h2>
              <p class="text-text-muted">
                {{ $t('terms.acceptdesc') }}
              </p>
              <h2 class="text-xl">
                {{ $t('terms.account') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.accountdesc') }}
              </p>

              <h2 class="text-xl">
                {{ $t('terms.content') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.contentdesc') }}
              </p>
              <h2 class="text-xl">
                {{ $t('terms.limit') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.limitdesc') }}
              </p>
              <div>
                <h2 class="text-xl">
                  {{ $t('terms.conduct.label') }}
                </h2>
                <ul class="text-muted list-disc pl-6">
                  <li>{{ $t('terms.conduct.upload') }}</li>
                  <li>{{ $t('terms.conduct.respect') }}</li>
                  <li>{{ $t('terms.conduct.avoid') }}</li>
                  <li>{{ $t('terms.conduct.comply') }}</li>
                </ul>
              </div>
              <h2 class="text-xl">
                {{ $t('terms.modif') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.modifdesc') }}
              </p>
              <h2 class="text-xl">
                {{ $t('terms.termination') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.terminationdesc') }}
              </p>
              <h2 class="text-xl">
                {{ $t('terms.law') }}
              </h2>
              <p class="text-muted">
                {{ $t('terms.lawdesc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton
        variant="ghost"
        icon="lucide:ban"
        :label="$t('terms.decline')"
        @click="open = false"
      />
      <UButton
        :disabled="!hasReadToBottom"
        variant="subtle"
        icon="lucide:check"
        :label="$t('terms.accept')"
        @click="open = false"
      />
    </template>
  </UModal>
</template>
