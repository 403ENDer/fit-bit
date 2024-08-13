import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DetailsView from '@/views/DetailsView.vue'
import LoginAlertView from '@/views/LoginAlertView.vue'
import AboutView from '@/views/AboutView.vue'
import ProfileVue from '@/views/ProfileVue.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView
    },
    {
      path: '/loginAlert',
      name: 'loginAlert',
      component: LoginAlertView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileVue
    }
  ]
})

export default router
