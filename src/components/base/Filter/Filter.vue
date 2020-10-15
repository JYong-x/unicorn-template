<!--
  /**
  * 过滤
  * @desc 表格过滤组件，参数传入输入空间，支持input,select,date,select-multi,select-tree控件需要传入finder名,异步获取的finder需要更新finders
  * @author jin_yong
  * @param {Array} [filters]    - 过滤项列表
  * @param {Object} [finders]    - 输入控件的finder,初始finders中需要定义好各个finder名
  * @param {Number} [colSpan]    - 用于控制一行显示的条数
  * @param {Boolean} [unfoldFlag]    - 用于控制是否展开
  * @events  filter   - 点击搜索按钮事件
  * @events  filterChange   - 过滤项改变事件，返回function({fn: String, value: value})
  * filterItems数据结构示例：filterItems = [
  *     {
  *        title: '课程名称',
  *        field: 'courseName'
  *      },
  *      {
  *        title: '开课部门',
  *        field: 'courseDeptId',
  *        finder: 'departmentFinder', // finder名
  *        change: 'getMajorFinder', // 参数改变事件，执行对应方法
  *        options: {}, // 输入控件的传值，默认null
  *        slots: {default: 'slotsName'} // slot,注意，外部slot改变需要调用setParams方法
  *      },
  *    ]
  * @example 调用示例
  *  <Filter :filters="filters" :finders="finders" @filter="filter"></Filter>
  */
-->

<template>
  <transition name="fade">
    <div
      v-if="filters.length"
      ref="filter"
      class="u-filter"
    >
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="inline"
      >
        <a-row
          :gutter="gutter"
          type="flex"
        >
          <template v-for="(item, index) of filters || []">
            <a-col
              v-show="index <= shortNumber || (unfoldFlag?true:advanced)"
              :key="index"
              :span="colSpan"
              class="u-filter-col"
            >
              <a-form-item
                :label="item.title"
                class="form-item"
              >
                <template v-if="item.slots">
                  <slot :name="item.slots.default"></slot>
                </template>
                <template v-else>
                  <a-select
                    v-if="item.type === 'select'"
                    v-model="params[item.field]"
                    show-search
                    option-filter-prop="children"
                    @change="item.change ? paramChange($event, item.change) : ''"
                  >
                    <a-select-option
                      v-for="it of filterFinders[item.finder] || []"
                      :key="it.id"
                      :value="item.keyValueOption ? it[item.keyValueOption.id] : it.id"
                    >
                      {{ it.name }}
                    </a-select-option>
                  </a-select>
                  <a-select
                    v-if="item.type === 'selectMulti'"
                    v-model="params[item.field]"
                    mode="multiple"
                    show-search
                    option-filter-prop="children"
                    @change="item.change ? paramChange($event, item.change) : ''"
                  >
                    <a-select-option
                      v-for="it of filterFinders[item.finder] || []"
                      :key="it.id"
                    >
                      {{ it.name }}
                    </a-select-option>
                  </a-select>
                  <u-select-tree
                    v-if="item.type === 'selectTree'"
                    v-model="params[item.field]"
                    :tree="filterFinders[item.finder] || []"
                    :children-name="item.options.childrenName"
                    :value-type="item.options.valueType ? item.options.valueType : 'string'"
                    @changeValue="item.change ? paramChange($event, item.change) : ''"
                  >
                  </u-select-tree>
                  <a-date-picker
                    v-if="item.type==='time'"
                    v-model="params[item.field]"
                    style="width: 100%"
                    placeholder="选择日期"
                    @change="timeFilter($event, item.field)"
                  ></a-date-picker>
                  <a-input
                    v-if="!item.type || item.type === 'input'"
                    v-model="params[item.field]"
                    @keyup.enter="filter(item.field)"
                    @change="item.change ? paramChange($event, item.change) : ''"
                  ></a-input>
                </template>
              </a-form-item>
            </a-col>
          </template>
          <a-col
            :span="operatorCol.span"
            :style="operatorCol.style"
            class="u-filter-col"
          >
            <a-form-item
              :wrapper-col="operatorCol.wrapperCol"
              class="u-form-item-operator"
            >
              <div class="u-operator-wrap">
                <div class="u-btn-wrap">
                  <a-button
                    class="u-btn"
                    type="primary"
                    @click="filter()"
                  >
                    搜索
                  </a-button>
                  <a-button
                    class="u-btn"
                    @click="reset"
                  >
                    重置
                  </a-button>
                  <a
                    v-if="!unfoldFlag"
                    v-show="filters.length > 3"
                    @click="toggleAdvanced"
                  >
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"></a-icon>
                  </a>
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import { Col, Row } from 'ant-design-vue'
import SelectionDropDownTree from '@/components/base/MultipleSelectionDropDownTree'

