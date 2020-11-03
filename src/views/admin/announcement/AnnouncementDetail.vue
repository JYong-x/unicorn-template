<template>
  <a-modal
    :title="title"
    :visible="visible"
    width="800px"
    @cancel="cancel"
  >
    <template slot="footer">
      <a-button @click="cancel">
        关闭
      </a-button>
    </template>
    <div
      class="container-box"
    >
      <a-spin :spinning="spinning">
        <div class="content-box">
          <div class="table-container">
            <div class="content-bulletin-board">
              <!--标题-->
              <div class="bulletin-board-title">
                <span>{{ announcementVO.title }}</span>
              </div>
              <!--时间-->
              <div class="bulletin-board-time">
                <span>{{ announcementVO.createTime }}</span>
              </div>
              <!--内容-->
              <div class="bulletin-board-box wangEditorContent">
                <!--eslint-disable-next-line-->
                <span v-html="announcementVO.contentRichText"></span>
              </div>
              <!--附件-->
              <div
                v-if="attachmentVOList.length>0"
                class="bulletin-board-annex"
              >
                <div class="annex-left">
                  <a-icon
                    type="file-text"
                    style="padding-left: 5px;"
                  ></a-icon>
                  <span>附件:</span>
                </div>
                <div class="annex-right">
                  <ul>
                    <li
                      v-for="(item,index) of attachmentVOList"
                      :key="index"
                    >
                      <span><a
                        @click="downAnnex(item)"
                      >{{ item.fileName }}</a></span><span>{{ item.fileSizeFormated }}</span><span>{{ item.uploadTimeFormated }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
  </a-modal>
</template>
<script>
const fileDownload = require('js-file-download')
export default {
  name: 'AnnouncementDetail',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false,
      announcementVO: {},
      attachmentVOList: {},
      spinning: false,
      items: {}
    }
  },
  methods: {
    enter (id) {
      this.visible = true
      this.getPage(id)
    },
    cancel () {
      this.visible = false
      this.$emit('cancel')
    },
    getPage (id) {
      this.spinning = true
      this.$api.admin.announcementDetail(id).then(res => {
        if (res.data) {
          this.announcementVO = res.data.announcementVO || {}
          this.attachmentVOList = res.data.attachmentVOList || {}
        }
      }).finally(() => {
        this.spinning = false
      })
    },
    //    下载附件
    downAnnex (item) {
      this.items = item
      this.spinning = true
      this.$api.admin.downloadAttachment(this.items.id).then(res => {
        // 以下fileName是取后台的文件名,如果没有'content-disposition',可以直接略过这一步,自己定：如fileName="xxx.xlsx"。
        if (res.headers['content-disposition']) {
          let fileName = res.headers['content-disposition']
          if (fileName !== undefined) {
            fileName = decodeURI(fileName.replace('attachment; filename=', ''))
            // 去除两边双引号
            fileName = fileName.replace('"', '').replace('"', '')
          }
          fileDownload(res.data, fileName)
        }
      }).finally(() => {
        this.spinning = false
      })
    }
  }
}
</script>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
  .content-box{
    background-color: #fff;
  }
  .content-bulletin-board{
    width: 85%;
    margin-left: 7.5%;
  }
  .bulletin-board-title{
    font-size: 25px;
    font-weight: bolder;
    border-bottom: 1px solid #eee;
    line-height: 2.5em;
    width: 100%;
    text-align: left;
  }
  .bulletin-board-time{
    float: right;
    font-size: 16px;
    font-weight: bolder;
    padding-top: 5px;
  }
  .bulletin-board-box{
    padding: 25px;
    font-size:18px;
    word-break: break-all;
    width: 100%;
    max-height: 400px;
    overflow: overlay;
  }
  .bulletin-board-annex{
    padding: 25px;
    overflow: hidden;
    .annex-left{
      float: left;
      width: 70px;
      font-size: 17px;
      font-weight: bolder;
    }
    .annex-right{
      float: left;
      ul{
        padding-left: 5px;
        li{
          list-style-type: none;
          padding-bottom: 10px;
          padding-top: 2px;
          span{
            &:nth-child(1){
              min-width: 200px;
              display: inline-block;
              font-size: 15px;
              max-width: 500px;
              white-space:nowrap;
              text-overflow:ellipsis;
              vertical-align: bottom;
              overflow:hidden;
              font-weight: bolder;
            }
            &:nth-child(2){
              padding-left: 15px;
              padding-right: 15px;
              font-size: 15px;
              font-weight: bolder;
            }
            &:nth-child(3){
              padding-left: 5px;
              font-size: 15px;
              font-weight: bolder;
            }
          }
        }
      }
    }
  }
</style>
