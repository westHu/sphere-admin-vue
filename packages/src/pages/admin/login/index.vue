<template>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
      <div class="mb-6 flex flex-col items-center space-y-2 text-center">
        <div class="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
          <span class="text-2xl font-bold text-primary-foreground">S</span>
        </div>
        <h1 class="text-2xl font-bold">管理员登录</h1>
        <p class="text-sm text-muted-foreground">
          请输入您的账号信息
        </p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium">
              用户名
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="请输入管理员用户名"
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
              密码
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="请输入密码"
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
                记住我
              </label>
            </div>
            <a href="#" class="text-sm text-primary">
              忘记密码?
            </a>
          </div>

          <button
            type="submit"
            class="btn w-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">登录中...</span>
            <span v-else>登录</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = useRouter()
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
    errors.username = '请输入用户名'
    return
  }
  
  if (!password.value) {
    errors.password = '请输入密码'
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
      
      // 登录成功后跳转到管理后台首页
      router.push('/admin/dashboard')
    } else {
      // 登录失败
      errors.password = '用户名或密码错误'
    }
  } catch (error) {
    console.error('登录失败:', error)
    errors.password = '登录失败，请重试'
  } finally {
    isSubmitting.value = false
  }
}
</script> 