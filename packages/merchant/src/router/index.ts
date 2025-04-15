import { createRouter, createWebHistory } from 'vue-router'
import MerchantLayout from '@/layouts/MerchantLayout.vue'

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: { requiresAuth: false, hideLayout: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register/index.vue'),
    meta: { requiresAuth: false, hideLayout: true }
  },
  {
    path: '/',
    component: MerchantLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: { title: 'dashboard' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/pages/orders/index.vue'),
        meta: { title: 'orders' }
      },
      {
        path: 'payments',
        name: 'Payments',
        component: () => import('@/pages/payments/index.vue'),
        meta: { title: 'payments' }
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/pages/customers/index.vue'),
        meta: { title: 'customers' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/settings/index.vue'),
        meta: { title: 'settings' }
      }
    ]
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
    meta: { requiresAuth: false, hideLayout: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('merchant_token') !== null
  
  // 需要认证但未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router 