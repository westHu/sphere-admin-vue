<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          联系我们
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          我们随时准备为您提供帮助
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 联系表单 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            发送消息
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                姓名
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                主题
              </label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                消息内容
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                发送消息
              </button>
            </div>
          </form>
        </div>

        <!-- 联系信息 -->
        <div class="space-y-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              联系信息
            </h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-lg font-medium text-gray-900 dark:text-white">邮箱</p>
                  <p class="text-gray-600 dark:text-gray-300">contact@sphere.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-lg font-medium text-gray-900 dark:text-white">电话</p>
                  <p class="text-gray-600 dark:text-gray-300">+86 123 4567 8900</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-lg font-medium text-gray-900 dark:text-white">地址</p>
                  <p class="text-gray-600 dark:text-gray-300">北京市朝阳区某某大厦</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 工作时间 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              工作时间
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600 dark:text-gray-300">周一至周五: 9:00 - 18:00</p>
              <p class="text-gray-600 dark:text-gray-300">周六: 10:00 - 16:00</p>
              <p class="text-gray-600 dark:text-gray-300">周日: 休息</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // TODO: 实现表单提交逻辑
  console.log('Form submitted:', form.value)
}
</script> 