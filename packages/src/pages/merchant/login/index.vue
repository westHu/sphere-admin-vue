<template>
  <!-- 背景图和全屏容器 -->
  <div class="min-h-screen flex items-stretch bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- 背景图案装饰 -->
    <div class="absolute inset-0 z-0 opacity-10">
      <div class="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-primary/30 filter blur-3xl"></div>
      <div class="absolute right-10 top-1/4 w-80 h-80 rounded-full bg-indigo-400/30 filter blur-3xl"></div>
      <div class="absolute bottom-10 left-1/3 w-60 h-60 rounded-full bg-blue-300/30 filter blur-2xl"></div>
    </div>
    
    <!-- 左侧图片区域 - 在小屏幕上隐藏 -->
    <div class="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center bg-gradient-to-br from-primary/90 to-primary-dark rounded-r-3xl shadow-2xl overflow-hidden">
      <!-- 背景装饰图形 -->
      <div class="absolute inset-0 z-0 opacity-20">
        <!-- 圆形装饰 -->
        <div class="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-white/30"></div>
        <div class="absolute bottom-20 left-10 w-24 h-24 rounded-full border-4 border-white/20"></div>
        
        <!-- 波浪形状 -->
        <svg class="absolute bottom-0 left-0 w-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="white"
          opacity="0.05"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
        
        <!-- 点阵图案 -->
        <div class="absolute inset-0 grid grid-cols-12 gap-4 p-8">
          <div v-for="n in 96" :key="n" class="w-1 h-1 rounded-full bg-white/10"></div>
        </div>
      </div>
      
      <div class="p-8 flex flex-col items-center justify-center space-y-8 z-10">
        <!-- Logo -->
        <div class="h-20 w-20 flex justify-center items-center bg-white rounded-full shadow-xl mb-4">
          <span class="text-3xl font-bold text-primary">S</span>
        </div>
        
        <!-- 标语 -->
        <h1 class="text-4xl font-bold text-white text-center">Sphere</h1>
        <p class="text-xl text-white/90 text-center max-w-md">
          {{ t('merchant.login.welcome_message') || '欢迎使用Sphere商户管理平台' }}
        </p>
        
        <!-- 图片 - 使用更美观的插画 -->
        <div class="w-full max-w-md h-64 relative overflow-hidden rounded-xl shadow-lg bg-white/10 flex items-center justify-center">
          <!-- 商务办公场景插画 -->
          <svg viewBox="0 0 500 500" class="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 背景图形 -->
            <circle cx="250" cy="250" r="200" fill="#ffffff" fill-opacity="0.1" />
            
            <!-- 办公桌 -->
            <rect x="100" y="320" width="300" height="20" rx="2" fill="white" fill-opacity="0.8" />
            <rect x="120" y="340" width="260" height="10" rx="2" fill="white" fill-opacity="0.6" />
            
            <!-- 电脑显示器 -->
            <rect x="180" y="220" width="140" height="90" rx="4" fill="white" fill-opacity="0.9" />
            <rect x="185" y="225" width="130" height="80" rx="2" fill="#2563EB" fill-opacity="0.5" />
            <rect x="220" y="310" width="60" height="10" rx="2" fill="white" fill-opacity="0.8" />
            <rect x="235" y="320" width="30" height="3" rx="1" fill="white" fill-opacity="0.6" />
            
            <!-- 键盘 -->
            <rect x="200" y="260" width="100" height="30" rx="4" fill="white" fill-opacity="0.5" />
            <rect x="205" y="265" width="90" height="20" rx="2" fill="white" fill-opacity="0.3" />
            
            <!-- 人物形象 -->
            <circle cx="250" cy="180" r="25" fill="white" fill-opacity="0.9" />
            <path d="M230 220C230 209.5 239 200 250 200C261 200 270 209.5 270 220V250H230V220Z" fill="white" fill-opacity="0.9" />
            
            <!-- 装饰元素 -->
            <circle cx="150" cy="250" r="10" fill="white" fill-opacity="0.4" />
            <circle cx="350" cy="250" r="10" fill="white" fill-opacity="0.4" />
            <rect x="330" y="270" width="40" height="40" rx="4" fill="white" fill-opacity="0.3" />
            <rect x="130" y="270" width="40" height="40" rx="4" fill="white" fill-opacity="0.3" />
          </svg>
        </div>
        
        <!-- 特性列表 -->
        <ul class="text-white/90 space-y-3 z-10">
          <li class="flex items-center bg-white/10 p-2 rounded-lg transition-all hover:bg-white/20">
            <svg class="h-6 w-6 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ t('merchant.login.feature_one') || '高效的商户管理工具' }}</span>
          </li>
          <li class="flex items-center bg-white/10 p-2 rounded-lg transition-all hover:bg-white/20">
            <svg class="h-6 w-6 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ t('merchant.login.feature_two') || '安全可靠的数据保障' }}</span>
          </li>
          <li class="flex items-center bg-white/10 p-2 rounded-lg transition-all hover:bg-white/20">
            <svg class="h-6 w-6 mr-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ t('merchant.login.feature_three') || '便捷的多语言支持' }}</span>
          </li>
        </ul>
        
        <!-- 动态形状 -->
        <div class="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-10">
            <circle cx="150" cy="150" r="150" fill="white" />
          </svg>
        </div>
      </div>
    </div>
    
    <!-- 右侧登录区域 -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 relative z-10">
      <!-- 语言切换 - 移到右上角 -->
      <div class="absolute top-6 right-6 flex space-x-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="px-3 py-1.5 text-xs rounded-md transition-colors duration-200"
          :class="locale === lang.code ? 'bg-primary text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'"
        >
          {{ lang.name }}
        </button>
      </div>
      
      <div class="w-full max-w-md">
        <!-- 小屏幕上显示的Logo -->
        <div class="lg:hidden flex justify-center mb-8">
          <div class="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <span class="text-2xl font-bold text-primary-foreground">S</span>
          </div>
        </div>
        
        <!-- 登录卡片 -->
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900">
              {{ pageTitle }}
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              {{ pageSubtitle }}
            </p>
          </div>
          
          <!-- 登录表单 -->
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-4">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('merchant.login.username') }}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  :placeholder="t('merchant.login.username_placeholder') || t('merchant.login.username')"
                  v-model="form.username"
                />
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t('merchant.login.password') }}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  :placeholder="t('merchant.login.password_placeholder') || t('merchant.login.password')"
                  v-model="form.password"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  v-model="form.remember"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  {{ t('merchant.login.remember_me') }}
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-primary hover:text-primary-dark transition-colors">
                  {{ t('merchant.login.forgot_password') }}
                </a>
              </div>
            </div>

            <!-- 错误提示 -->
            <div v-if="errorMessage" class="rounded-md bg-red-50 p-3 text-sm">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                :disabled="loading"
              >
                <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                {{ t('merchant.login.sign_in') }}
              </button>
            </div>
          </form>
          
          <!-- 注册账户链接 -->
          <div class="text-center mt-6">
            <a :href="registerLink" class="font-medium text-primary hover:text-primary-dark transition-colors">
              {{ registerText }}
            </a>
          </div>
        </div>
        
        <!-- 版权信息 -->
        <p class="mt-6 text-center text-sm text-gray-600">
          &copy; {{ new Date().getFullYear() }} Sphere. {{ t('common.footer.rights') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { nanoid } from 'nanoid'
import { useStorage, usePreferredDark } from '@vueuse/core'
import { setLocale, supportedLocales } from '../../../i18n'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const isDark = usePreferredDark()

// 支持的语言列表
const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'id', name: 'Indonesia' }
]

