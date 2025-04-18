<template>
  <div>
    <h1 class="text-2xl font-semibold mb-8">{{ t('merchant.nav.finance') }}</h1>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <p class="text-gray-500 dark:text-gray-400">{{ t('common.placeholder') }} - {{ t('merchant.nav.finance') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script> 