import { crRouters, constantRouters } from '@/router/index'
import { cm, sms, timetable, sam, exam, tpms, tams, srtp, trpms } from '@/router/modules'

import config from '@/config'
// import { cmRouterMap } from '@/router/modules/cm'

const curSystem = config.systemCode
const systemList = [
  cm,
  sms,
  timetable,
  {
    name: '选课管理',
    code: config.systemCode,
    icon: '',
    originRouters: crRouters
  },
  sam,
  exam,
  tpms,
  tams,
  srtp,
  trpms
]

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      const nameSpacePermission = []
      route.meta.permission.map(item => {
        nameSpacePermission.push(item + '&' + route.meta.namespaceCode)
      })
      flag = nameSpacePermission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter (routerMap, permissions) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouters,
    addRouters: [],
    systemRouters: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_SYSTEMS: (state, systems) => {
      state.systems = systems
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const permissions = data.permissionSet
        // const permissions = []
        // authorities.map(item => {
        //   permissions.push(item.authority)
        // })

        let curSystemRoutes = []
        const systems = []

        systemList.forEach(system => {
          const accessedRouters = filterAsyncRouter(system.originRouters, permissions)
          if (system.code === curSystem) {
            curSystemRoutes = [...accessedRouters]
          }

          systems.push({ ...system, accessedRouters })
        })

        commit('SET_ROUTERS', curSystemRoutes)
        commit('SET_SYSTEMS', systems)
        resolve()
      })
    }
  }
}

export default permission
