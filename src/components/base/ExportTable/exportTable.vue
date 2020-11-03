<!--
  /**
  * 导出
  * @author jianjian
  * @param {String} [message]    - 导出按钮名字
  * @param {Obj} [btnType]    - 导出按钮类型
  * @param {Boolean} [btnLoadingFlag]    - 导出按钮加载动画
  * @param {String} [type]    - 导出类型(前 || 前后 || 后)
  * @param {Array} [tabList]    - 表格数据
  * @param {String} [url]    - 导出的url
  * @param {Obj} [downloadObj]    - 导出的传值
  * @param {Array} [data]    - 导出的data格式(前后, 前后台)
  * 例子
  * data:{
  * header: ["课程名称", "课程代码", "教学班号", "学生姓名", "学号", "解析结果", "解析失败原因"]
  * dataObj: ["courseName", "courseCode", "classNbr", "studentName", "studentId", "analyzeSuccessFlag", "analyzeFalseReason"]
  * }
  * @param {String} [name]    - 导出的名字(前后)
  * @param {String} [fnType]    - 导出的方法类型(后)
  * @param {String} [baseHttp]    - 导出的后台地址(后)
  * @param {String} [fileType]    - 导出的格式(前)
  *
  */
-->
<template>
  <div
    v-if="type"
    class="export-table"
  >
    <a-button
      :icon="btnType.icon|| 'file'"
      :type="btnType.type || 'primary'"
      :loading="loading"
      :size="btnType.size || 'small'"
      :disabled="btnType.disabled"
      @click="download()"
    >
      {{ message }}
    </a-button>
  </div>
</template>
<script>
import { downloadFile, setAndDownloadFile, setDownloadFile } from './download'
import { httpConfig } from '@/config'

export default {
  name: 'ExportTable',
  props: {
    baseHttp: {
      type: String,
      default: () => httpConfig.baseUrl
    },
    message: {
      type: String,
      default: () => 'Excel'
    },
    btnType: {
      type: Object,
      default: () => {
        return {
          type: 'default', loading: false, size: 'default', icon: 'download', disabled: false
        }
      }
    },
    type: {
      type: String,
      default: () => null
    },
    tabList: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: () => ''
    },
    data: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: () => '导出结果'
    },
    fnType: {
      type: String,
      default: () => 'post'
    },
    downloadObj: {
      type: Object,
      default: () => {}
    },
    fileType: {
      type: String,
      default: () => 'xlsx'
    },
    btnLoadingFlag: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      downloadFile,
      setAndDownloadFile,
      setDownloadFile,
      loading: false
    }
  },
  methods: {
    download () {
      if (this.btnLoadingFlag) {
        this.loading = true
      }
      if (this.type === '前') {
        const obj = {}
        obj.tabList = this.tabList
        obj.data = this.data
        obj.name = this.name
        obj.fileType = this.fileType
        this.setDownloadFile(obj, this)
      } else if (this.type === '前后') {
        const obj = {}
        obj.tabList = this.tabList
        obj.data = this.data
        obj.url = this.url || '/fileTemplate/table-json/download'
        obj.name = this.name
        this.setAndDownloadFile(obj, this.baseHttp, this)
      } else if (this.type === '后') {
        const obj = {}
        obj.fnType = this.fnType
        obj.downloadObj = this.downloadObj
        obj.url = this.url
        this.downloadFile(obj, this.baseHttp, this)
      } else {
        this.loading = false
        this.$message.error('暂无数据')
      }
    },
    btnLoading (flag) {
      this.loading = flag
    }
  }
}
</script>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
      .export-table{
        display: inline-block;
      }
</style>
