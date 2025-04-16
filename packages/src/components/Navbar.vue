<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 portal-only">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <a href="/" class="flex items-center space-x-2">
            <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span class="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span class="hidden font-bold sm:inline-block">Sphere</span>
          </a>
        </div>

        <!-- 导航菜单 -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            :class="{ 'text-foreground': item.href === currentPath }"
          >
            {{ t(`common.${item.key}`) }}
          </a>
        </div>

        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4">
          <!-- 语言切换 -->
          <div class="relative">
            <button
              class="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              @click="isLanguageMenuOpen = !isLanguageMenuOpen"
            >
              <span>{{ currentLanguage }}</span>
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            
            <!-- 语言选择菜单 -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="isLanguageMenuOpen"
                class="absolute right-0 mt-2 w-32 rounded-md border bg-popover py-1 shadow-md"
                @click.stop
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  :class="{ 'bg-accent text-accent-foreground': lang.code === locale }"
                  @click="changeLanguage(lang.code)"
                >
                  {{ lang.name }}
                </button>
              </div>
            </Transition>
          </div>

          <ThemeToggle />
          <a
            href="/merchant/login"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
          >
            {{ t('common.login') }}
          </a>
          
          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t"
      >
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            :class="{ 'bg-accent text-accent-foreground': item.href === currentPath }"
          >
            {{ t(`common.${item.key}`) }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import { setLocale, supportedLocales } from '../i18n'

const { locale, t } = useI18n({
  inheritLocale: true,
  useScope: 'global'
})

const currentPath = ref('/')
const isMobileMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'id', name: 'Indonesia' }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value)?.name || 'English'
})

const changeLanguage = (lang: string) => {
  console.log('Navbar - 切换语言:', lang, '当前语言:', locale.value)
  setLocale(lang)
  isLanguageMenuOpen.value = false
  // 刷新页面确保所有翻译正确应用
  window.location.reload()
}

onMounted(() => {
  currentPath.value = window.location.pathname
  // 从 localStorage 获取语言设置，如果没有则使用英文
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    locale.value = savedLocale
    console.log('Navbar - 使用已存储的语言:', savedLocale)
  } else {
    // 如果没有保存过语言设置，使用英文并保存到localStorage
    setLocale('en')
    console.log('Navbar - 设置默认语言为英文')
  }
})

const navItems = [
  {
    key: 'home',
    href: '/',
  },
  {
    key: 'solutions',
    href: '/solutions',
  },
  {
    key: 'cases',
    href: '/cases',
  },
  {
    key: 'about',
    href: '/about',
  },
]
</script> 