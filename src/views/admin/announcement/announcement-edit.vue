<template>
  <div class="container-all">
    <div
      v-if="show"
      class="content-occupy-screen"
    >
      <a-skeleton
        :paragraph="{rows: 15}"
        active
      ></a-skeleton>
    </div>
    <div
      v-else
      class="container-box"
    >
      <div class="content-box">
        <div class="table-container">
          <div class="content-bulletin-board">
            <!--标题-->
            <a-spin :spinning="spinning">
              <div>
                <a-form
                  :form="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-form-item
                    label="标题"
                    has-feedback
                  >
                    <a-input
                      v-decorator="['title',{rules: [{ required: true, message: '请输入标题!' }]}]"
                    >
                    </a-input>
                  </a-form-item>
                  <a-form-item
                    label="类别"
                    has-feedback
                  >
                    <a-select
                      v-decorator="['type',{rules: [{ required: true, message: '请选择类别!' }]}]"
                      show-search
                      option-filter-prop="children"
                    >
                      <a-select-option
                        v-for="item of typeFinder"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="内容">
                    <v-editor
                      v-model="editor.info"
                      :is-clear="isClear"
                      :server-option="richTextEditorOption"
                      @textInfo="textInfo"
                    ></v-editor>
                  </a-form-item>
                  <a-form-item :wrapper-col="{span: 20, offset: 2}">
                    <!--原来的附件-->
                    <div>
                      <a-spin v-if="annexVosList.length" :spinning="spinningTab">
                        <a-table
                          :columns="columns"
                          :row-key="record => record.id"
                          :data-source="annexVosList"
                          :pagination="false"
                        >
                          <!--操作-内容-->
                          <span
                            slot="action"
                            slot-scope="text, record,index"
                          >
                            <a @click="downAnnex(record)">下载</a>
                            <a-divider type="vertical"></a-divider>
                            <a @click="deleteAnnex(record,index)">删除</a>
                          </span>
                        </a-table>
                      </a-spin>
                      <a-upload
                        :file-list="fileList"
                        :multiple="true"
                        :remove="handleRemove"
                        :before-upload="beforeUpload"
                      >
                        <a-button
                          type="primary"
                          size="small"
                        >
                          <a-icon type="upload"></a-icon>
                          添加文件
                        </a-button>
                      </a-upload>
                    </div>
                  </a-form-item>
                  <div
                    class="ant-col-sm-22"
                    style="margin-top: 30px;padding-left: 45%;padding-bottom: 20px;"
                  >
                    <a-button @click="bulletinBoard('发布')">
                      发布
                    </a-button>
                    <a-button
                      type="primary"
                      @click="bulletinBoard('保存')"
                    >
                      保存
                    </a-button>
                  </div>
                </a-form>
              </div>
            </a-spin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import { filterMixin } from 'assets/js/mixin'
