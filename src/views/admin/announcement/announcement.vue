<template>
  <!--box-->
  <u-container :skeleton="show">
    <div class="u-page-button">
      <a
        type="primary"
        @click="newBulletinBoard"
      >
        <a-icon type="plus"></a-icon>添加
      </a>
      <a-popconfirm
        title="确定提交?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="bulletinBoardRelease"
      >
        <a :disabled="!hasSelected">
          <a-icon type="sound"></a-icon> 发布
        </a>
      </a-popconfirm>
    </div>
    <u-filter
      :filters="filters"
      :finders="finders"
      @filter="filter"
    >
    </u-filter>
    <div class="content">
      <a-table
        :columns="columns"
        :row-selection="{selectedRowKeys:checkedSelected, onChange: onSelectChange}"
        :row-key="record => record.id"
        :data-source="bulletinBoardVos"
        :loading="spinningTab"
        :pagination="false"
      >
        <!--标题-内容-->
        <span
          slot="titleStr"
          slot-scope="text, record"
        >
          <a @click="bulletinBoardDetail(record)">{{ text }}</a>
        </span>
        <!--发布状态-内容-->
        <span
          slot="release"
          slot-scope="text"
        >
          <span
            v-if="!text"
          ><span class="status-point-grey status-point"></span>
            未发布</span>
          <span
            v-else
          ><span class="status-point-green status-point"></span>
            已发布</span>
        </span>
        <!--操作-内容-->
        <span
          slot="action"
          slot-scope="text, record"
        >
          <a @click="editAnnouncement(record)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            cancel-text="取消"
            ok-text="确定"
            title="确定删除?"
            @confirm="bulletinBoardDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <AnnouncementDetail
      v-if="checkAnnouncementVisible"
      ref="checkAnnouncement"
      title="公告详情"
      @cancel="checkAnnouncementCancel"
    ></AnnouncementDetail>
  </u-container>
</template>
<script>
import AnnouncementDetail from './AnnouncementDetail'
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    scopedSlots: { customRender: 'titleStr' }
  },
  {
    title: '公告类别',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '发布状态',
    dataIndex: 'release',
    key: 'release',
    scopedSlots: { customRender: 'release' },
    width: 180
  },
  {
    title: '最后编辑时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 320
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150
  }
]
export default {
  name: 'Announcement',
  components: { AnnouncementDetail },
  data () {
    return {
      show: true,
      columns,
      spinningTab: false,
      filters: [
        {
          title: '标题',
          field: 'title',
          type: 'input'
        },
        {
          title: '类型',
          field: 'type',
          type: 'select',
          finder: 'typeFinder'
        },
        {
          title: '发布状态',
          field: 'releaseStr',
          type: 'select',
          finder: 'announcementStatusFinder'
        }
      ],
      finders: {
        announcementStatusFinder: [
          { id: '', name: '' },
          { id: '已发布', name: '已发布' },
          { id: '未发布', name: '未发布' }
        ],
        typeFinder: [
          { name: '', id: '' },
          { name: '公告', id: '公告' },
          { name: '下载专区', id: '下载专区' }
        ]
      },
      checkedSelected: [],
      bulletinBoardVos: [],
      bulletinBoardVoFilter: {},
      items: {},
      nameSpace: this.$store.state.app.namespace,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      checkAnnouncementVisible: false
    }
  },
  computed: {
    //    计算表格一
    hasSelected () {
      return this.checkedSelected.length > 0
    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'AnnouncementManagement') {
        this.getPage()
      }
    }
  },
  mounted () {
    this.getPage()
  },
  methods: {
    filter (params) {
      this.bulletinBoardVoFilter = { ...params }
      this.getPage()
    },
    //    表格过滤
    getPage () {
      this.spinningTab = true
      this.bulletinBoardVoFilter.nameSpace = this.nameSpace
      this.bulletinBoardVoFilter.release = null
      if (this.bulletinBoardVoFilter.releaseStr === '已发布') {
        this.bulletinBoardVoFilter.release = true
      } else if (this.bulletinBoardVoFilter.releaseStr === '未发布') {
        this.bulletinBoardVoFilter.release = false
      }
      this.$api.admin.announcementList(this.bulletinBoardVoFilter).then(res => {
        if (res.data) {
          this.bulletinBoardVos = res.data
        }
        this.spinningTab = false
        this.show = false
      })
    },
    // 重置
    reset () {
      this.bulletinBoardVoFilter = {}
    },
    //    公告列表删除单行
    bulletinBoardDelete (item, index) {
      this.spinningTab = true
      this.$api.admin.deleteAnnouncement(item.id).then(res => {
        if (res.data) {
          const i = this.bulletinBoardVos.findIndex(ele => ele.id === item.id)
          if (i !== -1) {
            this.bulletinBoardVos.splice(i, 1)
          }
          this.$message.success('删除成功')
          this.spinningTab = false
        }
      }, () => {
        this.$message.error('删除失败')
      })
    },
    //    发布公告
    bulletinBoardRelease () {
      this.spinningTab = true
      const idList = JSON.stringify(this.checkedSelected)
      this.$api.admin.releaseAnnouncement(idList).then((res) => {
        if (res.data) {
          for (let i = 0; i < this.checkedSelected.length; i++) {
            for (let q = 0; q < this.bulletinBoardVos.length; q++) {
              if (this.checkedSelected[i] === this.bulletinBoardVos[q].id) {
                this.bulletinBoardVos[q].release = true
              }
            }
          }
          setTimeout(() => {
            this.spinningTab = false
          }, 500)
          this.$message.success('发布成功')
        } else {
          this.$message.error('发布失败')
        }
      }, () => {
        this.$message.error('发布失败')
      })
    },
    //    设置选中的值
    onSelectChange (checkedSelected) {
      this.checkedSelected = checkedSelected
    },
    //    新建公告
    newBulletinBoard () {
      const id = ''
      this.$router.push({
        path: '/announcement-edit',
        query: { id }
      })
    },
    //    公告详情
    bulletinBoardDetail (item) {
      const id = item.encryptedId
      this.checkAnnouncementVisible = true
      this.$nextTick(() => {
        this.$refs.checkAnnouncement.enter(id)
      })
    },
    editAnnouncement (item) {
      const id = item.encryptedId
      this.$router.push({
        path: '/announcement-edit',
        query: { id }
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
  .status-point{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: 2px;
  }
  .status-point-grey{
    background: grey;
  }
  .status-point-green{
    background: #52c41a;
  }
  .content{
    padding: 10px;
    background: #fff;
  }
  .filter-info{
    background-color: #fff;
    margin-bottom: 20px;
    >div{
      display: flex;
      >div{
        width: 25%;
        padding-top: 16px;
      }
      .search-btn-input{
        margin-top:4px;
        padding: 5px;
      }
    }

  }
  .tab-btn{
    width: 100%;
    text-align: right;
    padding: 8px;
    background-color: #fff;
    margin-bottom: -8px;
  }
</style>
