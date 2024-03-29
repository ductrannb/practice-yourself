import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloWorld from "@/views/HelloWorld.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Mixin from "@/mixins/mixin.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