// 默认设置为英文
onMounted(() => {
  // 检查是否有存储的语言设置
  const storedLocale = localStorage.getItem('locale')
  if (!storedLocale || !supportedLocales.includes(storedLocale)) {
    // 如果没有存储的语言设置或者不是支持的语言，则设置为英文
    setLocale('en')
    console.log('登录页面 - 默认设置语言为英文')
  } else {
    console.log('登录页面 - 使用已存储的语言:', storedLocale)
  }
})

// 切换语言
const changeLanguage = (lang: string) => {
  console.log('登录页面 - 切换语言:', lang)
  setLocale(lang)
  // 不刷新页面，只更新 locale.value，确保实时生效
  locale.value = lang
}

// 判断是否为商户登录
const isMerchantLogin = computed(() => route.path.includes('/merchant'))

// 根据登录页面类型显示不同的标题
const pageTitle = computed(() => {
  return isMerchantLogin.value
    ? t('merchant.login.title')
    : t('login.title')
})

const pageSubtitle = computed(() => {
  return isMerchantLogin.value
    ? t('merchant.login.subtitle')
    : t('login.or')
})

// 获取注册链接
const registerLink = computed(() => {
  return '/merchant/register'
})

// 获取注册文本
const registerText = computed(() => {
  return isMerchantLogin.value
    ? t('merchant.login.register_account')
    : t('login.registerLink')
})

// 表单数据
const form = ref({
  username: '',
  password: '',
  remember: false
})

// 使用VueUse的useStorage来持久化token
const token = useStorage('token', '')

// 状态
const loading = ref(false)
const errorMessage = ref('')

// 登录处理
const handleLogin = async () => {
  // 重置错误消息
  errorMessage.value = ''
  
  // 表单验证 - 只检查是否填写了内容
  if (!form.value.username.trim() || !form.value.password.trim()) {
    errorMessage.value = t('merchant.login.form_invalid')
    return
  }
  
  loading.value = true
  
  try {
    // 模拟登录请求的延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 登录成功，生成并保存token
    const tokenValue = nanoid()
    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
    
    // 保存当前选择的语言
    const currentLang = locale.value
    localStorage.setItem('locale', currentLang)
    console.log('登录页面 - 保存语言设置:', currentLang)
    
    // 跳转到商户仪表盘
    router.push('/merchant/dashboard')
  } catch (error) {
    // 处理错误 (实际上不会进入这个分支，但保留以防将来需要)
    console.error('登录过程中发生错误:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 渐变过渡效果 */
.bg-primary-dark {
  --tw-bg-opacity: 1;
  background-color: rgba(var(--color-primary-dark, 30 64 175), var(--tw-bg-opacity));
}

/* 确保图片加载失败时有合适的后备方案 */
img[src=''] {
  display: none;
}
</style> 