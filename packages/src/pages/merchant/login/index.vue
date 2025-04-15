<template>
  <div class="min-h-screen flex flex-col justify-start items-center bg-gray-50 px-4 sm:px-6 lg:px-8 pt-20">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
      <div class="flex flex-col items-center">
        <div class="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
          <span class="text-2xl font-bold text-primary-foreground">S</span>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          {{ pageTitle }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ pageSubtitle }}
        </p>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">{{ t('merchant.login.username') }}</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              :placeholder="t('merchant.login.username')"
              v-model="form.username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{ t('merchant.login.password') }}</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              :placeholder="t('merchant.login.password')"
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
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              {{ t('merchant.login.remember_me') }}
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary/80">
              {{ t('merchant.login.forgot_password') }}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            :disabled="loading"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-primary-foreground group-hover:text-primary-foreground/80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('merchant.login.sign_in') }}
          </button>
        </div>
      </form>
      
      <div class="text-center pt-2">
        <a :href="registerLink" class="font-medium text-primary hover:text-primary/80">
          {{ registerText }}
        </a>
      </div>
      
      <!-- 错误提示 -->
      <div v-if="errorMessage" class="rounded-md bg-red-50 p-4 mt-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
          </div>
        </div>
      </div>
    </div>
    
    <p class="mt-6 text-center text-sm text-gray-600">
      &copy; 2025 Sphere. {{ t('common.footer.rights') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

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