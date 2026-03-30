<script setup lang='ts'>
interface Step {
  label: string
  description: string
  icon?: string
  badge?: string
  status?: 'pending' | 'active' | 'completed'
}

interface Props {
  title?: string
  info?: string
  steps?: Step[]
  color?: 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral' | undefined
  variant?: 'outline' | 'soft' | 'solid'
  size?: 'sm' | 'md' | 'lg'
  deployLabel?: string
  deployUrl?: string
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Vercel Deployment Flow',
  info: 'Nuxt Studio works best with Vercel for fast deployments and global edge distribution.',
  steps: () => [],
  color: 'primary',
  variant: 'outline',
  size: 'md',
  deployLabel: 'Deploy to Vercel',
  deployUrl: 'https://vercel.com/new',
  showProgress: true
})

const currentStep = ref(0)
const prog = computed(() => ((currentStep.value + 1) / props.steps.length) * 100)
</script>

<template>
  <UCard :variant="variant" :class="`border-${color}/40`">
    <template #header>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <Icon name="lucide:cloud-upload" :class="`text-${color} size-6`" />
          <h3 class="text-xl font-bold">
            {{ props.title }}
          </h3>
        </div>
        <p v-if="info" class="text-sm text-muted">
          {{ info }}
        </p>
      </div>
    </template>

    <div class="space-y-6">
      <div class="flex flex-col gap-3">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="group cursor-pointer p-3 rounded-lg border transition-colors"
          :class="[
            currentStep === index
              ? `bg-${color}/20 border-${color}/40`
              : 'bg-transparent border-muted hover:border-primary/40'
          ]"
          @click="currentStep = index"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Icon
                :name="step.icon || 'lucide:circle-check'"
                class="size-5"
                :class="currentStep === index ? `text-${color}` : 'text-muted'"
              />
              <span class="font-medium text-sm" :class="currentStep === index ? 'text-default' : 'text-muted'">
                {{ step.label }}
              </span>
            </div>
            <UBadge
              v-if="step.badge"
              :label="step.badge"
              :color="color"
              variant="soft"
              size="sm"
            />
          </div>

          <div v-if="currentStep === index" class="mt-2 ml-8">
            <p class="text-sm text-muted leading-relaxed">
              {{ step.description }}
            </p>
            <div class="mt-3">
              <slot :name="`step-${index}`" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <UProgress
          v-if="showProgress"
          v-model="prog"
          :color="color"
          :max="100"
          size="sm"
          class="w-1/2"
        />
        <div class="flex gap-2">
          <UButton
            v-if="currentStep === steps.length - 1"
            :color="color"
            :to="deployUrl"
            :label="deployLabel"
            icon="lucide:external-link"
            variant="soft"
            target="_blank"
          />
          <UButton
            v-else
            label="Next"
            variant="ghost"
            color="neutral"
            @click="currentStep++"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<!-- ::deploy-guide
---
color: info
variant: soft
info: Deploy your documentation with Nuxt Studio for real-time visual editing and Git synchronization.
steps:
  - label: Enable Studio API
    description: In your project settings, ensure the Studio module is active and you have generated your access token.
    icon: lucide:layers
    badge: Dashboard
  - label: Define Environment
    description: Add NUXT_PUBLIC_STUDIO_TOKENS to your Vercel Project settings. This links your site to the editor.
    icon: lucide:shield-check
  - label: Configure Nitro
    description: Nuxt Studio Documentation uses the Nitro engine to optimize static and dynamic content for Vercel.
    icon: lucide:zap
    badge: Performance
  - label: Branch Strategy
    description: Connect your main branch for production. Studio will create preview branches for your edits.
    icon: lucide:git-pull-request
---

#step-1
::tip{title=Important}
Always keep your token secret and never commit it to public repositories.
::

#step-3
**Tip:** Enable 'Production Branch Protection' in GitHub to ensure all Studio changes are reviewed via PR.
:: -->
