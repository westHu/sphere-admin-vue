<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- 侧边栏 -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <!-- 商户LOGO -->
          <div class="flex items-center flex-shrink-0 px-4">
            <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span class="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span class="ml-2 font-bold">Sphere 商户中心</span>
          </div>
          
          <!-- 导航菜单 -->
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <a 
              v-for="(item, index) in navItems" 
              :key="index"
              :href="item.path"
              :class="[
                isActive(item.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              ]"
            >
              <component 
                :is="item.icon" 
                class="mr-3 flex-shrink-0 h-5 w-5" 
                :class="isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'"
                aria-hidden="true" 
              />
              {{ item.name }}
            </a>
          </nav>
        </div>
        
        <!-- 用户信息 -->
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" class="flex-shrink-0 group block">
            <div class="flex items-center">
              <div>
                <div class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  {{ userInitials }}
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ userName }}
                </p>
                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {{ t('merchant.common.logout') }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- 顶部导航栏 -->
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button 
          type="button" 
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">{{ t('merchant.common.open_sidebar') }}</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex items-center">
            <h1 class="text-lg font-medium">{{ pageTitle }}</h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- 通知 -->
            <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
              <span class="sr-only">{{ t('merchant.common.view_notifications') }}</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <!-- 用户下拉菜单 -->
            <div class="ml-3 relative">
              <div>
                <button 
                  type="button" 
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  @click="userMenuOpen = !userMenuOpen"
                >
                  <span class="sr-only">{{ t('merchant.common.open_user_menu') }}</span>
                  <div class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                    {{ userInitials }}
                  </div>
                </button>
              </div>
              
              <div 
                v-if="userMenuOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              >
                <a 
                  href="/merchant/settings" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="userMenuOpen = false"
                >
                  {{ t('merchant.common.settings') }}
                </a>
                <a 
                  href="#" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="logout"
                >
                  {{ t('merchant.common.logout') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 移动端侧边栏 -->
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 flex z-40 md:hidden"
      >
        <div 
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          @click="sidebarOpen = false"
        ></div>
        
        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span class="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span class="ml-2 font-bold">Sphere 商户中心</span>
            </div>
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="sidebarOpen = false"
            >
              <span class="sr-only">{{ t('merchant.common.close_sidebar') }}</span>
              <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <a 
                v-for="(item, index) in navItems" 
                :key="index"
                :href="item.path"
                :class="[
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                ]"
              >
                <component 
                  :is="item.icon" 
                  class="mr-4 flex-shrink-0 h-6 w-6" 
                  :class="isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'"
                  aria-hidden="true" 
                />
                {{ item.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>
      
      <!-- 页面内容区 -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

// 状态管理
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)

// 用户信息
const userName = ref('张三')
const userInitials = computed(() => {
  return userName.value.substring(0, 2)
})

// 页面标题
const pageTitle = computed(() => {
  const path = route.path
  const navItem = navItems.find(item => path === item.path || path.startsWith(item.path + '/'))
  return navItem ? navItem.name : '仪表盘'
})

// 判断路由是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 图标组件
const Dashboard = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    })
  ])
})

const ShoppingBag = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
    })
  ])
})

const Package = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
    })
  ])
})

const Users = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    })
  ])
})

const Settings = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    }),
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    })
  ])
})

// 导航菜单
const navItems = [
  {
    name: t('merchant.nav.dashboard'),
    path: '/merchant',
    icon: Dashboard
  },
  {
    name: t('merchant.nav.orders'),
    path: '/merchant/orders',
    icon: ShoppingBag
  },
  {
    name: t('merchant.nav.products'),
    path: '/merchant/products',
    icon: Package
  },
  {
    name: t('merchant.nav.customers'),
    path: '/merchant/customers',
    icon: Users
  },
  {
    name: t('merchant.nav.settings'),
    path: '/merchant/settings',
    icon: Settings
  }
]

// 注销
const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/merchant/login'
}
</script> 