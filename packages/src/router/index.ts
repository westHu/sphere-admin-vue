import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 官网页面
    {
      path: '/',
      component: () => import('../pages/portal/home/index.vue'),
      meta: { requiresAuth: false, layout: 'portal' }
    },
    {
      path: '/solutions',
      component: () => import('../pages/portal/solutions/index.vue'),
      meta: { requiresAuth: false, layout: 'portal' }
    },
    {
      path: '/cases',
      component: () => import('../pages/portal/cases/index.vue'),
      meta: { requiresAuth: false, layout: 'portal' }
    },
    {
      path: '/about',
      component: () => import('../pages/portal/about/index.vue'),
      meta: { requiresAuth: false, layout: 'portal' }
    },
    
    // 商户后台页面
    {
      path: '/merchant',
      component: () => import('../layouts/MerchantLayout.vue'),
      meta: { requiresAuth: true, layout: 'merchant' },
      children: [
        {
          path: '',
          component: () => import('../pages/merchant/dashboard/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        },
        {
          path: 'dashboard',
          component: () => import('../pages/merchant/dashboard/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        },
        {
          path: 'orders',
          component: () => import('../pages/merchant/orders/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        },
        {
          path: 'products',
          component: () => import('../pages/merchant/products/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        },
        {
          path: 'customers',
          component: () => import('../pages/merchant/customers/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        },
        {
          path: 'settings',
          component: () => import('../pages/merchant/settings/index.vue'),
          meta: { requiresAuth: true, layout: 'merchant' }
        }
      ]
    },
    {
      path: '/merchant/login',
      component: () => import('../pages/merchant/login/index.vue'),
      meta: { requiresAuth: false, layout: 'merchant' }
    },
    {
      path: '/merchant/register',
      component: () => import('../pages/merchant/register/index.vue'),
      meta: { requiresAuth: false, layout: 'merchant' }
    },
    
    // 后台管理系统页面
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAdminAuth: true, layout: 'admin' },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          component: () => import('../pages/admin/dashboard/index.vue'),
          meta: { requiresAdminAuth: true, layout: 'admin' }
        },
        {
          path: 'merchants',
          component: () => import('../pages/admin/merchants/index.vue'),
          meta: { requiresAdminAuth: true, layout: 'admin' }
        },
        {
          path: 'orders',
          component: () => import('../pages/admin/orders/index.vue'),
          meta: { requiresAdminAuth: true, layout: 'admin' }
        },
        {
          path: 'settlement',
          component: () => import('../pages/admin/settlement/index.vue'),
          meta: { requiresAdminAuth: true, layout: 'admin' }
        },
        {
          path: 'system',
          component: () => import('../pages/admin/system/index.vue'),
          meta: { requiresAdminAuth: true, layout: 'admin' }
        }
      ]
    },
    {
      path: '/admin/login',
      component: () => import('../pages/admin/login/index.vue'),
      meta: { requiresAdminAuth: false, layout: 'admin' }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 从localStorage获取token，避免SSR不一致问题
  const isAuthenticated = localStorage.getItem('token')
  const isAdminAuthenticated = localStorage.getItem('admin_token')
  
  // 更新body上的data-route属性，便于CSS选择器使用
  document.body.dataset.route = to.path
  
  // 设置布局类型，便于CSS选择器使用
  const layout = to.meta.layout as string || (to.path.startsWith('/merchant') ? 'merchant' : to.path.startsWith('/admin') ? 'admin' : 'portal')
  document.body.dataset.layout = layout
  
  // 路由权限检查
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 所有需要商户认证的路由都重定向到商户登录页面
    next('/merchant/login')
  } else if (to.meta.requiresAdminAuth && !isAdminAuthenticated) {
    // 所有需要管理员认证的路由都重定向到管理员登录页面
    next('/admin/login')
  } else {
    next()
  }
})

export default router 