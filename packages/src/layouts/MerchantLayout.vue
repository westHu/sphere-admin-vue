<template>
  <div class="min-h-screen bg-background text-foreground flex">
    <!-- 使用新的侧边栏组件 -->
    <MerchantSidebar
      v-model:sidebarOpen="sidebarOpen"
      :navItems="navItems"
      @navigate="navigateTo"
    />

    <!-- 主布局 -->
    <div class="flex flex-col flex-1 h-screen overflow-hidden">
      <!-- 顶部导航栏 -->
      <header class="flex h-16 items-center bg-gradient-to-r from-blue-50 via-blue-100/80 to-indigo-100/70 dark:from-slate-900 dark:via-blue-950/90 dark:to-indigo-950/90 backdrop-blur-md sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(20,20,50,0.15)]">
        <div class="w-full px-0">
          <div class="flex items-center justify-between mx-0 px-4 sm:px-6 lg:px-8">
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
            
            <!-- 页面标题 - 仅在移动端显示 -->
            <h1 class="text-lg font-medium md:hidden">{{ pageTitle }}</h1>
            
            <!-- 右侧工具栏 -->
            <div class="flex items-center space-x-4 ml-auto">
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
      </header>
      
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
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'
import ThemeToggle from '../components/ThemeToggle.vue'
import MerchantSidebar from './merchant/MerchantSidebar.vue'
import { useNavItems } from './merchant/MerchantNavItems'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

// 导航菜单项
const { navItems } = useNavItems()

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

// 退出登录
const logout = () => {
  if (confirm(t('merchant.logout.confirm_message'))) {
    // 清除登录状态
    localStorage.removeItem('token')
    // 重定向到登录页
    window.location.href = '/merchant/login'
  }
}

// 导航到指定路径
const navigateTo = (path: string) => {
  router.push(path)
}

// 用户信息
const userName = ref('张三')

// 页面标题
const pageTitle = computed(() => {
  const path = route.path
  const navItem = navItems.value.find(item => path === item.path || path.startsWith(item.path + '/'))
  return navItem ? navItem.name : t('merchant.nav.dashboard')
})

// 平滑过渡处理
const beforeLeave = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const enter = () => {
  nextTick(() => {
    // 添加动画类到主内容区域
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('content-entered');
      setTimeout(() => {
        mainContent.classList.remove('content-entered');
      }, 300);
    }
  })
}
</script>

<style scoped>
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

main {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.content-entered {
  animation: content-enter 0.3s ease forwards;
}

@keyframes content-enter {
  0% {
    opacity: 0.8;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 

