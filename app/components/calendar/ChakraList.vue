<script setup lang="ts">
const chakras = [
  { name: 'Root Chakra', icon: '🩸', color: '#FF0000', description: 'Grounding and connection to the physical world.' },
  { name: 'Sacral Chakra', icon: '💧', color: '#FFA500', description: 'Creativity, sexuality, and emotional well-being.' },
  { name: 'Solar Plexus', icon: '⚡', color: '#FFFF00', description: 'Personal power, confidence, and self-esteem.' },
  { name: 'Heart Chakra', icon: '❤️', color: '#00FF00', description: 'Love, compassion, and relationships.' },
  { name: 'Throat Chakra', icon: '🗣️', color: '#00FFFF', description: 'Communication, self-expression, and truth.' },
  { name: 'Third Eye', icon: '👁️', color: '#0000FF', description: 'Intuition, wisdom, and spiritual insight.' },
  { name: 'Crown Chakra', icon: '✨', color: '#800080', description: 'Spiritual connection, enlightenment, and unity.' }
]

const selectedChakra = ref<number | null>(null)
const currentChakra = computed(() =>
  selectedChakra.value !== null ? chakras[selectedChakra.value] : null
)

const selectChakra = (index: number) => {
  selectedChakra.value = index
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">
      Chakra System
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(chakra, index) in chakras"
        :key="index"
        class="rounded-lg p-6 cursor-pointer"
        :style="{ 'border-color': chakra.color }"
        @click="selectChakra(index)"
      >
        <div class="text-center group gap-4">
          <div class="text-3xl duration-300 group-hover:scale-110">
            {{ chakra.icon }}
          </div>
          <h2 class="text-xl font-bold duration-300 group-hover:text-primary">
            {{ chakra.name }}
          </h2>
          <p class="text-sm text-muted duration-500 group-hover:text-default">
            {{ chakra.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="selectedChakra !== null" class="mt-8 p-4 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">
        Selected Chakra:
        {{ currentChakra?.icon }}
        <span class="text-primary">
          {{ currentChakra?.name }}
        </span>
      </h2>
      <p class="text-lg text-muted">
        {{ currentChakra?.description }}
      </p>
    </div>
  </div>
</template>
