<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-2">{{ t('cases.title') }}</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('cases.subtitle') }}
        </p>
      </div>

      <!-- 筛选器 -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          :class="[
            activeFilter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-background hover:bg-accent hover:text-accent-foreground'
          ]"
          @click="activeFilter = filter.value"
        >
          {{ t(`cases.filters.${filter.value}`) }}
        </button>
      </div>

      <!-- 案例展示 -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="caseItem in filteredCases"
          :key="caseItem.id"
          class="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="caseItem.image"
              :alt="t(`cases.items.${caseItem.id}.title`)"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <div class="p-1.5 rounded-md bg-primary/10 text-primary">
                <component :is="caseItem.icon" class="size-4" />
              </div>
              <span class="text-sm font-medium text-muted-foreground">{{ t(`cases.items.${caseItem.id}.industry`) }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ t(`cases.items.${caseItem.id}.title`) }}</h3>
            <p class="text-muted-foreground mb-4">{{ t(`cases.items.${caseItem.id}.description`) }}</p>
            <div class="space-y-2">
              <div v-for="(result, index) in caseItem.results" :key="index" class="flex items-center gap-2">
                <svg
                  class="size-4 text-primary"
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
                <span class="text-sm">{{ t(`cases.items.${caseItem.id}.results.${index}`) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="mt-16 text-center">
        <h3 class="text-2xl font-semibold mb-4">{{ t('cases.contact.title') }}</h3>
        <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {{ t('cases.contact.description') }}
        </p>
        <a
          href="/contact"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
        >
          {{ t('cases.contact.button') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Filter {
  value: string
  label: string
}

interface CaseItem {
  id: string
  category: string
  image: string
  icon: string
  results: number
}

const activeFilter = ref<string>('all')

const filters: Filter[] = [
  { value: 'all', label: 'all' },
  { value: 'ecommerce', label: 'ecommerce' },
  { value: 'finance', label: 'finance' },
  { value: 'travel', label: 'travel' },
  { value: 'enterprise', label: 'enterprise' },
]

const cases: CaseItem[] = [
  {
    id: 'globalEcommerce',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'ShoppingBag',
    results: 4
  },
  {
    id: 'internationalBank',
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    icon: 'Landmark',
    results: 4
  },
  {
    id: 'hotelChain',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Hotel',
    results: 4
  },
  {
    id: 'multinational',
    category: 'enterprise',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Building',
    results: 4
  },
  {
    id: 'crossBorderEcommerce',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'ShoppingBag',
    results: 4
  },
  {
    id: 'travelAgency',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    icon: 'Globe',
    results: 4
  }
]

const filteredCases = computed<CaseItem[]>(() => {
  if (activeFilter.value === 'all') {
    return cases
  }
  return cases.filter(caseItem => caseItem.category === activeFilter.value)
})

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
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  `,
}

const Hotel = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m9 16 .348-.24a1 1 0 0 1 1.304 0l.348.24" />
      <path d="M8 7h.01" />
      <path d="M16 7h.01" />
      <path d="M12 7h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 11h.01" />
      <path d="M10 22V14" />
      <path d="M14 22V14" />
    </svg>
  `,
}

const Building = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
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

const Globe = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  `,
}
</script> 