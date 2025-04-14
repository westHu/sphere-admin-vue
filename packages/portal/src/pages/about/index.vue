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
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- 联系信息 -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold mb-4">联系我们</h2>
              <p class="text-muted-foreground max-w-2xl">
                无论您有任何问题或需求，我们的团队随时准备为您提供专业的支持和服务。选择最适合您的方式与我们取得联系。
              </p>
            </div>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">电话支持</h3>
                  <p class="text-muted-foreground">周一至周五 9:00-18:00</p>
                  <p class="text-primary font-medium">400-888-8888</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">邮件支持</h3>
                  <p class="text-muted-foreground">24小时内回复</p>
                  <p class="text-primary font-medium">support@sphere.com</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">公司地址</h3>
                  <p class="text-muted-foreground">欢迎访问</p>
                  <p class="text-primary font-medium">上海市浦东新区陆家嘴金融贸易区</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 联系表单 -->
          <div class="rounded-xl border bg-card p-8">
            <h3 class="text-2xl font-semibold mb-6">发送消息</h3>
            <form class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-medium" for="name">姓名</label>
                <input
                  id="name"
                  type="text"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium" for="email">邮箱</label>
                <input
                  id="email"
                  type="email"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="请输入您的邮箱"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium" for="message">消息内容</label>
                <textarea
                  id="message"
                  class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="请输入您想咨询的内容"
                ></textarea>
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 w-full"
              >
                发送消息
              </button>
            </form>
          </div>
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: '李华',
    position: '技术总监',
    description: '专注于支付系统架构设计，带领团队开发了多个核心支付系统，技术实力雄厚。',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: '王芳',
    position: '产品总监',
    description: '负责产品规划和设计，深入了解客户需求，打造了多个成功的支付产品。',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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