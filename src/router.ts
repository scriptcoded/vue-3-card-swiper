import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Profile from './pages/Profile.vue'
import Buttons from './pages/Buttons.vue'
import SwiperTest from './pages/SwiperTest.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: Buttons
  },
  {
    path: '/swiper',
    name: 'SwiperTest',
    component: SwiperTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
