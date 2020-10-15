/**
 * api接口的统一出口
 */
import Vue from 'vue'
// xx模块接口
// import login from './login'
const modulesFiles = require.context('../api', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// 导出接口

Vue.prototype.$api = modules
