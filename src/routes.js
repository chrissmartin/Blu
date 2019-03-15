import Home from './views/home.vue'
import profile from './views/profile.vue'



export const routes= [
    {
      path: '', name: 'Home', component: Home
    },
    { 
      path: '/profile', name: 'profile', component: profile
    }
  ]