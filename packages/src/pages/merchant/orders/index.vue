<template>
  <div>
    <h1 class="text-2xl font-semibold mb-8">{{ t('merchant.nav.orders') }}</h1>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-lg font-medium mb-4">{{ t('merchant.orders.quick_access') }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link 
          v-for="(menu, index) in orderSubMenus" 
          :key="index"
          :to="menu.path"
          class="p-4 border rounded-lg hover:bg-muted/20 transition-colors flex items-center space-x-3"
        >
          <div class="h-10 w-10 rounded-full flex items-center justify-center" :class="menu.bgColor">
            <component :is="menu.icon" class="h-5 w-5 text-white" />
          </div>
          <div>
            <span class="font-medium">{{ menu.name }}</span>
            <p class="text-sm text-muted-foreground mt-1">{{ menu.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 图标组件
const ReceiveIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
    })
  ])
})

const PayoutIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
    })
  ])
})

const RechargeIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    })
  ])
})

const TransferIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
    })
  ])
})

const WithdrawIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
    })
  ])
})

const OtherIcon = defineComponent({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      d: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
    })
  ])
})

// 订单子菜单配置
const orderSubMenus = [
  {
    name: t('merchant.nav.orders_receive'),
    path: '/merchant/orders/receive',
    icon: ReceiveIcon,
    bgColor: 'bg-blue-500',
    description: t('merchant.orders.receive_desc')
  },
  {
    name: t('merchant.nav.orders_payout'),
    path: '/merchant/orders/payout',
    icon: PayoutIcon,
    bgColor: 'bg-green-500',
    description: t('merchant.orders.payout_desc')
  },
  {
    name: t('merchant.nav.orders_recharge'),
    path: '/merchant/orders/recharge',
    icon: RechargeIcon,
    bgColor: 'bg-purple-500',
    description: t('merchant.orders.recharge_desc')
  },
  {
    name: t('merchant.nav.orders_transfer'),
    path: '/merchant/orders/transfer',
    icon: TransferIcon,
    bgColor: 'bg-amber-500',
    description: t('merchant.orders.transfer_desc')
  },
  {
    name: t('merchant.nav.orders_withdraw'),
    path: '/merchant/orders/withdraw',
    icon: WithdrawIcon,
    bgColor: 'bg-red-500',
    description: t('merchant.orders.withdraw_desc')
  },
  {
    name: t('merchant.nav.orders_other'),
    path: '/merchant/orders/other',
    icon: OtherIcon,
    bgColor: 'bg-gray-500',
    description: t('merchant.orders.other_desc')
  }
]
</script> 