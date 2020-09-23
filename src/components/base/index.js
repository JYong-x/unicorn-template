import Vue from 'vue'
import IconFont from './IconFont'

const index = {
  install (Vue) {
    Vue.component('u-icon', IconFont)
  }
}

Vue.use(index)
// export default index
