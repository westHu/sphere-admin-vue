import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/home/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/solutions',
      component: () => import('../pages/solutions/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/cases',
      component: () => import('../pages/cases/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      component: () => import('../pages/about/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      component: () => import('../pages/login/index.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      component: () => import('../pages/register/index.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 