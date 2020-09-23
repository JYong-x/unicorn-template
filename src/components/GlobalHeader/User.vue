<template>
  <a-dropdown
    :trigger="['click']"
    placement="bottomRight"
    @visibleChange="visibleChange"
  >
    <div class="trigger-wrap">
      <a-avatar class="avatar" icon="user" />
      <a-icon class="direction-icon" :type="visible ? 'caret-up' : 'caret-down'" />
    </div>
    <div slot="overlay" class="dropdown-container">
      <div class="content-item info">
        <div>
          <span class="info-item user-name text-b">{{ user.name }}</span>
          <span class="info-item user-code">{{ user.code }}</span>
        </div>
        <div class="info-item user-department">{{ user.deptName }}</div>
      </div>
      <div class="content-item btn" @click="logout">注销</div>
    </div>
  </a-dropdown>
</template>

<script>
import config from '@/config'
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
      visible: false
    }
  },
  methods: {
    visibleChange (visible) {
      this.visible = visible
    },
    logout () {
      this.visible = false
      this.$store.dispatch('Logout').then(() => {
        window.location.href = `http://${config.localuri}`
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
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
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
      }
      &.btn {
        cursor: pointer;
        transition: all .3s;
        &:hover {
          /*background: #e6f7ff;*/
          background: #f5f5f5;
        }
      }
    }
    .content-item:not(:first-child) {
      padding-top: 8px;
    }
  }
</style>
