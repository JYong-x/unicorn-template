const getters = {
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,

  curSystem: state => state.app.curSystem,

  finder: state => {
    return function (finderName) {
      return state.finders[finderName]
    }
  }
}

export default getters
