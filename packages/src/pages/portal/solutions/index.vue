<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto pt-2 pb-12 px-4">
      <!-- 顶部标题区域 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-3">{{ t('solutions.integrated.title') }}</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('solutions.integrated.subtitle') }}
        </p>
      </div>

      <!-- 主导航标签 -->
      <div class="flex flex-wrap gap-4 justify-center mb-12">
        <button
          v-for="section in sections"
          :key="section.value"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all"
          :class="[
            activeSection === section.value
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          ]"
          @click="activeSection = section.value"
        >
          {{ t(`solutions.sections.${section.value}`) }}
        </button>
      </div>

      <!-- 解决方案部分 -->
      <div v-if="activeSection === 'solutions'" class="space-y-12">
        <!-- 解决方案分类标签 -->
        <div class="flex flex-wrap gap-2 justify-center mb-8">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :class="[
              activeTab === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-accent hover:text-accent-foreground border border-border'
            ]"
            @click="activeTab = tab.value"
          >
            {{ t(`solutions.tabs.${tab.value}`) }}
          </button>
        </div>

        <!-- 解决方案卡片 -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="solution in filteredSolutions"
            :key="solution.id"
            class="border w-full rounded-lg overflow-hidden bg-background border-border hover:shadow-md transition-all duration-300"
          >
            <div class="h-48 overflow-hidden">
              <img 
                :src="solution.image" 
                :alt="t(`solutions.solutions.${solution.id}.title`)"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
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
              <div class="space-y-3 mb-4">
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
              <button 
                class="w-full mt-2 inline-flex items-center justify-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                @click="showSolutionDetail(solution.id)"
              >
                {{ t('solutions.viewMore') }}
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 案例部分 -->
      <div v-if="activeSection === 'cases'" class="space-y-12">
        <!-- 案例分类标签 -->
        <div class="flex flex-wrap gap-2 justify-center mb-8">
          <button
            v-for="filter in filters"
            :key="filter.value"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            :class="[
              activeFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-accent hover:text-accent-foreground border border-border'
            ]"
            @click="activeFilter = filter.value"
          >
            {{ t(`cases.filters.${filter.value}`) }}
          </button>
        </div>

        <!-- 特色案例（第一个） -->
        <div v-if="filteredCases.length > 0" class="mb-10">
          <div class="grid md:grid-cols-2 gap-6 bg-card border rounded-xl overflow-hidden">
            <div class="overflow-hidden">
              <img
                :src="filteredCases[0].image"
                :alt="t(`cases.items.${filteredCases[0].id}.title`)"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-8 flex flex-col justify-center">
              <div class="inline-flex items-center gap-2 mb-3">
                <div class="p-1.5 rounded-md bg-primary/10 text-primary">
                  <component :is="filteredCases[0].icon" class="size-4" />
                </div>
                <span class="text-sm font-medium text-muted-foreground">
                  {{ t(`cases.items.${filteredCases[0].id}.industry`) }}
                </span>
              </div>
              <h2 class="text-2xl font-bold mb-4">
                {{ t(`cases.items.${filteredCases[0].id}.title`) }}
              </h2>
              <p class="text-muted-foreground mb-6">
                {{ t(`cases.items.${filteredCases[0].id}.description`) }}
              </p>
              <div class="space-y-3 mb-6">
                <div 
                  v-for="(result, index) in filteredCases[0].results" 
                  :key="index" 
                  class="flex items-center gap-2.5"
                >
                  <div class="p-1 rounded-full bg-primary/10 text-primary">
                    <svg
                      class="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span class="text-sm">{{ t(`cases.items.${filteredCases[0].id}.results.${index}`) }}</span>
                </div>
              </div>
              <a 
                href="#" 
                class="inline-flex items-center text-primary hover:underline"
              >
                {{ t('cases.viewDetails') }}
                <svg 
                  class="ml-1.5 size-4" 
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
              </a>
            </div>
          </div>
        </div>

        <!-- 其他案例 -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(caseItem, index) in filteredCases.slice(1)"
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
                <div v-for="(result, resultIndex) in caseItem.results" :key="resultIndex" class="flex items-center gap-2">
                  <svg
                    class="size-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span class="text-sm">{{ t(`cases.items.${caseItem.id}.results.${resultIndex}`) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="mt-16 py-8 bg-primary/5 rounded-xl">
        <div class="p-6 max-w-4xl mx-auto text-center">
          <h3 class="text-2xl font-semibold mb-4">{{ t('solutions.contact.title') }}</h3>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 主要部分切换
const sections = [
  { value: 'solutions', label: t('solutions.sections.solutions') },
  { value: 'cases', label: t('solutions.sections.cases') },
]
const activeSection = ref('solutions')

// 解决方案部分
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
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop',
  },
  {
    id: 'finance',
    icon: 'Landmark',
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2187&auto=format&fit=crop',
  },
  {
    id: 'travel',
    icon: 'Globe',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2274&auto=format&fit=crop',
  },
  {
    id: 'enterprise',
    icon: 'Building',
    category: 'enterprise',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2170&auto=format&fit=crop',
  },
  {
    id: 'digital',
    icon: 'CreditCard',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'b2b',
    icon: 'Briefcase',
    category: 'enterprise',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
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

const showSolutionDetail = (id: string) => {
  console.log(`显示解决方案详情: ${id}`)
  // 这里可以添加导航到详情页的逻辑
}

// 案例部分
interface CaseItem {
  id: string
  category: string
  image: string
  icon: string
  results: number
}

const activeFilter = ref('all')

const filters = [
  { value: 'all', label: t('cases.filters.all') },
  { value: 'ecommerce', label: t('cases.filters.ecommerce') },
  { value: 'finance', label: t('cases.filters.finance') },
  { value: 'travel', label: t('cases.filters.travel') },
  { value: 'enterprise', label: t('cases.filters.enterprise') },
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
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Globe',
    results: 4
  }
]

const filteredCases = computed<CaseItem[]>(() => {
  let result = [];
  if (activeFilter.value === 'all') {
    result = cases;
  } else {
    result = cases.filter(caseItem => caseItem.category === activeFilter.value);
  }
  
  // 将旅游酒店类别的案例放在前面，更加突出显示
  if (activeFilter.value === 'all' || activeFilter.value === 'travel') {
    const travelCases = result.filter(item => item.category === 'travel');
    const otherCases = result.filter(item => item.category !== 'travel');
    result = [...travelCases, ...otherCases];
  }
  
  return result;
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
</script> 