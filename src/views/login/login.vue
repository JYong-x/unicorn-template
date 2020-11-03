<template>
  <div class="loading-wrap">
    <a-spin size="large" />
  </div>
</template>

<script>
import { httpConfig } from '@/config'
const qs = require('querystring')

export default {
  name: 'Login',
  data () {
    return {}
  },
  mounted () {
    const { redirect } = this.$route.query
    sessionStorage.setItem('redirect', redirect)
    this.login()
  },
  methods: {
    login () {
      httpConfig.useCas ? this.casLogin() : this.authLogin()
    },
    casLogin () {
      let authorUrl = httpConfig.casUri
      authorUrl = authorUrl + ('?' + qs.stringify({
        redirect_uri: httpConfig.redirect_cas_uri
      }))
      window.location.href = authorUrl
    },
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
