<template>
  <div class="space-y-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">总商户数</p>
            <h3 class="text-2xl font-bold">1,248</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-green-500">↑ 12%</span> 较上月
        </p>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">今日订单</p>
            <h3 class="text-2xl font-bold">3,567</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-red-500">↓ 2.5%</span> 较昨日
        </p>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">今日销售额</p>
            <h3 class="text-2xl font-bold">¥235,648</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-green-500">↑ 8.3%</span> 较昨日
        </p>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">待处理工单</p>
            <h3 class="text-2xl font-bold">24</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-red-500">↑ 15%</span> 较上周
        </p>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <h3 class="mb-4 text-lg font-medium">销售趋势</h3>
        <div class="h-60 w-full bg-muted/20 flex items-center justify-center">
          <p class="text-muted-foreground">销售趋势图表</p>
        </div>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <h3 class="mb-4 text-lg font-medium">订单统计</h3>
        <div class="h-60 w-full bg-muted/20 flex items-center justify-center">
          <p class="text-muted-foreground">订单统计图表</p>
        </div>
      </div>
    </div>

    <!-- 最近订单 -->
    <div class="rounded-lg border bg-card p-4 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">最近订单</h3>
        <a href="/admin/orders" class="text-sm text-primary">查看全部</a>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left text-sm font-medium text-muted-foreground">订单号</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-muted-foreground">商户</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-muted-foreground">金额</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-muted-foreground">状态</th>
              <th class="px-4 py-2 text-left text-sm font-medium text-muted-foreground">时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in recentOrders" :key="index" class="border-b">
              <td class="px-4 py-3 text-sm">{{ order.id }}</td>
              <td class="px-4 py-3 text-sm">{{ order.merchant }}</td>
              <td class="px-4 py-3 text-sm">{{ order.amount }}</td>
              <td class="px-4 py-3 text-sm">
                <span :class="getStatusClass(order.status)">{{ order.status }}</span>
              </td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ order.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟最近订单数据
const recentOrders = ref([
  { 
    id: 'ORD-2023-8752', 
    merchant: '上海好食多超市', 
    amount: '¥1,245.80', 
    status: '已完成', 
    time: '今天 14:32' 
  },
  { 
    id: 'ORD-2023-8751', 
    merchant: '北京优鲜生活', 
    amount: '¥895.00', 
    status: '处理中', 
    time: '今天 13:15' 
  },
  { 
    id: 'ORD-2023-8750', 
    merchant: '杭州甜品工坊', 
    amount: '¥458.50', 
    status: '已完成', 
    time: '今天 11:42' 
  },
  { 
    id: 'ORD-2023-8749', 
    merchant: '广州海鲜市场', 
    amount: '¥1,876.20', 
    status: '已取消', 
    time: '今天 10:27' 
  },
  { 
    id: 'ORD-2023-8748', 
    merchant: '成都火锅食材', 
    amount: '¥638.90', 
    status: '已完成', 
    time: '昨天 18:05' 
  }
])

// 根据订单状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '已完成':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '处理中':
      return 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case '已取消':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script> 