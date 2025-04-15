import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 获取本地存储的语言设置或使用浏览器语言
const getLocale = (): string => {
  const storedLocale = localStorage.getItem('locale')
  if (storedLocale && ['zh-CN', 'en-US'].includes(storedLocale)) {
    return storedLocale
  }
  
  // 浏览器默认语言
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  
  return 'en-US'
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用组合式 API
  locale: getLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  globalInjection: true // 全局注入 $t 方法
})

// 设置语言的方法
export const setLocale = (locale: string) => {
  if (['zh-CN', 'en-US'].includes(locale)) {
    localStorage.setItem('locale', locale)
    location.reload() // 刷新页面以应用新语言
  }
}

export default i18n 