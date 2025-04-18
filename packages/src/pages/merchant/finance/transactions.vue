<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h3 class="text-lg font-medium">{{ t('merchant.finance.transactions.title') }}</h3>
      
      <!-- 快捷筛选时间按钮 -->
      <div class="flex items-center space-x-2 bg-muted/30 p-1 rounded-lg self-start">
        <button 
          v-for="period in timePeriods" 
          :key="period.value"
          :class="[
            'px-3 py-1 text-xs rounded-md transition-colors',
            selectedPeriod === period.value 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted'
          ]"
          @click="selectTimePeriod(period.value)"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
    
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-card rounded-lg shadow p-4 border border-border/50">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ t('merchant.finance.transactions.total_income') }}</p>
            <h4 class="text-2xl font-bold mt-1 text-green-600 dark:text-green-500">
              {{ formatCurrency(totalIncome) }}
            </h4>
          </div>
          <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="text-xs text-muted-foreground mt-3">{{ getTimeRangeText() }}</div>
      </div>
      
      <div class="bg-card rounded-lg shadow p-4 border border-border/50">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ t('merchant.finance.transactions.total_expense') }}</p>
            <h4 class="text-2xl font-bold mt-1 text-red-600 dark:text-red-500">
              {{ formatCurrency(totalExpense) }}
            </h4>
          </div>
          <div class="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="text-xs text-muted-foreground mt-3">{{ getTimeRangeText() }}</div>
      </div>
      
      <div class="bg-card rounded-lg shadow p-4 border border-border/50">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ t('merchant.finance.transactions.total_transactions') }}</p>
            <h4 class="text-2xl font-bold mt-1">
              {{ totalTransactions }}
            </h4>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>
        <div class="text-xs text-muted-foreground mt-3">{{ t('merchant.finance.transactions.record_count', { count: totalTransactions }) }}</div>
      </div>
    </div>
    
    <div class="bg-card rounded-lg shadow border border-border/50">
      <!-- 筛选条件 -->
      <div class="p-6 border-b">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div class="md:col-span-3">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">
              {{ t('merchant.finance.transactions.date_range') }}
            </label>
            <div class="flex items-center space-x-2">
              <input 
                type="date" 
                v-model="filters.startDate"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
              />
              <span>-</span>
              <input 
                type="date" 
                v-model="filters.endDate"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
              />
            </div>
          </div>
          
          <div class="md:col-span-2">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">
              {{ t('merchant.finance.transactions.type') }}
            </label>
            <select 
              v-model="filters.type"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="">{{ t('merchant.common.all') }}</option>
              <option value="income">{{ t('merchant.finance.transactions.income') }}</option>
              <option value="expense">{{ t('merchant.finance.transactions.expense') }}</option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">
              {{ t('merchant.finance.transactions.status') }}
            </label>
            <select 
              v-model="filters.status"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="">{{ t('merchant.common.all') }}</option>
              <option value="completed">{{ t('merchant.finance.transactions.completed') }}</option>
              <option value="pending">{{ t('merchant.finance.transactions.pending') }}</option>
              <option value="failed">{{ t('merchant.finance.transactions.failed') }}</option>
            </select>
          </div>
          
          <div class="md:col-span-3">
            <label class="text-sm font-medium text-muted-foreground mb-1 block">
              {{ t('merchant.finance.transactions.search_keyword') }}
            </label>
            <input 
              type="text" 
              v-model="filters.keyword"
              :placeholder="t('merchant.finance.transactions.search_placeholder')"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
            />
          </div>
          
          <div class="md:col-span-2 flex items-end space-x-2">
            <button 
              class="px-4 py-2 rounded-md bg-primary text-primary-foreground h-9 flex-1"
              @click="handleSearch"
            >
              {{ t('merchant.common.search') }}
            </button>
            <button 
              class="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground h-9 w-9 flex items-center justify-center"
              @click="handleReset"
              title="重置筛选条件"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 高级筛选折叠面板 -->
        <div class="mt-4">
          <button 
            class="text-sm text-primary flex items-center"
            @click="showAdvancedFilters = !showAdvancedFilters"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 mr-1 transition-transform" 
              :class="{ 'rotate-90': showAdvancedFilters }"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            {{ t('merchant.finance.transactions.advanced_filters') }}
          </button>
          
          <div v-if="showAdvancedFilters" class="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-3">
              <label class="text-sm font-medium text-muted-foreground mb-1 block">
                {{ t('merchant.finance.transactions.amount_range') }}
              </label>
              <div class="flex items-center space-x-2">
                <input 
                  type="number" 
                  v-model="filters.minAmount"
                  :placeholder="t('merchant.finance.transactions.min_amount')"
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
                />
                <span>-</span>
                <input 
                  type="number" 
                  v-model="filters.maxAmount"
                  :placeholder="t('merchant.finance.transactions.max_amount')"
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
                />
              </div>
            </div>
            
            <div class="md:col-span-3">
              <label class="text-sm font-medium text-muted-foreground mb-1 block">
                {{ t('merchant.finance.transactions.transaction_id') }}
              </label>
              <input 
                type="text" 
                v-model="filters.transactionId"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors" 
              />
            </div>
            
            <div class="md:col-span-3">
              <label class="text-sm font-medium text-muted-foreground mb-1 block">
                {{ t('merchant.finance.transactions.category') }}
              </label>
              <select 
                v-model="filters.category"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              >
                <option value="">{{ t('merchant.common.all') }}</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 表格工具栏 -->
      <div class="px-6 py-3 border-b flex justify-between items-center">
        <div class="text-sm text-muted-foreground">
          {{ t('merchant.finance.transactions.total_results', { count: totalTransactions }) }}
        </div>
        <div class="flex items-center space-x-2">
          <button 
            class="flex items-center space-x-1 px-3 py-1 rounded-md text-sm border border-border hover:bg-muted"
            @click="exportTransactions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>{{ t('merchant.finance.transactions.export') }}</span>
          </button>
          <button 
            class="flex items-center space-x-1 px-3 py-1 rounded-md text-sm border border-border hover:bg-muted"
            @click="refreshTransactions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            <span>{{ t('merchant.finance.transactions.refresh') }}</span>
          </button>
        </div>
      </div>
      
      <!-- 表格内容 -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-full divide-y divide-border">
          <thead class="bg-muted/50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.date') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.transaction_id') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.description') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.category') }}
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.amount') }}
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.status') }}
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {{ t('merchant.finance.transactions.balance_after') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-background divide-y divide-border">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="7" class="px-6 py-16 text-center">
                <div class="inline-block mx-auto">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </td>
            </tr>
            <tr v-else-if="transactions.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-muted-foreground">
                {{ t('merchant.finance.transactions.no_records') }}
              </td>
            </tr>
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-muted/30 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                {{ formatDate(tx.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="font-mono text-xs">{{ tx.id }}</div>
              </td>
              <td class="px-6 py-4 text-sm max-w-xs">
                <div class="truncate">{{ tx.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClass(tx.category)">
                  {{ getCategoryLabel(tx.category) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                <span :class="{
                  'text-green-600 dark:text-green-500': tx.type === 'income',
                  'text-red-600 dark:text-red-500': tx.type === 'expense'
                }">
                  {{ tx.type === 'income' ? '+' : '-' }} {{ formatCurrency(tx.amount) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full" :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': tx.status === 'completed',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': tx.status === 'pending',
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': tx.status === 'failed'
                }">
                  {{ getStatusText(tx.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                {{ formatCurrency(tx.balanceAfter) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页控件 -->
      <div class="border-t px-6 py-4 flex justify-between items-center">
        <div class="flex items-center text-sm text-muted-foreground">
          <span class="mr-2">{{ t('merchant.finance.transactions.page_size') }}:</span>
          <select 
            v-model="pagination.pageSize" 
            class="bg-background border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            @change="handlePageSizeChange"
          >
            <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            class="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            :disabled="pagination.currentPage === 1"
            @click="goToPage(1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            :disabled="pagination.currentPage === 1"
            @click="goToPage(pagination.currentPage - 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div class="flex items-center space-x-1">
            <template v-for="page in displayedPages" :key="page">
              <button 
                v-if="typeof page === 'number'"
                :class="[
                  'px-3 py-1 rounded-md text-sm',
                  pagination.currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                ]"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <span v-else class="px-1 text-muted-foreground">...</span>
            </template>
          </div>
          
          <button 
            class="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            :disabled="pagination.currentPage === pagination.totalPages"
            @click="goToPage(pagination.currentPage + 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            :disabled="pagination.currentPage === pagination.totalPages"
            @click="goToPage(pagination.totalPages)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 6.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0zm6 0a1 1 0 010-1.414L14.586 10l-4.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useNow, useDateFormat } from '@vueuse/core'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const now = useNow()

// 模拟数据 - 实际项目中会从API获取
interface Transaction {
  id: string
  date: string
  description: string
  type: 'income' | 'expense'
  amount: number
  status: 'completed' | 'pending' | 'failed'
  category: string
  balanceAfter: number
}

// 快捷时间选择
const timePeriods = [
  { value: 'today', label: t('merchant.finance.transactions.today') },
  { value: '7days', label: t('merchant.finance.transactions.last_7_days') },
  { value: '30days', label: t('merchant.finance.transactions.last_30_days') },
  { value: '90days', label: t('merchant.finance.transactions.last_90_days') },
]
const selectedPeriod = ref('7days')

// 格式化日期的辅助函数
const formatDateToYYYYMMDD = (date: Date): string => {
  return useDateFormat(date, 'YYYY-MM-DD').value
}

// 日期计算辅助函数
const subDays = (date: Date, days: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}

// 筛选条件
const filters = reactive({
  startDate: formatDateToYYYYMMDD(subDays(new Date(), 7)),
  endDate: formatDateToYYYYMMDD(new Date()),
  type: '',
  status: '',
  keyword: '',
  minAmount: '',
  maxAmount: '',
  transactionId: '',
  category: '',
})

// 交易分类
const categories = [
  { value: 'payment', label: t('merchant.finance.transactions.category_payment') },
  { value: 'refund', label: t('merchant.finance.transactions.category_refund') },
  { value: 'withdrawal', label: t('merchant.finance.transactions.category_withdrawal') },
  { value: 'deposit', label: t('merchant.finance.transactions.category_deposit') },
  { value: 'fee', label: t('merchant.finance.transactions.category_fee') },
  { value: 'adjustment', label: t('merchant.finance.transactions.category_adjustment') },
  { value: 'transfer', label: t('merchant.finance.transactions.category_transfer') },
]

// 分页相关
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 1,
})
const pageSizeOptions = [10, 20, 50, 100]

// 表格数据
const transactions = ref<Transaction[]>([])
const loading = ref(true)
const showAdvancedFilters = ref(false)

// 生成模拟数据
const generateTransactionData = (count: number): Transaction[] => {
  const result: Transaction[] = []
  let balance = 50000
  
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed']
  const types: ('income' | 'expense')[] = ['income', 'expense']
  const categoryValues = categories.map(cat => cat.value)
  
  const descriptions = [
    t('merchant.finance.transactions.desc_payment_received'),
    t('merchant.finance.transactions.desc_refund_processed'),
    t('merchant.finance.transactions.desc_withdrawal_to_bank'),
    t('merchant.finance.transactions.desc_deposit_from_bank'),
    t('merchant.finance.transactions.desc_platform_fee'),
    t('merchant.finance.transactions.desc_account_adjustment'),
    t('merchant.finance.transactions.desc_transfer_to_account'),
  ]
  
  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 90))
    
    const type = types[Math.floor(Math.random() * types.length)]
    const category = categoryValues[Math.floor(Math.random() * categoryValues.length)]
    const amount = Math.floor(Math.random() * 10000) / 100 * (Math.random() < 0.3 ? 10 : 1)
    
    if (type === 'income') {
      balance += amount
    } else {
      balance -= amount
    }
    
    result.push({
      id: `TX${Date.now().toString().slice(-6)}${i.toString().padStart(4, '0')}`,
      date: formatDateTime(date),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      type,
      amount,
      status: statuses[Math.floor(Math.random() * (i < 5 ? 2 : statuses.length))],
      category,
      balanceAfter: balance,
    })
  }
  
  // 按日期排序，最新的在前面
  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 格式化为日期时间字符串（取代 date-fns 的 format 函数）
const formatDateTime = (date: Date): string => {
  return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss').value
}

// 获取所有交易数据
const allTransactions = ref<Transaction[]>([])

// 初始化数据
onMounted(() => {
  // 模拟API调用
  setTimeout(() => {
    allTransactions.value = generateTransactionData(156)
    filterAndPaginateTransactions()
    loading.value = false
  }, 800)
  
  // 从URL参数中恢复筛选条件
  const query = route.query
  if (query.startDate) filters.startDate = query.startDate as string
  if (query.endDate) filters.endDate = query.endDate as string
  if (query.type) filters.type = query.type as string
  if (query.status) filters.status = query.status as string
  if (query.keyword) filters.keyword = query.keyword as string
  if (query.page) pagination.currentPage = parseInt(query.page as string, 10)
  if (query.pageSize) pagination.pageSize = parseInt(query.pageSize as string, 10)
})

// 统计数据
const totalIncome = computed(() => {
  return filteredTransactions.value
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

const totalExpense = computed(() => {
  return filteredTransactions.value
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

const totalTransactions = computed(() => {
  return filteredTransactions.value.length
})

// 将日期字符串解析为 Date 对象（取代 date-fns 的 parseISO 函数）
const parseISOString = (dateString: string): Date => {
  return new Date(dateString)
}

// 筛选后的交易数据（未分页）
const filteredTransactions = computed(() => {
  if (!allTransactions.value.length) return []
  
  return allTransactions.value.filter(tx => {
    const txDate = new Date(tx.date)
    const startDateObj = filters.startDate ? parseISOString(`${filters.startDate}T00:00:00`) : null
    const endDateObj = filters.endDate ? parseISOString(`${filters.endDate}T23:59:59`) : null
    
    // 日期筛选
    if (startDateObj && txDate < startDateObj) return false
    if (endDateObj && txDate > endDateObj) return false
    
    // 类型筛选
    if (filters.type && tx.type !== filters.type) return false
    
    // 状态筛选
    if (filters.status && tx.status !== filters.status) return false
    
    // 关键词搜索
    if (filters.keyword && !tx.description.toLowerCase().includes(filters.keyword.toLowerCase())) return false
    
    // 金额范围筛选
    if (filters.minAmount && tx.amount < parseFloat(filters.minAmount)) return false
    if (filters.maxAmount && tx.amount > parseFloat(filters.maxAmount)) return false
    
    // 交易ID筛选
    if (filters.transactionId && !tx.id.includes(filters.transactionId)) return false
    
    // 分类筛选
    if (filters.category && tx.category !== filters.category) return false
    
    return true
  })
})

// 过滤并分页交易数据
const filterAndPaginateTransactions = () => {
  const filtered = filteredTransactions.value
  pagination.totalItems = filtered.length
  pagination.totalPages = Math.ceil(filtered.length / pagination.pageSize)
  
  // 确保当前页不超过总页数
  if (pagination.currentPage > pagination.totalPages && pagination.totalPages > 0) {
    pagination.currentPage = pagination.totalPages
  }
  
  // 计算分页
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  
  transactions.value = filtered.slice(startIndex, endIndex)
  
  // 更新URL参数以便共享或刷新保留筛选状态
  updateUrlParams()
}

// 更新URL参数
const updateUrlParams = () => {
  const query: Record<string, string> = {}
  
  if (filters.startDate) query.startDate = filters.startDate
  if (filters.endDate) query.endDate = filters.endDate
  if (filters.type) query.type = filters.type
  if (filters.status) query.status = filters.status
  if (filters.keyword) query.keyword = filters.keyword
  if (pagination.currentPage > 1) query.page = pagination.currentPage.toString()
  if (pagination.pageSize !== 10) query.pageSize = pagination.pageSize.toString()
  
  router.replace({ query })
}

// 处理搜索
const handleSearch = () => {
  pagination.currentPage = 1
  filterAndPaginateTransactions()
}

// 处理重置
const handleReset = () => {
  // 重置筛选条件
  filters.startDate = formatDateToYYYYMMDD(subDays(new Date(), 7))
  filters.endDate = formatDateToYYYYMMDD(new Date())
  filters.type = ''
  filters.status = ''
  filters.keyword = ''
  filters.minAmount = ''
  filters.maxAmount = ''
  filters.transactionId = ''
  filters.category = ''
  
  pagination.currentPage = 1
  filterAndPaginateTransactions()
}

// 导出交易
const exportTransactions = () => {
  // 实际项目中可以调用API导出，或者生成CSV下载
  alert(t('merchant.finance.transactions.export_started'))
}

// 刷新交易
const refreshTransactions = () => {
  loading.value = true
  
  // 模拟API刷新
  setTimeout(() => {
    allTransactions.value = generateTransactionData(156)
    filterAndPaginateTransactions()
    loading.value = false
  }, 800)
}

// 分页处理
const goToPage = (page: number) => {
  pagination.currentPage = page
  filterAndPaginateTransactions()
}

const handlePageSizeChange = () => {
  pagination.currentPage = 1
  filterAndPaginateTransactions()
}

// 计算显示哪些页码
const displayedPages = computed(() => {
  const { currentPage, totalPages } = pagination
  
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, '...', totalPages]
  }
  
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
})

// 选择时间段
const selectTimePeriod = (period: string) => {
  selectedPeriod.value = period
  const today = new Date()
  
  switch (period) {
    case 'today':
      filters.startDate = formatDateToYYYYMMDD(today)
      filters.endDate = formatDateToYYYYMMDD(today)
      break
    case '7days':
      filters.startDate = formatDateToYYYYMMDD(subDays(today, 6))
      filters.endDate = formatDateToYYYYMMDD(today)
      break
    case '30days':
      filters.startDate = formatDateToYYYYMMDD(subDays(today, 29))
      filters.endDate = formatDateToYYYYMMDD(today)
      break
    case '90days':
      filters.startDate = formatDateToYYYYMMDD(subDays(today, 89))
      filters.endDate = formatDateToYYYYMMDD(today)
      break
  }
  
  pagination.currentPage = 1
  filterAndPaginateTransactions()
}

// 帮助函数
const getTimeRangeText = () => {
  return `${filters.startDate} - ${filters.endDate}`
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', { 
    style: 'currency', 
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return formatDateTime(date)
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return t('merchant.finance.transactions.completed')
    case 'pending':
      return t('merchant.finance.transactions.pending')
    case 'failed':
      return t('merchant.finance.transactions.failed')
    default:
      return status
  }
}

const getCategoryLabel = (category: string) => {
  const found = categories.find(c => c.value === category)
  return found ? found.label : category
}

const getCategoryClass = (category: string) => {
  switch (category) {
    case 'payment':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case 'refund':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    case 'withdrawal':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    case 'deposit':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case 'fee':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
    case 'adjustment':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400'
    case 'transfer':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

button, select {
  transition: all 0.2s ease;
}
</style> 