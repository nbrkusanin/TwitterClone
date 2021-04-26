import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.router = router

const loggedIn = () => {
  return false
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (loggedIn()) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
  next()
})

export default router
