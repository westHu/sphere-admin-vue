<template>
  <div>
    <!-- 移动端侧边栏 -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 flex z-40 md:hidden">
        <div class="fixed inset-0 bg-black/50" @click="$emit('update:sidebarOpen', false)"></div>
        <transition name="slide">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-background border-r">
            <div class="flex items-center justify-between h-16 px-4 border-b">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span class="text-lg font-bold text-white">S</span>
                </div>
                <span class="ml-2 font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Sphere 商户中心</span>
              </div>
              <button class="p-2 rounded-md text-muted-foreground hover:text-foreground" @click="$emit('update:sidebarOpen', false)">
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
                  @click.prevent="navigateTo(item.path)"
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
          </div>
        </transition>
      </div>
    </transition>

    <!-- 侧边栏导航 - 桌面端 -->
    <aside 
      class="hidden md:flex md:flex-col border-r bg-background transition-all duration-300 ease-in-out"
      :class="sidebarCollapsed ? 'md:w-12' : 'md:w-64'"
    >
      <!-- 标题栏 -->
      <div class="border-b h-16 flex items-center px-4">
        <div class="flex items-center overflow-hidden">
          <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <span class="text-lg font-bold text-white">S</span>
          </div>
          <span v-show="!sidebarCollapsed" class="ml-2 font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent truncate">Sphere 商户中心</span>
        </div>
      </div>
      
      <!-- 折叠/展开按钮 -->
      <div class="relative pt-4">
        <button 
          class="absolute -right-3 top-2 bg-background border border-border shadow-sm h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground p-1 z-10 hover:bg-accent transition-colors"
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
      
      <div class="flex-1 overflow-y-auto p-2 space-y-1 mt-2">
        <template v-for="(item, index) in navItems" :key="index">
          <!-- 一级菜单项 -->
          <a 
            :href="item.path"
            :class="[
              getMenuItemClass(item),
              'group flex items-center py-2 text-sm font-medium rounded-md transition-colors relative',
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
          <transition name="expand">
            <div 
              v-if="item.children && (expandedMenus.includes(index) || (sidebarCollapsed && isAnyChildActive(item)))"
              class="overflow-hidden mt-1 mb-2"
              :class="sidebarCollapsed ? 'space-y-1' : 'space-y-1'"
            >
              <a 
                v-for="(child, childIndex) in item.children" 
                :key="childIndex"
                :href="child.path"
                :class="[
                  getSubMenuItemClass(child.path),
                  'group flex items-center text-xs rounded-md transition-colors relative',
                  sidebarCollapsed ? 'justify-center py-2 px-1' : 'py-2 px-3 ml-7'
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
          </transition>
        </template>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

// 定义类型
export interface NavChild {
  name: string
  path: string
}

export interface NavItem {
  name: string
  path: string
  icon: any
  children?: NavChild[]
}

// 定义props
const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false
  },
  navItems: {
    type: Array as PropType<NavItem[]>,
    default: () => []
  }
})

// 定义事件
const emit = defineEmits(['update:sidebarOpen', 'navigate'])

const { t } = useI18n()
const route = useRoute()

// 状态管理
const sidebarCollapsed = useStorage('sidebar-collapsed', false)
const expandedMenus = ref<number[]>([])  // 存储展开的菜单索引

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 判断路由是否激活
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// 检查是否有任何子菜单项处于活跃状态
const isAnyChildActive = (item: NavItem) => {
  if (!item.children) return false
  return item.children.some((child: NavChild) => isActive(child.path))
}

// 获取二级菜单的高亮样式
const getSubMenuItemClass = (path: string) => {
  return isActive(path) 
    ? 'bg-primary/20 text-primary font-medium border-l-2 border-primary shadow-sm' 
    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent'
}

// 获取一级菜单的高亮样式
const getMenuItemClass = (item: NavItem) => {
  if (isActive(item.path) && !item.children) {
    return 'bg-primary/5 text-primary font-semibold'
  } else if (item.children && isAnyChildActive(item)) {
    return 'text-primary'
  } else {
    return 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }
}

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
  emit('navigate', path)
}

// 初始化：确保当前页面对应的子菜单所属的父菜单是展开的
const initExpandedMenus = () => {
  props.navItems.forEach((item, index) => {
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
/* 淡入淡出过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 侧边栏滑动过渡动画 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

/* 子菜单展开过渡动画 */
.expand-enter-active, .expand-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* 一级菜单项 */
.group.flex.items-center {
  border-radius: 0.375rem;
}

/* 活跃菜单项的左侧蓝色标记 */
.group.flex.items-center.text-primary::before {
  content: '';
  width: 3px;
  height: 70%;
  background: rgb(var(--primary));
  position: absolute;
  left: 0;
  border-radius: 0 3px 3px 0;
}

/* 子菜单项样式 */
.group.flex.items-center.text-xs {
  color: rgb(var(--muted-foreground));
}

/* 用户退出按钮 */
.border-t button.text-sm {
  color: rgb(var(--muted-foreground));
}
.border-t button.text-sm:hover {
  color: rgb(var(--foreground));
  background-color: rgb(var(--muted));
}
</style> 