<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold">系统管理</h2>
      <p class="text-sm text-muted-foreground">管理系统设置和配置</p>
    </div>

    <!-- 系统管理选项卡 -->
    <div class="border-b">
      <div class="flex space-x-8">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="[
            activeTab === index 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground',
            'py-3 px-1 text-sm font-medium border-b-2 transition-colors'
          ]"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- 用户管理面板 -->
    <div v-if="activeTab === 0" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">用户管理</h3>
        <button class="btn">添加用户</button>
      </div>
      <div class="rounded-lg border bg-card shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">用户 ID</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">用户名</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">姓名</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">角色</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">创建时间</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index" class="border-b">
                <td class="px-4 py-3 text-sm">{{ user.id }}</td>
                <td class="px-4 py-3 text-sm font-medium">{{ user.username }}</td>
                <td class="px-4 py-3 text-sm">{{ user.name }}</td>
                <td class="px-4 py-3 text-sm">{{ user.role }}</td>
                <td class="px-4 py-3 text-sm text-muted-foreground">{{ user.createdAt }}</td>
                <td class="px-4 py-3 text-sm">
                  <span :class="getStatusClass(user.status)">{{ user.status }}</span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center space-x-2">
                    <button class="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90">
                      编辑
                    </button>
                    <button class="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 角色权限面板 -->
    <div v-if="activeTab === 1" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">角色权限管理</h3>
        <button class="btn">添加角色</button>
      </div>
      <div class="rounded-lg border bg-card shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">角色名称</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">描述</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">用户数量</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">创建时间</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in roles" :key="index" class="border-b">
                <td class="px-4 py-3 text-sm font-medium">{{ role.name }}</td>
                <td class="px-4 py-3 text-sm">{{ role.description }}</td>
                <td class="px-4 py-3 text-sm">{{ role.userCount }}</td>
                <td class="px-4 py-3 text-sm text-muted-foreground">{{ role.createdAt }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center space-x-2">
                    <button class="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80">
                      权限设置
                    </button>
                    <button class="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90">
                      编辑
                    </button>
                    <button class="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 系统参数设置面板 -->
    <div v-if="activeTab === 2" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">系统参数设置</h3>
        <button class="btn">保存设置</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="rounded-lg border bg-card shadow-sm p-6 space-y-4">
          <h4 class="font-medium">基本设置</h4>
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="siteName" class="text-sm font-medium">平台名称</label>
              <input id="siteName" type="text" class="input w-full" value="Sphere 支付平台" />
            </div>
            <div class="space-y-2">
              <label for="siteDesc" class="text-sm font-medium">平台描述</label>
              <textarea id="siteDesc" class="input w-full h-20">Sphere 支付平台是一个全面的支付解决方案，为各类商户提供安全、便捷的支付服务。</textarea>
            </div>
            <div class="space-y-2">
              <label for="contact" class="text-sm font-medium">联系邮箱</label>
              <input id="contact" type="email" class="input w-full" value="support@sphere.com" />
            </div>
          </div>
        </div>

        <div class="rounded-lg border bg-card shadow-sm p-6 space-y-4">
          <h4 class="font-medium">支付设置</h4>
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="feeRate" class="text-sm font-medium">默认手续费率(%)</label>
              <input id="feeRate" type="number" step="0.01" class="input w-full" value="0.5" />
            </div>
            <div class="space-y-2">
              <label for="settlementCycle" class="text-sm font-medium">默认结算周期(天)</label>
              <input id="settlementCycle" type="number" class="input w-full" value="7" />
            </div>
            <div class="flex items-center space-x-2 pt-2">
              <input id="autoSettlement" type="checkbox" class="h-4 w-4" checked />
              <label for="autoSettlement" class="text-sm font-medium">启用自动结算</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作日志面板 -->
    <div v-if="activeTab === 3" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">操作日志</h3>
        <div class="flex gap-2">
          <select class="input">
            <option value="">所有类型</option>
            <option value="login">登录</option>
            <option value="logout">登出</option>
            <option value="create">创建</option>
            <option value="update">更新</option>
            <option value="delete">删除</option>
          </select>
          <button class="btn">导出日志</button>
        </div>
      </div>
      <div class="rounded-lg border bg-card shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作ID</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作人</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">IP地址</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作类型</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作内容</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">操作时间</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in logs" :key="index" class="border-b">
                <td class="px-4 py-3 text-sm">{{ log.id }}</td>
                <td class="px-4 py-3 text-sm">{{ log.user }}</td>
                <td class="px-4 py-3 text-sm">{{ log.ip }}</td>
                <td class="px-4 py-3 text-sm">{{ log.type }}</td>
                <td class="px-4 py-3 text-sm truncate max-w-xs">{{ log.content }}</td>
                <td class="px-4 py-3 text-sm text-muted-foreground">{{ log.time }}</td>
                <td class="px-4 py-3 text-sm">
                  <span :class="getLogStatusClass(log.status)">{{ log.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签页索引
const activeTab = ref(0)

// 标签页配置
const tabs = [
  { name: '用户管理' },
  { name: '角色权限' },
  { name: '系统参数' },
  { name: '操作日志' }
]

// 模拟用户数据
const users = ref([
  { 
    id: 'USR-001', 
    username: 'admin', 
    name: '管理员',
    role: '超级管理员',
    createdAt: '2023-01-15', 
    status: '正常' 
  },
  { 
    id: 'USR-002', 
    username: 'zhangsan', 
    name: '张三',
    role: '财务管理员',
    createdAt: '2023-02-20', 
    status: '正常' 
  },
  { 
    id: 'USR-003', 
    username: 'lisi', 
    name: '李四',
    role: '客服专员',
    createdAt: '2023-03-10', 
    status: '正常' 
  },
  { 
    id: 'USR-004', 
    username: 'wangwu', 
    name: '王五',
    role: '运营专员',
    createdAt: '2023-04-05', 
    status: '已禁用' 
  },
  { 
    id: 'USR-005', 
    username: 'zhaoliu', 
    name: '赵六',
    role: '商户审核员',
    createdAt: '2023-05-18', 
    status: '正常' 
  }
])

// 模拟角色数据
const roles = ref([
  {
    name: '超级管理员',
    description: '具有系统所有权限',
    userCount: 1,
    createdAt: '2023-01-01'
  },
  {
    name: '财务管理员',
    description: '管理财务和结算相关功能',
    userCount: 3,
    createdAt: '2023-01-15'
  },
  {
    name: '客服专员',
    description: '处理客户工单和问题',
    userCount: 8,
    createdAt: '2023-02-10'
  },
  {
    name: '运营专员',
    description: '负责日常运营和数据分析',
    userCount: 5,
    createdAt: '2023-03-05'
  },
  {
    name: '商户审核员',
    description: '负责商户入驻和审核',
    userCount: 4,
    createdAt: '2023-04-20'
  }
])

// 模拟日志数据
const logs = ref([
  {
    id: 'LOG-10001',
    user: '管理员',
    ip: '192.168.1.100',
    type: '登录',
    content: '管理员登录系统',
    time: '2023-11-15 10:15:23',
    status: '成功'
  },
  {
    id: 'LOG-10002',
    user: '张三',
    ip: '192.168.1.101',
    type: '更新',
    content: '更新商户"上海好食多超市"的结算信息',
    time: '2023-11-15 09:32:45',
    status: '成功'
  },
  {
    id: 'LOG-10003',
    user: '李四',
    ip: '192.168.1.102',
    type: '创建',
    content: '创建新工单#5432',
    time: '2023-11-14 16:48:12',
    status: '成功'
  },
  {
    id: 'LOG-10004',
    user: '王五',
    ip: '192.168.1.103',
    type: '删除',
    content: '尝试删除订单ORD-2023-8749',
    time: '2023-11-14 15:23:51',
    status: '失败'
  },
  {
    id: 'LOG-10005',
    user: '赵六',
    ip: '192.168.1.104',
    type: '审核',
    content: '审核通过商户"深圳电子城"',
    time: '2023-11-14 14:12:33',
    status: '成功'
  }
])

// 根据状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '正常':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '已禁用':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}

// 日志状态样式类
const getLogStatusClass = (status: string) => {
  switch (status) {
    case '成功':
      return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case '失败':
      return 'px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    default:
      return 'px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
</script> 