import { createRouter, createWebHistory } from 'vue-router'
import Interest from '../views/Interest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Interest,
    },
  ],
})

export default router
