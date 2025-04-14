<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
      <div class="container relative mx-auto py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">关于 Sphere</h1>
          <p class="mt-6 text-lg text-muted-foreground">
            我们致力于为全球企业提供安全、高效、便捷的支付解决方案，助力企业实现全球化发展。
          </p>
        </div>
      </div>
    </div>

    <!-- 使命与愿景 -->
    <div class="container mx-auto py-16">
      <div class="grid gap-12 md:grid-cols-2">
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-md bg-primary/10 text-primary">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2a10 10 0 0 0-10 10" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold">我们的使命</h2>
          </div>
          <p class="text-muted-foreground">
            通过创新的支付技术，打破全球支付壁垒，让跨境交易变得简单、安全、高效。我们致力于为企业提供全方位的支付解决方案，助力企业实现全球化发展。
          </p>
        </div>
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-md bg-primary/10 text-primary">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2a10 10 0 0 0-10 10" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold">我们的愿景</h2>
          </div>
          <p class="text-muted-foreground">
            成为全球领先的支付解决方案提供商，通过技术创新和优质服务，让全球企业都能享受到便捷、安全、高效的支付体验。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心价值观 -->
    <div class="bg-muted/50">
      <div class="container mx-auto py-16">
        <h2 class="text-3xl font-bold text-center mb-12">核心价值观</h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="value in values"
            :key="value.title"
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 rounded-md bg-primary/10 text-primary">
                <component :is="value.icon" class="size-5" />
              </div>
              <h3 class="text-xl font-semibold">{{ value.title }}</h3>
            </div>
            <p class="text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队介绍 -->
    <div class="container mx-auto py-16">
      <h2 class="text-3xl font-bold text-center mb-12">我们的团队</h2>
      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="member in team"
          :key="member.name"
          class="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div class="aspect-square overflow-hidden">
            <img
              :src="member.image"
              :alt="member.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold">{{ member.name }}</h3>
            <p class="text-sm text-muted-foreground mb-4">{{ member.position }}</p>
            <p class="text-muted-foreground">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="bg-muted/50">
      <div class="container mx-auto py-16">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">加入我们</h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            我们正在寻找志同道合的伙伴，一起打造全球领先的支付解决方案。如果您对支付行业充满热情，欢迎加入我们的团队。
          </p>
          <a
            href="/careers"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
          >
            查看职位
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Value {
  title: string
  description: string
  icon: string
}

interface TeamMember {
  name: string
  position: string
  description: string
  image: string
}

const values: Value[] = [
  {
    title: '创新',
    description: '持续创新是我们的核心竞争力，我们不断探索新技术，为客户提供更好的支付体验。',
    icon: 'Lightbulb',
  },
  {
    title: '专业',
    description: '我们拥有一支专业的团队，具备丰富的支付行业经验，为客户提供专业的解决方案。',
    icon: 'Award',
  },
  {
    title: '责任',
    description: '我们始终以客户为中心，对客户负责，对社会负责，致力于创造更大的价值。',
    icon: 'Heart',
  },
]

const team: TeamMember[] = [
  {
    name: '张明',
    position: '创始人 & CEO',
    description: '拥有15年支付行业经验，曾任职于多家知名支付公司，对支付行业有深刻的理解。',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: '李华',
    position: '技术总监',
    description: '专注于支付系统架构设计，带领团队开发了多个核心支付系统，技术实力雄厚。',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: '王芳',
    position: '产品总监',
    description: '负责产品规划和设计，深入了解客户需求，打造了多个成功的支付产品。',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
]

// 图标组件
const Lightbulb = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  `,
}

const Award = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  `,
}

const Heart = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  `,
}
</script> 