<template>
  <router-view v-slot="{ Component }">
    <transition name="router-view" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.router-view-enter-active,
.router-view-leave-active {
  transition: opacity 0.2s ease;
}

.router-view-enter-from,
.router-view-leave-to {
  opacity: 0;
}
</style> 