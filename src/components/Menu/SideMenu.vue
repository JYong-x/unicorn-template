<template>
  <a-layout-sider
    v-model="collapsed"
    :default-collapsed="defaultCollapsed"
    :collapsed-width="0"
    :theme="theme"
    :collapsible="true"
    breakpoint="xxl"
    :width="180"
    :trigger="null"
    class="layout-side side-menu-fixed"
  >
    <span
      class="trigger"
      @click="() => collapsed = !collapsed"
    >
      <a-icon :type="collapsed ? 'right' : 'left'"></a-icon>
    </span>
    <div class="systems"></div>
    <a-menu
      class="layout-side-menu"
      mode="inline"
      :theme="theme"
      :open-keys="openKeys"
      :selected-keys="selectedKeys"
      @openChange="onOpenChange"
      @select="onSelect"
    >
      <template v-for="route of menus">
        <a-sub-menu
          v-if="!route.hideChildrenInMenu && !route.hidden && route.children && route.children.length"
          :key="route.path"
        >
          <span slot="title">
            <u-icon
              class="menu-icon"
              :type="route.meta.icon || route.iconCls || route.meta.iconCls"
            ></u-icon>
            <span>{{ route.meta.title || route.meta.pageTitle }}</span>
          </span>
          <template v-for="r of route.children">
            <a-menu-item
              v-if="!r.hidden"
              :key="r.path"
            >
              <router-link
                v-if="!r.meta.target"
                :to="r.path"
              >
                {{ r.meta.title || r.meta.pageTitle }}
              </router-link>
              <a
                v-else
                :href="r.path"
                :target="r.meta.target"
              >{{ r.meta.title || r.meta.pageTitle }}</a>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item
          v-else-if="!route.hidden"
          :key="route.path"
        >
          <router-link
            v-if="!route.meta.target"
            :to="route.path"
          >
            <u-icon
              class="menu-icon"
              :type="route.meta.icon || route.iconCls || route.meta.iconCls"
            ></u-icon>
            <span>{{ route.meta.title || route.meta.pageTitle }}</span>
          </router-link>
          <a
            v-else
            :href="route.path"
            :target="route.meta.target"
          >{{ route.meta.title || route.meta.pageTitle }}</a>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mixinMenu } from '@/utils/mixin'
// import IconSvg from '@/components/IconSvg'
export default {
  name: 'SideMenu',
  components: {
    // IconSvg
  },
  mixins: [mixinMenu],
  props: {
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapsed: false
    }
  },
  watch: {
    collapsed (collapsed) {
      this.$emit('collapse', collapsed)
    }
  }
}
</script>

<style lang="scss">
  .ant-menu-inline {
    border-color: transparent !important;
  }
  .layout-side {
    .ant-layout-sider-children {
      overflow-y: auto;
    }
    .layout-side-menu {
      padding-top: 8px;
      >.ant-menu-item {
        width: calc(100% - 16px);
        height: 32px;
        margin: 0 8px 0 8px;
        padding: 0 0 0 16px !important;
        line-height: 32px;
        border-radius: 6px;
        >a {
        }
      }
      .ant-menu-submenu-selected {
        color: #05a;
      }
      .ant-menu-submenu {
        .ant-menu-item {
          padding-left: 36px !important;
          width: calc(100% - 16px);
          height: 32px;
          line-height: 32px;
          border-radius: 6px;
          margin: 4px 8px 8px 8px;
          &:hover {
            color: #05a;
          }
        }
      }
      .ant-menu-submenu-title {
        height: 32px !important;
        line-height: 32px !important;
        &:hover {
          color: #05a;
        }
      }
      .ant-menu-item.ant-menu-item-selected {
        background-color: #e6effa;
        &::after {
          display: none;
        }
        >a {
          color: #05a;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .layout-side {
    height: calc(100% - 60px);
    min-height: calc(100% - 60px);
    z-index: 99;
  }
  .trigger {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: -10px;
    z-index: 100;
    width: 11px;
    height: 48px;
    color: rgba(0, 0, 0, .65);
    font-size: 12px;
    line-height: 48px;
    text-align: center;
    background: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
    transform: translateY(-50%);
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-top: 10px solid #e6effa;
      border-left: 10px solid transparent;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-bottom: 10px solid #e6effa;
      border-left: 10px solid transparent;
    }
    &:hover {
      color: #fff;
      background: #05a;
    }
  }
  .menu-icon {
    margin-right: 6px;
  }
.side-menu-fixed {
  position: fixed;
}
</style>
