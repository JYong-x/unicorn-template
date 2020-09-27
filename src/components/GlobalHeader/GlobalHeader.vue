<template>
  <div class="global-header">
    <div class="header-left">
      <div class="logo">
        <a
          href="http://www.cqu.edu.cn/"
          target="_blank"
        ><img
          class="logo-img"
          :src="logo"
          alt="重庆大学"
        ></a>
      </div>
      <dropdown-menu class="dropdown-menu"></dropdown-menu>
      <div class="title-top">重庆大学创新实践平台管理</div>
      <div class="session"></div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <user :user="$attrs.user"></user>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User'
import DropdownMenu from '@/components/Menu/DropdownMenu'
export default {
  name: 'GlobalHeader',
  components: { DropdownMenu, User },
  props: {
  },
  data () {
    return {
      logo: require('@/assets/images/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.global-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #0052a8;
  z-index: 100;
  .dropdown-menu {
    margin-left: 40px;
  }
  .title-top {
    padding-left: 24px;
    color: #fff;
    font-size: 24px;
  }
  .header-left {
    display: flex;
    .logo {
      width: 128px;
      height: 40px;
      margin-left: 12px;
      .logo-img {
        height: 40px;
      }
    }
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
  }
  .user-info {
    padding-right: 24px;
  }
}
</style>
