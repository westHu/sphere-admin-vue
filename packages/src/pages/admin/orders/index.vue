<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">订单管理</h2>
        <p class="text-sm text-muted-foreground">查看和管理平台上的所有订单</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="搜索订单..." class="input pl-10 w-full sm:w-64" />
        </div>
        <select class="input">
          <option value="">所有状态</option>
          <option value="pending">待处理</option>
          <option value="processing">处理中</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">订单号</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">商户</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">金额</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">支付方式</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">下单时间</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index" class="border-b">
              <td class="px-4 py-3 text-sm">{{ order.id }}</td>
              <td class="px-4 py-3 text-sm font-medium">{{ order.merchant }}</td>
              <td class="px-4 py-3 text-sm">{{ order.amount }}</td>
              <td class="px-4 py-3 text-sm">{{ order.paymentMethod }}</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ order.createdAt }}</td>
              <td class="px-4 py-3 text-sm">
                <span :class="getStatusClass(order.status)">{{ order.status }}</span>
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

      <!-- 分页 -->
      <div class="flex items-center justify-between px-4 py-3 border-t">
        <div class="text-sm text-muted-foreground">
          显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">256</span> 条
        </div>
        <div class="flex items-center space-x-2">
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80 disabled:opacity-50" disabled>
            上一页
          </button>
          <button class="px-2 py-1 rounded text-sm bg-primary text-primary-foreground hover:bg-primary/90">
            1
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            2
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            3
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            ...
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            26
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟订单数据
const orders = ref([
  { 
    id: 'ORD-2023-8752', 
    merchant: '上海好食多超市', 
    amount: '¥1,245.80', 
    paymentMethod: '微信支付',
    createdAt: '2023-11-15 14:32:25', 
    status: '已完成'
  },
  { 
    id: 'ORD-2023-8751', 
    merchant: '北京优鲜生活', 
    amount: '¥895.00', 
    paymentMethod: '支付宝',
    createdAt: '2023-11-15 13:15:10', 
    status: '处理中'
  },
  { 
    id: 'ORD-2023-8750', 
    merchant: '杭州甜品工坊', 
    amount: '¥458.50', 
    paymentMethod: '银联',
    createdAt: '2023-11-15 11:42:18', 
    status: '已完成'
  },
  { 
    id: 'ORD-2023-8749', 
    merchant: '广州海鲜市场', 
    amount: '¥1,876.20', 
    paymentMethod: '微信支付',
    createdAt: '2023-11-15 10:27:55', 
    status: '已取消'
  },
  { 
    id: 'ORD-2023-8748', 
    merchant: '成都火锅食材', 
    amount: '¥638.90', 
    paymentMethod: '支付宝',
    createdAt: '2023-11-14 18:05:32', 
    status: '已完成'
  },
  { 
    id: 'ORD-2023-8747', 
    merchant: '深圳电子城', 
    amount: '¥2,499.00', 
    paymentMethod: '银联',
    createdAt: '2023-11-14 16:22:14', 
    status: '待付款'
  },
  { 
    id: 'ORD-2023-8746', 
    merchant: '武汉小吃街', 
    amount: '¥325.50', 
    paymentMethod: '微信支付',
    createdAt: '2023-11-14 14:47:09', 
    status: '已完成'
  },
  { 
    id: 'ORD-2023-8745', 
    merchant: '西安文创店', 
    amount: '¥756.30', 
    paymentMethod: '支付宝',
    createdAt: '2023-11-14 11:32:48', 
    status: '已完成'
  },
  { 
    id: 'ORD-2023-8744', 
    merchant: '南京书店', 
    amount: '¥245.00', 
    paymentMethod: '微信支付',
    createdAt: '2023-11-14 09:18:22', 
    status: '已退款'
  },
  { 
    id: 'ORD-2023-8743', 
    merchant: '重庆小面馆', 
    amount: '¥89.50', 
    paymentMethod: '微信支付',
    createdAt: '2023-11-13 19:05:11', 
    status: '已完成'
  }
])

// 根据订单状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '已完成':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '处理中':
      return 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case '待付款':
      return 'px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    case '已取消':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    case '已退款':
      return 'px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script> 