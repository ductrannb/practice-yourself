import { createRouter, createWebHistory } from 'vue-router'
import Mixin from "@/Utils/mixin.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      let result = { top: 0 }
      if (to.name === from.name) {
        result.behavior = 'smooth'
      }
      return result
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
            },
            {
              path: 'lessons/:id',
              name: 'lesson-detail',
              component: () => import('@/views/LessonDetail.vue')
            }
          ]
        },
        {
          path: '/exams',
          children: [
            {
              path: '',
              name: 'exams',
              component: () => import('@/views/Exams.vue')
            },
            {
              path: ':id',
              name: 'exam-detail',
              component: () => import('@/views/ExamDetail.vue')
            },
            {
              path: 'overview/:id',
              name: 'exam-overview',
              component: () => import('@/views/ExamOverview.vue')
            },
            {
              path: 'review/:id',
              name: 'exam-review',
              component: () => import('@/views/ExamReview.vue')
            }
          ]
        },
      ]
    },
    // Admin routes
    {
      path: '/xadmin',
      component: () => import('@/layouts/Admin.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin.dashboard',
          component: () => import('@/views/admin/Dashboard.vue')
        },
        {
          path: 'users',
          name: 'admin.users',
          component: () => import('@/views/admin/Users.vue')
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
