<template>
  <div
    v-show="show"
    :style="{minHeight:minHeightInfo?minHeightInfo+'px':'260px'}"
    class="massage-content"
  >
    <div class="no-data-box">
      <div class="no-trapezoid-box">
        <div class="trapezoid-box">
          <a-empty
            :image-style="{
              height: '100px',
            }"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          >
            <span slot="description"> </span>
          </a-empty>
        </div>
      </div>
      <div
        v-if="massage"
        class="no-data-info"
      >
        {{ massage }}
      </div>
      <div
        v-if="showBtn"
        class="no-data-btn"
      >
        <div>
          <a-button
            :type="btnType"
            @click="clickBtn()"
          >
            {{ btnMassage }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import trapezoid from 'assets/img/trapezoid.png'
import { Empty } from 'ant-design-vue'
const trapezoid = require('@/assets/images/trapezoid.png')
export default {
  components: { 'a-empty': Empty },
  props: {
    btnType: {
      type: null,
      default: () => 'primary'
    },
    show: {
      type: Boolean,
      default: () => false
    },
    massage: {
      type: String,
      default: () => ''
    },
    showBtn: {
      type: Boolean,
      default: () => false
    },
    btnMassage: {
      type: String,
      default: () => ''
    },
    minHeightInfo: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      trapezoid
    }
  },
  computed: {
  },
  methods: {
    clickBtn () {
      this.$emit('clickBtn')
    }
  }
}
</script>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
  .massage-content{
    height: auto;
    min-height: 260px;
    position: relative;
    .no-data-box {
      width: 100%;
      text-align: center;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      > div {
        margin: 16px 0;
        font-size: 15px;
      }

      .no-trapezoid-box {
        .trapezoid-box {
        }
      }

      .no-data-info {
        color: rgb(144, 147, 153);
      }

      .no-data-btn {
        > div {
          margin: 16px 0;

          button {
            float: none !important;
            margin: 0 !important;
          }
        }
      }
    }
  }
</style>
