<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from 'reka-ui'

import { Motion, AnimatePresence } from 'motion-v'
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger>
      <AnimatePresence>
        <Motion
          as="div"
          :initial="{ rotate: 90, scale: 0 }"
          :animate="{ rotate: 0, scale: 1 }"
          :transition="{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }"
          :while-hover="{ scale: 1.2 }"
          :while-press="{ scale: 0.90 }"
          class="p-2 duration-300 hover:text-default hover:bg-transparent text-primary"
        >
          <Icon name="lucide-info" :size="16" aria-hidden="true" />
        </Motion>
      </AnimatePresence>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="p-2 flex flex-col items-start gap-4 bg-muted/60 rounded-lg">
        <DropdownMenuLabel class="text-success">
          Need help?
        </DropdownMenuLabel>
        <DropdownMenuItem class="cursor-pointer flex items-center gap-2 focus:bg-transparent focus:underline" as-child>
          <NuxtLink to="#">
            <Icon
              name="lucide-book"
              class="text-primary"
              aria-hidden="true"
            />
            Documentation
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer flex items-center gap-2 focus:bg-transparent focus:underline" as-child>
          <NuxtLink to="#">
            <Icon
              name="lucide-life-buoy"
              :size="16"
              class="text-warning"
              aria-hidden="true"
            />
            Support
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer flex items-center gap-2 focus:bg-transparent focus:underline" as-child>
          <NuxtLink to="#">
            <Icon
              name="lucide-message-circle-more"
              :size="16"
              class="text-info"
              aria-hidden="true"
            />
            Contact us
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
