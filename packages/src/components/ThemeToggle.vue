<template>
  <button
    class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    @click="handleThemeToggle"
  >
    <sun-icon v-if="isDark" class="h-5 w-5" />
    <moon-icon v-else class="h-5 w-5" />
    <span class="sr-only">切换主题</span>
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from 'lucide-vue-next'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleTheme = useToggle(isDark)

const handleThemeToggle = () => {
  toggleTheme()
}
</script> 