<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">国际化调试页面</h1>
    
    <div class="mb-6 p-4 border rounded">
      <h2 class="text-lg font-medium mb-2">当前语言信息</h2>
      <div class="space-y-2">
        <p>当前语言: <strong>{{ locale }}</strong></p>
        <p>语言代码类型: <strong>{{ typeof locale }}</strong></p>
        <p>localStorage 中的语言: <strong>{{ storedLocale }}</strong></p>
        <p>当前语言的类型: <strong>{{ typeof storedLocale }}</strong></p>
      </div>
    </div>
    
    <div class="mb-6 p-4 border rounded">
      <h2 class="text-lg font-medium mb-2">语言测试</h2>
      <div class="space-y-2">
        <p>商户页面测试: <strong>{{ t('merchant.dashboard.title') }}</strong></p>
        <p>商户导航测试: <strong>{{ t('merchant.nav.dashboard') }}</strong></p>
        <p>通用文本测试: <strong>{{ t('common.home') }}</strong></p>
      </div>
    </div>
    
    <div class="mb-6 p-4 border rounded">
      <h2 class="text-lg font-medium mb-2">切换语言</h2>
      <div class="flex space-x-4">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="px-4 py-2 bg-primary text-white rounded-md"
          :class="{ 'opacity-70': lang.code === locale }"
        >
          {{ lang.name }}
        </button>
      </div>
    </div>
    
    <div class="mb-6 p-4 border rounded">
      <h2 class="text-lg font-medium mb-2">强制切换语言</h2>
      <div class="flex space-x-4">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="forceChangeLanguage(lang.code)"
          class="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          强制设为{{ lang.name }}
        </button>
      </div>
    </div>
    
    <div class="mb-6 p-4 border rounded">
      <h2 class="text-lg font-medium mb-2">多语言对照表</h2>
      <table class="min-w-full border">
        <thead>
          <tr>
            <th class="border p-2">键名</th>
            <th class="border p-2" v-for="lang in languages" :key="lang.code">{{ lang.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">merchant.dashboard.title</td>
            <td class="border p-2" v-for="lang in languages" :key="lang.code">
              {{ messages[lang.code]?.merchant?.dashboard?.title || '未找到' }}
            </td>
          </tr>
          <tr>
            <td class="border p-2">merchant.nav.dashboard</td>
            <td class="border p-2" v-for="lang in languages" :key="lang.code">
              {{ messages[lang.code]?.merchant?.nav?.dashboard || '未找到' }}
            </td>
          </tr>
          <tr>
            <td class="border p-2">common.home</td>
            <td class="border p-2" v-for="lang in languages" :key="lang.code">
              {{ messages[lang.code]?.common?.home || '未找到' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="mt-6">
      <a href="/merchant/dashboard" class="px-4 py-2 bg-gray-200 rounded-md">返回仪表盘</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, messages } = useI18n()

// 所有支持的语言
const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'id', name: 'Indonesia' }
]

// 从localStorage获取语言设置
const storedLocale = ref('')

onMounted(() => {
  try {
    storedLocale.value = localStorage.getItem('locale') || ''
  } catch (error) {
    console.error('Error accessing localStorage:', error)
  }
})

// 标准切换语言方法
const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  console.log('语言已切换为:', lang)
  storedLocale.value = localStorage.getItem('locale') || ''
}

// 强制切换语言并刷新页面
const forceChangeLanguage = (lang: string) => {
  localStorage.setItem('locale', lang)
  window.location.reload()
}
</script> 