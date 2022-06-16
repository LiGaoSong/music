import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/index',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('../views/rank/index.vue')
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('../views/play/index.vue')
  },
  {
    path: '/mvlist',
    name: 'MvList',
    component: () => import('../views/mv/index.vue')
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('../views/singer/index.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/my/My.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
