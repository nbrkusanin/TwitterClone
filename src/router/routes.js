import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Home from '@/components/pages/Home'
import Profile from '@/components/pages/Profile'


export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
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
    redirect: { name: 'Home' }
  }
]
