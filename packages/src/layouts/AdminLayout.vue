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
            <span class="ml-2 font-bold">Sphere 管理后台</span>
          </div>
          <button class="p-2 rounded-md text-muted-foreground hover:text-foreground" @click="sidebarOpen = false">
            <span class="sr-only">{{ t('admin.common.close_sidebar') }}</span>
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
            <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="handleLogout">
              {{ t('admin.common.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主布局 -->
    <div class="flex flex-col h-screen">
      <!-- 顶部导航栏 -->
      <header class="flex h-16 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex items-center justify-between">
          <!-- 移动端菜单按钮 -->
          <button 
            class="p-2 rounded-md md:hidden" 
            @click="sidebarOpen = true"
          >
            <span class="sr-only">{{ t('admin.common.open_sidebar') }}</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <!-- 管理后台标题 -->
          <div class="flex items-center">
            <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span class="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span class="ml-2 font-bold">Sphere 管理后台</span>
          </div>
          
          <!-- 右侧工具栏 -->
          <div class="flex items-center space-x-4">
            <!-- 主题切换按钮 -->
            <ThemeToggle />
            
            <!-- 通知按钮 -->
            <button class="p-1 rounded-full text-muted-foreground hover:text-foreground">
              <span class="sr-only">{{ t('admin.common.view_notifications') }}</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <!-- 用户下拉菜单 -->
            <div class="relative">
              <button 
                class="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                @click="userMenuOpen = !userMenuOpen"
              >
                <span class="sr-only">{{ t('admin.common.open_user_menu') }}</span>
                <div class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  {{ userInitials }}
                </div>
              </button>
              
              <div 
                v-if="userMenuOpen" 
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-popover border ring-1 ring-black ring-opacity-5 z-50"
              >
                <a 
                  href="/admin/settings" 
                  class="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  @click="userMenuOpen = false"
                >
                  {{ t('admin.common.settings') }}
                </a>
                <button 
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  @click="handleLogout"
                >
                  {{ t('admin.common.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div class="flex flex-1 overflow-hidden">
        <!-- 侧边栏导航 - 桌面端 -->
        <aside class="hidden md:flex md:flex-col md:w-64 border-r bg-background">
          <!-- 侧边栏标题已移除，不再显示管理后台标题 -->
          
          <div class="flex-1 overflow-y-auto p-4 space-y-1">
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
          </div>
          
          <!-- 用户信息 -->
          <div class="flex items-center p-4 border-t bg-muted/30">
            <div class="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm">
              {{ userInitials }}
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium truncate">{{ userName }}</p>
              <button class="text-xs text-muted-foreground hover:text-foreground transition-colors" @click="handleLogout">
                {{ t('admin.common.logout') }}
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
    
    <!-- 确认对话框 -->
    <ConfirmDialog
      ref="logoutConfirmDialog"
      :title="t('admin.logout.confirm_title')"
      :message="t('admin.logout.confirm_message')"
      :confirm-text="t('admin.logout.confirm_button')"
      :cancel-text="t('admin.logout.cancel_button')"
      @confirm="performLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import ThemeToggle from '../components/ThemeToggle.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { toast } from '../utils/toast'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 状态管理
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)
const logoutConfirmDialog = ref<{open: () => void; close: () => void} | null>(null)

// 用户信息
const userName = ref('管理员')
const userInitials = computed(() => {
  return userName.value.substring(0, 2)
})

// 页面标题
const pageTitle = computed(() => {
  const path = route.path
  const navItem = navItems.find(item => path === item.path || path.startsWith(item.path + '/'))
  return navItem ? navItem.name : t('admin.nav.dashboard')
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

const CreditCard = defineComponent({
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
      d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
    })
  ])
})

const Cog = defineComponent({
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
    name: t('admin.nav.dashboard'),
    path: '/admin/dashboard',
    icon: Dashboard
  },
  {
    name: t('admin.nav.merchants'),
    path: '/admin/merchants',
    icon: Users
  },
  {
    name: t('admin.nav.orders'),
    path: '/admin/orders',
    icon: ShoppingBag
  },
  {
    name: t('admin.nav.settlement'),
    path: '/admin/settlement',
    icon: CreditCard
  },
  {
    name: t('admin.nav.system'),
    path: '/admin/system',
    icon: Cog
  }
]

// 获取token
const token = useStorage('admin_token', '')

// 注销处理
const handleLogout = () => {
  // 关闭用户菜单
  userMenuOpen.value = false
  
  // 显示确认对话框
  logoutConfirmDialog.value?.open()
}

// 确认后执行真正的登出
const performLogout = () => {
  // 清除用户相关数据
  token.value = ''
  localStorage.removeItem('admin_user_info')
  localStorage.removeItem('admin_permissions')
  
  // 显示退出成功提示
  toast.success(t('admin.logout.success_message'), {
    position: 'top-right',
    duration: 2000
  })
  
  // 跳转到登录页
  router.push('/admin/login')
}

// 简化注销函数，供其他地方调用
const logout = () => {
  handleLogout()
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
</script>

<style scoped>
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
</style> 