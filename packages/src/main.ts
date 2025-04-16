import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import router from './router'
import i18n, { localeManager, supportedLocales } from './i18n'
import './style.css'

// 输出调试信息
console.log('[main.ts] 应用启动')
console.log('[main.ts] 当前语言:', localeManager.currentLocale)
console.log('[main.ts] i18n当前语言:', i18n.global.locale.value)

// 创建应用
const app = createApp(App)

// 全局路由切换处理
router.beforeEach((to, from, next) => {
  // 添加路由切换指示器（可选）
  document.body.classList.add('router-transition')
  
  // 在路由切换时同步语言设置
  try {
    const currentLocale = localStorage.getItem('locale')
    if (currentLocale && supportedLocales.includes(currentLocale) && i18n.global.locale.value !== currentLocale) {
      console.log('路由切换 - 同步语言为:', currentLocale)
      i18n.global.locale.value = currentLocale as 'en' | 'zh' | 'id'
    }
  } catch (error) {
    console.error('路由切换时同步语言出错:', error)
  }
  
  next()
})

router.afterEach(() => {
  // 延迟移除过渡类，确保动画完成
  setTimeout(() => {
    document.body.classList.remove('router-transition')
  }, 200)
})

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('[main.ts] 应用错误:', err)
  console.error('[main.ts] 错误信息:', info)
}

// 全局共享国际化状态
window.__APP_I18N_STATE__ = {
  currentLocale: localeManager.currentLocale,
  supportedLocales,
  initialized: true
}

// 在挂载应用前同步语言状态
try {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    i18n.global.locale.value = savedLocale
    console.log('[main.ts] 语言已同步:', savedLocale)
  }
} catch (error) {
  console.error('[main.ts] 同步语言出错:', error)
}

// 在全局挂载i18n，确保组件可以正确访问
app.use(i18n)
app.use(router)
app.mount('#app')

// 添加全局事件监听以同步语言设置
window.addEventListener('storage', (event) => {
  if (event.key === 'locale' && event.newValue) {
    if (supportedLocales.includes(event.newValue) && i18n.global.locale.value !== event.newValue) {
      i18n.global.locale.value = event.newValue
      console.log('[main.ts] 语言已通过storage事件同步:', event.newValue)
    }
  }
})

// 为调试添加全局变量
console.log('[main.ts] 应用挂载完成') 