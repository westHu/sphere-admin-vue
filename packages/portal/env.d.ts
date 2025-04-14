/// <reference types="vite/client" />

declare module 'vue-i18n' {
  import type { DefineComponent } from 'vue'
  export const useI18n: any
  export const createI18n: any
} 