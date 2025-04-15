<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">清结算管理</h2>
        <p class="text-sm text-muted-foreground">管理商户的清结算账务</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="搜索商户..." class="input pl-10 w-full sm:w-64" />
        </div>
        <button class="btn">
          发起结算
        </button>
      </div>
    </div>

    <!-- 结算统计卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">今日待结算</p>
            <h3 class="text-2xl font-bold">¥158,342.56</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-green-500">↑ 12.5%</span> 较昨日
        </p>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">本月已结算</p>
            <h3 class="text-2xl font-bold">¥2,458,921.80</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          <span class="text-green-500">↑ 8.3%</span> 较上月
        </p>
      </div>

      <div class="rounded-lg border bg-card p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-muted-foreground">待处理结算申请</p>
            <h3 class="text-2xl font-bold">12</h3>
          </div>
          <div class="rounded-full bg-primary/10 p-2 text-primary">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          需要尽快处理
        </p>
      </div>
    </div>

    <!-- 结算记录列表 -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="flex items-center justify-between p-4 border-b">
        <h3 class="font-medium">最近结算记录</h3>
        <div class="flex items-center space-x-2">
          <button class="text-sm text-primary">查看全部</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">结算单号</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">商户名称</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">结算金额</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">手续费</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">结算方式</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">申请时间</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in settlementRecords" :key="index" class="border-b">
              <td class="px-4 py-3 text-sm">{{ record.id }}</td>
              <td class="px-4 py-3 text-sm font-medium">{{ record.merchant }}</td>
              <td class="px-4 py-3 text-sm">{{ record.amount }}</td>
              <td class="px-4 py-3 text-sm">{{ record.fee }}</td>
              <td class="px-4 py-3 text-sm">{{ record.method }}</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ record.createdAt }}</td>
              <td class="px-4 py-3 text-sm">
                <span :class="getStatusClass(record.status)">{{ record.status }}</span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center space-x-2">
                  <button class="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80">
                    详情
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟结算记录数据
const settlementRecords = ref([
  { 
    id: 'STL-2023-1001', 
    merchant: '上海好食多超市', 
    amount: '¥25,468.80', 
    fee: '¥127.34',
    method: '银行转账',
    createdAt: '2023-11-15 10:32:25', 
    status: '已完成'
  },
  { 
    id: 'STL-2023-1000', 
    merchant: '北京优鲜生活', 
    amount: '¥18,956.50', 
    fee: '¥94.78',
    method: '银行转账',
    createdAt: '2023-11-15 09:15:10', 
    status: '处理中'
  },
  { 
    id: 'STL-2023-0999', 
    merchant: '杭州甜品工坊', 
    amount: '¥8,723.40', 
    fee: '¥43.62',
    method: '银行转账',
    createdAt: '2023-11-14 16:42:18', 
    status: '已完成'
  },
  { 
    id: 'STL-2023-0998', 
    merchant: '广州海鲜市场', 
    amount: '¥32,456.70', 
    fee: '¥162.28',
    method: '银行转账',
    createdAt: '2023-11-14 14:27:55', 
    status: '待审核'
  },
  { 
    id: 'STL-2023-0997', 
    merchant: '成都火锅食材', 
    amount: '¥12,845.60', 
    fee: '¥64.23',
    method: '银行转账',
    createdAt: '2023-11-13 18:05:32', 
    status: '已完成'
  },
  { 
    id: 'STL-2023-0996', 
    merchant: '深圳电子城', 
    amount: '¥45,678.90', 
    fee: '¥228.39',
    method: '银行转账',
    createdAt: '2023-11-13 15:22:14', 
    status: '已驳回'
  }
])

// 根据状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '已完成':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '处理中':
      return 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case '待审核':
      return 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    case '已驳回':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script> 