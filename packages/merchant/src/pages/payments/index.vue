<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ t('payments.title') }}
      </h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        管理您的支付方式和交易记录
      </p>
    </div>

    <!-- 支付方式标签页 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ t('payments.methods') }}
        </h2>
      </div>
      <div class="p-6">
        <div class="flex justify-end mb-4">
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            {{ t('payments.add_method') }}
          </button>
        </div>
        <div class="overflow-x-auto">
          <div class="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="text-gray-500 dark:text-gray-400">支付方式页面开发中</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 交易记录标签页 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ t('payments.transactions') }}
        </h2>
      </div>
      <div class="p-6">
        <div class="overflow-x-auto">
          <div class="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="text-gray-500 dark:text-gray-400">交易记录页面开发中</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 