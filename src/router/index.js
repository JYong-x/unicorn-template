import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'

Vue.use(VueRouter)

export const crRouters = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '主页', keepAlive: true, hiddenHeaderContent: true, namespaceCode: 'KR_SRTP' },
        component: () => import('@/views/Home')
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouters = [
  // {
  //   path: '/redirect',
  //   component: BasicLayout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/components/common/Redirect')
  //     }
  //   ]
  // },
  // {
  //   path: '/token-index',
  //   name: 'login',
  //   hidden: true,
  //   component: () => import('@/components/login/Login')
  // },
  // {
  //   path: '/page404',
  //   name: 'page404',
  //   component: page404
  // },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   component: logout
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL
})

export default router
