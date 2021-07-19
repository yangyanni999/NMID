import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../components/Login.vue'
import home from '../components/Main.vue'
import zhuche from '../components/zhuche.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/main',
    component: home
  },
  {
    path: '/apply',
    component: zhuche
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
