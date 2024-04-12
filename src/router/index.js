import { createRouter, createWebHistory } from 'vue-router'
import Mixin from "@/Utils/mixin.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/Default.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/courses',
          name: 'courses',
          component: () => import('@/views/Courses.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: import('@/views/Register.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: import('@/views/PageNotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  Mixin.methods.changePageTitle()
  next()
})

export default router
