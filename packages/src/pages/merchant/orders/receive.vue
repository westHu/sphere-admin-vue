<template>
  <div>
    <h1 class="text-2xl font-semibold mb-8">{{ t('merchant.nav.orders_receive') }}</h1>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <div class="flex space-x-2">
            <div class="relative">
              <input type="text" class="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="搜索交易号...">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">所有状态</option>
              <option value="completed">已完成</option>
              <option value="processing">处理中</option>
              <option value="pending">待处理</option>
              <option value="failed">已失败</option>
            </select>
            <select class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">所有渠道</option>
              <option value="alipay">支付宝</option>
              <option value="wechat">微信支付</option>
              <option value="unionpay">银联</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>
          <button class="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary/90">导出数据</button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">商户订单号</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金额</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">渠道</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">创建时间</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(item, index) in transactionData" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ item.merchantOrderId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${{ item.amount.toFixed(2) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <span :class="getChannelClass(item.channel)" class="px-2 py-1 text-xs rounded-full">
                    {{ item.channel }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(item.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{{ item.createdAt }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-primary hover:text-primary/80 mr-3">详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          显示 1 - 10 条，共 {{ transactionData.length }} 条
        </div>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">上一页</button>
          <button class="px-3 py-1 bg-primary text-white rounded-md">1</button>
          <button class="px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
          <button class="px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
          <button class="px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 模拟数据
const transactionData = ref([
  { 
    id: 'TXN-8794621', 
    merchantOrderId: 'ORD-123456',
    amount: 2458.50, 
    channel: '支付宝', 
    status: '已完成', 
    createdAt: '2023-04-15 14:30:25' 
  },
  { 
    id: 'TXN-8794620', 
    merchantOrderId: 'ORD-123455',
    amount: 986.00, 
    channel: '微信支付', 
    status: '已完成', 
    createdAt: '2023-04-15 14:28:10' 
  },
  { 
    id: 'TXN-8794619', 
    merchantOrderId: 'ORD-123454',
    amount: 1500.75, 
    channel: '银联', 
    status: '处理中', 
    createdAt: '2023-04-15 14:25:00' 
  },
  { 
    id: 'TXN-8794618', 
    merchantOrderId: 'ORD-123453',
    amount: 699.00, 
    channel: 'Visa', 
    status: '已完成', 
    createdAt: '2023-04-15 14:20:15' 
  },
  { 
    id: 'TXN-8794617', 
    merchantOrderId: 'ORD-123452',
    amount: 3299.99, 
    channel: 'Mastercard', 
    status: '待处理', 
    createdAt: '2023-04-15 14:15:30' 
  }
])

// 获取渠道样式
const getChannelClass = (channel: string) => {
  switch (channel) {
    case '支付宝':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case '微信支付':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case '银联':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    case 'Visa':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    case 'Mastercard':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}

// 获取状态样式
const getStatusClass = (status: string) => {
  switch (status) {
    case '已完成':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    case '处理中':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    case '待处理':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case '已失败':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}
</script> 