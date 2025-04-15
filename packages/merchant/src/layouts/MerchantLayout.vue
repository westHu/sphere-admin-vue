<template>
  <div class="min-h-screen bg-background">
    <div class="flex h-screen overflow-hidden">
      <!-- 侧边栏 -->
      <aside class="hidden md:flex md:w-64 md:flex-col">
        <div class="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-card">
          <div class="flex items-center justify-center h-16 px-4">
            <h1 class="text-xl font-semibold">
              <span class="text-primary">Sphere</span> {{ t('merchant.layout.title') }}
            </h1>
          </div>
          <nav class="flex-1 px-2 pb-4 space-y-1">
            <router-link
              v-for="item in sidebarItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path.startsWith(item.to)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              ]"
            >
              <component :is="item.icon" class="flex-shrink-0 w-5 h-5 mr-3" />
              {{ t(item.title) }}
            </router-link>
          </nav>
          <div class="px-4 py-6 mt-auto border-t border-border">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {{ userInitials }}
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium">
                  {{ userName }}
                </p>
                <button
                  @click="logout"
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ t('merchant.layout.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- 移动端导航 -->
      <div class="md:hidden flex items-center h-16 px-4 border-b bg-card">
        <button
          type="button"
          class="text-muted-foreground focus:outline-none"
          @click="mobileMenuOpen = true"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="ml-4 text-lg font-semibold">
          <span class="text-primary">Sphere</span> {{ t('merchant.layout.title') }}
        </h1>
      </div>

      <!-- 移动端侧边栏 -->
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 flex md:hidden"
      >
        <div
          class="fixed inset-0 bg-background/80 backdrop-blur-sm"
          @click="mobileMenuOpen = false"
        ></div>
        <div class="relative flex w-full max-w-xs flex-1 flex-col bg-card pt-5 pb-4">
          <div class="flex items-center justify-between px-4">
            <h1 class="text-lg font-semibold">
              <span class="text-primary">Sphere</span> {{ t('merchant.layout.title') }}
            </h1>
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-md focus:outline-none"
              @click="mobileMenuOpen = false"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-5 h-0 flex-1 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <router-link
                v-for="item in sidebarItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
                :class="[
                  $route.path.startsWith(item.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                ]"
                @click="mobileMenuOpen = false"
              >
                <component :is="item.icon" class="flex-shrink-0 w-5 h-5 mr-3" />
                {{ t(item.title) }}
              </router-link>
            </nav>
          </div>
          <div class="px-4 py-6 border-t border-border">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {{ userInitials }}
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium">
                  {{ userName }}
                </p>
                <button
                  @click="logout"
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ t('merchant.layout.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <main class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="container p-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const mobileMenuOpen = ref(false)

// 模拟用户数据
const userName = ref('商户名称')

const userInitials = computed(() => {
  return userName.value.charAt(0)
})

// 图标组件
const Dashboard = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  `
}

const Orders = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14h6" />
      <path d="M9 18h6" />
      <path d="M9 10h6" />
    </svg>
  `
}

const PaymentMethods = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  `
}

const Finance = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      <polyline points="16 3 17 5 15 7" />
      <polyline points="8 21 6 19 8 17" />
    </svg>
  `
}

const Settings = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  `
}

// 侧边栏菜单项
const sidebarItems = [
  {
    title: 'merchant.menu.dashboard',
    to: '/dashboard',
    icon: Dashboard
  },
  {
    title: 'merchant.menu.orders',
    to: '/orders',
    icon: Orders
  },
  {
    title: 'merchant.menu.payment_methods',
    to: '/payment-methods',
    icon: PaymentMethods
  },
  {
    title: 'merchant.menu.finance',
    to: '/finance',
    icon: Finance
  },
  {
    title: 'merchant.menu.settings',
    to: '/settings',
    icon: Settings
  }
]

// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script> 