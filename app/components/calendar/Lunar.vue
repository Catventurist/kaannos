<script setup lang="ts">
const phases = [
  { name: 'New Moon', icon: '🌑', description: 'The beginning of the lunar cycle, symbolizing new beginnings.', days: 1 },
  { name: 'Waxing Crescent', icon: '🌒', description: 'The moon grows brighter, representing growth and progress.', days: 7 },
  { name: 'First Quarter', icon: '🌓', description: 'Half of the moon is illuminated, marking a point of balance.', days: 7 },
  { name: 'Waxing Gibbous', icon: '🌔', description: 'The moon continues to grow, nearing its full phase.', days: 7 },
  { name: 'Full Moon', icon: '🌕', description: 'The moon is fully illuminated, symbolizing completeness and fruition.', days: 1 },
  { name: 'Waning Gibbous', icon: '🌖', description: 'The moon begins to wane, representing reflection and letting go.', days: 7 },
  { name: 'Last Quarter', icon: '🌗', description: 'Half of the moon is illuminated, marking a point of transition.', days: 7 },
  { name: 'Waning Crescent', icon: '🌘', description: 'The moon diminishes in brightness, signaling the end of the cycle.', days: 7 }
]

const selectedPhase = ref<number | null>(null)
const currentPhase = computed(() =>
  selectedPhase.value !== null ? phases[selectedPhase.value] : null
)

const selectPhase = (index: number) => {
  selectedPhase.value = index
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">
      Lunar Calendar
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="(phase, index) in phases"
        :key="index"
        class="border-2 border-muted rounded-full p-4 duration-300 hover:border-primary transition-colors cursor-pointer"
        :class="{ 'border-info': selectedPhase === index }"
        @click="selectPhase(index)"
      >
        <div class="text-center">
          <div class="text-4xl mb-2">
            {{ phase.icon }}
          </div>
          <h2 class="text-xl font-bold mb-2">
            {{ phase.name }}
          </h2>
          <p class="text-sm text-muted">
            {{ phase.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="selectedPhase !== null" class="mt-8 p-4 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">
        Selected Phase:
        {{ currentPhase?.name }}
      </h2>
      <p class="text-lg">
        {{ currentPhase?.description }}
      </p>
    </div>
  </div>
</template>
