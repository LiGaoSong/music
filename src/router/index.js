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
    component: () => import('../views/rank/index.vue'),
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('../views/play/index.vue')
  },
  {
    path: '/mvlist',
    name: 'MvList',
    component: () => import('../views/mv/index.vue'),
    // children:[
    //   {
    //     path: 'detail',
    //     name: 'mvlistDetail',
    //     component: () => import('../views/mv/detail.vue')
    //   },
    //   {
    //     path: '/mvlist/list',
    //     name: 'list',
    //     component: () => import('../views/mv/mvlist.vue')
    //   },
    // ]
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
  {
    path: '/playlist/detail',
    name: 'playDetail',
    component: () => import('../views/play/detail.vue')
  },
  {
    path: '/mvlist/detail',
    name: 'mvlistDetail',
    component: () => import('../views/mv/detail.vue')
  },
  {
    path:'/singer/detail',
    name:'SingerDetail',
    component: () => import('../views/singer/detail.vue')
  },
  {
    path:'/album/detail',
    name:'AlbumDetail',
    component: () => import('../views/singer/albumdetail.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
