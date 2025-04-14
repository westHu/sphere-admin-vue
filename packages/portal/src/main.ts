import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// 确保默认使用英文
let defaultLocale = 'en' as 'en' | 'zh' | 'id'
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['en', 'zh', 'id'].includes(savedLocale)) {
      defaultLocale = savedLocale as 'en' | 'zh' | 'id'
    } else {
      // 如果没有保存语言或语言无效，则设置为英文
      localStorage.setItem('locale', 'en')
    }
  }
} catch (error) {
  console.error('Error accessing localStorage:', error)
}

// 设置i18n的默认语言
i18n.global.locale.value = defaultLocale

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app') 