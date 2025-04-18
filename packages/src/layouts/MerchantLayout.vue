<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- 移动端侧边栏 -->
    <div v-if="sidebarOpen" class="fixed inset-0 flex z-40 md:hidden">
      <div class="fixed inset-0 bg-black/50" @click="sidebarOpen = false"></div>
      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-background border-r">
        <div class="flex items-center justify-between h-16 px-4 border-b">
          <div class="flex items-center">
            <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span class="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span class="ml-2 font-bold">Sphere 商户中心</span>
          </div>
          <button class="p-2 rounded-md text-muted-foreground hover:text-foreground" @click="sidebarOpen = false">
            <span class="sr-only">{{ t('merchant.common.close_sidebar') }}</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="flex-1 h-0 overflow-y-auto">
          <nav class="p-4 space-y-1">
            <a 
              v-for="(item, index) in navItems" 
              :key="index"
              :href="item.path"
              :class="[
                isActive(item.path) 
                  ? 'bg-primary/15 text-primary font-semibold' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors'
              ]"
            >
              <component 
                :is="item.icon" 
                class="mr-3 flex-shrink-0 h-5 w-5" 
                :class="isActive(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'"
                aria-hidden="true" 
              />
              {{ item.name }}
            </a>
          </nav>
        </div>
        
        <!-- 用户信息 -->
        <div class="flex items-center p-4 border-t bg-muted/30">
          <div class="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm">
            {{ userInitials }}
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium truncate">{{ userName }}</p>
            <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="logout">
              {{ t('merchant.common.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主布局 -->
    <div class="flex flex-col h-screen">
      <!-- 顶部导航栏 -->
      <header class="flex h-16 items-center bg-gradient-to-r from-blue-50 via-blue-100/80 to-indigo-100/70 dark:from-slate-900 dark:via-blue-950/90 dark:to-indigo-950/90 backdrop-blur-md sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(20,20,50,0.15)]">
        <div class="w-full px-0">
          <div class="flex items-center justify-between mx-0 px-4 sm:px-6 lg:px-8">
            <!-- 商户中心标题 -->
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span class="text-lg font-bold text-white">S</span>
              </div>
              <span class="ml-2 font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Sphere 商户中心</span>
            </div>
            
            <div class="flex items-center">
              <!-- 移动端菜单按钮 -->
              <button 
                class="p-2 rounded-md md:hidden mr-2" 
                @click="sidebarOpen = true"
              >
                <span class="sr-only">{{ t('merchant.common.open_sidebar') }}</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <!-- 右侧工具栏 -->
              <div class="flex items-center space-x-4">
                <!-- 主题切换按钮 - 彩色版 -->
                <button 
                  class="p-1 rounded-full"
                  @click="() => toggleTheme()"
                >
                  <div v-if="isDark" class="h-6 w-6 rounded-full overflow-hidden bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  </div>
                  <div v-else class="h-6 w-6 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
                      <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                <!-- 通知按钮 - 彩色版 -->
                <button class="p-1 rounded-full">
                  <div class="h-6 w-6 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
                      <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                <!-- 用户下拉菜单 - 彩色版 -->
                <div class="relative">
                  <button 
                    class="p-1 rounded-full"
                    @click="userMenuOpen = !userMenuOpen"
                  >
                    <span class="sr-only">{{ t('merchant.common.open_user_menu') }}</span>
                    <div class="h-6 w-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    v-if="userMenuOpen" 
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-popover border ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <a 
                      href="/merchant/settings" 
                      class="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      @click="userMenuOpen = false"
                    >
                      {{ t('merchant.common.settings') }}
                    </a>
                    <a 
                      href="#" 
                      class="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      @click="logout"
                    >
                      {{ t('merchant.common.logout') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div class="flex flex-1 overflow-hidden">
        <!-- 侧边栏导航 - 桌面端 -->
        <aside 
          class="hidden md:flex md:flex-col border-r bg-background transition-all duration-300 ease-in-out"
          :class="sidebarCollapsed ? 'md:w-12' : 'md:w-64'"
        >
          <!-- 侧边栏标题已移除，不再显示商户中心标题 -->
          <div class="relative pt-4">
            <button 
              class="absolute -right-3 top-2 bg-background border border-border shadow-sm h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground p-1 z-10"
              @click="toggleSidebar"
            >
              <svg v-if="sidebarCollapsed" class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <svg v-else class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-2 space-y-1 mt-4">
            <template v-for="(item, index) in navItems" :key="index">
              <!-- 一级菜单项 -->
              <a 
                :href="item.path"
                :class="[
                  getMenuItemClass(item),
                  'group flex items-center py-2 text-sm font-medium rounded-md transition-colors',
                  sidebarCollapsed ? 'px-2 justify-center' : 'px-4',
                  item.children ? 'cursor-pointer' : ''
                ]"
                :title="sidebarCollapsed ? item.name : ''"
                @click.prevent="item.children ? toggleSubMenu(index) : navigateTo(item.path)"
              >
                <component 
                  :is="item.icon" 
                  :class="[
                    (isActive(item.path) || (item.children && isAnyChildActive(item))) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                    'flex-shrink-0',
                    sidebarCollapsed ? 'h-4 w-4' : 'h-5 w-5 mr-3'
                  ]"
                  aria-hidden="true" 
                />
                <span v-show="!sidebarCollapsed" class="truncate flex-1">{{ item.name }}</span>
                <svg 
                  v-if="item.children && !sidebarCollapsed" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-4 w-4 ml-1 transform transition-transform duration-200"
                  :class="expandedMenus.includes(index) ? 'rotate-90' : ''"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <!-- 二级菜单项 -->
              <div 
                v-if="item.children && (expandedMenus.includes(index) || (sidebarCollapsed && isAnyChildActive(item)))"
                class="transition-all duration-200 overflow-hidden mt-1 mb-2"
                :class="sidebarCollapsed ? 'space-y-1' : 'space-y-1'"
              >
                <a 
                  v-for="(child, childIndex) in item.children" 
                  :key="childIndex"
                  :href="child.path"
                  :class="[
                    getSubMenuItemClass(child.path),
                    'group flex items-center text-xs rounded-md transition-colors',
                    sidebarCollapsed ? 'justify-center py-2 px-1' : 'py-2 px-3 ml-3 pl-5 relative'
                  ]"
                  :title="sidebarCollapsed ? child.name : ''"
                  @click.prevent="navigateTo(child.path)"
                >
                  <div v-if="sidebarCollapsed" class="h-2 w-2 rounded-full" :class="isActive(child.path) ? 'bg-primary' : 'bg-muted-foreground group-hover:bg-foreground/70'"></div>
                  <template v-else>
                    <span class="truncate">{{ child.name }}</span>
                  </template>
                </a>
              </div>
            </template>
          </div>
          
          <!-- 用户信息 -->
          <div 
            class="flex items-center border-t bg-muted/30 transition-all duration-300"
            :class="sidebarCollapsed ? 'p-2 justify-center' : 'p-4'"
          >
            <div 
              class="rounded-full bg-primary/20 flex items-center justify-center text-sm"
              :class="sidebarCollapsed ? 'h-6 w-6 text-xs' : 'h-9 w-9'"
            >
              {{ userInitials }}
            </div>
            <div v-show="!sidebarCollapsed" class="ml-3 flex-1">
              <p class="text-sm font-medium truncate">{{ userName }}</p>
              <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="logout">
                {{ t('merchant.common.logout') }}
              </button>
            </div>
          </div>
        </aside>
        
        <!-- 主内容区 -->
        <main class="flex-1 overflow-y-auto bg-muted/30 relative">
          <div class="container py-6">
            <div class="mb-6 hidden md:block">
              <h1 class="text-xl font-medium">{{ pageTitle }}</h1>
              <div class="h-0.5 w-8 bg-primary mt-1.5"></div>
            </div>
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in" @before-leave="beforeLeave" @enter="enter">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h, nextTick, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStorage, useDark, useToggle } from '@vueuse/core'
import ThemeToggle from '../components/ThemeToggle.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

// 主题切换
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleTheme = useToggle(isDark)

// 状态管理
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const sidebarCollapsed = useStorage('sidebar-collapsed', false)
const expandedMenus = ref<number[]>([])  // 存储展开的菜单索引

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 退出登录
const logout = () => {
  if (confirm(t('merchant.logout.confirm_message'))) {
    // 清除登录状态
    localStorage.removeItem('token')
    // 重定向到登录页
    window.location.href = '/merchant/login'
  }
}

// 用户信息
const userName = ref('张三')
const userInitials = computed(() => {
  return userName.value.substring(0, 2)
})

// 页面标题
const pageTitle = computed(() => {
  const path = route.path
  const navItem = navItems.value.find(item => path === item.path || path.startsWith(item.path + '/'))
  return navItem ? navItem.name : t('merchant.nav.dashboard')
})

// 判断路由是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 检查是否有任何子菜单项处于活跃状态
const isAnyChildActive = (item: any) => {
  if (!item.children) return false
  return item.children.some((child: any) => isActive(child.path))
}

// 获取二级菜单的高亮样式
const getSubMenuItemClass = (path: string) => {
  return isActive(path) 
    ? 'bg-primary/20 text-primary font-medium border-l-2 border-primary shadow-sm' 
    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent'
}

// 获取一级菜单的高亮样式
const getMenuItemClass = (item: any) => {
  if (isActive(item.path) && !item.children) {
    return 'bg-primary/15 text-primary font-semibold'
  } else if (item.children && isAnyChildActive(item)) {
    return 'text-primary bg-primary/10'
  } else {
    return 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }
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

// 导航菜单 - 使用计算属性以便在语言变化时自动更新
const navItems = computed(() => [
  {
    name: t('merchant.nav.dashboard'),
    path: '/merchant/dashboard',
    icon: Dashboard
  },
  {
    name: t('merchant.nav.orders'),
    path: '/merchant/orders',
    icon: ShoppingBag,
    children: [
      {
        name: t('merchant.nav.orders_receive'),
        path: '/merchant/orders/receive'
      },
      {
        name: t('merchant.nav.orders_payout'),
        path: '/merchant/orders/payout'
      },
      {
        name: t('merchant.nav.orders_recharge'),
        path: '/merchant/orders/recharge'
      },
      {
        name: t('merchant.nav.orders_transfer'),
        path: '/merchant/orders/transfer'
      },
      {
        name: t('merchant.nav.orders_withdraw'),
        path: '/merchant/orders/withdraw'
      },
      {
        name: t('merchant.nav.orders_other'),
        path: '/merchant/orders/other'
      }
    ]
  },
  {
    name: t('merchant.nav.products'),
    path: '/merchant/payment',
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
])

// 切换子菜单显示状态
const toggleSubMenu = (index: number) => {
  const position = expandedMenus.value.indexOf(index)
  if (position === -1) {
    expandedMenus.value.push(index)
  } else {
    // 允许关闭任何菜单，包括有活跃子菜单的菜单
    expandedMenus.value.splice(position, 1)
  }
}

// 导航到指定路径
const navigateTo = (path: string) => {
  router.push(path)
}

// 平滑过渡处理
const beforeLeave = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const enter = () => {
  nextTick(() => {
    // 确保DOM更新后再执行
  })
}

// 初始化：确保当前页面对应的子菜单所属的父菜单是展开的
const initExpandedMenus = () => {
  navItems.value.forEach((item, index) => {
    if (item.children && isAnyChildActive(item)) {
      if (!expandedMenus.value.includes(index)) {
        expandedMenus.value.push(index)
      }
    }
  })
}

// 在组件挂载时初始化展开的菜单
onMounted(() => {
  initExpandedMenus()
})
</script>

<style scoped>
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
</style> 