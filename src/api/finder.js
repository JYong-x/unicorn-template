import request from '@/utils/request'
import { httpConfig } from '@/config'

const { resourceApi } = httpConfig
const finder = {
  // 部门finder
  department () {
    const url = `/department/list`
    return request.get(url, {}, resourceApi)
  },

  // 发布状态
  releaseStatus () {
    const url = `/optionFinder/release-status`
    return request.get(url)
  }
}

export default finder
