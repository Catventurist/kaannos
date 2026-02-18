<script lang='ts' setup>
const props = withDefaults(
  defineProps<{
    label?: string
    value?: string
    change?: string
    trend?: 'up' | 'down'
    avatar?: string
    alt?: string
    assignedTo?: string
    role?: string
    tags?: string // TODO to array
  }>(),
  {
    label: 'Project Progress',
    value: '68%',
    change: '+5%',
    trend: 'up',
    avatar: '/cat.png',
    alt: 'JD',
    assignedTo: 'John Doe',
    role: 'Project Manager',
    tags: 'In Progress'
  }
)
</script>

<template>
  <UCard>
    <div>
      <div class="mb-4 flex items-center justify-between">
        <p class="text-sm font-medium text-muted">
          {{ props.label }}
        </p>
        <UButton
          icon="lucide-info"
          variant="ghost"
          size="sm"
        />
      </div>
      <div class="space-y-3">
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-bold tracking-tight">
            {{ props.value }}
          </h3>
          <div class="flex items-center gap-1">
            <Icon
              :name="props.trend === 'up' ? 'lucide-arrow-up' : 'lucide-arrow-down'"
              :class="[
                'size-5',
                props.trend === 'up'
                  ? 'text-success'
                  : 'text-error'
              ]"
            />
            <span
              :class="[
                'text-lg font-bold',
                props.trend === 'up'
                  ? 'text-success'
                  : 'text-warning'
              ]"
            >
              {{ props.change }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UAvatar
            :src="props.avatar"
            alt="props.alt"
            size="sm"
          />
          <div class="text-xs">
            <p class="font-medium">
              {{ props.assignedTo }}
            </p>
            <p class="text-muted">
              {{ props.role }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <UBadge
            :label="props.tags"
            variant="outline"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
