import finderApi from '@/api/finder'
import { Message } from 'ant-design-vue'

const useFinderApi = (finderName, params = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof finderApi[finderName] === 'function') {
      finderApi[finderName](params).then(res => {
        resolve(res)
      })
    } else {
      Message.error(`无 [${finderName}] finder方法，请在api/finder.js中添加`)
      reject()
    }
  })
}

const finders = {
  state: {},
  mutations: {
    SET_FINDER: (state, { finderName, data }) => {
      state[finderName] = data
    }
  },

  actions: {
    /**
     * 设置finder
     * @param finderName
     * @param data {Array} 下拉框列表
     * @constructor
     */
    SetFinder ({ commit }, { finderName, data }) {
      commit('SET_FINDER', { finderName, data })
    },

    /**
     * 获取finder
     * @param finderName
     * @param data {Array} 下拉框列表
     * @param fn {Function} 获取finder的方法需要返回promise对象，若没有则自动根据finderNamed调用api/finder.js中的方法，
     * @param params {Object} 对应finder方法的接口参数
     * @constructor
     */
    GetFinder ({ commit }, { finderName, data, fn, params, multi }) {
      return new Promise(resolve => {
        const finderPromise = new Promise(resolve => {
          // 没有data时自动调用finder接口
          if (!data) {
            if (fn && fn instanceof Function) {
              fn().then(res => {
                resolve(res.data)
              })
            } else {
              useFinderApi(finderName).then(res => {
                resolve(res.data)
              })
            }
          } else {
            resolve(data)
          }
        })

        finderPromise.then(finderData => {
          let result = finderData
          if (multi) {
            result = {
              finderName,
              data: finderData
            }
          }
          const props = {
            finderName,
            data: finderData
          }
          commit('SET_FINDER', props)
          resolve(result)
        })
      })
    },

    /**
     * 获取多个finder
     * @param finderNames {Array} finder名或者单个GetFinder的参数对象
     * @return {Object} finderName的对象
     */
    GetFinders ({ dispatch, commit }, finderNames) {
      return new Promise(resolve => {
        const findersPromise = []
        console.log(dispatch)
        finderNames.map(item => {
          if (typeof item === 'string') {
            findersPromise.push(dispatch('GetFinder', { finderName: item, multi: true }))
          } else if (item instanceof Object) {
            item.multi = true
            findersPromise.push(dispatch('GetFinder', item))
          }
        })

        return Promise.all(findersPromise).then(finders => {
          const result = {}
          finders.map(finder => {
            result[finder.finderName] = finder.data
          })
          resolve(result)
        })
      })
    }
  }
}

export default finders
