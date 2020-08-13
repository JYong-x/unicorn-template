const { authHost, authUri, userApi, commonApi, devUrl } = require('./env.' +
  process.env.NODE_ENV)

module.exports = {
  baseUrl: '/cr/',
  publicPath: '/cr/',
  baseApi: '//10.254.9.31:8759',

  plaFormApi: 'http://10.254.9.31:9090',
  userApi: userApi,
  commonApi: commonApi,
  baseOAuthUrl: authHost,
  // 请求授权地址
  userAuthorizationUri: `${authHost}/authserver/oauth/authorize`,
  // accessToken请求地址
  accessTokenUri: `http://${authUri}/oauth/token`,
  // refreshToken请求地址
  refreshTokenUri: `http://${authUri}/oauth/token`,
  // 用户信息请求地址
  userInfoUri: `${authUri}/user-me`,
  // 登出请求地址
  logoutUri: `${authHost}/authserver/logout`,
  // 清除token
  removeTokenUri: `${authUri}/remove_token`,
  // 项目地址
  localuri: devUrl,
  redirect_uri: `http://${devUrl}/token-index`,

  // 客户端相关标识，请从认证服务器申请
  clientId: 'cr-isse',
  client_secret: 'app-a-1234',
  // 申请的权限范围
  scope: 'all',
  // 可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state: '',
  // 一些固定的请求参数
  response_type: 'code',
  grant_type: 'authorization_code',
  code: ''
}
