import { createRouter, createWebHistory } from 'vue-router'
import Mixin from "@/Utils/mixin.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
        // Courses routes
        {
          path: '/courses',
          children: [
            {
              path: '',
              name: 'courses',
              component: () => import('@/views/Courses.vue')
            },
            {
              path: ':id',
              name: 'course-detail',
              component: () => import('@/views/CourseDetail.vue')
            }
          ]
        },
        // Lessons routes
        {
          path: '/lessons/:id',
          name: 'lesson-detail',
          component: () => import('@/views/LessonDetail.vue')
        }
      ]
    },
    // Auth routes
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    // Not found route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/PageNotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  Mixin.methods.changePageTitle()
  next()
})

export default router
