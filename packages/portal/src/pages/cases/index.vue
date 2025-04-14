<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-2">成功案例</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          探索我们的客户如何通过Sphere支付解决方案实现业务增长
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
          {{ filter.label }}
        </button>
      </div>

      <!-- 案例展示 -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="caseItem in filteredCases"
          :key="caseItem.title"
          class="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="caseItem.image"
              :alt="caseItem.title"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <div class="p-1.5 rounded-md bg-primary/10 text-primary">
                <component :is="caseItem.icon" class="size-4" />
              </div>
              <span class="text-sm font-medium text-muted-foreground">{{ caseItem.industry }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ caseItem.title }}</h3>
            <p class="text-muted-foreground mb-4">{{ caseItem.description }}</p>
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
                <span class="text-sm">{{ result }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="mt-16 text-center">
        <h3 class="text-2xl font-semibold mb-4">准备好开始您的成功故事了吗？</h3>
        <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
          我们的团队随时准备帮助您实现业务增长目标。立即联系我们，了解如何为您的业务定制支付解决方案。
        </p>
        <a
          href="/contact"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
        >
          联系我们
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Filter {
  value: string
  label: string
}

interface CaseItem {
  title: string
  description: string
  industry: string
  category: string
  image: string
  icon: string
  results: string[]
}

const activeFilter = ref<string>('all')

const filters: Filter[] = [
  { value: 'all', label: '全部案例' },
  { value: 'ecommerce', label: '电子商务' },
  { value: 'finance', label: '金融服务' },
  { value: 'travel', label: '旅游酒店' },
  { value: 'enterprise', label: '企业服务' },
]

const cases: CaseItem[] = [
  {
    title: '全球电商平台',
    description: '通过我们的支付解决方案，实现了跨境交易量增长300%',
    industry: '电子商务',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'ShoppingBag',
    results: [
      '支付成功率提升至98%',
      '支持50+国家本地支付方式',
      '月交易额突破1亿美元',
      '客户满意度提升40%'
    ]
  },
  {
    title: '国际银行',
    description: '成功部署跨境支付系统，提升客户体验和运营效率',
    industry: '金融服务',
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    icon: 'Landmark',
    results: [
      '跨境支付处理时间缩短70%',
      '系统可用性达到99.99%',
      '客户投诉率降低60%',
      '运营成本降低30%'
    ]
  },
  {
    title: '连锁酒店集团',
    description: '整合全球支付系统，提升预订体验和收入',
    industry: '旅游酒店',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Hotel',
    results: [
      '预订转化率提升45%',
      '支持20+种货币结算',
      '客户满意度提升35%',
      '收入增长25%'
    ]
  },
  {
    title: '跨国企业',
    description: '实现全球资金管理和支付自动化',
    industry: '企业服务',
    category: 'enterprise',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Building',
    results: [
      '支付处理效率提升80%',
      '运营成本降低40%',
      '资金周转率提升50%',
      '合规风险降低60%'
    ]
  },
  {
    title: '跨境电商平台',
    description: '通过本地化支付解决方案拓展新兴市场',
    industry: '电子商务',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'ShoppingBag',
    results: [
      '新兴市场收入增长200%',
      '本地支付方式覆盖率达95%',
      '客户满意度提升50%',
      '支付失败率降低70%'
    ]
  },
  {
    title: '国际旅行社',
    description: '整合多币种支付系统，提升预订体验',
    industry: '旅游酒店',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    icon: 'Globe',
    results: [
      '预订转化率提升60%',
      '支持30+种货币结算',
      '客户满意度提升45%',
      '收入增长35%'
    ]
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

const Globe = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  `,
}
</script> 