import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
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

// 创建应用
const app = createApp(App)

// 全局路由切换处理
router.beforeEach((to, from, next) => {
  // 添加路由切换指示器（可选）
  document.body.classList.add('router-transition')
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
  console.error(err, info)
}

// 挂载应用
app.use(router)
app.use(i18n)
app.mount('#app') 