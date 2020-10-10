import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

import '@/styles/index.scss'
import '@/plugins/antd'
import '@/components/base'
import '@/utils/request'
import '@/api'
import { Dialog } from '@/components'

import VueStorage from 'vue-ls'
const storageOptions = {
  namespace: 'u__',
  name: 'storage',
  storage: 'local'
}

Vue.config.productionTip = false

Vue.use(VueStorage, storageOptions)
Vue.use(Dialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
