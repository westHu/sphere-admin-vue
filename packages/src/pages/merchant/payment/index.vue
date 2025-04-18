<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">{{ t('merchant.nav.products') }}</h1>
    <p class="text-gray-500 dark:text-gray-400 mb-6">{{ t('merchant.payment.payment_methods') }}</p>

    <!-- 地区选择器 -->
    <div class="mb-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div class="flex flex-col gap-4 md:flex-row md:justify-between">
          <!-- 支付方式类型筛选 -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">支付方式类型</h3>
            <div class="flex flex-wrap gap-2">
              <button 
                @click="selectedType = 'all'" 
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  selectedType === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                全部
              </button>
              <button 
                v-for="type in paymentTypes" 
                :key="type.code"
                @click="selectedType = type.code" 
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
                  selectedType === type.code 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <span class="mr-2">{{ type.icon }}</span>
                <span>{{ type.name }}</span>
              </button>
            </div>
          </div>
          
          <!-- 地区筛选 -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">按地区筛选</h3>
            <div class="flex flex-wrap gap-2">
              <button 
                @click="selectedRegion = 'all'" 
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  selectedRegion === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                全球
              </button>
              <button 
                v-for="region in regions" 
                :key="region.code"
                @click="selectedRegion = region.code" 
                :class="[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
                  selectedRegion === region.code 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <span class="mr-2">{{ region.flag }}</span>
                <span>{{ region.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 已开通支付方式 -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-medium">{{ t('merchant.payment.available_methods') }}</h2>
        <div class="space-x-2">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            导出
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.method') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                类型
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.status') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                适用地区
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.fee_rate') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.settlement_cycle') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.daily_limit') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ t('merchant.payment.monthly_limit') }}
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(method, index) in filteredPaymentMethods" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <img :src="method.icon" :alt="method.name" class="h-6 w-6" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ method.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ method.currency }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getTypeClass(method.type)">
                  {{ getTypeName(method.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(method.status)">
                  {{ method.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="region in method.regions" 
                    :key="region.code"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs"
                    :title="region.name"
                  >
                    {{ region.flag }}
                  </span>
                  <span v-if="method.isGlobal" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                    全球通用
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ method.feeRate }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ method.settlementCycle }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ method.dailyLimit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ method.monthlyLimit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                    {{ t('merchant.payment.detail') }}
                  </button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    {{ t('merchant.payment.update') }}
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPaymentMethods.length === 0">
              <td colspan="8" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                {{ selectedRegion === 'all' ? '暂无开通的支付方式' : '当前地区暂无开通的支付方式' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        显示 1-{{ filteredPaymentMethods.length }} 条，共 {{ filteredPaymentMethods.length }} 条
      </div>
    </div>

    <!-- 按地区展示支付方式 -->
    <div v-if="selectedRegion === 'all'">
      <div v-for="region in regions" :key="region.code" class="mb-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium flex items-center">
              <span class="mr-2">{{ region.flag }}</span>
              <span>{{ region.name }}地区支付方式</span>
            </h2>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="(method, index) in getRegionalMethods(region.code)" :key="index" class="border rounded-lg p-4 flex flex-col">
                <div class="flex items-center mb-3">
                  <div class="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <img :src="method.icon" :alt="method.name" class="h-6 w-6" />
                  </div>
                  <div>
                    <h3 class="text-base font-medium text-gray-900 dark:text-white">{{ method.name }}</h3>
                    <div class="flex items-center">
                      <span :class="getTypeClass(method.type)" class="text-xs mt-1">
                        {{ getTypeName(method.type) }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">{{ method.isPopular ? '热门' : '' }}</span>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {{ method.description || `${region.name}地区常用支付方式` }}
                </p>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                  <div>费率: {{ method.suggestedFeeRate || '以申请为准' }}</div>
                  <div class="flex justify-between items-center mt-2">
                    <span>{{ getMethodStatusText(method) }}</span>
                    <button v-if="!isMethodActive(method)" class="text-primary hover:text-primary/80">
                      了解详情
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-if="getRegionalMethods(region.code).length === 0" class="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
                {{ selectedType === 'all' ? '该地区暂无可用的支付方式' : `该地区暂无可用的${getTypeName(selectedType)}支付方式` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 地区数据
const regions = [
  { 
    code: 'asia-pacific', 
    name: '亚太', 
    flag: '🌏',
    countries: ['中国', '日本', '韩国', '新加坡', '澳大利亚', '印度']
  },
  { 
    code: 'north-america', 
    name: '北美', 
    flag: '🌎',
    countries: ['美国', '加拿大', '墨西哥']
  },
  { 
    code: 'europe', 
    name: '欧洲', 
    flag: '🌍',
    countries: ['英国', '法国', '德国', '意大利', '西班牙', '荷兰']
  },
  { 
    code: 'latin-america', 
    name: '拉美', 
    flag: '🌎',
    countries: ['巴西', '阿根廷', '智利', '哥伦比亚']
  },
  { 
    code: 'middle-east-africa', 
    name: '中东非洲', 
    flag: '🌍',
    countries: ['阿联酋', '沙特阿拉伯', '埃及', '南非', '尼日利亚']
  }
]

// 支付方式类型
const paymentTypes = [
  {
    code: 'receive',
    name: '收款',
    icon: '💰',
    description: '用于接收客户付款的支付方式'
  },
  {
    code: 'payout',
    name: '出款',
    icon: '💸',
    description: '用于向供应商或合作伙伴付款的支付方式'
  },
  {
    code: 'withdraw',
    name: '提现',
    icon: '🏦',
    description: '用于资金提取到银行账户的支付方式'
  }
]

// 当前选择的地区和类型
const selectedRegion = ref('all')
const selectedType = ref('all')

// 支付方式数据
const paymentMethods = ref([
  {
    id: 1,
    name: t('merchant.payment.methods.alipay'),
    icon: '/images/payment/alipay.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '0.38% + ¥0.10',
    settlementCycle: t('merchant.payment.cycles.t_plus_1'),
    settlementTime: t('merchant.payment.times.workday_10'),
    dailyLimit: '¥1,000,000',
    monthlyLimit: '¥30,000,000',
    currency: 'CNY',
    regions: [regions[0]],
    isGlobal: false,
    type: 'receive'
  },
  {
    id: 2,
    name: t('merchant.payment.methods.wechat'),
    icon: '/images/payment/wechat.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '0.38% + ¥0.01',
    settlementCycle: t('merchant.payment.cycles.t_plus_1'),
    settlementTime: t('merchant.payment.times.workday_10'),
    dailyLimit: '¥1,000,000',
    monthlyLimit: '¥30,000,000',
    currency: 'CNY',
    regions: [regions[0]],
    isGlobal: false,
    type: 'receive'
  },
  {
    id: 3,
    name: t('merchant.payment.methods.unionpay'),
    icon: '/images/payment/unionpay.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '0.5% + ¥0.10',
    settlementCycle: t('merchant.payment.cycles.t_plus_2'),
    settlementTime: t('merchant.payment.times.workday_16'),
    dailyLimit: '¥1,000,000',
    monthlyLimit: '¥30,000,000',
    currency: 'CNY',
    regions: [regions[0]],
    isGlobal: false,
    type: 'withdraw'
  },
  {
    id: 4,
    name: t('merchant.payment.methods.visa'),
    icon: '/images/payment/visa.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '2.9% + $0.30',
    settlementCycle: t('merchant.payment.cycles.t_plus_3'),
    settlementTime: t('merchant.payment.times.everyday_10'),
    dailyLimit: '$150,000',
    monthlyLimit: '$3,000,000',
    currency: 'USD',
    regions: [regions[0], regions[1], regions[2], regions[3], regions[4]],
    isGlobal: true,
    type: 'receive'
  },
  {
    id: 5,
    name: t('merchant.payment.methods.mastercard'),
    icon: '/images/payment/mastercard.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '2.9% + $0.30',
    settlementCycle: t('merchant.payment.cycles.t_plus_3'),
    settlementTime: t('merchant.payment.times.everyday_10'),
    dailyLimit: '$150,000',
    monthlyLimit: '$3,000,000',
    currency: 'USD',
    regions: [regions[0], regions[1], regions[2], regions[3], regions[4]],
    isGlobal: true,
    type: 'receive'
  },
  {
    id: 6,
    name: 'SWIFT银行转账',
    icon: '/images/payment/bank_transfer.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '1.0% + $15',
    settlementCycle: t('merchant.payment.cycles.t_plus_3'),
    settlementTime: t('merchant.payment.times.workday_10'),
    dailyLimit: '$500,000',
    monthlyLimit: '$5,000,000',
    currency: 'USD',
    regions: [regions[0], regions[1], regions[2], regions[3], regions[4]],
    isGlobal: true,
    type: 'payout'
  },
  {
    id: 7,
    name: 'Payoneer',
    icon: '/images/payment/payoneer.svg',
    status: t('merchant.payment.status_active'),
    feeRate: '2.0%',
    settlementCycle: t('merchant.payment.cycles.t_plus_1'),
    settlementTime: t('merchant.payment.times.workday_10'),
    dailyLimit: '$50,000',
    monthlyLimit: '$1,000,000',
    currency: 'USD',
    regions: [regions[1], regions[2]],
    isGlobal: false,
    type: 'payout'
  }
])

// 地区特有的支付方式
const regionalPaymentMethods = ref([
  // 亚太地区
  {
    id: 101,
    name: 'PayLah!',
    icon: '/images/payment/singapore.svg',
    description: '新加坡本地流行的移动支付方式',
    regionCode: 'asia-pacific',
    suggestedFeeRate: '2.0%',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  {
    id: 102,
    name: 'PayTM',
    icon: '/images/payment/india.svg',
    description: '印度领先的数字支付平台',
    regionCode: 'asia-pacific',
    suggestedFeeRate: '1.8% + ₹3',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  {
    id: 103,
    name: '网联快付',
    icon: '/images/payment/china_bank.svg',
    description: '中国银联跨行转账系统',
    regionCode: 'asia-pacific',
    suggestedFeeRate: '1.0%',
    isPopular: true,
    isActive: false,
    type: 'withdraw'
  },
  // 北美地区
  {
    id: 201,
    name: 'Venmo',
    icon: '/images/payment/venmo.svg',
    description: '美国流行的移动支付应用',
    regionCode: 'north-america',
    suggestedFeeRate: '2.9% + $0.30',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  {
    id: 202,
    name: 'Interac',
    icon: '/images/payment/interac.svg',
    description: '加拿大流行的借记支付网络',
    regionCode: 'north-america',
    suggestedFeeRate: '2.5% + CAD 0.30',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  {
    id: 203,
    name: 'ACH Transfer',
    icon: '/images/payment/ach.svg',
    description: '美国自动清算系统，适合批量付款',
    regionCode: 'north-america',
    suggestedFeeRate: '0.8% + $0.25',
    isPopular: true,
    isActive: false,
    type: 'payout'
  },
  // 欧洲地区
  {
    id: 301,
    name: 'SEPA',
    icon: '/images/payment/sepa.svg',
    description: '欧元区统一支付协议',
    regionCode: 'europe',
    suggestedFeeRate: '1.5% + €0.25',
    isPopular: true,
    isActive: false,
    type: 'payout'
  },
  {
    id: 302,
    name: 'iDEAL',
    icon: '/images/payment/ideal.svg',
    description: '荷兰流行的在线支付系统',
    regionCode: 'europe',
    suggestedFeeRate: '1.8% + €0.29',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  // 拉美地区
  {
    id: 401,
    name: 'Mercado Pago',
    icon: '/images/payment/mercadopago.svg',
    description: '拉丁美洲领先的支付平台',
    regionCode: 'latin-america',
    suggestedFeeRate: '3.0% + 相应货币固定费',
    isPopular: true,
    isActive: false,
    type: 'receive'
  },
  {
    id: 402,
    name: 'PIX',
    icon: '/images/payment/pix.svg',
    description: '巴西即时支付系统',
    regionCode: 'latin-america',
    suggestedFeeRate: '1.0%',
    isPopular: true,
    isActive: false,
    type: 'payout'
  },
  // 中东非洲
  {
    id: 501,
    name: 'M-Pesa',
    icon: '/images/payment/mpesa.svg',
    description: '非洲地区流行的移动支付服务',
    regionCode: 'middle-east-africa',
    suggestedFeeRate: '2.5%',
    isPopular: true,
    isActive: false,
    type: 'receive'
  }
])

// 根据所选地区和类型筛选支付方式
const filteredPaymentMethods = computed(() => {
  // 先根据地区筛选
  let methods = paymentMethods.value;
  
  if (selectedRegion.value !== 'all') {
    methods = methods.filter(method => {
      return method.isGlobal || method.regions.some(region => region.code === selectedRegion.value)
    })
  }
  
  // 再根据类型筛选
  if (selectedType.value !== 'all') {
    methods = methods.filter(method => method.type === selectedType.value)
  }
  
  return methods
})

// 获取特定地区和类型的支付方式
const getRegionalMethods = (regionCode: string) => {
  // 该地区特有的支付方式，先根据地区筛选
  let localMethods = regionalPaymentMethods.value.filter(method => 
    method.regionCode === regionCode
  )
  
  // 再根据类型筛选
  if (selectedType.value !== 'all') {
    localMethods = localMethods.filter(method => method.type === selectedType.value)
  }
  
  return localMethods
}

// 判断支付方式是否已开通
const isMethodActive = (method: any) => {
  return paymentMethods.value.some(pm => pm.name === method.name)
}

// 获取支付方式状态文本
const getMethodStatusText = (method: any) => {
  return isMethodActive(method) ? '已开通' : '未开通'
}

// 处理状态样式
const getStatusClass = (status: string) => {
  if (status === t('merchant.payment.status_active')) {
    return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  } else if (status === t('merchant.payment.status_inactive')) {
    return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  } else {
    return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
  }
}

// 获取支付方式类型名称
const getTypeName = (type: string) => {
  const paymentType = paymentTypes.find(t => t.code === type)
  return paymentType ? paymentType.name : '未知'
}

// 处理类型样式
const getTypeClass = (type: string) => {
  switch (type) {
    case 'receive':
      return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    case 'payout':
      return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    case 'withdraw':
      return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    default:
      return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }
}
</script> 