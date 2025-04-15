<template>
  <div>
    <h1 class="text-2xl font-semibold mb-8">{{ t('merchant.nav.settings') }}</h1>
    <div class="bg-white shadow rounded-lg p-6">
      <p class="text-gray-500">{{ t('common.placeholder') }} - {{ t('merchant.nav.settings') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script> 