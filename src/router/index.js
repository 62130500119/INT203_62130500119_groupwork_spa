import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dog',
    name: 'Dog',
    component: () => import('../views/Dog.vue')
  },
  {
    path: '/cat',
    name: 'Cat',
    component: () => import('../views/Cat.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
