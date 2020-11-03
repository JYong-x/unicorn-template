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
        layout="inline"
      >
        <a-row
          :gutter="gutter"
          type="flex"
        >
          <template v-for="(item, index) of filters || []">
            <a-col
              :key="index"
              :xl="stateColSpan(index).xl"
              :xxl="stateColSpan(index).xxl"
              class="u-filter-col"
            >
              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                :label="item.title"
                class="form-item"
              >
                <template v-if="item.slots">
                  <slot :name="item.slots.default"></slot>
                </template>
                <template v-else>
                  <a-input
                    v-if="!item.type || item.type === 'input'"
                    v-model="params[item.field]"
                    @keyup.enter="filter(item.field)"
                    @change="item.change ? paramChange($event, item.change) : ''"
                  ></a-input>
                  <a-select
                    v-else-if="item.type === 'select'"
                    v-model="params[item.field]"
                    show-search
                    allow-clear
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
                    v-else-if="item.type === 'selectMulti'"
                    v-model="params[item.field]"
                    mode="multiple"
                    show-search
                    allow-clear
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
                    v-else-if="item.type === 'selectTree'"
                    v-model="params[item.field]"
                    :tree="filterFinders[item.finder] || []"
                    :children-name="item.options.childrenName"
                    :value-type="item.options.valueType ? item.options.valueType : 'string'"
                    :tree-check-strictly="item.options.treeCheckStrictly"
                    :default-value="params[item.field] ? params[item.field] : []"
                    @changeValue="item.change ? paramChange($event, item.change) : ''"
                  >
                  </u-select-tree>
                  <a-date-picker
                    v-else-if="item.type==='time'"
                    v-model="params[item.field]"
                    allow-clear
                    style="width: 100%"
                    placeholder="选择日期"
                    @change="timeFilter($event, item.field, item.options)"
                  ></a-date-picker>
                </template>
              </a-form-item>
            </a-col>
          </template>
          <a-col
            :xl="operatorCol.colSpan.xl"
            :xxl="operatorCol.colSpan.xxl"
            class="u-filter-col"
          >
            <a-form-item
              :wrapper-col="operatorCol.wrapperCol"
              class="u-form-item-operator"
            >
              <div class="u-operator-wrap">
                <div
                  :style="operatorCol.style"
                  class="u-btn-wrap"
                >
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
    defaultParams: {
      type: Object,
      default: null
    },
    column: {
      type: [Number],
      default: null
    },
    gutter: {
      type: [Number],
      default: 24
    },
    colSpan: {
      type: Object,
      default () {
        return {
          xl: { span: 8 },
          xxl: { span: 6 }
        }
      }
    },
    labelCol: {
      type: Object,
      default () {
        return {
          xl: { span: 4 },
          xxl: { span: 6 }
        }
      }
    },
    wrapperCol: {
      type: Object,
      default () {
        return {
          xl: { span: 19 },
          xxl: { span: 17 }
        }
      }
    }
  },
  data () {
    return {
      params: {},
      advanced: false,
      stateWrapperCol: this.wrapperCol,
      stateLabelCol: this.labelCol
    }
  },
  computed: {
    stateColSpan () {
      return function (index) {
        const { xl, xxl } = this.colSpan
        if (this.column) {
          xl.span = 24 / this.column
          xxl.span = 24 / this.column
          xl.displayIndex = this.column - 2
          xxl.displayIndex = this.column - 2
        }

        const stateXl = {
          span: index > (xl.displayIndex || 1) && !this.unfoldFlag && !this.advanced ? 0 : xl.span
        }
        const stateXxl = {
          span: index > (xxl.displayIndex || 2) && !this.unfoldFlag && !this.advanced ? 0 : xxl.span
        }

        return {
          xl: stateXl,
          xxl: stateXxl
        }
      }
    },

    operatorCol () {
      let result = {}
      const wrapperCol = {
        xl: {
          span: this.stateWrapperCol.xl.span,
          offset: this.stateLabelCol.xl.span
        },
        xxl: {
          span: this.stateWrapperCol.xxl.span,
          offset: this.stateLabelCol.xxl.span
        }
      }
      const result1 = {
        colSpan: this.colSpan,
        wrapperCol: wrapperCol,
        style: {
          textAlign: 'left',
          justifyContent: 'flex-start'
        }
      }
      const result2 = {
        colSpan: {
          xl: { span: 24 },
          xxl: { span: 24 }
        },
        wrapperCol: {
          xl: {
            span: 24
          },
          xxl: {
            span: 24
          }
        },
        style: {
          textAlign: 'right',
          justifyContent: 'flex-end',
          paddingRight: this.gutter / 2 + 'px'
        }
      }
      if (this.advanced) {
        if (this.filters.length % (this.column || 4) === 0) {
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
  created () {
    if (this.defaultParams) {
      this.params = Object.assign(this.params, this.defaultParams)
      this.params = { ...this.params }
      this.stateWrapperCol = Object.assign(this.stateWrapperCol, this.wrapperCol)
      this.stateLabelCol = Object.assign(this.stateLabelCol, this.wrapperCol)
    }
  },
  mounted () {
    this.setLabelStyle()
  },
  methods: {
    setLabelStyle () {
      const span = document.createElement('span')
      span.id = 'u-filter-tag-wrap'
      span.style.display = 'absolute'
      span.style.zIndex = '-100'
      document.body.appendChild(span)

      const filter = this.$refs.filter
      const labels = filter.querySelectorAll('.form-item label')
      const tagWrap = document.getElementById('u-filter-tag-wrap')
      let maxLabelWidth = 0
      for (let i = 0; i < labels.length; i++) {
        const text = labels[i].innerHTML
        tagWrap.innerHTML = text
        const w = tagWrap.getBoundingClientRect().width
        maxLabelWidth = Math.max(maxLabelWidth, w)
      }
      const formLabel = filter.querySelectorAll('.form-item .ant-form-item-label')
      for (let i = 0; i < formLabel.length; i++) {
        formLabel[i].style.minWidth = maxLabelWidth + 16 + 'px'
      }
      document.body.removeChild(tagWrap)
    },
    paramChange (curValue, fn) {
      this.$emit('filterChange', { fn: fn, value: curValue, filters: { ...this.params }})
    },
    filter (curItem) {
      this.$emit('filter', this.params, curItem)
    },
    timeFilter (data, params, options) {
      const dataString = moment(new Date(data._d)).format(options.format || 'YYYY-MM-DD')
      this.params[params] = dataString
      this.params = { ...this.params }
    },
    setParams (field, value) {
      this.params[field] = value
    },
    reset () {
      this.params = {}
      this.$emit('reset')
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
    margin-bottom: 12px;
    background: #fff;
    transition: height .3s;
    ::v-deep .form-item {
      width: 100%;
      .ant-form-item-label {
        min-width: 80px;
      }
      .ant-form-item-control-wrapper {
        min-width: 120px;
      }
    }
    a{
      color: #1890ff;
      text-decoration: none;
      white-space: nowrap;
    }
  }
  .u-form-item-operator {
    width: 100%;
  }
  .u-operator-wrap {
    display: flex;
    .u-btn-wrap {
      display: flex;
      height: 40px;
      width: 100%;
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
