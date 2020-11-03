<template>
  <a-dropdown
    :trigger="['click']"
    :get-popup-container="triggerNode => triggerNode"
    placement="bottomRight"
    @visibleChange="visibleChange"
  >
    <div class="trigger-wrap">
      <a-avatar
        class="avatar"
        icon="user"
      ></a-avatar>
      <a-icon
        :type="visible ? 'caret-up' : 'caret-down'"
        class="direction-icon"
      ></a-icon>
    </div>
    <div
      slot="overlay"
      class="dropdown-container"
      @click.stop
    >
      <div
        class="content-item info"
        @click.stop
      >
        <div>
          <span class="info-item user-name text-b">{{ user.name }}</span>
          <span class="info-item user-code">{{ user.code }}</span>
        </div>
        <div class="info-item user-department">{{ user.deptName }}</div>
      </div>
      <div class="content-item btn-wrap">
        <a-button
          :disabled="logoutLoading"
          :loading="logoutLoading"
          class="btn"
          type="link"
          block
          @click="logout"
        >注销</a-button>
      </div>
    </div>
  </a-dropdown>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      logoutLoading: false
    }
  },
  methods: {
    visibleChange (visible) {
      this.visible = visible
    },
    logout () {
      this.logoutLoading = true
      this.$store.dispatch('Logout').then(() => {
        console.log('退出登录')
      }).finally(() => {
        this.logoutLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .trigger-wrap {
    cursor: pointer;
    .avatar {
      background-color: transparent;
      border: 2px solid #fff;
    }
    .direction-icon {
      padding-left: 8px;
      color: #fff;
    }
  }
  .dropdown-container {
    margin-top: -4px;
    background: #fff;
    border: 1px solid #D9D9D9;
    border-radius: 4px;

    /* box-shadow: 0 2px 8px rgba(0,0,0,.15); */
    .content-item {
      padding: 8px 16px;
      .user-name {
        font-size: 16px;
        padding-right: 8px;
      }
      .user-code, .user-department {
        font-size: 12px;
        color: #8c8c8c;
      }
      &:not(:last-child) {
        border-bottom: 1px dashed #d9d9d9;
      }
      &.info {
        line-height: 32px;
        cursor: default;
      }
      &.btn-wrap {
        padding: 0;
        transition: all .3s;
        .btn {
          border-radius: 0;
          color: rgba(0, 0, 0, .65);
          text-align: left
        }
        &:hover {
          /* color: #33A3FF; */
          background: #E6EFFA;
        }
      }
    }
    .content-item:not(:first-child):not(.btn-wrap) {
      padding-top: 8px;
    }
  }
</style>
