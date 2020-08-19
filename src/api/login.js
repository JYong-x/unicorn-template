// import storage from 'store'
// // import axios from '@/request/interceptor'
// import config from '@/config'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// 模块地址
// const moduleUrl = '/login'

export function getToken(code) {
  // return axios({
  //   url: `${config.accessTokenUri}`,
  //   method: 'post',
  //   auth: {
  //     username: config.clientId,
  //     password: config.client_secret
  //   },
  //   data: {
  //     client_id: config.clientId,
  //     client_secret: config.client_secret,
  //     code: code,
  //     redirect_uri: config.redirect_uri,
  //     grant_type: config.grant_type
  //   },
  //   transformRequest: [
  //     function(data) {
  //       let ret = ''
  //       for (const it in data) {
  //         if (data[it] === null) {
  //           continue
  //         }
  //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //       }
  //       return ret
  //     }
  //   ]
  // })
}
export function getInfo() {
  // const accessToken = storage.get(ACCESS_TOKEN)
  // return axios({
  //   url: `${config.userInfoUri}`,
  //   method: 'get',
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }
  // })
}
export function logout() {
  // return new Promise(resolve => {
  //   axios({
  //     url: `${config.logoutUri}`,
  //     method: 'get'
  //   }).then(res => {
  //     if (res && res.status === 200) {
  //       const accessToken = storage.get(ACCESS_TOKEN)
  //       axios({
  //         url: `${config.removeTokenUri}?access_token=${accessToken}`,
  //         method: 'get'
  //       }).then(() => {
  //         resolve()
  //       })
  //     }
  //   })
  // })
}
