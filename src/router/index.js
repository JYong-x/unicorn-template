import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout, RouteView } from '@/layouts'

Vue.use(VueRouter)

/**
 * path: 路由地址,
 * name: 路由名称，
 * hidden: (false)是否在菜单显示
 * hideChildrenInMenu: (false)强制菜单显示为Item而不是SubItem(配合 meta.hidden)
 * meta: {
 *  title: 显示在侧边栏、面包屑和标签栏的文字
 *  hiddenInBreadcrumb: (false) 在面包屑中不显示
 *  hidden: (false) 配合hideChildrenInMenu使用，用于隐藏菜单时，提供递归到父菜单显示 选中菜单项
 *  hiddenHeaderContent: (false) 不显示面包屑
 *  keepAlive: (false) 缓存路由
 *  icon: (-) 菜单图标(svg)
 *  permission: 权限
 *  namespaceCode: 系统命名空间
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
        meta: { title: '主页', icon: 'icon-zhuye', keepAlive: true, hiddenHeaderContent: true, namespaceCode: 'KR_SRTP' },
        component: () => import('@/views/Home')
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
            meta: { title: '权限', namespaceCode: 'KR_TRN', permission: ['ViewPermissionPage'] },
            component: () => import('@/views/admin/permission/permission')
          },
          {
            path: '/role',
            name: 'Role',
            meta: { title: '角色', namespaceCode: 'KR_TRN', permission: ['ViewRolePage'] },
            component: () => import('@/views/admin/role/role')
          },
          {
            path: '/users',
            redirect: '/users',
            meta: { title: '用户', namespaceCode: 'KR_TRN' },
            component: RouteView,
            children: [
              {
                path: '/users',
                name: 'Users',
                meta: { title: '用户', hiddenInBreadcrumb: true, namespaceCode: 'KR_TRN', permission: ['ViewUsersPage'] },
                component: () => import('@/views/admin/users/users')
              },
              {
                path: '/edit-user',
                name: 'EditUser',
                meta: { title: '用户编辑', hiddenInBreadcrumb: true, namespaceCode: 'KR_TRN', permission: ['ViewEditUserPage'] },
                component: () => import('@/views/admin/users/edit-user')
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
