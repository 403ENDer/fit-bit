import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import DetailsView from '@/views/DetailsView.vue'
import LoginAlertView from '@/views/LoginAlertView.vue'
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
      component: LoginForm
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm
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
    }
  ]
})

export default router
