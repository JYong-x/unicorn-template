import Vue from 'vue'
import IconFont from './IconFont'

const prefix = 'u'

const componentConfigs = []

const componentFiles = require.context('../base', true, /\.vue$/)
componentFiles.keys().forEach(filePath => {
  const value = componentFiles(filePath)
  const componentName = filePath.split('/').pop().replace(/\.\w+$/, '').toLowerCase()
  componentConfigs.push({
    name: prefix + '-' + componentName,
    value: value.default || value
  })
})

const index = {
  install (Vue) {
    Vue.component(prefix + '-' + 'icon', IconFont)
    componentConfigs.forEach(item => {
      Vue.component(item.name, item.value)
    })
  }
}

Vue.use(index)
