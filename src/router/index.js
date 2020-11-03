import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout, RouteView } from '@/layouts'

Vue.use(VueRouter)

/**
 * path: 路由地址,
 * name: 路由名称，
 * hidden: (false)是否在菜单显示
 * hideChildrenInMenu: (false)强制菜单显示为Item而不是SubItem(配合 meta.hidden)
 * x: 菜单在下拉菜单中的x坐标位置
 * y: 菜单在下拉菜单中的y坐标位置
 * meta: {
 *  title: 显示在侧边栏、面包屑和标签栏的文字
 *  hiddenInBreadcrumb: (false) 在面包屑中不显示
 *  hidden: (false) 配合hideChildrenInMenu使用，用于隐藏菜单时，提供递归到父菜单显示 选中菜单项
 *  hiddenHeaderContent: (false) 不显示面包屑
 *  keepAlive: (false) 缓存路由
 *  icon: (-) 菜单图标(svg)
 *  permission: 权限
 *  namespace: 系统命名空间(默认系统命名空间，当路由命名空间与系统命名空间不一致时需要添加)
 * }
 */

export const examRouters = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BasicLayout,
    meta: { title: '主页' },
    children: [
      {
        path: '/home',
        name: 'Home',
        x: 1,
        y: 1,
        meta: { title: '主页', icon: 'icon-zhuye', keepAlive: true, hiddenHeaderContent: true },
        component: () => import('@/views/home/home')
      },
      {
        path: '/admin',
        name: 'Admin',
        x: 3,
        y: 1,
        meta: { title: '管理台', icon: 'icon-xitongguanli' },
        component: RouteView,
        children: [
          {
            path: '/permission',
            name: 'Permission',
            meta: { title: '权限' },
            component: () => import('@/views/admin/permission/permission')
          },
          {
            path: '/role',
            name: 'Role',
            meta: { title: '角色' },
            component: () => import('@/views/admin/role/role')
          },
          {
            path: '/users',
            redirect: '/users',
            meta: { title: '用户' },
            component: RouteView,
            children: [
              {
                path: '/users',
                name: 'Users',
                meta: { title: '用户', hiddenInBreadcrumb: true },
                component: () => import('@/views/admin/users/users')
              },
              {
                path: '/edit-user',
                name: 'EditUser',
                meta: { title: '用户编辑', hiddenInBreadcrumb: true },
                component: () => import('@/views/admin/users/edit-user')
              }
            ]
          },
          {
            path: '/announcement',
            redirect: '/announcement',
            meta: { title: '公告管理' },
            component: RouteView,
            hiddenChildrenInMenu: true,
            children: [
              {
                path: '/announcement',
                name: 'Announcement',
                meta: { title: '公告管理', hiddenInBreadcrumb: true },
                component: () => import('@/views/admin/announcement/announcement')
              },
              {
                path: '/announcement-edit',
                name: 'AnnouncementEdit',
                meta: { title: '公告编辑' },
                component: () => import('@/views/admin/announcement/announcement-edit')
              }
            ]
          }
        ]
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouters = [
  {
    path: '/redirect',
    component: BasicLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/login')
  },
  {
    path: '/token-index',
    name: 'tokenIndex',
    hidden: true,
    component: () => import('@/views/login/token-index')
  },
  {
    path: '/cas',
    name: 'cas',
    hidden: true,
    component: () => import('@/views/login/cas')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters
})

export default router
