// 用户信息相关模块（登录信息，个人信息等）
import Vue from 'vue'
import { httpConfig } from '@/config'
import login from '@/api/login'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'

import { tokenUtils } from '@/utils/auth'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, code) {
      return new Promise((resolve, reject) => {
        login.login(code).then(res => {
          const accessToken = res.data.access_token
          tokenUtils.savetoken(res.data)
          commit('SET_TOKEN', accessToken)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        login.getUserInfo().then(res => {
          const result = res.data

          if (result.roleNames && result.roleNames.length > 0) {
            // const role = result.roleNames
            // role.permissions = result.permissionSet
            // role.permissions.map(per => {
            //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //     const action = per.actionEntitySet.map(action => { return action.action })
            //     per.actionList = action
            //   }
            // })
            // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.roleNames)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise(resolve => {
        if (httpConfig.useCas) {
          login.logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            Vue.storage.remove(ACCESS_TOKEN)
            Vue.storage.remove(REFRESH_TOKEN)
            window.location.href = `${httpConfig.casLogOutUri}?redirect_uri=${httpConfig.redirect_cas_uri}`
          })
        } else {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.storage.remove(ACCESS_TOKEN)
          Vue.storage.remove(REFRESH_TOKEN)
          window.location.href = `${httpConfig.authHost}/authserver/logout?access_token=${state.token}&returnTo=http://${httpConfig.localuri}`
        }
      })
    }

  }
}

export default user

