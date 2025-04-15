<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 当前活动的设置标签页
const activeTab = ref('profile')
const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ t('settings.title') }}
      </h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        管理您的账户和商户信息
      </p>
    </div>

    <!-- 设置标签页 -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- 导航菜单 -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div class="p-4">
            <h2 class="font-medium text-gray-900 dark:text-white text-lg mb-4">
              设置
            </h2>
            <nav class="space-y-1">
              <button
                v-for="(section, key) in ['profile', 'account', 'payment', 'notifications', 'security', 'api']"
                :key="key"
                @click="setActiveTab(section)"
                :class="[
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeTab === section 
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900'
                ]"
              >
                {{ t(`settings.sections.${section}`) }}
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="flex-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <!-- 占位内容 -->
          <div class="flex items-center justify-center h-80 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p class="text-gray-500 dark:text-gray-400">设置页面开发中</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 