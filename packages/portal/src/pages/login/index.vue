<template>
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          {{ t('login.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('login.or') }}
          <router-link to="/register" class="font-medium text-primary hover:text-primary/90">
            {{ t('login.registerLink') }}
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label :for="emailId" class="sr-only">{{ t('login.form.email.label') }}</label>
            <input
              :id="emailId"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-t-md"
              :placeholder="t('login.form.email.placeholder')"
            />
          </div>
          <div>
            <label :for="passwordId" class="sr-only">{{ t('login.form.password.label') }}</label>
            <input
              :id="passwordId"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-b-md"
              :placeholder="t('login.form.password.placeholder')"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              :id="rememberMeId"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-input rounded"
            />
            <label :for="rememberMeId" class="ml-2 block text-sm text-foreground">
              {{ t('login.form.rememberMe') }}
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary/90">
              {{ t('login.form.forgotPassword') }}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-primary-foreground/70 group-hover:text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ t('login.form.submit') }}
          </button>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { nanoid } from 'nanoid'

const { t } = useI18n()
const router = useRouter()

// 生成唯一 ID
const emailId = nanoid()
const passwordId = nanoid()
const rememberMeId = nanoid()

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const form = ref<LoginForm>({
  email: '',
  password: '',
  rememberMe: false
})

const error = ref<string | null>(null)
const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    error.value = null
    isLoading.value = true

    // 模拟登录请求
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password
      })
    })

    if (!response.ok) {
      throw new Error('登录失败')
    }

    const data = await response.json()
    
    // 保存登录状态
    localStorage.setItem('token', data.token)
    if (form.value.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
    }
    
    // 登录成功后跳转到首页
    await router.push('/')
  } catch (err) {
    console.error('Login failed:', err)
    error.value = t('login.errors.failed')
  } finally {
    isLoading.value = false
  }
}
</script> 