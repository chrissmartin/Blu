import Home from './views/home.vue'
import profile from './views/profile.vue'
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';


export const routes= [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: profile
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]