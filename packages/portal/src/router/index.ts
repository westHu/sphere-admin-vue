import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/home/index.vue')
    },
    {
      path: '/solutions',
      component: () => import('../pages/solutions/index.vue')
    },
    {
      path: '/cases',
      component: () => import('../pages/cases/index.vue')
    },
    {
      path: '/about',
      component: () => import('../pages/about/index.vue')
    },
    {
      path: '/contact',
      component: () => import('../pages/contact/index.vue')
    },
    {
      path: '/login',
      component: () => import('../pages/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('../pages/register/index.vue')
    }
  ]
})

export default router 