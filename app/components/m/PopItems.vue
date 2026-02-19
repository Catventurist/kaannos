<script setup lang="ts">
import {
  PopoverAnchor, PopoverArrow, PopoverClose, PopoverPortal,
  PopoverRoot,
  PopoverContent,
  PopoverTrigger
} from 'reka-ui'

interface TourStep {
  icon: string
  title: string
  description: string
}

const tourSteps: TourStep[] = [
  {
    icon: 'lucide:heart',
    title: 'Heart',
    description:
      'This is your new workspace. Here you will find all your projects, recent activities, settings, and more.'
  },
  {
    icon: 'lucide:diamond',
    title: 'Diamond',
    description:
      'Use the toolbar above to create new projects, invite team members, or access settings.'
  },
  {
    icon: 'lucide:club',
    title: 'Club',
    description:
      'Click the support icon in the top right corner to access our help center and documentation.'
  },
  {
    icon: 'lucide:spade',
    title: 'Spade',
    description:
      'Press ⌘K to open the command palette. Use arrow keys to navigate and Enter to select an action.'
  }
]

const currentTip = ref(0)

const handleNavigation = () => {
  if (currentTip.value === tourSteps.length - 1) {
    currentTip.value = 0
  } else {
    currentTip.value++
  }
}

const handleOpenChange = (open: boolean) => {
  if (open) {
    currentTip.value = 0
  }
}

const currentStep = computed(() => {
  const step = tourSteps[currentTip.value]
  if (!step) throw new Error('Tour step not found')
  return step
})
</script>

<template>
  <div class="container flex flex-col gap-4 size-150">
    <PopoverRoot @open-change="handleOpenChange">
      <div class="grid grid-cols-2 place-items-center gap-8">
        <template v-for="(step, index) in tourSteps" :key="step.title">
          <div
            class="bg-muted/70 text-primary duration-300 hover:bg-primary/20 active:scale-110 flex size-10 items-center justify-center rounded-md text-sm font-medium"
            :class="{ 'popover-anchor': currentTip === index }"
          >
            <Icon :name="step.icon" class="text-xl" />
            <PopoverAnchor />
          </div>
        </template>
      </div>
      <PopoverTrigger as-child>
        <UButton label="Start tour" variant="outline" class="justify-center" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent class="max-w-[280px] px-4 bg-muted/20 rounded-xl backdrop-blur-md" :side="currentTip % 2 === 0 ? 'left' : 'right'" show-arrow>
          <PopoverClose />
          <PopoverArrow />
          <div class="space-y-3">
            <div class="space-y-1">
              <p class="text-lg text-primary">
                {{ currentStep.title }}
              </p>
              <p class="text-default text-xs">
                {{ currentStep.description }}
              </p>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-muted text-xs">
                {{ currentTip + 1 }}/{{ tourSteps.length }}
              </span>
              <UButton variant="subtle" @click="handleNavigation">
                {{ currentTip === tourSteps.length - 1 ? "Start over" : "Next" }}
              </UButton>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
