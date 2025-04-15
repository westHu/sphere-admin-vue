<template>
  <div class="w-full py-20 lg:py-40">
    <div class="container mx-auto">
      <div class="flex text-center justify-center items-center gap-4 flex-col">
        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          国际支付解决方案
        </span>
        <div class="flex gap-2 flex-col">
          <h2 class="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            {{ title }}
          </h2>
          <p class="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            {{ description }}
          </p>
        </div>
        <div class="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
          <div
            v-for="(solution, index) in solutions"
            :key="index"
            class="rounded-md border bg-card text-card-foreground shadow"
            :class="{ 'shadow-2xl': solution.isPopular }"
          >
            <div class="p-6">
              <h3 class="text-2xl font-semibold leading-none tracking-tight">
                {{ solution.title }}
              </h3>
              <p class="text-sm text-muted-foreground mt-2">
                {{ solution.description }}
              </p>
            </div>
            <div class="p-6 pt-0">
              <div class="flex flex-col gap-8 justify-start">
                <p class="flex flex-row items-center gap-2 text-xl">
                  <span class="text-4xl">${{ solution.price }}</span>
                  <span class="text-sm text-muted-foreground"> / {{ solution.period }}</span>
                </p>
                <div class="flex flex-col gap-4 justify-start">
                  <div
                    v-for="(feature, featureIndex) in solution.features"
                    :key="featureIndex"
                    class="flex flex-row gap-4"
                  >
                    <svg
                      class="w-4 h-4 mt-2 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div class="flex flex-col">
                      <p>{{ feature.title }}</p>
                      <p class="text-muted-foreground text-sm">
                        {{ feature.description }}
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  :href="solution.buttonHref"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                  :class="[
                    solution.buttonVariant === 'default'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                  ]"
                >
                  {{ solution.buttonText }}
                  <svg
                    v-if="solution.buttonIcon === 'arrow-right'"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <svg
                    v-else-if="solution.buttonIcon === 'phone'"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
}

interface PaymentSolution {
  title: string
  description: string
  price: number
  period: string
  features: Feature[]
  isPopular?: boolean
  buttonText: string
  buttonIcon?: 'arrow-right' | 'phone'
  buttonVariant?: 'default' | 'outline'
  buttonHref: string
}

interface Props {
  title: string
  description: string
  solutions: PaymentSolution[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '全球支付，无缝连接',
  description: '我们提供先进的国际支付解决方案，帮助企业轻松拓展全球业务',
  solutions: () => [
    {
      title: '跨境电商支付',
      description: '为全球电商提供无缝支付体验，支持多币种结算和本地支付方式',
      price: 49,
      period: '月',
      features: [
        {
          title: '多币种支持',
          description: '支持超过50种全球货币的收款和结算',
        },
        {
          title: '本地支付方式',
          description: '集成各地区流行的支付方式，提高转化率',
        },
        {
          title: '实时汇率转换',
          description: '自动根据最新汇率进行货币转换',
        },
      ],
      buttonText: '立即开通',
      buttonVariant: 'outline',
      buttonHref: '/register',
    },
    {
      title: '企业全球收款',
      description: '为企业提供全方位的国际收款解决方案，简化跨境业务流程',
      price: 99,
      period: '月',
      features: [
        {
          title: '虚拟账户网络',
          description: '在多个国家拥有本地收款账户，减少手续费',
        },
        {
          title: '批量支付处理',
          description: '一次性处理多笔国际支付，提高效率',
        },
        {
          title: '高级安全保障',
          description: '多重身份验证和交易监控系统',
        },
      ],
      isPopular: true,
      buttonText: '开始使用',
      buttonVariant: 'default',
      buttonHref: '/register',
    },
    {
      title: '定制支付方案',
      description: '为大型企业和机构提供定制化的国际支付解决方案',
      price: 299,
      period: '月',
      features: [
        {
          title: 'API完全集成',
          description: '与您现有的系统无缝集成',
        },
        {
          title: '专属账户经理',
          description: '提供一对一的专业支持和咨询',
        },
        {
          title: '合规与报告',
          description: '自动生成合规报告，满足各国监管要求',
        },
      ],
      buttonText: '预约咨询',
      buttonIcon: 'phone',
      buttonVariant: 'outline',
      buttonHref: '/contact',
    },
  ],
})
</script> 