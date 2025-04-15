<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ t('merchant.dashboard.title') }}</h1>
      <p class="text-muted-foreground">
        {{ t('merchant.dashboard.welcome_back') }}
      </p>
    </div>

    <!-- 数据统计卡片 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <!-- 销售额卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-semibold tracking-tight">¥{{ stats.revenue.toLocaleString() }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-primary">+{{ stats.revenueIncrease }}%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.revenue') }}</p>
          </div>
        </div>
      </div>

      <!-- 订单数卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-semibold tracking-tight">{{ stats.totalOrders }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-primary">+{{ stats.orderIncrease }}%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.total_orders') }}</p>
          </div>
        </div>
      </div>

      <!-- 客户数卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-semibold tracking-tight">{{ stats.customers }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-primary">+{{ stats.customerIncrease }}%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.customers') }}</p>
          </div>
        </div>
      </div>

      <!-- 产品数卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-semibold tracking-tight">{{ stats.products }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-primary">+{{ stats.productIncrease }}%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.products') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单状态 -->
    <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
      <h3 class="text-lg font-medium mb-4">{{ t('merchant.dashboard.order_status') }}</h3>
      <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div class="flex items-center gap-2 rounded-lg border dark:border-border p-3 bg-primary text-primary-foreground">
          <span class="rounded-sm p-2 bg-primary-foreground text-primary">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.new_orders') }}</p>
            <p class="text-xs text-primary-foreground/80">{{ t('merchant.dashboard.today') }}: 24</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border dark:border-border p-3 bg-primary text-primary-foreground">
          <span class="rounded-sm p-2 bg-primary-foreground text-primary">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.processing') }}</p>
            <p class="text-xs text-primary-foreground/80">{{ t('merchant.dashboard.today') }}: 15</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-foreground/10 dark:bg-foreground/20 text-foreground dark:text-foreground">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.packaged') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 8</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-foreground/10 dark:bg-foreground/20 text-foreground dark:text-foreground">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.shipping') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 12</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-foreground/10 dark:bg-foreground/20 text-foreground dark:text-foreground">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.completed') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 18</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- 销售趋势图表 -->
      <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-medium">{{ t('merchant.dashboard.sales_trend') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.last_6_months') }}</p>
          </div>
          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{{ t('merchant.dashboard.monthly') }}</span>
        </div>
        <div class="h-64 flex items-end gap-2">
          <div v-for="(item, index) in salesData" :key="index" class="flex flex-col items-center flex-1">
            <div 
              class="w-full bg-primary rounded-t-sm" 
              :style="{ height: `${(item.sales / maxSales) * 100}%` }"
            ></div>
            <div class="text-xs mt-2 text-muted-foreground">{{ item.month }}</div>
          </div>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <h3 class="text-lg font-medium mb-4">{{ t('merchant.dashboard.quick_actions') }}</h3>
        <div class="grid grid-cols-2 gap-4">
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
            <span>{{ t('merchant.dashboard.add_product') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>{{ t('merchant.dashboard.create_order') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{{ t('merchant.dashboard.manage_customers') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{{ t('merchant.dashboard.view_reports') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 最近订单表格 -->
    <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-lg font-medium">{{ t('merchant.dashboard.recent_orders') }}</h3>
          <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.view_transactions') }}</p>
        </div>
        <a href="/merchant/orders" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-background hover:text-accent-foreground border border-input px-4 py-2">
          {{ t('merchant.dashboard.view_all') }}
        </a>
      </div>
      <div class="w-full overflow-auto">
        <table class="w-full caption-bottom text-sm">
          <thead class="border-b dark:border-border">
            <tr class="border-b dark:border-border">
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.order_id') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.customer') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.date') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.amount') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id" class="border-b dark:border-border transition-colors hover:bg-muted/50 dark:hover:bg-muted/20">
              <td class="p-4 align-middle font-medium">#{{ order.id }}</td>
              <td class="p-4 align-middle">{{ order.customer }}</td>
              <td class="p-4 align-middle">{{ order.date }}</td>
              <td class="p-4 align-middle">¥{{ order.amount.toLocaleString() }}</td>
              <td class="p-4 align-middle">
                <span 
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold" 
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-50': order.status === 'completed',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-50': order.status === 'processing',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-50': order.status === 'cancelled'
                  }"
                >
                  {{ t(`merchant.dashboard.status_${order.status}`) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 模拟数据
const stats = ref({
  totalOrders: 236,
  orderIncrease: 12,
  revenue: 58900,
  revenueIncrease: 8,
  customers: 856,
  customerIncrease: 5,
  products: 42,
  productIncrease: 3
})

// 销售趋势数据
const salesData = ref([
  { month: '1月', sales: 32000 },
  { month: '2月', sales: 38000 },
  { month: '3月', sales: 35000 },
  { month: '4月', sales: 42000 },
  { month: '5月', sales: 48000 },
  { month: '6月', sales: 58900 },
])

// 计算最大销售额用于设置图表比例
const maxSales = computed(() => {
  return Math.max(...salesData.value.map(item => item.sales))
})

const recentOrders = ref([
  {
    id: '12345',
    customer: '张小明',
    date: '2025-04-14',
    amount: 1299,
    status: 'completed'
  },
  {
    id: '12344',
    customer: '李华',
    date: '2025-04-14',
    amount: 2450,
    status: 'processing'
  },
  {
    id: '12343',
    customer: '王芳',
    date: '2025-04-13',
    amount: 899,
    status: 'completed'
  },
  {
    id: '12342',
    customer: '赵强',
    date: '2025-04-13',
    amount: 3299,
    status: 'cancelled'
  },
  {
    id: '12341',
    customer: '刘伟',
    date: '2025-04-12',
    amount: 1599,
    status: 'completed'
  }
])
</script>

<style scoped>
/* 暗黑模式样式直接使用Tailwind内置的dark:前缀，不需要特殊处理 */
</style> 