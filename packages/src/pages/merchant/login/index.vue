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
      <div class="absolute inset-0 z-0">
        <!-- 波浪形动态背景 -->
        <div class="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute bottom-0 left-0 w-full">
            <path fill="#ffffff" fill-opacity="0.2" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="absolute top-0 left-0 w-full rotate-180">
            <path fill="#ffffff" fill-opacity="0.1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <!-- 粒子效果 -->
        <div class="absolute inset-0 grid grid-cols-12 gap-4 p-10">
          <div v-for="n in 50" :key="n" class="h-1 w-1 rounded-full bg-white/30" :style="{
            'margin-top': Math.floor(Math.random() * 100) + '%',
            'margin-left': Math.floor(Math.random() * 100) + '%'
          }"></div>
        </div>
        
        <!-- 光晕效果 -->
        <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-yellow-400/10 filter blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-blue-400/10 filter blur-3xl"></div>
      </div>
      
      <div class="p-8 flex flex-col items-center justify-center space-y-8 z-10">
        <!-- Logo -->
        <div class="h-20 w-20 flex justify-center items-center bg-white rounded-full shadow-xl mb-4">
          <span class="text-3xl font-bold text-primary">S</span>
        </div>
        
        <!-- 中央支付图片 -->
        <div class="w-full max-w-sm relative overflow-hidden">
          <img 
            :src="paymentImages[currentPaymentImageIndex]" 
            alt="支付插图"
            class="w-full object-contain rounded-xl shadow-lg"
            @error="handlePaymentImageError"
          />
          
          <!-- 支付图片加载失败时的备用显示 -->
          <div v-if="paymentImageLoadError" class="flex flex-col items-center justify-center py-10 bg-white/10 rounded-xl shadow-lg">
            <svg class="w-24 h-24 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="6" y1="15" x2="6" y2="15.01" />
              <line x1="10" y1="15" x2="10" y2="15.01" />
              <line x1="14" y1="15" x2="14" y2="15.01" />
              <line x1="18" y1="15" x2="18" y2="15.01" />
            </svg>
            <div class="text-white/80 text-center mt-4">
              <p class="text-lg font-semibold">安全支付</p>
              <p class="text-sm">快捷、安全的交易体验</p>
            </div>
          </div>
        </div>
        
        <!-- 底部分隔线 -->
        <div class="w-full max-w-xs mx-auto mt-auto">
          <div class="h-0.5 w-full bg-white/20 rounded-full"></div>
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

// 图片URL列表
const imageSources = [
  'https://img.freepik.com/free-vector/futuristic-banking-background-technology_23-2150102840.jpg',
  'https://img.freepik.com/free-vector/blue-technology-digital-wave-background_53876-116487.jpg',
  'https://img.freepik.com/free-vector/blue-abstract-technology-background-digital-wave_53876-117606.jpg',
  'https://img.freepik.com/free-vector/global-business-background-blue-with-digital-technology_53876-117397.jpg',
  'https://img.freepik.com/free-vector/cyber-security-concept_23-2148539599.jpg'
]

// 图片加载状态
const imageLoadError = ref(false)
const currentImageSrc = ref(imageSources[0])

// 处理图片加载错误
let currentImageIndex = 0;
const handleImageError = () => {
  console.log('登录页面 - 图片加载失败')
  currentImageIndex++
  
  // 尝试加载下一张备选图片
  if (currentImageIndex < imageSources.length) {
    currentImageSrc.value = imageSources[currentImageIndex]
    console.log('登录页面 - 尝试加载备用图片:', currentImageSrc.value)
  } else {
    // 所有图片都加载失败
    imageLoadError.value = true
    console.log('登录页面 - 所有图片均加载失败，显示备用内容')
  }
}

// 支付图片URL列表
const paymentImages = [
  'https://img.freepik.com/free-vector/online-payment-concept-illustration_114360-1382.jpg',
  'https://img.freepik.com/free-vector/digital-wallet-abstract-concept-illustration_335657-3896.jpg',
  'https://img.freepik.com/free-vector/tiny-people-analysts-with-credit-card-payment-flat-vector-illustration-cartoon-character-analyzing-statistics-financial-information-digital-money-transaction-finance-audit-concept_74855-10120.jpg',
  'https://img.freepik.com/free-vector/payment-information-concept-illustration_114360-2766.jpg',
  'https://img.freepik.com/free-vector/mobile-payment-abstract-concept-vector-illustration-mobile-payment-cashless-payment-online-shopping-transfer-money-digital-wallet-bank-account-credit-card-abstract-metaphor_335657-1631.jpg'
]

// 支付图片加载状态
const paymentImageLoadError = ref(false)
const currentPaymentImageIndex = ref(0)

// 处理支付图片加载错误
const handlePaymentImageError = () => {
  console.log('登录页面 - 支付图片加载失败')
  currentPaymentImageIndex.value++
  
  // 尝试加载下一张备选图片
  if (currentPaymentImageIndex.value < paymentImages.length) {
    console.log('登录页面 - 尝试加载备用支付图片:', paymentImages[currentPaymentImageIndex.value])
  } else {
    // 所有支付图片都加载失败
    paymentImageLoadError.value = true
    console.log('登录页面 - 所有支付图片均加载失败，显示备用内容')
  }
}

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
    
    // 使用window.location直接跳转，避免Vue Router懒加载问题
    console.log('登录成功，准备跳转到仪表盘页面')
    window.location.href = '/merchant/dashboard'
  } catch (error) {
    // 处理错误
    console.error('登录过程中发生错误:', error)
    errorMessage.value = t('merchant.login.error') || '登录失败，请稍后再试'
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