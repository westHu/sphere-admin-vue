<template>
  <BaseLayout>
    <router-view v-slot="{ Component }">
      <transition name="router-view" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
</script> 