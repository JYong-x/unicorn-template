<template>
  <div class="loading-wrap">
    <a-spin size="large" />
  </div>
</template>

<script>
import config from '@/config'
const qs = require('querystring')

export default {
  name: 'Login',
  data () {
    return {}
  },
  mounted () {
    const { redirect } = this.$route.query
    localStorage.setItem('redirect', redirect)
    this.login()
  },
  methods: {
    login () {
      config.useCas ? this.casLogin() : this.authLogin()
    },
    casLogin () {
      let authorUrl = config.casUri
      authorUrl = authorUrl + ('?' + qs.stringify({
        redirect_uri: config.redirect_cas_uri
      }))
      window.location.href = authorUrl
    },
    authLogin () {
      let authorUrl = config.userAuthorizationUri
      authorUrl =
          authorUrl +
          ('?' +
            qs.stringify({
              client_id: config.clientId,
              response_type: config.response_type,
              scope: config.scope,
              state: config.state,
              redirect_uri: config.redirect_uri
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
