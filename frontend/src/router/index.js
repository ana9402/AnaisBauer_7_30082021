import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    alias: ['/home'],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => 
      import('../views/Login.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => 
      import('../views/Signup.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => 
      import('../views/Post.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'postEdition',
    component: () => 
      import('../views/PostEdition.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/posts/:postId/comments/:id/edit',
    name: 'CommentEdition',
    component: () => 
      import('../views/CommentEdition.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => 
      import('../views/Submit.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profiles/:id',
    name: 'userProfile',
    component: () => 
      import('../views/UserProfile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profiles/:id/edit',
    name: 'profileEdition',
    component: () => 
      import('../views/ProfileEdition.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('userToken')) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else if (to.matched.some(record => record.meta.hideForAuth)) {
    if (localStorage.getItem('userToken')) {
      next({ name: 'home' })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
