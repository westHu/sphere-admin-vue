<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 使用vue-i18n
const { t } = useI18n()
const router = useRouter()

// 表单状态
const formState = reactive({
  businessName: '',
  contactName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  businessType: 'company',
  agreeTerms: false
})

// 错误状态
const errorMessage = ref('')
const isLoading = ref(false)
const formErrors = reactive({
  businessName: '',
  contactName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: ''
})

// 表单验证
const validateForm = () => {
  let isValid = true
  
  // 重置错误
  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = ''
  })
  
  if (!formState.businessName.trim()) {
    formErrors.businessName = '请输入企业名称'
    isValid = false
  }
  
  if (!formState.contactName.trim()) {
    formErrors.contactName = '请输入联系人姓名'
    isValid = false
  }
  
  if (!formState.email.trim()) {
    formErrors.email = '请输入邮箱地址'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    formErrors.email = '请输入有效的邮箱地址'
    isValid = false
  }
  
  if (!formState.password) {
    formErrors.password = '请输入密码'
    isValid = false
  } else if (formState.password.length < 8) {
    formErrors.password = '密码至少需要8个字符'
    isValid = false
  }
  
  if (!formState.confirmPassword) {
    formErrors.confirmPassword = '请确认密码'
    isValid = false
  } else if (formState.password !== formState.confirmPassword) {
    formErrors.confirmPassword = t('register.errors.password_mismatch')
    isValid = false
  }
  
  if (!formState.phone.trim()) {
    formErrors.phone = '请输入联系电话'
    isValid = false
  }
  
  if (!formState.agreeTerms) {
    formErrors.agreeTerms = '请阅读并同意服务条款和隐私政策'
    isValid = false
  }
  
  return isValid
}

// 注册处理
const handleRegister = async () => {
  if (!validateForm()) {
    return
  }
  
  errorMessage.value = ''
  isLoading.value = true
  
  try {
    // 模拟注册请求，后续可对接实际API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 假设注册成功
    localStorage.setItem('merchant_registered', 'true')
    router.push('/login')
  } catch (error) {
    errorMessage.value = t('register.errors.failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 标题 -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ t('register.title') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ t('register.description') }}
        </p>
      </div>
      
      <!-- 表单 -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- 企业名称 -->
          <div>
            <label for="business-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.business_name') }}
            </label>
            <div class="mt-1">
              <input
                id="business-name"
                v-model="formState.businessName"
                name="business-name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.businessName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.businessName }}
              </p>
            </div>
          </div>
          
          <!-- 联系人姓名 -->
          <div>
            <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.contact_name') }}
            </label>
            <div class="mt-1">
              <input
                id="contact-name"
                v-model="formState.contactName"
                name="contact-name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.contactName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.contactName }}
              </p>
            </div>
          </div>
          
          <!-- 邮箱 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.email') }}
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formState.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.email }}
              </p>
            </div>
          </div>
          
          <!-- 密码 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.password') }}
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formState.password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.password }}
              </p>
            </div>
          </div>
          
          <!-- 确认密码 -->
          <div>
            <label for="password-confirm" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.confirm_password') }}
            </label>
            <div class="mt-1">
              <input
                id="password-confirm"
                v-model="formState.confirmPassword"
                name="password-confirm"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.confirmPassword }}
              </p>
            </div>
          </div>
          
          <!-- 联系电话 -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.phone') }}
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="formState.phone"
                name="phone"
                type="tel"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              />
              <p v-if="formErrors.phone" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.phone }}
              </p>
            </div>
          </div>
          
          <!-- 企业类型 -->
          <div>
            <label for="business-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('register.business_type') }}
            </label>
            <div class="mt-1">
              <select
                id="business-type"
                v-model="formState.businessType"
                name="business-type"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
              >
                <option value="individual">{{ t('register.business_types.individual') }}</option>
                <option value="company">{{ t('register.business_types.company') }}</option>
                <option value="organization">{{ t('register.business_types.organization') }}</option>
              </select>
            </div>
          </div>
          
          <!-- 服务条款同意 -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="formState.agreeTerms"
                name="terms"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700 dark:text-gray-300">
                {{ t('register.terms') }}
              </label>
              <p v-if="formErrors.agreeTerms" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ formErrors.agreeTerms }}
              </p>
            </div>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400 text-center">
          {{ errorMessage }}
        </div>

        <!-- 注册按钮 -->
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
            {{ t('register.submit') }}
          </button>
        </div>
        
        <!-- 登录链接 -->
        <div class="flex items-center justify-center">
          <div class="text-sm">
            <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              {{ t('register.login_link') }}
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template> 