import { mapGetters } from 'vuex'
import pick from 'lodash.pick'
import { httpConfig } from '@/config'
import { getToken } from '@/utils/auth'
import wangeditor from '@/components/RichTextEditor'
const fileDownload = require('js-file-download')
// 原来附件列表
const columns = [
  {
    title: '文件名称',
    dataIndex: 'fileName',
    key: 'fileName'
  },
  {
    title: '大小',
    dataIndex: 'fileSizeFormat',
    key: 'fileSizeFormat'
  },
  {
    title: '上传日期',
    dataIndex: 'uploadTime',
    key: 'uploadTime'
  },
  {
    title: '下载次数',
    dataIndex: 'downloadCount',
    key: 'downloadCount'
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
// 新传附件列表
const columnsTwo = [
  {
    title: '文件名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '大小',
    dataIndex: 'fileSizeFormat',
    key: 'fileSizeFormat'
  },
  {
    title: '上传日期',
    dataIndex: 'uploadTime',
    key: 'uploadTime'
  },
  {
    title: '下载次数',
    dataIndex: 'downloadCount',
    key: 'downloadCount'
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    'v-editor': wangeditor
  },
  data () {
    return {
      columns,
      columnsTwo,
      show: false,
      spinning: false,
      spinningTab: false,
      isClear: false,
      editor: {},
      fileList: [],
      editorTextInfo: '',
      labelCol: {
        sm: { span: 2 }
      },
      wrapperCol: {
        sm: { span: 20 }
      },
      richTextEditorOption: { uploadImgServer: httpConfig.baseApi, headers: { accessToken: getToken() }},
      nameSpace: this.$store.state.app.namespace,
      // commonBaseHttp: '//localhost:8763',
      annexVosList: [],
      announcementVO: {},
      newAnnexVosList: [],
      items: {},
      form: this.$form.createForm(this),
      typeFinder: [
        { name: '公告', id: '公告' },
        { name: '下载专区', id: '下载专区' }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    $route () {
      if (this.$route.name === 'AnnouncementEdit') {
        this.getPage()
      }
    }
  },
  mounted () {
    this.getPage()
  },
  methods: {
    getPage () {
      this.show = true
      if (this.$route.query.id !== null && this.$route.query.id !== '') {
        this.$api.admin.announcementDetail(this.$route.query.id).then(res => {
          if (res.data) {
            this.announcementVO = res.data.announcementVO || {}
            this.annexVosList = res.data.attachmentVOList || []
            this.editor.info = this.announcementVO.contentRichText
            this.editorTextInfo = this.announcementVO.content
          }
          setTimeout(() => {
            this.show = false
            // 等待渲染后设值
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(this.announcementVO, 'title', 'type'))
            })
          }, 500)
        }).catch(() => {
        })
      } else {
        this.announcementVO = {}
        setTimeout(() => {
          this.annexVosList = []
          this.editor.info = ''
          this.editorTextInfo = ''
          this.show = false
          this.form = this.$form.createForm(this)
        }, 500)
      }
    },
    //    上传附件
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    //    删除上传的附件
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    //    获取editor纯文本
    textInfo (txt) {
      this.editorTextInfo = txt
    },
    //    发布和保存
    bulletinBoard (str) {
      this.form.validateFields(
        (err, values) => {
          if (err) {
            return false
          } else {
            this.spinning = true
            // 把form中的值 设置到Vo中
            Object.assign(this.announcementVO, values)
            const obj = {}
            obj.contentRichText = this.editor.info
            obj.content = this.editorTextInfo
            obj.title = this.announcementVO.title
            obj.type = this.announcementVO.type
            obj.id = this.announcementVO.id
            obj.nameSpace = this.nameSpace
            obj.release = false
            obj.author = this.userInfo.code
            if (str === '发布') {
              obj.release = true
            }
            const formData = new FormData()
            for (const o in obj) {
              if (obj[o] !== undefined) {
                formData.append(o, obj[o])
              }
            }
            for (let i = 0; i < this.fileList.length; i++) {
              formData.append('files', this.fileList[i])
            }
            this.$api.admin.submitAnnouncement(formData).then(res => {
              if (res.data) {
                this.bulletinBoardList()
              }
              this.spinning = false
            }).catch(() => {
              this.spinning = false
            })
          }
        })
    },
    //    下载附件
    downAnnex (item) {
      this.items = item
      this.spinningTab = true
      this.$api.admin.downloadAttachment(this.items.id).then(res => {
        console.log(res)
        // 以下fileName是取后台的文件名,如果没有'content-disposition',可以直接略过这一步,自己定：如fileName="xxx.xlsx"。
        if (res.headers['content-disposition']) {
          let fileName = res.headers['content-disposition']
          if (fileName !== undefined) {
            fileName = decodeURI(fileName.replace('attachment; filename=', ''))
            // 去除两边双引号
            fileName = fileName.replace('"', '').replace('"', '')
          }
          fileDownload(res.data, fileName)
        } else {
          fileDownload(res.data, '文件.xlsx')
        }
      })
    },
    //    删除附件
    deleteAnnex (item, index) {
      this.items = item
      const _this = this
      _this.spinningTab = true
      this.$api.file.deleteAttachment(item.id).then((res) => {
        if (res.data) {
          _this.annexVosList.splice(index, 1)
          _this.$message.success('删除成功')
        }
      }, () => {
        _this.spinningTab = false
        _this.$message.error('删除失败')
      })
    },
    //    新建公告
    bulletinBoardList () {
      this.$router.push({
        path: '/announcement'
      })
    },
    //    时间转换方法
    //    例如:Thu Sep 20 2018 16:23:03 GMT+0800 (中国标准时间)转换为"2018-09-20 16:23:03"
    formatDateTime (time) {
      const date = new Date(time)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    //    文件大小转换
    getFileSize (fileByte) {
      const fileSizeByte = fileByte
      let fileSizeMsg = ''
      if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
      else if (fileSizeByte === 1048576) fileSizeMsg = '1MB'
      else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
      else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1GB'
      else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
      else fileSizeMsg = '文件超过1TB'
      return fileSizeMsg
    }
  }
}
</script>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
  .container-box{
    width: 100%;
    background-color: #ecf0f5;
    .content-box{
      background-color: #fff;
      padding: 16px;
      overflow: hidden;
    }
  }
</style>
