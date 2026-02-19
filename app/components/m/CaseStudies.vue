<script setup lang="ts">
const head = ref([{
  icon: 'lucide:users',
  title: 'Real results from real users',
  description: '+1 Satisfied Customer'
}])

const studies = ref([
  {
    image: '/cat.png',
    quote: 'This productivity tool transformed how we collaborate. Our teams workflow improved dramatically, and we have cut meeting time by half while increasing output.',
    name: 'Kitten',
    title: 'Director',
    avatar: '/hero/random-1.avif',
    stats: {
      fnumber: '98%',
      ftitle: 'Customer Satisfaction',
      fdescription: 'From verified reviews',
      snumber: '1.8x',
      stitle: 'Speed Improvement',
      sdescription: 'From last version'
    }
  }, {
    image: '/catbirchdark.webp',
    quote: 'The interface is intuitive and customizable to our needs. We implemented it across departments with minimal training and saw immediate results.',
    name: 'Cat',
    title: 'Coder',
    avatar: '/hero/random-2.avif',
    stats: {
      fnumber: '4.2x',
      ftitle: 'Team Effort',
      fdescription: 'Value gain',
      snumber: '72%',
      stitle: 'Reduced Task Time',
      sdescription: 'Across all projects'
    }
  }])
</script>

<template>
  <div class="container py-32">
    <div v-for="item in head" :key="item.title" class="group/head flex flex-col gap-6 items-center">
      <Icon :name="item.icon" class="text-2xl text-primary duration-300 group-hover/head:scale-110" />
      <p class="font-medium text-xl text-muted  duration-300 group-hover/head:text-default">
        {{ item.title }}
      </p>
      <h2 class="text-4xl font-medium md:text-5xl duration-300 group-hover/head:text-primary">
        {{ item.description }}
      </h2>
    </div>
    <div class="mt-20">
      <div class="grid gap-12 lg:grid-cols-2 xl:gap-24">
        <div v-for="item in studies" :key="item.title" class="group/case flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
          <NuxtImg :src="item.image" alt="cat" class="aspect-29/35 size-full duration-300 group-hover/case:rotate-2 max-w-60 rounded-2xl object-cover" />
          <div class="flex h-full flex-col justify-between gap-10">
            <q class="sm:text-xl mt-10 text-center text-muted duration-300 group-hover/case:text-default">
              {{ item.quote }}
            </q>
            <div class="flex items-end gap-6">
              <div class="flex flex-col gap-1">
                <p class="text-lg font-semibold text-primary">
                  {{ item.name }}
                </p>
                <p class="text-muted duration-300 group-hover/case:text-default">
                  {{ item.title }}
                </p>
              </div>
              <NuxtImg :src="item.avatar" alt="logo" class="size-20 rounded-full duration-300 group-hover/case:scale-110" />
            </div>
          </div>
          <div class="group/stu min-w-40 flex gap-10 self-center lg:flex-col">
            <div class="flex flex-col gap-2">
              <p class="text-4xl font-medium text-primary sm:text-5xl duration-300 group-hover/stu:text-default">
                {{ item.stats.fnumber }}
              </p>
              <p class="font-semibold text-primary">
                {{ item.stats.ftitle }}
              </p>
              <p class="text-muted duration-300 group-hover/stu:text-default">
                {{ item.stats.fdescription }}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-4xl font-medium text-primary sm:text-5xl duration-300 group-hover/stu:text-default">
                {{ item.stats.snumber }}
              </p>
              <p class="font-semibold text-primary">
                {{ item.stats.stitle }}
              </p>
              <p class="text-muted duration-300 group-hover/stu:text-default">
                {{ item.stats.sdescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
