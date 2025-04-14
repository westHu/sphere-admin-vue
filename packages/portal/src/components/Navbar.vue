<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav class="container h-16 flex items-center">
      <div class="mr-4 flex items-center space-x-2">
        <a href="/" class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span class="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span class="hidden font-bold sm:inline-block">Sphere</span>
        </a>
      </div>
      
      <div class="flex-1 flex items-center justify-between">
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="relative text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ item.title }}
            <span
              v-if="item.href === currentPath"
              class="absolute -bottom-[21px] left-0 h-[2px] w-full bg-foreground"
            />
          </a>
        </nav>

        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <a
            href="/login"
            class="btn"
          >
            登录
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const currentPath = ref('/')

onMounted(() => {
  currentPath.value = window.location.pathname
})

const navItems = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '解决方案',
    href: '/solutions',
  },
  {
    title: '客户案例',
    href: '/cases',
  },
  {
    title: '关于我们',
    href: '/about',
  },
]
</script> 