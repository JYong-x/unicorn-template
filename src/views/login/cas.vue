<template>
  <div class="loading-wrap">
    <a-spin size="large"></a-spin>
  </div>
</template>

<script>
import { httpConfig } from '@/config'
const qs = require('querystring')
export default {
  name: 'CAS',
  data () {
    return {}
  },
  mounted () {
    this.authLogin()
  },
  methods: {
    authLogin () {
      let authorUrl = httpConfig.userAuthorizationUri
      authorUrl =
          authorUrl +
          ('?' +
            qs.stringify({
              client_id: httpConfig.clientId,
              response_type: httpConfig.response_type,
              scope: httpConfig.scope,
              state: httpConfig.state,
              redirect_uri: httpConfig.redirect_uri
            }))
      window.location.href = authorUrl
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ecf0f5;
    z-index: 9999;
  }
</style>
