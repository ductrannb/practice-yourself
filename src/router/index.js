import { createRouter, createWebHistory } from 'vue-router'
import Mixin from "@/Utils/mixin.js"
import adminRoutes from "@/middlewares/admin.js";
import store from "@/plugins/vuex.js";
import constants from "@/Utils/constants.js";

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
              name: 'courses.detail',
              component: () => import('@/views/CourseDetail.vue')
            },
            {
              path: 'lessons/:id',
              name: 'lessons.detail',
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
              name: 'exams.detail',
              component: () => import('@/views/ExamDetail.vue')
            },
            {
              path: 'overview/:id',
              name: 'exams.overview',
              component: () => import('@/views/ExamOverview.vue')
            },
            {
              path: 'review/:id',
              name: 'exams.review',
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
        },
        {
          path: 'users/create',
          name: 'admin.users.create',
          component: () => import('@/views/admin/UserCreate.vue')
        },
        {
          path: 'users/update/:id',
          name: 'admin.users.update',
          component: () => import('@/views/admin/UserUpdate.vue')
        },
        {
          path: 'users/:id',
          name: 'admin.users.detail',
          component: () => import('@/views/admin/UserDetail.vue')
        },
        {
          path: 'teachers',
          name: 'admin.teachers',
          component: () => import('@/views/admin/Teachers.vue')
        },
        {
          path: 'teachers/create',
          name: 'admin.teachers.create',
          component: () => import('@/views/admin/TeacherCreate.vue')
        },
        {
          path: 'teachers/update/:id',
          name: 'admin.teachers.update',
          component: () => import('@/views/admin/TeacherUpdate.vue')
        },
        {
          path: 'teachers/:id',
          name: 'admin.teachers.detail',
          component: () => import('@/views/admin/TeacherDetail.vue')
        },
        {
          path: 'courses',
          name: 'admin.courses',
          component: () => import('@/views/admin/Courses.vue')
        },
        {
          path: 'courses/create',
          name: 'admin.courses.create',
          component: () => import('@/views/admin/CourseCreate.vue')
        },
        {
          path: 'courses/update/:id',
          name: 'admin.courses.update',
          component: () => import('@/views/admin/CourseUpdate.vue')
        },
        {
          path: 'courses/:id/lessons',
          name: 'admin.courses.lessons',
          component: () => import('@/views/admin/Lessons.vue')
        },
        {
          path: 'courses/:id/lessons/create',
          name: 'admin.courses.lessons.create',
          component: () => import('@/views/admin/LessonCreate.vue')
        },
        {
          path: 'courses/:id/lessons/:lessonId/questions',
          name: 'admin.courses.lessons.questions',
          component: () => import('@/views/admin/Questions.vue')
        },
        {
          path: 'courses/:id/lessons/:lessonId/questions/create',
          name: 'admin.courses.lessons.questions.create',
          component: () => import('@/views/admin/QuestionCreate.vue')
        }
      ]
    },
    {
      path: '/teacher',
      component: () => import('@/layouts/Admin.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'teacher.dashboard',
          component: () => import('@/views/admin/Dashboard.vue')
        },
        {
          path: 'courses',
          name: 'teacher.courses',
          component: () => import('@/views/admin/Courses.vue')
        },
        {
          path: 'courses/create',
          name: 'teacher.courses.create',
          component: () => import('@/views/admin/CourseCreate.vue')
        },
        {
          path: 'courses/:id/lessons',
          name: 'teacher.courses.lessons',
          component: () => import('@/views/admin/Lessons.vue')
        },
        {
          path: 'courses/:id/lessons/create',
          name: 'teacher.courses.lessons.create',
          component: () => import('@/views/admin/LessonCreate.vue')
        },
        {
          path: 'courses/:id/lessons/:lessonId/questions',
          name: 'teacher.courses.lessons.questions',
          component: () => import('@/views/admin/Questions.vue')
        },
        {
          path: 'courses/:id/lessons/:lessonId/questions/create',
          name: 'teacher.courses.lessons.questions.create',
          component: () => import('@/views/admin/QuestionCreate.vue')
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
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('@/views/ForgetPassword.vue')
    },
    // Not found route
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/PageNotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  Mixin.methods.changePageTitle()
  await Mixin.methods.checkAuth()
    // Check role admin
  if (adminRoutes.includes(to.name)) {
    if (store.getters.auth == null) {
      next({name: 'login'})
    }
    if (store.getters.auth?.role_id != constants.ROLE.ADMIN) {
      next({name: '404'})
    }
  }
  next()
})

export default router
