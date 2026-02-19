<script setup lang="ts">
import { Motion } from 'motion-v'

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

const items = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

const events = [
  {
    id: 1,
    title: 'Responsive Design in 2024',
    event: 'FrontEnd Summit',
    role: 'Keynote Speaker',
    date: 'March 15, 2024',
    location: 'San Francisco, CA',
    summary:
      'Discussed emerging trends in responsive design and how AI is changing the way we build adaptable interfaces.',
    image: '/catbirchdark.webp',
    link: '#'
  },
  {
    id: 2,
    title: 'UX Workshop: User Research Techniques',
    event: 'DesignMatters Conference',
    role: 'Workshop Leader',
    date: 'January 28, 2024',
    location: 'Virtual Event',
    summary:
      'Hands-on workshop teaching practical user research methods that can be implemented on any budget.',
    image: '/catbirchdark.webp',
    link: '#'
  },
  {
    id: 3,
    title: 'Building Accessible Web Applications',
    event: 'A11y Summit',
    role: 'Panel Moderator',
    date: 'November 12, 2023',
    location: 'Chicago, IL',
    summary:
      'Led a panel discussion on best practices for building truly accessible digital products from the ground up.',
    image: '/catbirchdark.webp',
    link: '#'
  },
  {
    id: 4,
    title: 'From Freelancer to Agency Owner',
    event: 'Freelance Business Forum',
    role: 'Featured Speaker',
    date: 'October 5, 2023',
    location: 'Austin, TX',
    summary:
      'Shared my journey and practical advice for freelancers looking to scale their business and build a team.',
    image: '/catbirchdark.webp',
    link: '#'
  },
  {
    id: 5,
    title: 'Design Systems at Scale',
    event: 'DesignOps Global',
    role: 'Workshop Leader',
    date: 'September 18, 2023',
    location: 'Berlin, Germany',
    summary:
      'A full-day workshop on creating, implementing, and maintaining design systems for enterprise organizations.',
    image: '/catbirchdark.webp',
    link: '#'
  },
  {
    id: 6,
    title: 'Conversion-Focused Web Design',
    event: 'Marketing Innovation Summit',
    role: 'Speaker',
    date: 'July 22, 2023',
    location: 'New York, NY',
    summary:
      'Presented strategies for creating websites that balance exceptional user experience with business conversion goals.',
    image: '/catbirchdark.webp',
    link: '#'
  }
]
</script>

<template>
  <section class="bg-default py-16 md:py-24">
    <div class="container mx-auto px-4">
      <div class="mb-12 text-center justify-center md:mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {{ $t('events.title') }}
        </h2>
        <p class="text-muted mx-auto mt-4 max-w-2xl text-lg">
          {{ $t('events.description') }}
        </p>
      </div>
      <Motion
        initial="hidden"
        animate="visible"
        :variants="container"
        :transition="{ type: 'spring', delayChildren: 0.5, staggerChildren: 0.2 }"
        as="div"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Motion
          v-for="event in events"
          :key="event.id"
          :variants="items"
          as="div"
          class="flex flex-col overflow-hidden rounded-md px-1 duration-300 hover:bg-radial-[at_25%_25%] from-transparent to-primary/10 to-75%"
        >
          <div class="relative h-48 w-full overflow-hidden">
            <NuxtImg
              :src="event.image"
              :alt="event.title"
              fill
              class="object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-default/60 via-default/20 to-transparent" />
            <div class="absolute bottom-4 left-4 rounded-full bg-default/80 px-2 border border-primary">
              {{ event.role }}
            </div>
          </div>
          <div>
            <h3 class="line-clamp-2 text-md font-semibold">
              {{ event.title }}
            </h3>
            <p class="text-primary font-medium">
              {{ event.event }}
            </p>
          </div>
          <div class="grow">
            <div class="mb-4 flex flex-col space-y-2">
              <div class="text-muted flex items-center text-sm">
                <Icon name="lucide-calendar" class="mr-2 size-4 text-primary" />
                {{ event.date }}
              </div>
              <div class="text-muted flex items-center text-sm">
                <Icon name="lucide-map-pin" class="mr-2 size-4 text-primary" />
                {{ event.location }}
              </div>
            </div>
            <p class="text-muted line-clamp-3 text-sm">
              {{ event.summary }}
            </p>
          </div>
          <div class="p-2 flex flex-col items-end">
            <NuxtLink :to="event.link" class="group text-primary flex items-center">
              <span class="mr-2">
                {{ $t('events.details') }}
              </span>
              <Icon name="lucide-arrw-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </Motion>
      </Motion>
    </div>
    <div class="mt-12 text-center">
      <NuxtLink to="/" class="inline-flex p-2 duration-300 hover:text-primary hover:bg-muted/40 rounded-xl bg-primary/20 items-center gap-2">
        <Icon name="lucide-mic" class="size-4" />
        <span>
          {{ $t('events.more') }}
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
