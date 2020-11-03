import axios from '@/utils/interceptor'
import { httpConfig } from '@/config'
import { getToken } from '@/utils/auth'

// 模块地址
// const moduleUrl = '/login'
const login = {
  login: (code) => {
    return axios({
      url: `${httpConfig.accessTokenUri}`,
      method: 'post',
      auth: {
        username: httpConfig.clientId,
        password: httpConfig.client_secret
      },
      data: {
        client_id: httpConfig.clientId,
        client_secret: httpConfig.client_secret,
        code: code,
        redirect_uri: httpConfig.redirect_uri,
        grant_type: httpConfig.grant_type
      },
      transformRequest: [
        function (data) {
          let ret = ''
          for (const it in data) {
            if (data[it] === null) {
              continue
            }
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getUserInfo: () => {
    const token = getToken()
    return axios({
      url: `${httpConfig.userInfoUri}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  },
  logout: () => {
    return new Promise(resolve => {
      axios({
        url: `${httpConfig.logoutUri}`,
        method: 'get'
      }).then(res => {
        if (res && res.status === 200) {
          const token = getToken()
          axios({
            url: `${httpConfig.removeTokenUri}?access_token=${token}`,
            method: 'get',
            params: {
              redirect_uri: httpConfig.useCas ? httpConfig.redirect_cas_uri : httpConfig.redirect_uri
            }
          }).then(() => {
            resolve()
          })
        }
      })
    })
  }
}

export default login
