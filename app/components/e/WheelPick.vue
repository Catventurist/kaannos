<script setup lang="ts">
const timeState = ref({ hour: 9, minute: 41, ampm: 'AM' })

const hours = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: (i + 1).toString().padStart(2, '0') }))
const minutes = Array.from({ length: 60 }, (_, i) => ({ value: i, label: i.toString().padStart(2, '0') }))
const meridiem = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => ({ value: i, label: m }))
const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))
const years = Array.from({ length: 50 }, (_, i) => ({ value: 2026 - i, label: (2026 - i).toString() }))
const dateState = ref({ month: 2, day: 21, year: 2026 })
</script>

<template>
  <div class="relative flex w-64 flex-col items-center justify-center overflow-hidden rounded-3xl border border-muted bg-default/80 shadow-2xl shadow-primary">
    <div class="absolute top-0 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-muted/80" />
    <MWheelPickerWrapper>
      <MWheelPicker
        v-model="dateState.month"
        :options="months"
        infinite
        class="flex-2"
      />
      <MWheelPicker
        v-model="dateState.day"
        :options="days"
        infinite
        class="flex-1"
      />
      <MWheelPicker
        v-model="dateState.year"
        :options="years"
        infinite
        class="flex-1"
      />
    </MWheelPickerWrapper>
    <MWheelPickerWrapper class="w-full px-6">
      <MWheelPicker v-model="timeState.hour" :options="hours" infinite />
      <MWheelPicker v-model="timeState.minute" :options="minutes" infinite />
      <MWheelPicker v-model="timeState.ampm" :options="meridiem" />
    </MWheelPickerWrapper>
  </div>
</template>
