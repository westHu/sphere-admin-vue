<template>
  <div>
    <!-- Hero Section -->
    <section class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
      <div class="container relative mx-auto py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
            全球支付解决方案
          </h1>
          <p class="mt-6 text-lg text-muted-foreground">
            为全球企业提供安全、高效、便捷的支付解决方案，助力企业实现全球化发展。
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <a
              href="/solutions"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
            >
              了解更多
            </a>
            <a
              href="/contact"
              class="text-sm font-semibold leading-6 text-foreground"
            >
              联系我们 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24">
      <div class="container mx-auto">
        <div class="grid gap-12 md:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 rounded-md bg-primary/10 text-primary">
                <component :is="feature.icon" class="size-5" />
              </div>
              <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
            </div>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-muted/50">
      <div class="container mx-auto py-24">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">开始使用 Sphere</h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            立即注册，体验全球领先的支付解决方案。
          </p>
          <a
            href="/login"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
          >
            立即开始
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: '全球支付',
    description: '支持全球主要国家和地区的支付方式，让您的业务无国界。',
    icon: 'Globe',
  },
  {
    title: '安全可靠',
    description: '采用最先进的加密技术，确保每一笔交易的安全可靠。',
    icon: 'Shield',
  },
  {
    title: '简单易用',
    description: '简洁的接口设计，让集成变得简单快捷。',
    icon: 'Zap',
  },
]

// 图标组件
const Globe = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  `,
}

const Shield = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  `,
}

const Zap = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  `,
}
</script> 