import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/pages/Home'
import Profile from '@/components/pages/Profile'


export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    meta: { auth: true },
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, 
  {
    path: '*',
    name: 'default',
    redirect: { name: 'Login' }
  }
]
