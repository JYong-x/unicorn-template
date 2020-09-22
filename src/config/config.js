const {
  VUE_APP_DEV_URL: devUrl,
  VUE_APP_AUTH_HOST: authHost,
  VUE_APP_AUTH_URI: authUri,
  VUE_APP_USER_API: userApi,
  VUE_APP_CLIENT_ID: clientId,
  VUE_APP_PLA_FORM_API: plaFormApi,
  VUE_APP_USE_CAS: useCas,
  VUE_APP_COMMON_API: commonApi,
  VUE_APP_ENROLL_API: baseUrl
} = process.env

module.exports = {
  // 当前系统主要的api基础地址
  baseUrl,
  // 其它api基础地址
  commonApi,

  userApi,
  authHost,
  plaFormApi,
  useCas,
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
  clientId: clientId,
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
