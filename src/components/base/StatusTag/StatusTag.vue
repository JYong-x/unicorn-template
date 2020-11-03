<template>
  <span
    class="u-tag"
    :class="[setClass, size, defaultStatus]"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      {{ text }}
    </template>
  </span>
</template>

<script>
export default {
  name: 'StatusTag',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'block' // block | text
    },
    size: {
      type: String,
      default: 'middle'
    },
    defaultStatus: {
      type: String,
      default: 'u-tag-default-status'
    }
  },
  computed: {
    setClass: function () {
      return {
        'u-tag-block': this.type === 'block',
        'u-tag-text': this.type === 'text',
        'u-tag-draft': this.text === '草稿' || this.text === '未发布',
        'u-tag-submitted': this.text === '已提交',
        'u-tag-pass': this.text === '通过' || this.text === 'PASS' || this.text === '已发布' || this.text === '重点推荐',
        'u-tag-auditing': this.text === '审核中',
        'u-tag-audit-academy': this.text === '待学院审核',
        'u-tag--audit-school': this.text === '待学校审核' || this.text === '一般' || this.text === '推荐',
        'u-tag-error': this.text === '不推荐' || this.text === '不通过' || this.text === 'NOT_PASS'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .u-tag {
    display: inline-block;
    &.u-tag-block {
      white-space: nowrap;
      border-radius: 4px;
      transition: all .3s cubic-bezier(.78, .14, .15, .86);
      &.small {
        padding: 0 7px;
        line-height: 20px;
      }
      &.middle {
        padding: 0 8px;
        line-height: 24px;
      }
      &.large {
        padding: 0 12px;
        line-height: 32px;
      }
      &.u-tag-default-status {
        background: #e8e8e8;
      }

      /* 草稿 */
      &.u-tag-draft {
        background: #8c8c8c;
        color: #fff;
      }

      /* 提交 */
      &.u-tag-submitted {
        background: #40a9ff;
        color: #fff;
      }

      /* 审核中 */
      &.u-tag-auditing {
        background: #5ad8a6;
        color: #fff;
      }

      /* 学院审核 */
      &.u-tag-audit-academy {
        background: #2db7f5;
        color: #fff;
      }

      /* 学校审核 */
      &.u-tag--audit-school {
        background: #108ee9;
        color: #fff;
      }

      /* 通过 */
      &.u-tag-pass {
        background: #52c41a;
        color: #fff;
      }

      /* 不通过， 不推荐 */
      &.u-tag-error {
        background: #f5222d;
        color: #fff;
      }
    }
    &.u-tag-text {
      &::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 2px 2px 0;
        border-radius: 50%;
      }
      &.u-tag-default-status {
        &::before {
          background: #e8e8e8;
        }
      }

      /* 草稿 */
      &.u-tag-draft {
        &::before {
          background: #8c8c8c
        }
      }

      /* 提交 */
      &.u-tag-submitted {
        &::before {
          background: #40a9ff
        }
      }

      /* 审核中 */
      &.u-tag-auditing {
        &::before {
          background: #5ad8a6
        }
      }

      /* 学院审核 */
      &.u-tag-audit-academy {
        &::before {
          background: #2db7f5
        }
      }

      /* 学校审核 */
      &.u-tag--audit-school {
        &::before {
          background: #108ee9
        }
      }

      /* 通过 */
      &.u-tag-pass {
        &::before {
          background: #52c41a
        }
      }

      /* 不通过， 不推荐 */
      &.u-tag-error {
        &::before {
          background: #f5222d
        }
      }
    }
  }
</style>
