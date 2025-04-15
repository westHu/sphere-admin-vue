<template>
  <section class="bg-background text-foreground py-12 sm:py-24 md:py-32 px-4 overflow-hidden relative">
    <div class="container mx-auto max-w-6xl relative z-10">
      <div class="flex flex-col items-center gap-6 text-center sm:gap-12">
        <!-- Badge -->
        <div v-if="props.badge" class="animate-fade-in-up">
          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <span class="text-muted-foreground">{{ props.badge.text }}</span>
            <a v-if="props.badge.action" :href="props.badge.action.href" class="ml-1 flex items-center gap-1">
              {{ props.badge.action.text }}
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold leading-tight sm:text-6xl md:text-7xl max-w-4xl animate-fade-in-up">
          {{ props.title }}
        </h1>

        <!-- Description -->
        <p class="text-md max-w-2xl font-medium text-muted-foreground sm:text-xl animate-fade-in-up">
          {{ props.description }}
        </p>

        <!-- Actions -->
        <div class="flex flex-wrap justify-center gap-4 mt-4 animate-fade-in-up">
          <a
            v-for="(action, index) in props.actions"
            :key="index"
            :href="action.href"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            <svg v-if="action.icon === 'arrow-right'" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            {{ action.text }}
          </a>
        </div>

        <!-- Dynamic Background -->
        <div class="relative w-full h-[400px] mt-16 rounded-lg overflow-hidden animate-fade-in-up">
          <div class="absolute inset-0 bg-accent/20 rounded-lg border border-border/40 backdrop-blur-sm"></div>
          
          <!-- Floating Elements -->
          <div class="absolute top-[20%] left-[15%] bg-background rounded-full p-4 shadow-lg border border-border">
            <svg class="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div class="absolute top-[30%] right-[20%] bg-background rounded-full p-4 shadow-lg border border-border">
            <svg class="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </div>
          <div class="absolute bottom-[25%] left-[25%] bg-background rounded-full p-4 shadow-lg border border-border">
            <svg class="h-8 w-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a2 2 0 0 0 0 4h19a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H3a2 2 0 0 1 0-4h12a1 1 0 0 0 1-1z" />
            </svg>
          </div>
          
          <!-- World Map Overlay -->
          <div class="absolute inset-0 opacity-10 bg-[url('/world-map.svg')] bg-no-repeat bg-center bg-contain"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroAction {
  text: string
  href: string
  icon?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glow'
}

interface HeroProps {
  badge?: {
    text: string
    action?: {
      text: string
      href: string
    }
  }
  title: string
  description: string
  actions: HeroAction[]
}

const props = withDefaults(defineProps<HeroProps>(), {
  badge: undefined,
  title: '无缝连接全球支付，轻松实现跨境交易',
  description: '我们的国际支付平台提供安全、快速的全球交易解决方案，支持多种货币和支付方式，让您的业务轻松拓展至全球市场。',
  actions: () => [
    {
      text: '立即开始',
      href: '/register',
      variant: 'default',
    },
    {
      text: '查看方案',
      href: '/solutions',
      variant: 'outline',
      icon: 'arrow-right',
    },
  ],
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 