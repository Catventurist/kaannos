<script setup lang="ts">
interface Props {
  class?: string
}

const props = defineProps<Props>()

const iconRef = ref()

const startAnimation = () => {
  iconRef.value?.startAnimation()
}

const stopAnimation = () => {
  iconRef.value?.stopAnimation()
}

const handleButtonEnter = () => {
  startAnimation()
}

const handleButtonLeave = () => {
  stopAnimation()
}
defineExpose({
  iconRef
})
</script>

<template>
  <button :class="['size-full aspect-square rounded cursor-pointer', props.class]" @mouseenter="handleButtonEnter" @mouseleave="handleButtonLeave">
    <slot :ref="(el: any) => (iconRef = el)" :controlled="true" />
  </button>
</template>
