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
      <!-- 交易金额卡片 -->
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
          <h2 class="text-2xl font-semibold tracking-tight">${{ stats.revenue.toLocaleString() }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-primary">+{{ stats.revenueIncrease }}%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.transaction_volume') }}</p>
          </div>
        </div>
      </div>

      <!-- 交易数量卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.transactions_count') }}</p>
          </div>
        </div>
      </div>

      <!-- 成功率卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
            <svg class="h-4 w-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <svg class="w-4 h-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-semibold tracking-tight">98.2%</h2>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-green-600 dark:text-green-400">+0.6%</span>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.success_rate') }}</p>
          </div>
        </div>
      </div>

      <!-- 活跃商户卡片 -->
      <div class="flex flex-col justify-between p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-start">
          <div class="p-2 bg-primary/10 rounded-md">
            <svg class="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.active_merchants') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 交易状态 -->
    <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
      <h3 class="text-lg font-medium mb-4">{{ t('merchant.dashboard.transaction_status') }}</h3>
      <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div class="flex items-center gap-2 rounded-lg border dark:border-border p-3 bg-primary text-primary-foreground">
          <span class="rounded-sm p-2 bg-primary-foreground text-primary">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.new_transactions') }}</p>
            <p class="text-xs text-primary-foreground/80">{{ t('merchant.dashboard.today') }}: 48</p>
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
            <p class="text-xs text-primary-foreground/80">{{ t('merchant.dashboard.today') }}: 23</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.completed') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 36</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.pending_verification') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 15</p>
          </div>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-border dark:border-border p-3 bg-card dark:bg-card text-card-foreground dark:text-card-foreground">
          <span class="rounded-sm p-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <div>
            <p class="text-sm font-medium">{{ t('merchant.dashboard.declined') }}</p>
            <p class="text-xs text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.today') }}: 7</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- 交易趋势图表 -->
      <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-medium">{{ t('merchant.dashboard.transaction_trend') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.last_6_months') }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">USD</span>
            <span class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">EUR</span>
          </div>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{{ t('merchant.dashboard.new_payment_link') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>{{ t('merchant.dashboard.payout_request') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>{{ t('merchant.dashboard.payment_methods') }}</span>
          </button>
          <button class="h-24 flex flex-col gap-2 justify-center items-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{{ t('merchant.dashboard.transaction_reports') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 最近交易表格 -->
    <div class="p-6 bg-card text-card-foreground border border-border dark:border-border rounded-md shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-lg font-medium">{{ t('merchant.dashboard.recent_transactions') }}</h3>
          <p class="text-sm text-muted-foreground">{{ t('merchant.dashboard.view_payment_history') }}</p>
        </div>
        <a href="/merchant/orders" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-background hover:text-accent-foreground border border-input px-4 py-2">
          {{ t('merchant.dashboard.view_all') }}
        </a>
      </div>
      <div class="w-full overflow-auto">
        <table class="w-full caption-bottom text-sm">
          <thead class="border-b dark:border-border">
            <tr class="border-b dark:border-border">
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.transaction_id') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.method') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.date') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.amount') }}</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground dark:text-muted-foreground">{{ t('merchant.dashboard.status') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id" class="border-b dark:border-border transition-colors hover:bg-muted/50 dark:hover:bg-muted/20">
              <td class="p-4 align-middle font-medium">#{{ order.id }}</td>
              <td class="p-4 align-middle">
                <div class="flex items-center gap-2">
                  <span :class="{
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300': order.method === 'visa',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': order.method === 'mastercard',
                    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300': order.method === 'paypal',
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300': order.method === 'alipay',
                    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': order.method === 'wechat'
                  }" class="w-8 h-5 flex items-center justify-center rounded text-xs font-bold">
                    {{ order.method.substring(0, 2).toUpperCase() }}
                  </span>
                  {{ order.method.charAt(0).toUpperCase() + order.method.slice(1) }}
                </div>
              </td>
              <td class="p-4 align-middle">{{ order.date }}</td>
              <td class="p-4 align-middle">${{ order.amount.toLocaleString() }}</td>
              <td class="p-4 align-middle">
                <span 
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold" 
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': order.status === 'completed',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': order.status === 'processing',
                    'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300': order.status === 'declined'
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
  totalOrders: 2458,
  orderIncrease: 16,
  revenue: 658920,
  revenueIncrease: 12,
  customers: 128,
  customerIncrease: 7,
  products: 42,
  productIncrease: 3
})

// 销售趋势数据
const salesData = ref([
  { month: 'Jan', sales: 432000 },
  { month: 'Feb', sales: 468000 },
  { month: 'Mar', sales: 515000 },
  { month: 'Apr', sales: 542000 },
  { month: 'May', sales: 598000 },
  { month: 'Jun', sales: 658920 },
])

// 计算最大销售额用于设置图表比例
const maxSales = computed(() => {
  return Math.max(...salesData.value.map(item => item.sales))
})

const recentOrders = ref([
  {
    id: 'TXN-58462',
    method: 'visa',
    date: '2025-04-14 14:23',
    amount: 1299.50,
    status: 'completed'
  },
  {
    id: 'TXN-58461',
    method: 'mastercard',
    date: '2025-04-14 13:45',
    amount: 2450.00,
    status: 'processing'
  },
  {
    id: 'TXN-58459',
    method: 'paypal',
    date: '2025-04-13 22:18',
    amount: 899.99,
    status: 'completed'
  },
  {
    id: 'TXN-58458',
    method: 'alipay',
    date: '2025-04-13 16:32',
    amount: 3299.00,
    status: 'declined'
  },
  {
    id: 'TXN-58455',
    method: 'wechat',
    date: '2025-04-12 09:14',
    amount: 1599.75,
    status: 'completed'
  }
])
</script>

<style scoped>
/* 暗黑模式样式直接使用Tailwind内置的dark:前缀，不需要特殊处理 */
</style> 