<script lang='ts' setup>
const people = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Software Engineer',
    image: '/cat.png',
    to: '/'
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'Product Designer',
    image: '/catbirch.webp',
    to: '/'
  },
  {
    id: '3',
    title: 'Mike Johnson',
    description: 'DevOps Engineer',
    image: '/catbirchdark.webp',
    to: '/'
  },
  {
    id: '4',
    title: 'Sarah Williams',
    description: 'UX Researcher',
    image: '/logo-dark.webp',
    to: '/'
  },
  {
    id: '5',
    title: 'Tom Brown',
    description: 'Backend Developer',
    image: '/logo-light.webp',
    to: '/'
  }
]
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <MAvatarTooltip :items="people" />
  </div>
</template>
