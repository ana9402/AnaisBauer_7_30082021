import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => 
      import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => 
      import('../views/Signup.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => 
      import('../views/Post.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => 
      import('../views/Submit.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => 
      import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
