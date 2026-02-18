<script lang='ts' setup>
import type { HTMLAttributes } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'
import { Motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    icon?: string
    color?: VariantProps<typeof styles>['color']
    theme?: VariantProps<typeof styles>['theme']
    size?: VariantProps<typeof styles>['size']
  }>(),
  {
    color: 'primary',
    theme: 'modern',
    size: 'lg',
    icon: 'lucide-cat'
  }
)

const styles = tv({
  base: 'relative flex shrink-0 items-center justify-center',
  variants: {
    theme: {
      'light': 'rounded-full',
      'gradient': 'rounded-full text-default *:z-10 before:absolute before:inset-0 before:size-full before:rounded-full before:border before:mask-b-from-0% after:absolute after:block after:rounded-full',
      'dark': 'text-default before:absolute before:inset-px before:border before:border-default/10 before:mask-b-from-0%',
      'modern': 'bg-default ring-1 ring-inset',
      'modern-neue': [
        'ring-1 ring-inset before:absolute before:inset-1 dark:bg-muted/40',
        'before:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_3px_3px_0px_rgba(0,0,0,0.09),1px_8px_5px_0px_rgba(0,0,0,0.05),2px_21px_6px_0px_rgba(0,0,0,0),0px_0px_0px_1px_rgba(0,0,0,0.08),1px_13px_5px_0px_rgba(0,0,0,0.01),0px_-2px_2px_0px_rgba(0,0,0,0.13)_inset] before:ring-1 before:ring-default'
      ],
      'outline': 'before:absolute before:rounded-full before:border-2 after:absolute after:rounded-full after:border-2'
    },
    size: {
      sm: '*:size-4',
      md: '*:size-5',
      lg: '*:size-6',
      xl: '*:size-7'
    },
    color: {
      primary: '',
      gray: '',
      error: '',
      warning: '',
      success: '',
      info: ''
    }
  },

  compoundVariants: [
    {
      theme: ['dark', 'modern'],
      class:
        'shadow-[0px_0px_0px_1px_rgba(10,13,18,0.18)_inset,0px_-2px_0px_0px_rgba(10,13,18,0.05)_inset,0px_1px_2px_rgba(10,13,18,0.05)]'
    },
    // Light sizes
    { theme: 'light', size: 'sm', class: 'size-8' },
    { theme: 'light', size: 'md', class: 'size-10' },
    { theme: 'light', size: 'lg', class: 'size-12' },
    { theme: 'light', size: 'xl', class: 'size-14' },
    // Light colors
    {
      theme: 'light',
      color: 'primary',
      class: 'bg-primary/10 text-primary'
    },
    { theme: 'light', color: 'gray', class: 'bg-muted text-muted' },
    {
      theme: 'light',
      color: 'error',
      class: 'bg-red-500/10 text-red-500 dark:bg-red-500 dark:text-default'
    },
    {
      theme: 'light',
      color: 'warning',
      class: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500 dark:text-default'
    },
    {
      theme: 'light',
      color: 'success',
      class: 'bg-green-500/10 text-green-500 dark:bg-green-500 dark:text-default'
    },
    {
      theme: 'light',
      color: 'info',
      class: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500 dark:text-default'
    },
    { theme: 'gradient', size: 'sm', class: 'size-8 after:size-6 [*>svg]:size-4' },
    { theme: 'gradient', size: 'md', class: 'size-10 after:size-7 [*>svg]:size-4' },
    { theme: 'gradient', size: 'lg', class: 'size-12 after:size-8 [*>svg]:size-5' },
    { theme: 'gradient', size: 'xl', class: 'size-14 after:size-10 [*>svg]:size-5' },
    {
      theme: 'gradient',
      color: 'primary',
      class:
        'before:border-primary/40 before:bg-primary/10 before:text-default after:bg-primary after:text-default'
    },
    {
      theme: 'gradient',
      color: 'gray',
      class:
        'before:border-muted/20 before:bg-muted/10 after:bg-muted dark:before:bg-muted/50'
    },
    {
      theme: 'gradient',
      color: 'error',
      class: 'before:border-red-800/20 before:bg-red-500/10 after:bg-red-500'
    },
    {
      theme: 'gradient',
      color: 'warning',
      class: 'before:border-amber-800/20 before:bg-amber-500/10 after:bg-amber-500'
    },
    {
      theme: 'gradient',
      color: 'success',
      class: 'before:border-green-800/20 before:bg-green-500/10 after:bg-green-500'
    },
    {
      theme: 'gradient',
      color: 'info',
      class: 'before:border-blue-800/20 before:bg-blue-500/10 after:bg-blue-500'
    },
    { theme: 'dark', size: 'sm', class: 'size-8 rounded-md before:rounded-[5px]' },
    { theme: 'dark', size: 'md', class: 'size-10 rounded-lg before:rounded-[7px]' },
    { theme: 'dark', size: 'lg', class: 'size-12 rounded-[10px] before:rounded-[9px]' },
    { theme: 'dark', size: 'xl', class: 'size-14 rounded-xl before:rounded-[11px]' },
    { theme: 'dark', color: 'primary', class: 'bg-primary before:border-primary/12' },
    {
      theme: 'dark',
      color: 'gray',
      class: 'bg-muted/80 before:border-muted/12'
    },
    { theme: 'dark', color: 'error', class: 'bg-red-500 before:border-red-800/12' },
    {
      theme: 'dark',
      color: 'warning',
      class: 'bg-amber-500 before:border-amber-800/12'
    },
    {
      theme: 'dark',
      color: 'success',
      class: 'bg-green-500 before:border-green-800/12'
    },
    {
      theme: 'dark',
      color: 'info',
      class: 'bg-blue-500 before:border-blue-800/12'
    },
    { theme: 'modern', size: 'sm', class: 'size-8 rounded-md' },
    { theme: 'modern', size: 'md', class: 'size-10 rounded-lg' },
    { theme: 'modern', size: 'lg', class: 'size-12 rounded-[10px]' },
    { theme: 'modern', size: 'xl', class: 'size-14 rounded-xl' },
    {
      theme: 'modern',
      class: 'text-default ring-default'
    },
    { theme: 'modern-neue', size: 'sm', class: 'size-8 rounded-[8px] before:rounded-[4px]' },
    { theme: 'modern-neue', size: 'md', class: 'size-10 rounded-[10px] before:rounded-[6px]' },
    { theme: 'modern-neue', size: 'lg', class: 'size-12 rounded-[12px] before:rounded-[8px]' },
    { theme: 'modern-neue', size: 'xl', class: 'size-14 rounded-[14px] before:rounded-[10px]' },
    {
      theme: 'modern-neue',
      class: 'text-default ring-default'
    },
    { theme: 'outline', size: 'sm', class: 'size-4 before:size-6 after:size-8.5' },
    { theme: 'outline', size: 'md', class: 'size-5 before:size-7 after:size-9.5' },
    { theme: 'outline', size: 'lg', class: 'size-6 before:size-8 after:size-10.5' },
    { theme: 'outline', size: 'xl', class: 'size-7 before:size-9 after:size-11.5' },
    {
      theme: 'outline',
      color: 'primary',
      class: 'text-primary before:border-primary/30 after:border-primary/10'
    },
    {
      theme: 'outline',
      color: 'gray',
      class:
        'text-muted before:border-muted/30 after:border-muted/10'
    },
    {
      theme: 'outline',
      color: 'error',
      class: 'text-red-500 before:border-red-500/30 after:border-red-500/10'
    },
    {
      theme: 'outline',
      color: 'warning',
      class: 'text-amber-500 before:border-amber-500/30 after:border-amber-500/10'
    },
    {
      theme: 'outline',
      color: 'success',
      class: 'text-green-500 before:border-green-500/30 after:border-green-500/10'
    },
    {
      theme: 'outline',
      color: 'info',
      class: 'text-blue-500 before:border-blue-500/30 after:border-blue-500/10'
    }
  ],
  defaultVariants: { theme: 'dark', size: 'md', color: 'primary' }
})
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0 }"
    :in-view="{ opacity: 1 }"
    :hover="{ scale: 1.1 }"
    :press="{ scale: 0.9 }"
    :class="styles({ class: props.class, color, size, theme })"
  >
    <Icon
      v-if="icon"
      :name="icon"
    />
  </Motion>
</template>
