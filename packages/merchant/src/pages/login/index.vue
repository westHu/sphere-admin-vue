<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 使用vue-i18n
const { t } = useI18n()
const router = useRouter()

// 表单状态
const formState = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// 错误状态
const errorMessage = ref('')
const isLoading = ref(false)

// 登录处理
const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  
  try {
    // 模拟登录验证，后续可对接实际API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 假设登录成功
    localStorage.setItem('merchant_token', 'demo_token')
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = t('login.errors.failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 登录标题 -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ t('login.title') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ t('login.description') }}
        </p>
      </div>
      
      <!-- 登录表单 -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- 邮箱输入 -->
          <div>
            <label for="email-address" class="sr-only">{{ t('login.email') }}</label>
            <input
              id="email-address"
              v-model="formState.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :placeholder="t('login.email')"
            />
          </div>
          
          <!-- 密码输入 -->
          <div>
            <label for="password" class="sr-only">{{ t('login.password') }}</label>
            <input
              id="password"
              v-model="formState.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              :placeholder="t('login.password')"
            />
          </div>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="formState.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-700 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              {{ t('login.remember_me') }}
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              {{ t('login.forgot_password') }}
            </a>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400 text-center">
          {{ errorMessage }}
        </div>

        <!-- 登录按钮 -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- 加载图标 -->
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ t('login.submit') }}
          </button>
        </div>
        
        <!-- 注册链接 -->
        <div class="text-sm text-center">
          <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            {{ t('login.register_link') }}
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template> 