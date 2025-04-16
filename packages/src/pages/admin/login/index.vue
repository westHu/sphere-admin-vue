<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
      <div class="mb-6 flex flex-col items-center space-y-2 text-center">
        <div class="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
          <span class="text-2xl font-bold text-primary-foreground">S</span>
        </div>
        <h1 class="text-2xl font-bold">{{ t('admin.login.title') }}</h1>
        <p class="text-sm text-muted-foreground">
          {{ t('admin.login.subtitle') }}
        </p>
        
        <!-- 语言切换 -->
        <div class="mt-4 flex justify-center space-x-2">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            class="px-2 py-1 text-xs rounded-md"
            :class="locale === lang.code ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium">
              {{ t('admin.login.username') }}
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              :placeholder="t('admin.login.username')"
              class="input w-full"
              :class="{ 'border-destructive': errors.username }"
              required
            />
            <p v-if="errors.username" class="text-xs text-destructive">
              {{ errors.username }}
            </p>
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">
              {{ t('admin.login.password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              :placeholder="t('admin.login.password')"
              class="input w-full"
              :class="{ 'border-destructive': errors.password }"
              required
            />
            <p v-if="errors.password" class="text-xs text-destructive">
              {{ errors.password }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <input
                id="remember"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded border-input bg-background"
              />
              <label for="remember" class="text-sm">
                {{ t('admin.login.remember_me') }}
              </label>
            </div>
            <a href="#" class="text-sm text-primary">
              {{ t('admin.login.forgot_password') }}
            </a>
          </div>

          <button
            type="submit"
            class="btn w-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">{{ t('admin.login.sign_in') }}...</span>
            <span v-else>{{ t('admin.login.sign_in') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales } from '../../../i18n'

const { t, locale } = useI18n()
const router = useRouter()

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
    console.log('管理员登录页面 - 默认设置语言为英文')
  } else {
    console.log('管理员登录页面 - 使用已存储的语言:', storedLocale)
  }
})

// 切换语言
const changeLanguage = (lang: string) => {
  console.log('管理员登录页面 - 切换语言:', lang)
  setLocale(lang)
  // 不刷新页面，只更新 locale.value，确保实时生效
  locale.value = lang
}

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isSubmitting = ref(false)
const errors = reactive({
  username: '',
  password: ''
})

// 获取token存储对象
const token = useStorage('admin_token', '')

// 模拟登录API调用
const handleLogin = async () => {
  // 重置错误
  errors.username = ''
  errors.password = ''
  
  // 表单验证
  if (!username.value) {
    errors.username = t('admin.login.form_invalid')
    return
  }
  
  if (!password.value) {
    errors.password = t('admin.login.form_invalid')
    return
  }
  
  try {
    isSubmitting.value = true
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里是简单的模拟，实际项目中应该调用真实的后端API
    if (username.value === 'admin' && password.value === 'admin123') {
      // 登录成功，保存token
      token.value = 'mock-admin-token-' + Date.now()
      
      // 保存当前选择的语言
      const currentLang = locale.value
      localStorage.setItem('locale', currentLang)
      console.log('管理员登录页面 - 保存语言设置:', currentLang)
      
      // 登录成功后跳转到管理后台首页
      router.push('/admin/dashboard')
    } else {
      // 登录失败
      errors.password = t('admin.login.invalid_credentials')
    }
  } catch (error) {
    console.error('登录失败:', error)
    errors.password = t('admin.login.login_error')
  } finally {
    isSubmitting.value = false
  }
}
</script> 