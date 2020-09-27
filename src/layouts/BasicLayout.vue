<template>
  <a-layout style="min-height: 100%;">
    <!-- layout header -->
    <a-layout-header class="layout-header">
      <global-header :user="user" />
    </a-layout-header>

    <!-- layout content -->
    <a-layout>
      <side-menu
        theme="light"
        :collapsed="collapsed"
        @collapse="onCollapse"
      ></side-menu>
      <a-layout-content :style="{paddingLeft: contentPaddingLeft}">
        <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageTitle"></page-header>
        <div class="page">
          <div class="page-container">
            <div
              v-if="!$route.meta.hiddenTitleInPage"
              class="page-head"
            >{{ pageTitle }}</div>
            <div class="page-body">
              <route-view />
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>

<script>
import { mapState } from 'vuex'

import RouteView from './RouteView'
import GlobalHeader from '@/components/GlobalHeader'
import PageHeader from '@/components/PageHeader'
import SideMenu from '@/components/Menu/SideMenu'

export default {
  name: 'BasicLayout',
  components: {
    SideMenu,
    PageHeader,
    RouteView,
    GlobalHeader
  },
  data () {
    return {
      // mixinMenu 中处理菜单数据
      // systems: {},
      pageTitle: null,
      collapsed: false
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      user: state => state.user.info
    }),
    contentPaddingLeft () {
      if (this.collapsed) {
        return '0'
      }
      return '180px'
    }
  },
  watch: {
    $route () {
      this.getPageMeta()
    }
  },
  created () {
  },
  mounted () {
    this.tabs = this.directTabs
    this.getPageMeta()
  },
  updated () {
    this.getPageMeta()
  },
  methods: {
    getPageMeta () {
      this.pageTitle = this.$route.meta.title
    },
    onCollapse (collapsed) {
      this.collapsed = collapsed
      // this.$store.dispatch('setSidebar', collapsed)
    }
  }
}
</script>
<style lang="scss">
.ant-layout {
  background: #e6effa !important;
  .layout-header {
    width: 100%;
    height: 60px;
    padding: 0;
    line-height:60px;
    .global-header {
      position: fixed;
    }
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}

.page {
  flex: 1;
  padding: 0 12px 12px;
  height: 0;
  .page-container {
    position: relative;
    min-height: 100%;
    padding: 0 24px 24px;
    background: #fff;
    border-radius: 6px;
    .page-head {
      height: 70px;
      padding: 24px 0 16px;
      margin-right: 30%;
      font-size: 20px;
      font-weight: 600;
      color: rgba(0, 0, 0, .85);
    }
    .page-body {
      flex: 1;
    }
  }
}

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
