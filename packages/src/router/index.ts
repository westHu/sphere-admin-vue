import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 官网页面
    {
      path: '/',
      component: () => import('../pages/portal/home/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/solutions',
      component: () => import('../pages/portal/solutions/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/cases',
      component: () => import('../pages/portal/cases/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      component: () => import('../pages/portal/about/index.vue'),
      meta: { requiresAuth: false }
    },
    
    // 商户后台页面
    {
      path: '/merchant',
      component: () => import('../layouts/MerchantLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../pages/merchant/dashboard/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          component: () => import('../pages/merchant/orders/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'products',
          component: () => import('../pages/merchant/products/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'customers',
          component: () => import('../pages/merchant/customers/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          component: () => import('../pages/merchant/settings/index.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/merchant/login',
      component: () => import('../pages/merchant/login/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/merchant/register',
      component: () => import('../pages/merchant/register/index.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 使用useStorage获取token，与登录页面保持一致
  const token = useStorage('token', '')
  const isAuthenticated = token.value
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 所有需要认证的路由都重定向到商户登录页面
    next('/merchant/login')
  } else {
    next()
  }
})

export default router 