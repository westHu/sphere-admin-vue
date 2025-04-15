<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-2">{{ t('solutions.title') }}</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('solutions.subtitle') }}
        </p>
      </div>

      <div class="mb-8">
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :class="[
              activeTab === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-accent hover:text-accent-foreground'
            ]"
            @click="activeTab = tab.value"
          >
            {{ t(`solutions.tabs.${tab.value}`) }}
          </button>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="solution in filteredSolutions"
            :key="solution.id"
            class="border w-full rounded-lg overflow-hidden bg-background border-border hover:shadow-md transition-shadow duration-300"
          >
            <div class="size-full bg-repeat bg-[length:30px_30px] bg-dot-pattern-light dark:bg-dot-pattern">
              <div class="size-full bg-gradient-to-tr from-background/90 via-background/40 to-background/10">
                <div class="p-6">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <component :is="solution.icon" class="size-5" />
                    </div>
                    <h3 class="text-lg font-semibold text-foreground leading-tight">
                      {{ t(`solutions.solutions.${solution.id}.title`) }}
                    </h3>
                  </div>
                  <p class="text-sm text-foreground/70 mb-5 leading-relaxed">
                    {{ t(`solutions.solutions.${solution.id}.description`) }}
                  </p>
                  <div class="space-y-3">
                    <div
                      v-for="(feature, index) in getFeatures(solution.id)"
                      :key="index"
                      class="flex items-center gap-2.5"
                    >
                      <div class="p-1 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <svg
                          class="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                      <span class="text-sm text-foreground/80 leading-relaxed">{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 rounded-md border bg-card text-card-foreground shadow">
        <div class="p-6">
          <h3 class="text-center text-2xl font-semibold leading-none tracking-tight">
            {{ t('solutions.contact.title') }}
          </h3>
          <div class="flex flex-col items-center mt-4">
            <p class="text-center text-muted-foreground mb-6 max-w-2xl">
              {{ t('solutions.contact.description') }}
            </p>
            <a
              href="/contact"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
            >
              {{ t('solutions.contact.cta') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeTab = ref('all')

const tabs = [
  { value: 'all', label: t('solutions.tabs.all') },
  { value: 'ecommerce', label: t('solutions.tabs.ecommerce') },
  { value: 'finance', label: t('solutions.tabs.finance') },
  { value: 'travel', label: t('solutions.tabs.travel') },
  { value: 'enterprise', label: t('solutions.tabs.enterprise') },
]

const solutions = [
  {
    id: 'ecommerce',
    icon: 'ShoppingBag',
    category: 'ecommerce',
  },
  {
    id: 'finance',
    icon: 'Landmark',
    category: 'finance',
  },
  {
    id: 'travel',
    icon: 'Globe',
    category: 'travel',
  },
  {
    id: 'enterprise',
    icon: 'Building',
    category: 'enterprise',
  },
  {
    id: 'digital',
    icon: 'CreditCard',
    category: 'ecommerce',
  },
  {
    id: 'b2b',
    icon: 'Briefcase',
    category: 'enterprise',
  },
]

const filteredSolutions = computed(() => {
  if (activeTab.value === 'all') {
    return solutions
  }
  return solutions.filter(solution => solution.category === activeTab.value)
})

const getFeatures = (solutionId: string): string[] => {
  const features = t(`solutions.solutions.${solutionId}.features`)
  return Array.isArray(features) ? features : []
}

// 图标组件
const ShoppingBag = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  `,
}

const Landmark = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="2" />
      <path d="M12 2v6" />
      <path d="M17 2v6" />
      <path d="M7 2v6" />
      <path d="M3 14h18" />
    </svg>
  `,
}

const Globe = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  `,
}

const Building = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  `,
}

const CreditCard = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  `,
}

const Briefcase = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  `,
}
</script> 