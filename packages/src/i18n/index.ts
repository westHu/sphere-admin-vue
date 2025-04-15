import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import id from './locales/id.json'

// 检查localStorage中是否有保存的语言设置
let defaultLocale = 'en'

// 添加错误处理，防止服务器端渲染出错
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['en', 'zh', 'id'].includes(savedLocale)) {
      defaultLocale = savedLocale
    } else {
      // 如果没有保存过语言设置或语言设置无效，使用英文
      localStorage.setItem('locale', 'en')
    }
  }
} catch (error) {
  console.error('Error accessing localStorage:', error)
}

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale, // 使用检测到的默认语言或英文
  fallbackLocale: 'en', // 回退语言
  messages: {
    en,
    zh,
    id
  }
})

export default i18n 