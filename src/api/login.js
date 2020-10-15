import axios from '@/utils/interceptor'
import config from '@/config'
import { getToken } from '@/utils/auth'

// 模块地址
// const moduleUrl = '/login'
const login = {
  login: (code) => {
    return axios({
      url: `${config.accessTokenUri}`,
      method: 'post',
      auth: {
        username: config.clientId,
        password: config.client_secret
      },
      data: {
        client_id: config.clientId,
        client_secret: config.client_secret,
        code: code,
        redirect_uri: config.redirect_uri,
        grant_type: config.grant_type
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
      url: `${config.userInfoUri}`,
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
        url: `${config.logoutUri}`,
        method: 'get'
      }).then(res => {
        if (res && res.status === 200) {
          const token = getToken()
          axios({
            url: `${config.removeTokenUri}?access_token=${token}`,
            method: 'get',
            params: {
              redirect_uri: config.useCas ? config.redirect_cas_uri : config.redirect_uri
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
