<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center">
      <div class="mr-4 flex">
        <a class="mr-6 flex items-center space-x-2" href="/">
          <span class="font-bold">Sphere</span>
        </a>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {{ item.title }}
          </a>
        </nav>
      </div>
      <div class="flex flex-1 items-center justify-end space-x-4">
        <a
          href="/login"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
        >
          登录
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
  {
    title: '联系我们',
    href: '/contact',
  },
]
</script> 