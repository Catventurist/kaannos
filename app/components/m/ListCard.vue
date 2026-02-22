<script setup lang="ts">
const customerData = {
  customerName: 'Catventurist',
  phone: '+(7)-777-7777',
  email: 'cat@mail.com',
  website: 'cat.cat',
  address: {
    city: 'Costa del Sol',
    state: 'Andalucia',
    zipCode: '94210',
    country: 'Spain'
  },
  socialPlatforms: [
    {
      name: 'Hive',
      icon: 'simple-icons-hive-blockchain',
      to: '/'
    },
    {
      name: 'Telegram',
      icon: 'simple-icons-telegram',
      to: '/'
    },
    {
      name: 'Signal',
      icon: 'simple-icons-signal',
      to: '/'
    }
  ]
}
</script>

<template>
  <UCard class="relative max-w-md duration-300 hover:bg-radial from-primary/20 to-default/60" variant="subtle">
    <div class="flex flex-col gap-2 mb-2">
      <h2 class="text-xl">
        {{ $t('lists.detailsc') }}
      </h2>
      <UButton
        variant="ghost"
        icon="lucide:wrench"
        :label="$t('lists.editc')"
        to="/"
        class="text-sm -ms-1.5"
      />
    </div>
    <div class="flex items-center gap-2.5">
      <div class="flex items-center justify-center size-5">
        <Icon name="lucide:phone" class="size-4 text-muted" />
      </div>
      <div class="flex items-center justify-between flex-1">
        <span class="text-sm text-muted font-medium">
          {{ $t('lists.phone') }}
        </span>
        <UBadge variant="soft">
          {{ customerData.phone }}
        </UBadge>
      </div>
    </div>
    <div class="flex items-center gap-2.5">
      <div class="flex items-center justify-center size-5">
        <Icon name="lucide:mail" class="size-4 text-muted" />
      </div>
      <div class="flex items-center justify-between flex-1">
        <span class="text-sm text-muted font-medium">
          {{ $t('lists.email') }}
        </span>
        <UBadge variant="soft">
          {{ customerData.email }}
        </UBadge>
      </div>
    </div>
    <div class="flex items-center gap-2.5">
      <div class="flex items-center justify-center size-5">
        <Icon name="lucide:globe" class="size-4 text-muted" />
      </div>
      <div class="flex items-center justify-between flex-1">
        <span class="text-sm text-muted font-medium">
          {{ $t('lists.website') }}
        </span>
        <UBadge variant="soft">
          {{ customerData.website }}
        </UBadge>
      </div>
    </div>
    <div class="flex items-center gap-2.5">
      <div class="flex items-center justify-center size-5">
        <Icon name="lucide:users" class="size-4 text-muted" />
      </div>
      <div class="flex items-center justify-between flex-1">
        <span class="text-sm text-muted font-medium">
          {{ $t('lists.social') }}
        </span>
        <div class="flex items-center gap-2">
          <NuxtLink
            v-for="platform in customerData.socialPlatforms"
            :key="platform.name"
            :to="platform.to"
            class="flex items-center justify-center size-8 rounded-full overflow-hidden"
          >
            <Icon :name="platform.icon" :alt="platform.name" class="size-5 object-contain text-primary" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex items-start gap-2.5">
      <div class="flex items-center justify-center size-5 mt-0.5">
        <Icon name="lucide:map-pin" class="size-4 text-muted" />
      </div>
      <div class="flex items-start justify-between flex-1">
        <span class="text-sm text-muted font-medium">
          {{ $t('lists.address') }}
        </span>
        <div class="flex flex-col">
          <UBadge size="sm" variant="soft">
            {{ customerData.address.city }}, {{ customerData.address.state }}
          </UBadge>
          <UBadge size="sm" variant="soft" class="justify-end">
            {{ customerData.address.zipCode }} {{ customerData.address.country }}
          </UBadge>
        </div>
      </div>
    </div>
  </UCard>
</template>
