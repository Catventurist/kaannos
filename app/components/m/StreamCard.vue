<script setup lang="ts">
interface streamProps {
  sample?: number
  speed?: number
  text?: string
}
const props = withDefaults(defineProps<streamProps>(), {
  sample: 1,
  speed: 50,
  text: `# The Lost Key
## A Tale of Mystery

* Sarah woke up to find her favorite golden key missing from its usual spot
* She remembered using it last night to lock her diary
* The search began:
  * Under the bed - nothing but dust
  * In her coat pockets - empty
  * On her desk - just scattered papers

> "Sometimes what we're looking for is right where we least expect it"

* As she made her bed, something shiny caught her eye
* The key had slipped between the pages of her book
* With a smile, she realized she'd been using it as a bookmark

*The End*`
})

const content = ref('')
const isStreaming = ref(false)

watchEffect(() => {
  if (!isStreaming.value) {
    return
  }

  let currentIndex = 0
  const words = props.text.split(' ')

  const streamInterval = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(streamInterval)
      isStreaming.value = false
      return
    }

    const nextChunk = words.slice(0, currentIndex + props.sample).join(' ')
    content.value = nextChunk
    currentIndex += 1
  }, props.speed)

  return () => clearInterval(streamInterval)
})

const handleStart = () => {
  content.value = ''
  isStreaming.value = true
}
</script>

<template>
  <UCard class="w-full overflow-y-auto">
    <template #header>
      <UButton
        :leading-icon="isStreaming ? 'lucide-refresh-cw' : 'lucide-play'"
        :disabled="isStreaming"
        variant="soft"
        @click="handleStart"
      />
    </template>
    <div class="p-4 w-full text-pretty font-mono rounded-md overflow-y-auto">
      <MDC :value="content" unwrap="p" />
    </div>
  </UCard>
</template>
