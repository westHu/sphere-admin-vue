<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight mb-2">全球支付解决方案</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          我们提供全面的国际支付解决方案，满足不同行业的需求，帮助企业拓展全球业务
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
            {{ tab.label }}
          </button>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="solution in filteredSolutions"
            :key="solution.title"
            class="border w-full rounded-md overflow-hidden bg-background border-border p-3"
          >
            <div class="size-full bg-repeat bg-[length:30px_30px] bg-dot-pattern-light dark:bg-dot-pattern">
              <div class="size-full bg-gradient-to-tr from-background/90 via-background/40 to-background/10">
                <div class="text-left p-4 md:p-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 rounded-md bg-primary/10 text-primary">
                      <component :is="solution.icon" class="size-5" />
                    </div>
                    <h3 class="text-lg font-bold text-foreground">{{ solution.title }}</h3>
                  </div>
                  <p class="text-wrap text-sm text-foreground/60 mb-4">{{ solution.description }}</p>
                  <div class="space-y-2">
                    <div v-for="(feature, index) in solution.features" :key="index" class="flex items-center gap-2">
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
                      <span class="text-sm text-foreground/80">{{ feature }}</span>
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
          <h3 class="text-center text-2xl font-semibold leading-none tracking-tight">需要定制解决方案？</h3>
          <div class="flex flex-col items-center mt-4">
            <p class="text-center text-muted-foreground mb-6 max-w-2xl">
              我们的支付专家团队可以根据您的业务需求，提供量身定制的国际支付解决方案
            </p>
            <a
              href="/contact"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
            >
              联系我们的解决方案团队
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部行业' },
  { value: 'ecommerce', label: '电子商务' },
  { value: 'finance', label: '金融服务' },
  { value: 'travel', label: '旅游酒店' },
  { value: 'enterprise', label: '企业服务' },
]

const solutions = [
  {
    title: '电子商务支付',
    description: '为全球电商平台提供无缝支付体验，支持多币种结算和本地支付方式',
    icon: 'ShoppingBag',
    category: 'ecommerce',
    features: [
      '支持200+国家和地区的支付方式',
      '一键集成购物车系统',
      '智能风控系统',
      '跨境退款自动处理',
    ],
  },
  {
    title: '金融机构解决方案',
    description: '为银行和金融机构提供安全、合规的跨境支付基础设施',
    icon: 'Landmark',
    category: 'finance',
    features: [
      '实时跨境清算系统',
      '合规监控与报告',
      'API银行服务集成',
      '机构间结算网络',
    ],
  },
  {
    title: '旅游与酒店支付',
    description: '为全球旅游企业提供多币种预订和支付解决方案',
    icon: 'Globe',
    category: 'travel',
    features: [
      '动态货币转换',
      '多语言支付界面',
      '预授权与分期付款',
      '全球退款处理',
    ],
  },
  {
    title: '企业跨境支付',
    description: '为跨国企业提供高效的全球资金管理和支付解决方案',
    icon: 'Building',
    category: 'enterprise',
    features: [
      '批量跨境转账',
      '供应商支付自动化',
      '外汇风险管理',
      '全球账户管理',
    ],
  },
  {
    title: '数字内容与订阅',
    description: '为内容创作者和订阅服务提供全球收款和结算方案',
    icon: 'CreditCard',
    category: 'ecommerce',
    features: [
      '订阅计费管理',
      '全球税务合规',
      '多级分销结算',
      '智能反欺诈系统',
    ],
  },
  {
    title: 'B2B跨境交易',
    description: '为B2B贸易提供安全、高效的国际支付和结算服务',
    icon: 'Briefcase',
    category: 'enterprise',
    features: [
      '贸易融资解决方案',
      '信用证与保函服务',
      '供应链金融',
      '跨境发票管理',
    ],
  },
]

const filteredSolutions = computed(() => {
  if (activeTab.value === 'all') {
    return solutions
  }
  return solutions.filter(solution => solution.category === activeTab.value)
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

const Globe = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
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