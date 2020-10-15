import request from '@/utils/request'
import config from '@/config'

const { resourceApi } = config
const finder = {
  // 部门finder
  departmentFinder () {
    const url = `/department/list`
    return request.get(url, {}, resourceApi)
  }
}

export default finder
