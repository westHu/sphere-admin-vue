<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// 使用vue-i18n
const { t } = useI18n()

// 统计数据
const stats = reactive({
  todaySales: '¥8,946.00',
  totalOrders: 324,
  successRate: '98.5%',
  revenue: '¥142,384.00'
})

// 时间周期选择
const activePeriod = ref('today')
const setPeriod = (period: string) => {
  activePeriod.value = period
}

// 最近订单数据
const recentOrders = ref([
  {
    id: 'ORD-7829',
    customer: '张小明',
    amount: '¥1,200.00',
    status: 'completed',
    date: '2024-05-10 14:32',
    payment: '支付宝'
  },
  {
    id: 'ORD-7828',
    customer: '李小红',
    amount: '¥824.50',
    status: 'pending',
    date: '2024-05-10 13:21',
    payment: '微信支付'
  },
  {
    id: 'ORD-7827',
    customer: '王大壮',
    amount: '¥3,450.00',
    status: 'completed',
    date: '2024-05-10 11:45',
    payment: '银联'
  },
  {
    id: 'ORD-7826',
    customer: '赵小丽',
    amount: '¥568.00',
    status: 'failed',
    date: '2024-05-10 10:18',
    payment: '信用卡'
  },
  {
    id: 'ORD-7825',
    customer: '刘伟',
    amount: '¥2,900.00',
    status: 'completed',
    date: '2024-05-10 09:05',
    payment: '支付宝'
  }
])

// 页面初始化
onMounted(() => {
  // 在真实环境中这里可以请求API数据
  console.log('Dashboard mounted')
})

// 获取状态对应的样式
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'refunded':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- 欢迎信息 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ t('dashboard.welcome') }}, 商户名称
      </h1>
      
      <!-- 时间周期选择 -->
      <div class="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button 
          v-for="period in ['today', 'yesterday', 'this_week', 'this_month', 'this_year']" 
          :key="period"
          @click="setPeriod(period)"
          :class="[
            'px-3 py-1 text-sm rounded-md transition-colors',
            activePeriod === period 
              ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          {{ t(`dashboard.period.${period}`) }}
        </button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 今日销售额 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ t('dashboard.summary.today_sales') }}
          </h3>
          <span class="flex items-center justify-center p-2 rounded-lg bg-primary-50 dark:bg-primary-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.todaySales }}</span>
          <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+12.5%</span>
        </div>
      </div>

      <!-- 订单总数 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ t('dashboard.summary.total_orders') }}
          </h3>
          <span class="flex items-center justify-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalOrders }}</span>
          <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+8.4%</span>
        </div>
      </div>

      <!-- 成功率 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ t('dashboard.summary.success_rate') }}
          </h3>
          <span class="flex items-center justify-center p-2 rounded-lg bg-green-50 dark:bg-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.successRate }}</span>
          <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+0.8%</span>
        </div>
      </div>

      <!-- 收入 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ t('dashboard.summary.revenue') }}
          </h3>
          <span class="flex items-center justify-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="flex items-baseline">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.revenue }}</span>
          <span class="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+15.3%</span>
        </div>
      </div>
    </div>

    <!-- 最近订单和快速操作 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 最近订单 -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ t('dashboard.recent_orders') }}
          </h2>
          <a href="#" class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300">
            {{ t('dashboard.view_all') }}
          </a>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ t('orders.table.order_id') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ t('orders.table.customer') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ t('orders.table.amount') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ t('orders.table.status') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ t('orders.table.date') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ order.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 dark:text-white">{{ order.customer }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900 dark:text-white">{{ order.amount }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="['px-2 py-1 text-xs rounded-full', getStatusClass(order.status)]">
                    {{ t(`orders.status.${order.status}`) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ order.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {{ t('dashboard.quick_actions') }}
        </h2>
        <div class="space-y-3">
          <a href="#" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ t('dashboard.actions.new_order') }}
            </span>
          </a>
          
          <a href="#" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ t('dashboard.actions.new_customer') }}
            </span>
          </a>

          <a href="#" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ t('dashboard.actions.setup_payment') }}
            </span>
          </a>

          <a href="#" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 dark:text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ t('dashboard.actions.export_data') }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- 业绩图表(作为占位) -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {{ t('dashboard.performance') }}
      </h2>
      
      <!-- 图表占位 -->
      <div class="h-64 w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div class="text-gray-400 dark:text-gray-500 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>{{ t('dashboard.no_data') }}</p>
        </div>
      </div>
    </div>
  </div>
</template> 