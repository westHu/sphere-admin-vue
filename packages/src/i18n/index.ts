import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import id from './locales/id.json'

// 定义支持的语言
export const supportedLocales = ['en', 'zh', 'id']

// 创建一个简单的语言检测和存储机制
export class LocaleManager {
  private static instance: LocaleManager
  private _currentLocale: string = 'en'

  private constructor() {
    this.initLocale()
  }

  public static getInstance(): LocaleManager {
    if (!LocaleManager.instance) {
      LocaleManager.instance = new LocaleManager()
    }
    return LocaleManager.instance
  }

  private initLocale(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedLocale = localStorage.getItem('locale')
        console.log('LocaleManager - 读取到的语言:', savedLocale)
        
        if (savedLocale && supportedLocales.includes(savedLocale)) {
          this._currentLocale = savedLocale
          console.log('LocaleManager - 使用已保存的语言:', this._currentLocale)
        } else {
          // 如果没有保存过语言或不支持，则使用英文
          this._currentLocale = 'en'
          localStorage.setItem('locale', 'en')
          console.log('LocaleManager - 设置默认语言为英文')
        }
      }
    } catch (error) {
      console.error('初始化语言时出错:', error)
      this._currentLocale = 'en'
    }
  }

  public get currentLocale(): string {
    return this._currentLocale
  }

  public setLocale(locale: string): boolean {
    if (supportedLocales.includes(locale)) {
      console.log('LocaleManager - 设置语言:', locale)
      this._currentLocale = locale
      
      try {
        localStorage.setItem('locale', locale)
        console.log('LocaleManager - 语言已保存到localStorage')
        
        // 如果i18n已经初始化，则同步更新
        if (i18nInstance) {
          i18nInstance.global.locale.value = locale
          console.log('LocaleManager - 已同步更新i18n实例')
        }
        
        return true
      } catch (error) {
        console.error('保存语言设置时出错:', error)
      }
    } else {
      console.warn('不支持的语言:', locale)
    }
    return false
  }
}

// 获取语言管理器实例
export const localeManager = LocaleManager.getInstance()
console.log('当前语言:', localeManager.currentLocale)

// 创建i18n实例
const i18nInstance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localeManager.currentLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    id
  },
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false
})

// 提供一个简单的API来切换语言
export const setLocale = (locale: string): boolean => {
  const result = localeManager.setLocale(locale)
  if (result) {
    i18nInstance.global.locale.value = locale
    return true
  }
  return false
}

// 导出i18n实例
export default i18nInstance 