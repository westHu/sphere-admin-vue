import { createRouter, createWebHistory } from 'vue-router'

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
    {
      path: '/login',
      component: () => import('../pages/portal/login/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      component: () => import('../pages/portal/register/index.vue'),
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
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 根据路径判断重定向到哪个登录页面
    if (to.path.startsWith('/merchant')) {
      next('/merchant/login')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router 