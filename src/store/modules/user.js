// 用户信息相关模块（登录信息，个人信息等）
import Vue from 'vue'
import config from '@/config'
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
          if (res && res.status === 200) {
            const accessToken = res.data.access_token
            tokenUtils.savetoken(res.data)
            commit('SET_TOKEN', accessToken)
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        login.getUserInfo().then(response => {
          const result = response.data

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

          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      if (config.useCas) {
        login.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.storage.remove(ACCESS_TOKEN)
          Vue.storage.remove(REFRESH_TOKEN)
          window.location.href = `${config.casLogOutUri}?redirect_uri=${config.redirect_cas_uri}`
        })
      } else {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.storage.remove(ACCESS_TOKEN)
        Vue.storage.remove(REFRESH_TOKEN)
        window.location.href = `${config.authHost}/authserver/logout?access_token=${state.token}&returnTo=http://${config.localuri}`
      }
      // return new Promise((resolve) => {
      //   logout(state.token).then(() => {
      //     resolve()
      //   }).catch(() => {
      //     resolve()
      //   }).finally(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     Vue.storage.remove(ACCESS_TOKEN)
      //     Vue.storage.remove(REFRESH_TOKEN)
      //     window.location.href = `${config.baseOAuthUrl}/authserver/logout?access_token=${state.token}&returnTo=http://${config.localuri}`
      //   })
      // })
    }

  }
}

export default user

