import Login from '@/components/auth/Login'
import Home from '@/components/pages/Home'


export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'default',
    redirect: { name: 'Login' }
  }
]