export default {
  name: 'FilterS',
  components: {
    'a-col': Col,
    'a-row': Row,
    'u-select-tree': SelectionDropDownTree
  },
  props: {
    unfoldFlag: {
      type: Boolean,
      default: () => false
    },
    filters: {
      type: Array,
      default () { return [] }
    },
    finders: {
      type: Object,
      default () { return {} }
    },
    colSpan: {
      type: [Number],
      default: 6
    },
    labelCol: {
      type: Object,
      default () {
        return {
          sm: { span: 5 },
          xs: { span: 8 }
        }
      }
    },
    wrapperCol: {
      type: Object,
      default () {
        return {
          sm: { span: 18 },
          xs: { span: 16 }
        }
      }
    }
  },
  data () {
    return {
      params: {},
      advanced: false,
      gutter: 24
    }
  },
  computed: {
    shortNumber () {
      return this.gutter / this.colSpan - 2
    },
    operatorCol () {
      let result = {}
      const result1 = {
        span: this.colSpan,
        wrapperCol: {
          sm: { span: 18, offset: this.labelCol.sm.span },
          xs: { span: 16, offset: this.labelCol.xs.span }
        },
        style: {
          textAlign: 'left'
        }
      }
      const result2 = {
        span: 24,
        wrapperCol: {
          sm: { span: 24 },
          xs: { span: 24 }
        },
        style: {
          textAlign: 'right'
        }
      }
      if (this.advanced) {
        if (this.filters.length % (24 / this.colSpan) === 0) {
          result = result2
        } else {
          result = result1
        }
      } else {
        result = result1
      }
      return result
    }
  },
  watch: {
    finders: {
      handler (newValue) {
        this.filterFinders = newValue
        this.$forceUpdate()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    paramChange (curValue, fn) {
      this.$emit('filterChange', { fn: fn, value: curValue, filters: { ...this.params }})
    },
    filter (curItem) {
      this.$emit('filter', this.params, curItem)
    },
    timeFilter (data, params) {
      const dataString = moment(new Date(data._d)).format('YYYY-MM-DD')
      this.params[params] = dataString
      this.params = { ...this.params }
    },
    setParams (field, value) {
      console.log(field, value)
      this.params[field] = value
      this.params = { ...this.params }
    },
    reset () {
      this.params = {}
      // this.$emit('reset')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
      this.transitionAutoHeight(this.$refs.filter)
    },
    transitionAutoHeight (ele, duration = 300) {
      const originHeight = ele.offsetHeight
      ele.style.transition = 'none'
      this.$nextTick(() => {
        ele.style.height = 'auto'
        const targetHeight = window.getComputedStyle(ele).height
        ele.style.transition = `height ${duration}ms`
        ele.style.height = originHeight + 'px'
        ele.offsetWidth // eslint-disable-lint
        ele.style.height = targetHeight
        setTimeout(() => {
          ele.style.height = 'auto'
        }, duration)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .u-filter {
    .ant-form-inline{
      width: 100%;
    }
  }
  </style>
<style lang="scss" scoped>
  .u-filter {
    /*padding-top: 16px;*/
    /*min-height: 64px;*/
    margin-bottom: 12px;
    background: #fff;
    transition: height .3s;
    overflow: hidden;
    .u-filter-col {
      min-width: 300px;
    }
    .form-item {
      display: flex;
      .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        min-width: 100px;
      }
      .ant-form-item-control-wrapper {
        -webkit-box-flex: 1;
        -ms-flex: 1 1;
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
        .ant-form-item-control {
          height: 32px;
          line-height: 32px;
        }
      }
    }
    a{
      color: #1890ff;
      text-decoration: none;
    }
  }
  .u-form-item-operator {
    width: 100%;
  }
  .u-operator-wrap {
    display: inline-block;
    padding-right: 32px;
    min-width: 230px;
    .u-btn-wrap {
      display: flex;
      height: 40px;
      align-items: center;
    }
    .u-btn {
      margin-right: 8px;
    }
  }
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-enter, .fade-leave-to {
    transform: translateY(-20px);
  }
</style>
