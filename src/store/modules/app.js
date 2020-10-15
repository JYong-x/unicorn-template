// 应用相关的配置（用户定义的配置，默认配置）
import config from '@/config'

const app = {
  state: {
    sidebarCollapsed: true,
    curSystem: config.systemCode
  },
  mutations: {
    SIDEBAR_COLLAPSED: (state, collapsed) => {
      state.sidebarCollapsed = collapsed
    },
    CUR_SYSTEM: (state, systemName) => {
      state.curSystem = systemName
    }
  },
  actions: {
    setSidebar ({ commit }, collapsed) {
      commit('SIDEBAR_COLLAPSED', collapsed)
    },
    setCurSystem ({ commit }, systemName) {
      commit('CUR_SYSTEM', systemName)
    }
  }
}

export default app
