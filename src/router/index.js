import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloWorld from "@/views/HelloWorld.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Mixin from "@/Utils/mixin.js";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  Mixin.methods.changePageTitle()
  next()
})

export default router
