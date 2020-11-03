<template>
  <div class="announcement">
    <a-card title="通知公告">
      <a-skeleton
        :loading="show"
        :title="false"
        active
        :paragraph="{rows: 3}"
      >
        <a-list :data-source="announcementList" size="small">
          <a-list-item
            slot="renderItem"
            slot-scope="item"
          >
            <a-list-item-meta>
              <a
                slot="title"
                class="name-link"
                @click="announcementDetail(item,'CheckAnnouncement')"
                v-text="item.title.replace(/&nbsp;/ig,'')"
              ></a>
            </a-list-item-meta>
            <span
              v-time="item.createTimeFormat"
              class="item-time"
            ></span>
          </a-list-item>
        </a-list>
      </a-skeleton>
    </a-card>
    <AnnouncementDetail
      v-if="checkAnnouncementVisible"
      ref="checkAnnouncement"
      title="公告详情"
      @cancel="checkAnnouncementCancel"
    ></AnnouncementDetail>
  </div>
</template>
<script>
import AnnouncementDetail from '@/views/admin/announcement/AnnouncementDetail'
export default {
  components: { AnnouncementDetail },
  props: {},
  data () {
    return {
      announcementList: [],
      filterObj: {
        releaseStr: '已发布'
      },
      show: true,
      checkAnnouncementVisible: false
    }
  },
  computed: {
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.show = true
      this.$api.admin.announcementList({ release: true, nameSpace: this.$store.state.app.namespace }).then(res => {
        if (res.data) {
          res.data.forEach(item => {
            const time = item.createTime.replace(/-/g, '/')
            item.createTimeFormat = new Date(time).getTime()
          })
          this.announcementList = res.data
        }
        this.show = false
      }).catch(() => {})
    },
    computeInterval (originTime) {
      const d = new Date(originTime)
      const now = new Date()
      const diff = Math.abs(d.getTime() - now.getTime())
      const result = parseInt(diff / (1000 * 60 * 60 * 24))
      return result
    },
    announcementDetail (item, page) {
      const id = item.encryptedId
      this.checkAnnouncementVisible = true
      this.$nextTick(() => {
        this.$refs.checkAnnouncement.enter(id)
      })
    },
    checkAnnouncementCancel () {
      setTimeout(() => {
        this.checkAnnouncementVisible = false
      }, 300)
    }
  }
}
</script>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
.announcement {
  ::v-deep .ant-card {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    .ant-card-head {
      border: none;
      .ant-card-head-title {
        color: #595959;
      }
    }
    .ant-card-body {
      padding: 0 24px;
      overflow-y: auto;
    }
  }
}
.name-link {
  color: #40a9ff;
}
</style>
