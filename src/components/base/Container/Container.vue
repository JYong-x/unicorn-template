<!--
  /**
  * card
  * @desc card组件，包含骨架加载，spin加载
  * @author jin_yong
  * @param {String} [title]    - 标题
  * @param {Boolean} [skeleton]    - 骨架加载
  * @param {Boolean} [spinning]    - spin加载
  * @param {Boolean} [padding]     - 是否有内边，默认无

  * @example 调用示例
  *  <u-card :skeleton="loading" :spinning="spinning">
      <template slot="extra">
        <a-button>添加</a-button>
      </template>
      <div>content</div>
    </u-card>
  */
-->

<template>
  <div
    :class="{
      'u-padding-wrap': padding,
      'u-full-height': fullSize === 'height',
      'u-full-width': fullSize === 'width'}"
    class="u-container"
  >
    <a-skeleton :loading="skeleton" active>
      <a-spin :spinning="spinning">
        <div class="u-container-main">
          <div class="u-container-head">
            <div class="u-container-head-wrap">
              <div
                v-if="$slots.title"
                class="u-container-head-title"
              >
                <slot name="title"></slot>
              </div>
              <div
                v-else-if="title"
                class="u-container-head-title"
              >
                {{ title }}
              </div>
              <div
                v-if="$slots.extra"
                class="u-container-extra"
              >
                <slot name="extra"></slot>
              </div>
            </div>
          </div>
          <div class="u-container-body">
            <slot></slot>
          </div>
        </div>
      </a-spin>
    </a-skeleton>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: null
    },
    skeleton: {
      type: Boolean,
      default () { return false }
    },
    spinning: {
      type: Boolean,
      default () { return false }
    },
    padding: {
      type: Boolean,
      default: false
    },
    fullSize: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .u-container {
    &.u-padding-wrap {
      padding: 16px;
    }
    .u-container-main {
      box-sizing: border-box;
      margin: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      font-feature-settings: 'tnum';
      position: relative;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s;
      .u-container-head {
        font-weight: 500;
        background: transparent;
        border-radius: 2px 2px 0 0;
        zoom: 1;
        .u-container-head-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .u-container-head-title {
            padding: 0 0 12px;
            display: inline-block;
            flex: 1;
            min-height: 32px;
            overflow: hidden;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .u-container-extra {
            padding: 0 0 12px;
            color: rgba(0, 0, 0, 0.65);
            font-weight: normal;
            font-size: 14px;
          }
        }
      }
    }
  }
  .u-full-height {
    height: 100%;
    ::v-deep .ant-spin-nested-loading, ::v-deep .ant-spin-container, .u-container-main, .u-container-body {
      height: 100%;
    }
  }
</style>
