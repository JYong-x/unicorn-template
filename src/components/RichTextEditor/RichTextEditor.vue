<template>
  <div class="editor">
    <div
      ref="toolbar"
      class="toolbar"
    ></div>
    <div
      ref="editor"
      class="text"
    ></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'RichTextEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    serverOption: {
      type: Object,
      default: () => {}
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: null,
      info_: this.value,
      textInfo: null
    }
  },
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
        this.textInfo = null
      }
    },
    value (val) {
      // 使用 v-model 时，设置初始值
      this.editor.txt.html(val)
      this.info_ = val
    }
  },
  mounted () {
    this.seteditor()
  },
  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      console.log(this.editor)
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = this.serverOption.uploadImgServer // 配置服务器端地址
      //      this.editor.customConfig.uploadImgHeaders = {
      //        accessToken: this.$tokenUtils.loadToken().access_token
      //      }// 自定义 header
      this.editor.customConfig.uploadImgHeaders = this.serverOption.headers
      this.editor.customConfig.uploadFileName = 'pictures' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      this.editor.customConfig.zIndex = 10 // 设置z-index
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          for (let i = 0; i < result.data.length; i++) {
            insertImg(result.data[i])
          }
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.textInfo = this.editor.txt.text()
        this.$emit('change', this.info_) // 将内容同步到父组件中
        this.$emit('textInfo', this.textInfo)
      }
      // 创建富文本编辑器
      this.editor.create()
      if (this.info_ !== '' && this.info_ !== null && this.info_ !== 'undefined') {
        this.editor.txt.html(this.info_)
      }
    }
  }
}
</script>
<style lang="css">
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    height: 400px;
    max-height: 800px;
  }
</style>
