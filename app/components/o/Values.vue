<script lang='ts' setup>
const benefits = [
  {
    icon: 'lucide-home',
    title: 'Remote-First',
    description: 'Work from anywhere with flexible hours'
  },
  {
    icon: 'lucide-graduation-cap',
    title: 'Learning Budget',
    description: 'Brain budget for courses, conferences, and certifications'
  },
  {
    icon: 'lucide-heart-pulse',
    title: 'Health & Wellness',
    description: 'Personal health knowledge is the key'
  },
  {
    icon: 'lucide-sparkles',
    title: 'Career Growth',
    description: 'Everyone benefits'
  }
]

const culturePoints = [
  {
    icon: 'lucide-users',
    title: 'Human-centered',
    description: 'We appreciate human traits, such as curiousity and empathy. No slop.',
    tags: ['Creative', 'Innovative', 'Belonging']
  },
  {
    icon: 'lucide-lightbulb',
    title: 'Innovation & Experimentation',
    description: 'We encourage trying new things, learning from failures, and pushing boundaries.',
    tags: ['Creative', 'Bold', 'Forward-Thinking']
  },
  {
    icon: 'lucide-handshake',
    title: 'Transparency & Trust',
    description: 'Open communication, honest feedback, and building trust at every level of the organization.',
    tags: ['Open', 'Honest', 'Accountable']
  },
  {
    icon: 'lucide-crown',
    title: 'Spirituality',
    description: 'Personal beliefs, habits and customs are important.',
    tags: ['Spiritual', 'Aware', 'Deep']
  }
]
</script>

<template>
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">
        Our Culture & Values
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">
        What makes us unique and drives our success
      </p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-2">
      <ol class="mx-4">
        <h3 class="text-3xl font-bold text-info">
          Culture First
        </h3>
        <li class="mt-4">
          We believe that a strong culture is the foundation of success.
        </li>
        <li class="mt-4">
          Our community is built on trust, respect, and a shared commitment to excellence.
        </li>
        <div class="mt-4 space-y-2">
          <UCard
            v-for="benefit in benefits"
            :key="benefit.title"
            class="duration-300 hover:bg-radial from-primary/10"
          >
            <Icon
              :name="benefit.icon"
              class="self-center"
            />
            <div>
              <h4 class="leading-none font-semibold">
                {{ benefit.title }}
              </h4>
              <p class="mt-1.5 text-sm text-muted">
                {{ benefit.description }}
              </p>
            </div>
          </UCard>
        </div>
      </ol>

      <div class="space-y-4">
        <UCard
          v-for="culture in culturePoints"
          :key="culture.title"
          class="duration-300 hover:bg-radial from-primary/10"
        >
          <div>
            <div class="flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon
                  :name="culture.icon"
                  class="size-6 text-primary"
                />
              </div>
              <div>
                <h4 class="font-semibold">
                  {{ culture.title }}
                </h4>
                <p class="mt-2 text-sm text-muted">
                  {{ culture.description }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in culture.tags"
                    :key="tag"
                    variant="soft"
                    class="text-xs"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
