<template>
  <div class="min-h-screen flex flex-col justify-start items-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 pt-20">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
      <div class="flex flex-col items-center">
        <div class="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
          <span class="text-2xl font-bold text-primary-foreground">S</span>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ pageTitle }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ pageSubtitle }}
          <a :href="loginLink" class="font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
            {{ loginText }}
          </a>
        </p>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">{{ t('register.form.name.label') }}</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              :placeholder="t('register.form.name.placeholder')"
            />
          </div>
          <div>
            <label for="email" class="sr-only">{{ t('register.form.email.label') }}</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              :placeholder="t('register.form.email.placeholder')"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{ t('register.form.password.label') }}</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              :placeholder="t('register.form.password.placeholder')"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">{{ t('register.form.confirmPassword.label') }}</label>
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              :placeholder="t('register.form.confirmPassword.placeholder')"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            v-model="form.acceptTerms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            {{ t('register.form.terms.text') }}
            <a href="#" class="font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
              {{ t('register.form.terms.terms') }}
            </a>
            {{ t('register.form.terms.and') }}
            <a href="#" class="font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80">
              {{ t('register.form.terms.privacy') }}
            </a>
          </label>
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
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('register.form.submit') }}
          </button>
        </div>
      </form>
      
      <!-- 错误提示 -->
      <div v-if="error" class="rounded-md bg-red-50 p-4 mt-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
          </div>
        </div>
      </div>
    </div>
    
    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      &copy; 2025 Sphere. {{ t('common.footer.rights') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// 判断是否为商户注册
const isMerchantRegister = computed(() => route.path.includes('/merchant'))

// 根据注册页面类型显示不同的标题
const pageTitle = computed(() => {
  return t('register.title')
})

const pageSubtitle = computed(() => {
  return t('register.or')
})

// 获取登录链接
const loginLink = computed(() => {
  return '/merchant/login'
})

// 获取登录文本
const loginText = computed(() => {
  return t('register.loginLink')
})

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const error = ref<string | null>(null)
const loading = ref(false)

// 使用VueUse的useStorage保存注册状态
const registrationCompleted = useStorage('registration_completed', false)

// 表单验证
const validateForm = (): boolean => {
  // 重置错误
  error.value = null
  
  // 检查必填字段
  if (!form.value.name.trim()) {
    error.value = t('register.errors.nameRequired')
    return false
  }
  
  // 验证邮箱格式
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(form.value.email)) {
    error.value = t('register.errors.invalidEmail')
    return false
  }
  
  // 验证密码长度
  if (form.value.password.length < 6) {
    error.value = t('register.errors.passwordTooShort')
    return false
  }
  
  // 检查密码是否匹配
  if (form.value.password !== form.value.confirmPassword) {
    error.value = t('register.errors.passwordMismatch')
    return false
  }
  
  // 检查是否同意条款
  if (!form.value.acceptTerms) {
    error.value = t('register.errors.termsRequired')
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  try {
    // 表单验证
    if (!validateForm()) {
      return
    }
    
    loading.value = true
    
    // 模拟注册API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟注册成功
    console.log('注册表单提交:', form.value)
    
    // 保存注册成功状态
    registrationCompleted.value = true
    
    // 根据注册页面类型跳转到不同的登录页面
    await router.push(loginLink.value)
  } catch (err) {
    console.error('注册失败:', err)
    error.value = t('register.errors.failed')
  } finally {
    loading.value = false
  }
}
</script> 