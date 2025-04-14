<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 -z-10">
      <!-- 主背景渐变 -->
      <div class="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      <!-- 径向渐变装饰 -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.15),transparent_60%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.15),transparent_60%)]" />
      
      <!-- 装饰性光晕 -->
      <div class="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent blur-3xl" />
      <div class="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-primary/10 via-secondary/5 to-transparent blur-3xl" />
    </div>

    <!-- 主要内容区域 -->
    <div class="container relative py-20">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <!-- 左侧内容 -->
        <div class="flex flex-col justify-center space-y-8">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            下一代支付解决方案
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sphere</span>
          </h1>
          <p class="text-lg text-muted-foreground">
            为您的业务提供安全、高效、智能的支付解决方案。我们的技术让支付变得更简单、更快速、更可靠。
          </p>
          <div class="flex flex-col gap-4 sm:flex-row">
            <a href="/solutions" class="btn bg-gradient-to-r from-primary to-primary/90">
              了解更多
            </a>
            <a href="/contact" class="btn bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground">
              联系我们
            </a>
          </div>
        </div>

        <!-- 右侧图片 -->
        <div class="relative lg:mt-8">
          <div class="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-card shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="现代支付终端界面"
              class="h-full w-full object-cover"
            />
          </div>
          
          <!-- 装饰性卡片 -->
          <div class="absolute -bottom-8 -left-8 z-10 rounded-xl border bg-card p-6 shadow-xl">
            <div class="flex items-center gap-3">
              <div class="h-3 w-3 rounded-full bg-gradient-to-r from-secondary to-secondary/80" />
              <span class="text-base font-medium">实时交易</span>
            </div>
            <p class="mt-2 text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">99.99%</p>
            <p class="mt-1 text-sm text-muted-foreground">系统可用性</p>
          </div>
        </div>
      </div>

      <!-- 特性展示 -->
      <div class="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border bg-card p-6">
          <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2">
            <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold">闪电支付</h3>
          <p class="text-sm text-muted-foreground">毫秒级交易处理，让支付更快速</p>
        </div>

        <div class="rounded-xl border bg-card p-6">
          <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2">
            <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold">安全可靠</h3>
          <p class="text-sm text-muted-foreground">银行级安全防护，保障交易安全</p>
        </div>

        <div class="rounded-xl border bg-card p-6">
          <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2">
            <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold">智能风控</h3>
          <p class="text-sm text-muted-foreground">AI驱动的风险控制系统</p>
        </div>

        <div class="rounded-xl border bg-card p-6">
          <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2">
            <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold">数据分析</h3>
          <p class="text-sm text-muted-foreground">实时数据分析和可视化</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script> 