<template>
  <div
    class="menu-wrap"
    :class="{'menu-visible': visible}"
    @mouseenter="menuEnter"
    @mouseleave="menuLeave"
  >
    <div class="menu-btn">
      <a-icon
        type="menu"
        class="menu-icon"
      ></a-icon>
    </div>
    <div class="menu-container">
      <transition name="menu">
        <div
          v-show="visible"
          class="menu-container-wrap"
        >
          <div class="menu-level-system">
            <div
              v-for="(system, index) of systems"
              :key="index"
              class="menu-item"
              :class="{'active': curSystem === system.code}"
              @click="handleSystemClick(system.code)"
            >
              <div class="item-content">
                <u-icon class="menu-icon" :type="system.icon"></u-icon>
                <div class="menu-text">
                  {{ system.name }}
                </div>
              </div>
              <div class="item-action-icon">
                <a-icon type="right"></a-icon>
              </div>
            </div>
          </div>
          <div class="menu-list-container">
            <div
              v-for="x of maxMenuX"
              :key="x"
              class="menu-col"
            >
              <a-menu
                class="layout-dropdown-menu"
                mode="inline"
                theme="light"
                :open-keys="openKeys"
                :selected-keys="selectedKeys"
                @openChange="onOpenChange"
                @click="onMenuClick"
              >
                <template v-for="route of menuCol(x)">
                  <a-sub-menu
                    v-if="!route.hideChildrenInMenu && !route.meta.hidden && route.children && route.children.length"
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
                        v-if="!r.meta.hidden"
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
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mixinMenu } from '@/utils/mixin'
// import IconSvg from '@/components/IconSvg'
// import MenuOld from '@/components/MenuOld'
export default {
  name: 'DropdownMenu',
  components: {
    // IconSvg
  },
  mixins: [mixinMenu],
  props: {
  },
  data () {
    return {
      visible: false,
      leaveTimer: null,
      enterTimer: null,
      fixOpenKeys: true,
      maxMenuX: 4
    }
  },
  computed: {
    menuCol () {
      return function (x) {
        return this.menus.filter(ele => (ele.x || ele.coordinateX) === x)
      }
    }
  },
  mounted () {
    this.setOpenKeys()
  },
  methods: {
    setOpenKeys () {
      this.menus.forEach(item => {
        this.openKeys.push(item.path)
      })
    },
    menuEnter () {
      clearTimeout(this.leaveTimer)
      this.enterTimer = setTimeout(() => {
        this.visible = true
      }, 300)
    },
    menuLeave () {
      clearTimeout(this.enterTimer)
      clearTimeout(this.leaveTimer)
      this.leaveTimer = setTimeout(() => {
        this.visible = false
      }, 300)
    },

    onMenuClick (obj) {
      this.selectedKeys = [obj.key]
      this.visible = false
    },

    handleSystemClick (system) {
      this.$store.dispatch('setCurSystem', system)
    }
  }
}
</script>

<style lang="scss">
  .ant-menu-inline {
    border-color: transparent !important;
  }
  .menu-list-container {
    display: flex;
    flex-wrap: nowrap;
  }
  .menu-col {
    flex: 1;
    .layout-dropdown-menu {
      display: flex;
      flex-direction: column;
      >li {
        /*width: 20% !important;*/
        border-radius: 4px;
        margin: 0 !important;
        color: #262626;
        font-weight: 600;
        >a {
          color: #262626;
        }
      }
      .ant-menu-submenu {
        .ant-menu-item {
          padding-left: 42px !important;
          width: calc(100% - 16px);
          height: 32px;
          line-height: 32px;
          border-radius: 4px;
          margin: 0 8px 16px 8px;
          font-weight: 500;
          &:hover {
            color: #05a;
          }
        }
      }
      .ant-menu-submenu-selected {
        color: #05a;
      }
      .ant-menu-submenu-title {
        display: inline-block;
        width: auto;
        padding-right: 48px;
        margin: 0;
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
      .menu-icon {
        margin-right: 8px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .menu-wrap {
    position: relative;
    width: 40px;
    height: 100%;
    color: #fff;
    z-index: 70;
    cursor: default;
    &.menu-visible {
      background: transparent;
    }
    .menu-btn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .menu-icon {
        font-size: 16px;
      }
      .menu-text {
        padding-left: 4px;
        font-size: 17px;
      }
    }
    .menu-container {
      position: fixed;
      left: 0;
      top: 60px;
      width: 100%;
      overflow: hidden;
    }
    .menu-container-wrap {
      display: flex;
      left: 0;
      width: 100vw;
      min-height: 64px;
      max-height: 720px;
      overflow-y: auto;
      top: 56px;
      margin-bottom: 8px;
      background: #fff;
      color: rgba(0, 0, 0, 0.85);
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
      z-index: 10;
      font-size: 16px;
      .menu-level-system {
        width: 20%;
        padding: 12px;
        background: #e6effa;
        border-radius: 4px;
        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
          line-height: 32px;
          margin: 0 0 8px 0;
          padding: 0 16px 0 32px;
          color: #0052a8;
          border-radius: 4px;
          cursor: pointer;
          &.active {
            background: #0052a8;
            color: #fff;
          }
          &:hover {
            background-color: #0052a8;
            color: #fff;
          }
          .item-content {
            display: flex;
            align-items: center;
            .menu-icon {
              margin-right: 8px;
            }
            .menu-text {
              font-size: 14px;
              font-weight: 500;
            }
          }
          .item-action-icon{
            font-size: 14px;
          }
        }
        &.menu-level-top {
          .menu-item {
            background: #e8e8e8;
          }
        }
      }
      .menu-list-container {
        padding: 12px;
        width: 80%;
        height: 100%;
      }
    }
    .menu-enter-active,
    .menu-leave-active {
      transition: all 0.3s;
    }
    .menu-enter,
    .menu-leave-to {
      transform: translateY(-100%);
    }
  }
</style>
