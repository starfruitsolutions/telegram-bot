import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Bot from '@/views/Bot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/bot/:id',
    name: 'bot',
    component: Bot,
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

export default router
