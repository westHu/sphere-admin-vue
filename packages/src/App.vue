<template>
  <RouterView v-slot="{ Component, route }">
    <template v-if="route.meta.layout === 'portal' || !route.path.startsWith('/merchant')">
      <BaseLayout :key="'portal-' + route.path">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </BaseLayout>
    </template>
    <template v-else>
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import { RouterView } from 'vue-router'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const setBodyAttributes = (path: string): void => {
  if (path.startsWith('/merchant')) {
    document.body.setAttribute('data-layout', 'merchant')
  } else {
    document.body.setAttribute('data-layout', 'portal')
  }
}

onMounted(() => {
  setBodyAttributes(route.path)
})

watch(() => route.path, (newPath) => {
  nextTick(() => {
    setBodyAttributes(newPath)
  })
}, { immediate: true })
</script>

<style>
body[data-layout="merchant"] .portal-only {
  display: none !important;
}

body[data-layout="portal"] .merchant-only {
  display: none !important;
}
</style> 