<template>
  <div class="relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 -z-10">
      <!-- 主背景渐变 -->
      <div class="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      
      <!-- 径向渐变装饰，调整了位置和大小 -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.08),transparent_40%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/0.12),transparent_50%)]" />
      
      <!-- 装饰性光晕，减小了模糊度，使图案更细腻 -->
      <div class="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-primary/8 via-secondary/4 to-transparent blur-2xl" />
      <div class="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tl from-primary/8 via-secondary/4 to-transparent blur-2xl" />
    </div>

    <!-- Hero 区域 -->
    <section class="pt-2 pb-16 md:pt-4 md:pb-24">
      <div class="container mx-auto">
        <div class="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
          <!-- 左侧内容 -->
          <div class="flex flex-col justify-center space-y-8 max-w-xl">
            <!-- 添加了小徽章增强视觉层次 -->
            <div class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary w-fit animate-fade-in">
              <span class="mr-1">✨</span>
              <span>{{ t('home.hero.badge') }}</span>
            </div>
            
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
              {{ t('home.hero.title') }}
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sphere</span>
            </h1>
            
            <p class="text-lg text-muted-foreground animate-fade-in-up" style="animation-delay: 100ms;">
              {{ t('home.hero.description') }}
            </p>
            
            <div class="flex flex-col gap-4 sm:flex-row animate-fade-in-up" style="animation-delay: 200ms;">
              <a href="/solutions" class="btn bg-gradient-to-r from-primary to-primary/90 hover:shadow-md transition-all">
                {{ t('home.hero.cta.learn_more') }}
              </a>
              <a href="/contact" class="btn bg-gradient-to-r from-primary to-primary/90 hover:shadow-md transition-all">
                {{ t('home.hero.cta.contact_us') }}
              </a>
            </div>
            
            <!-- 添加信任标志 -->
            <div class="pt-4 border-t border-border/50 animate-fade-in-up" style="animation-delay: 300ms;">
              <p class="text-sm text-muted-foreground mb-3">{{ t('home.hero.trusted_by') }}</p>
              <div class="flex flex-wrap gap-6 items-center">
                <!-- 使用支付服务彩色图标，更换为更可靠的链接 -->
                <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/256px-Apple_Pay_logo.svg.png" alt="Apple Pay" class="h-6 w-auto" />
                </a>
                <a href="https://pay.google.com/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="Google Pay" class="h-6 w-auto" />
                </a>
                <a href="https://www.paypal.com/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png" alt="PayPal" class="h-6 w-auto" />
                </a>
                <a href="https://www.mastercard.com/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png" alt="Mastercard" class="h-6 w-auto" />
                </a>
                <a href="https://www.visa.com/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png" alt="Visa" class="h-5 w-auto" />
                </a>
                <a href="https://www.unionpayintl.com/" target="_blank" rel="noopener" class="transition-all duration-300 hover:scale-105">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/512px-UnionPay_logo.svg.png" alt="UnionPay" class="h-4 w-auto" />
                </a>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="relative lg:mt-0 animate-fade-in-up" style="animation-delay: 100ms;">
            <!-- 主图容器 -->
            <div class="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-card shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                :alt="t('home.image.alt')"
                class="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
              />
              
              <!-- 添加半透明叠加层 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <!-- 装饰性卡片 - 调整了位置和样式 -->
            <div class="absolute -bottom-6 -left-6 z-10 rounded-xl border bg-card p-5 shadow-lg animate-fade-in-up" style="animation-delay: 300ms;">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-secondary"></div>
                <span class="text-sm font-medium">{{ t('home.image.card.title') }}</span>
              </div>
              <p class="mt-1 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{{ t('home.image.card.value') }}</p>
              <p class="mt-1 text-xs text-muted-foreground">{{ t('home.image.card.description') }}</p>
            </div>
            
            <!-- 添加浮动元素增加视觉层次 -->
            <div class="absolute -top-4 -right-4 rounded-xl border bg-card p-3 shadow-lg animate-fade-in-up" style="animation-delay: 400ms;">
              <div class="flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span class="text-sm font-medium">{{ t('home.stats.currencies') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性展示区域 -->
    <section class="py-20 bg-gradient-to-b from-transparent to-muted/30">
      <div class="container mx-auto">
        <!-- 添加标题和描述，增强层次感 -->
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold mb-4">{{ t('home.features.title') || '为您的业务提供全方位支持' }}</h2>
          <p class="text-muted-foreground">{{ t('home.features.subtitle') || '我们的解决方案涵盖企业支付处理的所有方面，助您轻松拓展全球业务' }}</p>
        </div>
        
        <!-- 特性卡片，调整了间距和布局 -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <!-- 特性卡片1 -->
          <div class="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:translate-y-[-4px] group">
            <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2 group-hover:bg-primary/20 transition-all">
              <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{{ t('home.features.fast.title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('home.features.fast.description') }}</p>
          </div>

          <!-- 特性卡片2 -->
          <div class="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:translate-y-[-4px] group">
            <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2 group-hover:bg-primary/20 transition-all">
              <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{{ t('home.features.secure.title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('home.features.secure.description') }}</p>
          </div>

          <!-- 特性卡片3 -->
          <div class="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:translate-y-[-4px] group">
            <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2 group-hover:bg-primary/20 transition-all">
              <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{{ t('home.features.smart.title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('home.features.smart.description') }}</p>
          </div>

          <!-- 特性卡片4 -->
          <div class="rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:translate-y-[-4px] group">
            <div class="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2 group-hover:bg-primary/20 transition-all">
              <svg class="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{{ t('home.features.analytics.title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ t('home.features.analytics.description') }}</p>
          </div>
        </div>
        
        <!-- 添加号召性按钮 -->
        <div class="flex justify-center mt-12">
          <a href="/solutions" class="btn bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            {{ t('home.features.more') }}
            <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const { t } = useI18n()
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-6;
}

.animate-fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style> 