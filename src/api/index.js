/**
 * api接口的统一出口
 */
import Vue from 'vue'
// xx模块接口
import expert from './expert'
import teacher from './teacher'
import common from './common'
import video from './video'

// 导出接口
export const api = {
  expert,
  teacher,
  common,
  video
}

Vue.prototype.$api = api
