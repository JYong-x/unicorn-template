import Vue from 'vue'
import { login } from '@/api/login'
import { message } from 'ant-design-vue'
import router from '../router'
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRE_TIME, TOKEN } from '@/store/mutation-types'

export function getToken () {
  return Vue.storage.get(ACCESS_TOKEN)
}

export function setToken (token) {
  Vue.storage.set(ACCESS_TOKEN, token)
}

export function setRefreshToken (refreshToken) {
  Vue.storage.set(REFRESH_TOKEN, refreshToken)
}

export function removeToken () {
  Vue.storage.remove(ACCESS_TOKEN)
}

export function removeAuth () {
  Vue.storage.remove(ACCESS_TOKEN)
  Vue.storage.remove(REFRESH_TOKEN)
}

export const tokenUtils = {
  tokenPending: false,
  savetoken: function (token) {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn
    } = token

    const expire = parseInt(expiresIn) * 1000
    Vue.storage.set(TOKEN_EXPIRE_TIME, new Date().getTime() + expire)
    Vue.storage.set(REFRESH_TOKEN, refreshToken)
    Vue.storage.set(TOKEN, accessToken) // 不设过期时间的token,登出时需要
    Vue.storage.set(ACCESS_TOKEN, accessToken, expire)

    document.removeEventListener('mousemove', tokenUtils.refreshToken)
  },
  deleteToken: function () {
    Vue.storage.remove(ACCESS_TOKEN)
    Vue.storage.remove(REFRESH_TOKEN)
    Vue.storage.remove(TOKEN)
  },
  loadToken: function () {
    const tokenInfo = {}
    tokenInfo.access_token = Vue.storage.get(ACCESS_TOKEN)
    tokenInfo.refresh_token = Vue.storage.get(REFRESH_TOKEN)
    return tokenInfo
  },
  refreshToken: function () {
    if (tokenUtils.tokenPending) return
    tokenUtils.tokenPending = true
    login.refreshToken(tokenUtils.loadToken().refresh_token).then(res => {
      const token = res.data
      tokenUtils.savetoken((token))
    }).catch(err => {
      router.replace({ name: 'login' })
      return Promise.reject(err)
    }).finally(() => {
      tokenUtils.tokenPending = false
    })
  },
  // 每分钟检测token是否过期
  listenExpires: function () {
    setInterval(() => {
      const accessToken = Vue.storage.get(ACCESS_TOKEN)
      if (accessToken) {
        const expiresTime = Vue.storage.get(TOKEN_EXPIRE_TIME)
        const now = new Date().getTime()
        // 当前时间与token过期时间间隔少于5分钟时刷新token
        if (expiresTime - now < 5 * 60 * 1000) {
          document.addEventListener('mousemove', tokenUtils.refreshToken)
        }
      } else {
        message.warning('登录已失效，即将跳转...')
        setTimeout(() => {
          router.replace('/logout')
        }, 3000)
      }
    }, 60 * 1000)
  },
  isExpired: function () {
    const expiresTime = Vue.storage.get(TOKEN_EXPIRE_TIME)
    const now = new Date().getTime()
    // 距离token过期时间少于5分钟时需要刷新token
    if (expiresTime - now < 5 * 60 * 1000) {
      return true
    }
  }
}
