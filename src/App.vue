<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
export default {
  data () {
    return {
      zh_CN
    }
  },
  created () {
    try {
      document.body.removeChild(document.getElementById('app-loading'))
      // setTimeout(function() {
      //   document.getElementById('appConfig').style.display = 'block'
      // }, 500)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
    .content-occupy-screen {
      padding: 16px;
      background: #fff;
      margin-bottom: 24px;
    }
  }
  .ant-select-dropdown{
    .ant-select-dropdown-menu{
      li{
        &:first-child{
          min-height: 32px;
        }
      }
    }
  }
</style>
