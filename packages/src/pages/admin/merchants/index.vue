<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">商户管理</h2>
        <p class="text-sm text-muted-foreground">管理平台上的所有商户</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="搜索商户..." class="input pl-10 w-full sm:w-64" />
        </div>
        <button class="btn">
          添加商户
        </button>
      </div>
    </div>

    <!-- 商户列表 -->
    <div class="rounded-lg border bg-card shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">商户ID</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">商户名称</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">联系人</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">联系电话</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">注册时间</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(merchant, index) in merchants" :key="index" class="border-b">
              <td class="px-4 py-3 text-sm">{{ merchant.id }}</td>
              <td class="px-4 py-3 text-sm font-medium">{{ merchant.name }}</td>
              <td class="px-4 py-3 text-sm">{{ merchant.contact }}</td>
              <td class="px-4 py-3 text-sm">{{ merchant.phone }}</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ merchant.createdAt }}</td>
              <td class="px-4 py-3 text-sm">
                <span :class="getStatusClass(merchant.status)">{{ merchant.status }}</span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center space-x-2">
                  <button class="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80">查看</button>
                  <button class="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90">编辑</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between px-4 py-3 border-t">
        <div class="text-sm text-muted-foreground">
          显示 <span class="font-medium">1</span> 至 <span class="font-medium">10</span> 条，共 <span class="font-medium">50</span> 条
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
            4
          </button>
          <button class="px-2 py-1 rounded text-sm bg-muted hover:bg-muted/80">
            5
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

// 模拟商户数据
const merchants = ref([
  { 
    id: 'MERCH-1001', 
    name: '上海好食多超市', 
    contact: '张明', 
    phone: '13512345678', 
    createdAt: '2023-01-15', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1002', 
    name: '北京优鲜生活', 
    contact: '李华', 
    phone: '13698765432', 
    createdAt: '2023-02-22', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1003', 
    name: '杭州甜品工坊', 
    contact: '王芳', 
    phone: '13876543210', 
    createdAt: '2023-03-10', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1004', 
    name: '广州海鲜市场', 
    contact: '刘强', 
    phone: '13912345678', 
    createdAt: '2023-04-05', 
    status: '冻结' 
  },
  { 
    id: 'MERCH-1005', 
    name: '成都火锅食材', 
    contact: '赵敏', 
    phone: '13587654321', 
    createdAt: '2023-05-18', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1006', 
    name: '深圳电子城', 
    contact: '陈伟', 
    phone: '13612345678', 
    createdAt: '2023-06-20', 
    status: '待审核' 
  },
  { 
    id: 'MERCH-1007', 
    name: '武汉小吃街', 
    contact: '周丽', 
    phone: '13756789012', 
    createdAt: '2023-07-07', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1008', 
    name: '西安文创店', 
    contact: '张伟', 
    phone: '13812345678', 
    createdAt: '2023-08-15', 
    status: '正常' 
  },
  { 
    id: 'MERCH-1009', 
    name: '南京书店', 
    contact: '林小明', 
    phone: '13723456789', 
    createdAt: '2023-09-01', 
    status: '冻结' 
  },
  { 
    id: 'MERCH-1010', 
    name: '重庆小面馆', 
    contact: '何强', 
    phone: '13834567890', 
    createdAt: '2023-10-10', 
    status: '正常' 
  }
])

// 根据状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '正常':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '待审核':
      return 'px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case '冻结':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script> 