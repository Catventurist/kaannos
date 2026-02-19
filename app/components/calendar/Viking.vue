<script setup lang="ts">
const months = [
  { name: 'Harvest Month', icon: '🌾', description: 'Time of gathering crops and preparing for winter.' },
  { name: 'Wolf Month', icon: '🐺', description: 'Month of hunting and survival in the wild.' },
  { name: 'Storm Month', icon: '🌪️', description: 'Season of harsh weather and naval storms.' },
  { name: 'Sprint Month', icon: '🏃', description: 'Time for racing, competitions, and physical challenges.' },
  { name: 'Growth Month', icon: '🌱', description: 'Period of plant growth and agricultural activities.' },
  { name: 'Sun Month', icon: '☀️', description: 'Celebration of the suns strength and longest days.' },
  { name: 'Hay Month', icon: '🧺', description: 'Season for cutting and storing hay for winter.' },
  { name: 'First Harvest', icon: '🌾', description: 'First major crop harvest of the year.' },
  { name: 'Second Harvest', icon: '🌾', description: 'Final harvest before winter begins.' },
  { name: 'Wine Month', icon: '🍇', description: 'Time for wine-making and fermentation.' },
  { name: 'Snow Month', icon: '❄️', description: 'Month of heavy snowfall and winter activities.' },
  { name: 'Yule Month', icon: '🎄', description: 'Festive month celebrating the winter solstice.' }
]

const selectedMonth = ref<number | null>(null)
const currentMonth = computed(() =>
  selectedMonth.value !== null ? months[selectedMonth.value] : null
)

const selectMonth = (index: number) => {
  selectedMonth.value = index
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">
      Viking Calendar
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="(month, index) in months"
        :key="index"
        class="border border-muted rounded-lg p-4 duration-300 hover:border-primary/60 cursor-pointer"
        @click="selectMonth(index)"
      >
        <div class="group text-center gap-4">
          <p class="text-2xl duration-300 group-hover:scale-110">
            {{ month.icon }}
          </p>
          <h2 class="text-xl font-bold duration-300 group-hover:text-primary">
            {{ month.name }}
          </h2>
          <p class="text-sm text-muted duration-300 group-hover:text-primary">
            {{ month.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="selectedMonth !== null" class="mt-8 p-4 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">
        Selected Month:
        <span class="text-primary">
          {{ currentMonth?.icon }}{{ currentMonth?.name }}
        </span>
      </h2>
      <p class="text-lg text-muted">
        {{ currentMonth?.description }}
      </p>
    </div>
  </div>
</template>
