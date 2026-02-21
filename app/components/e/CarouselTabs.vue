<script setup lang="ts">
const manyItems = [
  { label: 'Account', icon: 'lucide-user' },
  { label: 'Password', icon: 'lucide-lock' },
  { label: 'Notifications', icon: 'lucide-bell' },
  { label: 'Settings', icon: 'lucide-settings' },
  { label: 'Messages', icon: 'lucide-message-circle' },
  { label: 'Inbox', icon: 'lucide-mail' },
  { label: 'Calendar', icon: 'lucide-calendar' },
  { label: 'Favorites', icon: 'lucide-star' },
  { label: 'Archive', icon: 'lucide-archive' },
  { label: 'Trash', icon: 'lucide-trash' }
]
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold">
      Draggable Carousel
    </h3>
    <p class="text-muted text-sm">
      When items exceed the container width, the list becomes scrollable and draggable.
    </p>
    <div class="rounded-xl border border-muted bg-default/80 p-10 flex justify-center overflow-hidden">
      <div class="w-[350px]">
        <MAnimatedTabs :items="manyItems" :content="false" />
      </div>
    </div>
  </div>
</template>
