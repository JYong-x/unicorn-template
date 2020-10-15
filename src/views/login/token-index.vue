<template>
  <div class="loading-wrap">
    <a-spin size="large" />
  </div>
</template>

<script>

export default {
  name: 'TokenIndex',
  data () {
    return {
      state: '',
      code: ''
    }
  },
  mounted () {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    this.login()
  },
  methods: {
    login () {
      if (!this.code) {
        this.$message.error('获取识别码失败')
        return
      }
      this.$store.dispatch('Login', this.code).then(() => {
        const redirect = localStorage.getItem('redirect')
        if (redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.push('/')
        }
      }).catch(err => {
        this.$message.error(err.data && err.data.error)
      })
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
