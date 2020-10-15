import store from '@/store'

// 自适应高度元素动画
export function transitionAutoHeight (ele, duration = 300) {
  const originHeight = ele.offsetHeight
  ele.style.transition = 'none'
  setTimeout(() => {
    ele.style.height = 'auto'
    const targetHeight = window.getComputedStyle(ele).height
    ele.style.transition = `height ${duration}ms`
    ele.style.height = originHeight + 'px'
    ele.offsetWidth // eslint-disable-lint
    ele.style.height = targetHeight
    setTimeout(() => {
      ele.style.height = 'auto'
    }, duration)
  })
}

// 列表过滤
export function filterList (params, list) {
  if (!Array.isArray(list)) return
  if (!params || !Object.keys(params).length) {
    return [...list]
  }
  return list.filter(item => {
    let flag = true
    for (const key in params) {
      if (Array.isArray(params[key])) {
        flag = params[key].includes(item[key])
      } else {
        if (!item[key] || item[key].indexOf(params[key]) === -1) {
          flag = false
          break
        }
      }
    }
    return flag
  })
}

// 判断是否有权限
export const hasPermission = (permission) => {
  const permTypes = store.state.user.info.permissionSet
  if (permTypes) {
    return permTypes.includes(permission)
  }
}

export function deepClone (obj) {
  var o
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null
    } else {
      if (obj instanceof Array) {
        o = []
        for (var i = 0; i < obj.length; i++) {
          o.push(deepClone(obj[i]))
        }
      } else {
        o = {}
        for (var j in obj) {
          o[j] = deepClone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}
