<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <template v-if="!item.meta.hiddenInBreadcrumb">
        <router-link
          v-if="item.name !== name && index !== 1"
          :to="{ path: item.path === '' ? '/' : item.path }"
        >{{ item.meta.title }}</router-link>
        <span v-else>{{ item.meta.title }}</span>
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      breadList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []

      this.name = this.$route.name

      this.$route.matched.forEach(item => {
        if (item.name !== 'Home') {
          this.breadList.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
