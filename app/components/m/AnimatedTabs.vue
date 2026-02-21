<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'

export interface TabItem {
  label: string
  icon?: any
  slot?: string
  content?: string
  disabled?: boolean
  value?: string | number
  [key: string]: any
}

interface Props {
  modelValue?: string | number
  items?: TabItem[]
  defaultIndex?: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'pill' | 'link'
  content?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  defaultIndex: 0,
  orientation: 'horizontal',
  variant: 'pill',
  content: true
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeIndex = ref(props.defaultIndex)
const tabRefs = ref<HTMLElement[]>([])
const containerRef = ref<HTMLElement | null>(null)

const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const isDragging = ref(false)

const markerStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translate(0px, 0px)',
  opacity: 0
})

const selected = computed({
  get() {
    if (props.modelValue !== undefined) return props.modelValue
    return activeIndex.value
  },
  set(val) {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', val)
    } else {
      activeIndex.value = Number(val)
    }
    emit('change', val)
  }
})

const currentNumericIndex = computed(() => {
  if (props.items && props.items.length > 0) {
    const idx = props.items.findIndex((item, i) =>
      (item.value ?? i) === selected.value
    )
    return idx !== -1 ? idx : 0
  }
  return typeof selected.value === 'number' ? selected.value : 0
})

const updateMarker = () => {
  const el = tabRefs.value[currentNumericIndex.value]
  if (!el || !containerRef.value) {
    markerStyle.value.opacity = 0
    return
  }

  const left = el.offsetLeft
  const top = el.offsetTop
  const width = el.offsetWidth
  const height = el.offsetHeight

  if (props.variant === 'link') {
    markerStyle.value = {
      width: `${width}px`,
      height: '2px',
      transform: `translate(${left}px, ${height - 2}px)`,
      opacity: 1
    }
  } else {
    markerStyle.value = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${left}px, ${top}px)`,
      opacity: 1
    }
  }
}

const setTabRef = (el: any, index: number) => {
  if (el) tabRefs.value[index] = el.$el || el
}

const setContainerRef = (el: any) => {
  if (el) containerRef.value = el.$el || el
}

const startDrag = (e: MouseEvent) => {
  if (!containerRef.value) return
  isDown.value = true
  isDragging.value = false

  startX.value = e.pageX
  scrollLeft.value = containerRef.value.scrollLeft
}

const stopDrag = () => {
  isDown.value = false
  setTimeout(() => isDragging.value = false, 100)
}

const doDrag = (e: MouseEvent) => {
  if (!isDown.value || !containerRef.value) return
  e.preventDefault()

  const x = e.pageX
  const walk = (x - startX.value) * 1

  if (Math.abs(walk) > 5) isDragging.value = true

  containerRef.value.scrollLeft = scrollLeft.value - walk
}

const handleTriggerClick = (e: MouseEvent) => {
  if (isDragging.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}

watch(
  () => [currentNumericIndex.value, props.variant, props.orientation, props.items],
  async () => {
    await nextTick()
    updateMarker()
  },
  { deep: true }
)

onMounted(async () => {
  await nextTick()
  updateMarker()
  window.addEventListener('resize', updateMarker)
})
</script>

<template>
  <TabsRoot
    v-model="selected"
    :orientation="orientation"
    class="w-full flex flex-col"
    :class="props.class"
  >
    <TabsList
      :ref="setContainerRef"
      class="relative flex items-center gap-1 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none bg-transparent backdrop-blur-sm"
      :class="[
        orientation === 'vertical' ? 'flex-col items-stretch' : 'flex-row',
        variant === 'pill' ? 'p-1' : 'p-0'
      ]"
      @mousedown="startDrag"
      @mouseleave="stopDrag"
      @mouseup="stopDrag"
      @mousemove="doDrag"
    >
      <div
        class="absolute top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] pointer-events-none"
        :class="[
          variant === 'pill'
            ? 'bg-inverted/10 shadow-sm shadow-primary rounded-lg border border-default/50'
            : 'bg-muted rounded-t-sm z-20'
        ]"
        :style="markerStyle"
      />
      <TabsTrigger
        v-for="(item, index) in items"
        :key="index"
        :ref="(el) => setTabRef(el, index)"
        :value="item.value ?? index"
        :disabled="item.disabled"
        class="relative z-10 flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap shrink-0 data-[state=inactive]:text-muted data-[state=active]:text-elevated hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          variant === 'pill' ? 'rounded-lg' : 'rounded-none hover:bg-muted/50',
          isDragging ? 'pointer-events-none' : ''
        ]"
        @click.capture="handleTriggerClick"
      >
        <slot
          name="default"
          :item="item"
          :index="index"
          :selected="selected === (item.value ?? index)"
        >
          <Icon v-if="item.icon" :name="item.icon" class="size-4" />
          <span>{{ item.label }}</span>
        </slot>
      </TabsTrigger>
    </TabsList>

    <div v-if="content" class="mt-4">
      <TabsContent
        v-for="(item, index) in items"
        :key="index"
        :value="item.value ?? index"
        class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      >
        <slot
          :name="item.slot || 'item'"
          :item="item"
          :index="index"
          :selected="selected === (item.value ?? index)"
        >
          <div v-if="item.content">
            {{ item.content }}
          </div>
        </slot>
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
