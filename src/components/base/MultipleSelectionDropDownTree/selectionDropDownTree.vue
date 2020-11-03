<!--
  /**
  * 树选择器
  * @desc 树选择器
  * @author jianjian
  * @param {Array} [tree]    - 树的数据
  * @param {Boolean} [unfoldIcon]    - 是否显示展开按钮 暂时未引入
  * @param {Boolean} [allUnfold]    - 是否全部展开
  * @param {Boolean} [treeCheckBox]    - 是否展示checkBox
  * @param {Boolean} [noMerge]    - 只传子集(并且无法合并)
  * @param {String} [searchPlaceholder]    - 水印
  * @param {String} [childrenName]    - 子集的名称
  * @param {Array} [changeObj]    - 需要转换的对呀title和value的对象名

  */
-->
<template>
  <div
    :class="!(treeData && treeData.length>0)?'no-tree-select':''"
    class="d-tree"
  >
    <!--    <a-spin :spinning="spinning">-->
    <!--    :dropdownMatchSelectWidth="true"-->
    <a-tree-select
      v-if="treeData && treeData.length > 0"
      v-model="treeValue"
      :tree-data="treeData"
      :show-checked-strategy="noMerge ? SHOW_CHILD : SHOW_PARENT"
      :tree-checkable="treeCheckBox"
      :search-placeholder="searchPlaceholder"
      :disabled="disabledFlag"
      tree-default-expand-all
      show-search
      multiple
      style="width: 100%"
      @change="changeValue"
    ></a-tree-select>
    <!--没有数据或者加载时，置空的下拉树（解决数据加载慢，然后点开下拉，无法默认全展开问题）-->
    <a-tree-select
      v-else
      style="width: 100%"
    >
    </a-tree-select>
    <!--    </a-spin>-->
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const SHOW_ALL = TreeSelect.SHOW_ALL
const SHOW_CHILD = TreeSelect.SHOW_CHILD
export default {
  name: 'SelectionDropDownTree',
  components: {
    'a-tree-select': TreeSelect
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    disabledFlag: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: null,
      default: () => []
    },
    tree: {
      type: Array,
      default: () => []
    },
    unfoldIcon: {
      type: Boolean,
      default: true
    },
    allUnfold: {
      type: Boolean,
      default: true
    },
    treeCheckBox: {
      type: Boolean,
      default: true
    },
    noMerge: {
      type: Boolean,
      default: true
    },
    childrenName: {
      type: String,
      default: 'children'
    },
    changeObj: {
      type: Array,
      default: () => ['name', 'id']
    },
    searchPlaceholder: {
      type: String,
      default: '请选择数据'
    },
    valueType: {
      type: String,
      default: 'list'
    },
    onlySelectChild: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SHOW_ALL,
      SHOW_CHILD,
      SHOW_PARENT,
      spinning: false,
      value: [],
      treeValue: [],
      treeData: this.tree
    }
  },
  watch: {
    tree () {
      this.treeData = this.tree || []
      this.changeTreeData(this.treeData, 0)
      this.treeData = [...this.treeData]
    }
    // defaultValue: {
    //   handler (val) {
    //     this.$nextTick(() => {
    //       if (val && val.length) {
    //         this.processDefaultValue(val)
    //       }
    //     })
    //   },
    //   immediate: true
    // }
  },
  created () {
    this.treeData = this.tree || []
    if (this.treeData && this.treeData.length > 0) {
      this.changeTreeData(this.treeData, 0)
      this.treeData = [...this.treeData]
    }
  },
  methods: {
    changeTreeData (sourceList, parentKey) {
      if (!sourceList || sourceList.length === 0) {
        return null
      }
      for (let i = 0; i < sourceList.length; i++) {
        sourceList[i].title = sourceList[i][this.changeObj[0]]
        sourceList[i].key = sourceList[i][this.changeObj[1]] + '&' + parentKey
        sourceList[i].value = sourceList[i][this.changeObj[0]] + '-' + sourceList[i][this.changeObj[1]] + '&' + parentKey
        sourceList[i].disabled = sourceList[i].disabled || false
        sourceList[i].scopedSlots = { title: 'title' }

        if (this.defaultValue.includes(sourceList[i][this.changeObj[1]])) {
          this.treeValue.push(sourceList[i][this.changeObj[0]] + '-' + sourceList[i][this.changeObj[1]] + '&' + parentKey)
        }

        if (sourceList[i][this.childrenName] && sourceList[i][this.childrenName].length > 0) {
          sourceList[i].children = [...sourceList[i][this.childrenName] || []]
          this.changeTreeData(sourceList[i].children, sourceList[i][this.changeObj[1]])
        }
      }
    },
    processDefaultValue (values) {
      const treeValue = []
      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        this.findTreeItem(value, this.treeData)
      }
      this.treeValue = treeValue
    },
    findTreeItem (value, list) {
      for (let i = 0; i < list.length; i++) {}
    },
    changeValue (value) {
      let list = []
      if (value && value.length > 0) {
        value.forEach(it => {
          const valueStr = it.split('-')[1]
          list.push(valueStr.split('&')[0])
        })
      }
      this.value = value

      if (this.valueType === 'string') {
        list = list.toString()
      }
      this.$emit('changeValue', list)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .no-tree-select{
      ::v-deep .ant-select-arrow{
        display: none;
      }
    }
</style>
