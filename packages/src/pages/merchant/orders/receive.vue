<template>
  <div>
    <h1 class="text-2xl font-semibold mb-8">{{ t('merchant.nav.orders_receive') }}</h1>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="mb-6">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
            <!-- 搜索框 -->
            <el-input
              v-model="searchQuery"
              placeholder="搜索交易号..."
              :prefix-icon="Search"
              clearable
              class="w-full sm:w-64"
            />
            
            <!-- 状态选择框 -->
            <el-select
              v-model="statusFilter"
              placeholder="所有状态"
              class="w-full sm:w-40"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            
            <!-- 渠道选择框 -->
            <el-select
              v-model="channelFilter"
              placeholder="所有渠道"
              class="w-full sm:w-40"
              clearable
            >
              <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            
            <!-- 日期选择器 -->
            <el-date-picker
              v-model="dateFilter"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              class="w-full sm:w-40"
              clearable
            />
          </div>
          
          <!-- 导出按钮 -->
          <el-button 
            type="primary"
            :icon="Download"
            @click="exportData"
          >
            导出数据
          </el-button>
        </div>

        <!-- 表格 -->
        <el-table
          :data="transactionData"
          style="width: 100%"
          :border="false"
          stripe
          highlight-current-row
          :header-cell-style="{ background: 'var(--el-fill-color-light)' }"
          v-loading="loading"
        >
          <el-table-column prop="id" label="交易ID" min-width="120" />
          <el-table-column prop="merchantOrderId" label="商户订单号" min-width="120" />
          <el-table-column label="金额" min-width="100" align="right">
            <template #default="scope">
              <span>¥{{ formatAmount(scope.row.amount) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道" min-width="120">
            <template #default="scope">
              <el-tag
                :type="getChannelTagType(scope.row.channel)"
                effect="light"
                size="small"
                round
              >
                {{ scope.row.channel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="100" align="center">
            <template #default="scope">
              <el-tag
                :type="getStatusTagType(scope.row.status)"
                effect="light"
                size="small"
                round
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" min-width="180" />
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
              <el-button 
                type="primary" 
                link
                @click="viewDetails(scope.row.id)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-500 dark:text-gray-300">
          显示 {{ (pagination.currentPage - 1) * pagination.pageSize + 1 }} - {{ Math.min(pagination.currentPage * pagination.pageSize, transactionData.length) }} 条，共 {{ transactionData.length }} 条
        </div>
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="sizes, prev, pager, next, jumper"
          :total="transactionData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Download } from '@element-plus/icons-vue'

const { t } = useI18n()

// 加载状态
const loading = ref(false)

// 筛选条件
const searchQuery = ref('')
const statusFilter = ref('')
const channelFilter = ref('')
const dateFilter = ref('')

// 分页设置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
})

// 状态选项
const statusOptions = [
  { value: 'completed', label: '已完成' },
  { value: 'processing', label: '处理中' },
  { value: 'pending', label: '待处理' },
  { value: 'failed', label: '已失败' },
]

// 渠道选项
const channelOptions = [
  { value: 'alipay', label: '支付宝' },
  { value: 'wechat', label: '微信支付' },
  { value: 'unionpay', label: '银联' },
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
]

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

// 获取渠道标签类型
const getChannelTagType = (channel: string): '' | 'success' | 'warning' | 'info' | 'danger' => {
  switch (channel) {
    case '支付宝': return 'primary'
    case '微信支付': return 'success'
    case '银联': return 'warning'
    case 'Visa': return 'info'
    case 'Mastercard': return 'danger'
    default: return ''
  }
}

// 获取状态标签类型
const getStatusTagType = (status: string): '' | 'success' | 'warning' | 'info' | 'danger' => {
  switch (status) {
    case '已完成': return 'success'
    case '处理中': return 'warning'
    case '待处理': return 'info'
    case '已失败': return 'danger'
    default: return ''
  }
}

// 格式化金额
const formatAmount = (amount: number): string => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 查看详情
const viewDetails = (id: string) => {
  console.log('查看交易详情:', id)
}

// 导出数据
const exportData = () => {
  console.log('导出数据')
}

// 处理页码变化
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
}

// 处理每页显示数量变化
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
}
</script>

<style>
/* 自定义 Element Plus 样式，使其更好地融入当前设计 */
:deep(.el-input__wrapper),
:deep(.el-select .el-input__wrapper),
:deep(.el-date-editor.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}

:deep(.el-input__wrapper:hover),
:deep(.el-select .el-input__wrapper:hover),
:deep(.el-date-editor.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

:deep(.el-select-dropdown__item.selected) {
  color: var(--el-color-primary);
}

:deep(.el-pagination) {
  justify-content: flex-end;
}

/* 适配暗黑模式 */
.dark {
  --el-bg-color: #1e293b;
  --el-fill-color-light: rgba(30, 41, 59, 0.5);
  --el-border-color: rgba(255, 255, 255, 0.1);
  --el-text-color-primary: rgba(255, 255, 255, 0.85);
  --el-text-color-regular: rgba(255, 255, 255, 0.65);
  --el-text-color-secondary: rgba(255, 255, 255, 0.45);
}

html.dark :deep(.el-table) {
  --el-table-border-color: rgba(255, 255, 255, 0.1);
  --el-table-header-bg-color: rgba(30, 41, 59, 0.8);
  --el-table-tr-bg-color: #1e293b;
  --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.03);
  --el-table-fixed-box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  background-color: #1e293b;
  color: rgba(255, 255, 255, 0.85);
}

html.dark :deep(.el-pagination button),
html.dark :deep(.el-pagination span:not([class*=suffix])) {
  color: rgba(255, 255, 255, 0.65);
}
</style> 