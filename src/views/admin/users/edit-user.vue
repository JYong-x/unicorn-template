<template>
  <div class="container-all">
    <div class="container-user">
      <div class=" content-left">
        <div
          v-if="show"
          class="content-occupy-screen"
        >
          <a-skeleton
            :paragraph="{rows: 8}"
            active
          ></a-skeleton>
        </div>
        <div
          v-else
          class="content-detail-cont module-container"
        >
          <div class="module-container-box">
            <div class="basic-info">
              <div class="functionModuleTitle">
                基本信息
              </div>
              <div class="information-container-three basic-info-user">
                <div><span>姓名：</span><span>{{ selectedInstInfoWrapper.name }}</span></div>
                <div class="det-item"><span>部门：</span><span>{{ selectedInstInfoWrapper.departmentName }}</span></div>
                <div><span>性别：</span><span>{{ selectedInstInfoWrapper.gender==='1'? '男' : '女' }}</span></div>
                <div><span>工号：</span><span>{{ selectedInstInfoWrapper.code }}</span></div>
                <div><span>统一认证号：</span><span>{{ selectedInstInfoWrapper.idNumber }}</span></div>
                <div><span>邮箱：</span><span>{{ selectedInstInfoWrapper.email }}</span></div>
                <div>
                  <span class="label-item">手机：</span><span class="info-item">{{ selectedInstInfoWrapper.phoneNumber }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="module-container-box">
            <div class="basic-info basic-dep-info">
              <div class="functionModuleTitle">
                额外管理部门
              </div>
              <div class="tag">
                <span
                  v-for="(tag, index) in userManageDeptWrapperList"
                  :key="index"
                >
                  <a-tag
                    :key="tag.deptId"
                    :closable="false"
                    @close="delTag(tag,index)"
                  >{{ tag.departmentName }}
                    <a-popconfirm
                      cancel-text="取消"
                      ok-text="确定"
                      title="确定删除?"
                      @confirm="delTag(tag,index)"
                    >
                      <a-icon type="close"></a-icon>
                    </a-popconfirm>
                  </a-tag>
                </span>
                <a-tag
                  style="background: #fff; borderStyle: dashed;"
                  @click="addDiaLog"
                >
                  <a-icon type="plus"></a-icon>
                  添加
                </a-tag>
              </div>
            </div>
            <div class="basic-info">
              <div class="functionModuleTitle basic-info-title">已分配的角色</div>
              <a-button
                type="primary"
                style="float: right;margin-top: -42px;"
                @click="saveAssignablePerms"
              >
                保存角色分配
              </a-button>
            </div>
            <div class="basic-info-table">
              <a-spin :spinning="spinning">
                <a-table
                  :columns="columnsUser"
                  :row-key="record => record.id"
                  :data-source="krimRoleTDTOs"
                  :row-selection="{selectedRowKeys: selectedKeys, onChange: onSelectChange}"
                  :pagination="true"
                >
                  <!--操作-->
                  <span
                    slot="active"
                    slot-scope="text, record"
                  >
                    <span
                      :class="record.active === 'N' || record.active === null ?'initialStatus':'endStatus'"
                      class="positionStatus"
                    ></span>
                    <span v-if="record.active === 'N' || record.active === null">失效</span>
                    <span v-if="record.active === 'Y'">可用</span>
                  </span>
                </a-table>
              </a-spin>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right module-container">
        <div
          v-if="showPerm"
          class="content-occupy-screen"
        >
          <a-skeleton
            :paragraph="{rows: 8}"
            active
          ></a-skeleton>
        </div>
        <div
          v-else
          class="content-detail-cont module-container-box"
        >
          <div class="basic-info">
            <div class="functionModuleTitle">权限列表</div>
          </div>
          <div class="permission-table-user-input">
            <a-input
              v-model="module"
              placeholder="请输入权限名称搜索"
              style="width: 300px"
              @keyup.enter="search()"
            ></a-input>
            <a-button @click="search">
              搜索
            </a-button>
          </div>
          <div class="permission-table-user">
            <a-spin :spinning="spinning">
              <div
                v-for="(record,index) of permWrapperGroupByTypes"
                :key="index"
                class="content-detail-box-function"
              >
                <div class="functionModuleName">
                  {{ record.functionModuleName }}
                </div>
                <div
                  v-for="(item,num) of record.authorityVOList"
                  :key="num"
                >
                  <div
                    v-show="item.permissionsDetails.length>0"
                    class="perm-detail-title"
                  >
                    {{ item.title }}
                  </div>
                  <div class="perm-detail-content">
                    <div
                      v-for="(it,i) of item.permissionsDetails"
                      :key="i"
                    >
                      <a-popover>
                        <template slot="content">
                          <span>{{ it.description }}</span>
                        </template>
                        <span
                          class="perm-detail-name"
                        >{{ it.description }}</span>
                      </a-popover>
                    </div>
                  </div>
                </div>
              </div>
            </a-spin>
          </div>
        </div>
      </div>
    </div>
    <div>
      <a-modal
        :visible="departmentDialog"
        :mask-closable="maskClosable"
        cancel-text="取消"
        ok-text="确认"
        title="添加部门"
        @cancel="handleCancel"
        @ok="saveDepartmentDialog"
      >
        <div>
          <a-form :form="form">
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="管理部门"
              has-feedback
            >
              <a-select
                v-decorator="['deptId',{rules: [{ required: true, message: '请选择管理部门!' }]}]"
                show-search
                style="width: 100%;"
                option-filter-prop="children"
              >
                <a-select-option
                  v-for="line of departmentFinder"
                  :key="line.id"
                  :value="line.id"
                >
                  {{ line.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils/util'
import config from '@/config'
const { userApi: userBaseHttp, commonApi: commonApiBaseHttp } = config

const columnsUser = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 150
  },
  {
    title: '角色描述',
    dataIndex: 'description',
    key: 'description',
    width: 150
  },
  {
    title: '角色状态',
    dataIndex: 'active',
    key: 'active',
    scopedSlots: { customRender: 'active' },
    width: 110
  }
]
export default {
  name: 'AdminUpdateUser',
  data () {
    return {
      show: false,
      columnsUser,
      maskClosable: false,
      departmentDialog: false,
      spinning: false,
      expandList: [],
      expandAllRowState: false,
      selectedKeys: [],
      userManageVO: {},
      permWrapperGroupByTypes: [],
      module: '',
      roleInfoList: [],
      originalList: [],
      departmentInfoList: [],
      hhh: [],
      krimRoleTDTOs: [],
      selectedInstInfoWrapper: {},
      userManageDeptWrapperList: [],
      userManageDeptWrapper: {},
      departmentFinder: [],
      notAssignablePerms: [],
      assignablePerms: [],
      showPerm: false,
      item: {},
      instructorId: '',
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this)
    }
  },
  watch: {
    expandList () {
      if (!this.expandList.length) {
        this.expandAllRowState = false
      }
    }
  },
  mounted () {
    this.getUserDetail()
  },
  methods: {
    //    进入页面获取数据
    getUserDetail () {
      this.show = true
      this.showPerm = true
      this.namespaceCode = this.$route.meta.namespaceCode
      this.instructorId = this.$route.query.id
      const url = '/userManage/user/' + this.instructorId
      const userId = this.$store.state.user.info.code
      this.$http.get(url, { nameSpace: this.namespaceCode, userId: userId }, userBaseHttp).then(resp => {
        if (resp && resp.status === 200) {
          // 角色表格数据
          this.krimRoleTDTOs = resp.data.krimRoleTDTOs

          this.krimRoleTDTOs.forEach((item) => {
            if (item.checked === true) {
              this.selectedKeys.push(item.id)
            }
          })
          // 用户信息数据
          this.selectedInstInfoWrapper = resp.data.selectedInstInfoWrapper
          // 管理部门表格数据
          this.userManageDeptWrapperList = resp.data.userManageDeptWrapperList
          this.refresh()
          this.show = false
        } else {
          this.show = false
        }
      })
    },
    // 管理部门finder
    getDetpartmentFinder () {
      const url = `/optionFinder/userManage/department?nameSpace=${this.$route.meta.namespaceCode}&userId=${this.selectedInstInfoWrapper.id}`
      this.$http.get(url, {}, commonApiBaseHttp).then(resp => {
        if (resp && resp.status === 200) {
          this.departmentFinder = resp.data.data
        }
      })
    },
    handleCancel () {
      this.departmentDialog = false
    },
    onSelectChange (selectedKeys) {
      this.selectedKeys = selectedKeys
    },
    //    管理台添加DiaLog
    addDiaLog () {
      this.form = this.$form.createForm(this)
      this.departmentDialog = true
      this.getDetpartmentFinder()
    },
    isBlank (s) {
      if (!s || s === '') {
        return true
      }
      return false
    },
    listSearch (item, list) {
      for (let j = 0; j < list.length; j++) {
        if (this.isBlank(item[list[j]]) || item[list[j]].indexOf(this.module) !== -1) {
          return true
        }
      }
      return false
    },
    // 查询
    search () {
      this.spinning = true
      const _this = this
      const original = []
      const searchItem = ['typeName', 'name', 'description']
      this.originalList.filter((item, index, arr) => {
        const allList = []
        item.krimPermTWrapperList.filter((record, num, list) => {
          if (_this.isBlank(_this.module) || this.listSearch(record, searchItem)) {
            allList.push(record)
          }
        })
        if (allList.length > 0) {
          const obj = {
            krimPermTWrapperList: allList,
            functionModuleName: item.functionModuleName
          }
          original.push(obj)
        }
      })
      this.setPermVOList(original)
      setTimeout(() => {
        this.spinning = false
      }, 500)
    },
    setPermVOList (originalList) {
      for (let i = 0; i < originalList.length; i++) {
        originalList[i].authorityVOList = []
        if (originalList[i] && originalList[i].krimPermTWrapperList.length > 0) {
          const pagePermissions = []
          const otherPermissions = []
          originalList[i].krimPermTWrapperList.forEach(item => {
            if (item.typeName === '页面权限') {
              pagePermissions.push(item)
            } else {
              otherPermissions.push(item)
            }
          })
          originalList[i].authorityVOList.push({ title: '页面权限', permissionsDetails: pagePermissions })
          originalList[i].authorityVOList.push({
            title: '其他权限',
            permissionsDetails: otherPermissions
          })
        }
      }
      this.permWrapperGroupByTypes = deepClone(originalList)
      this.permWrapperGroupByTypes = [...this.permWrapperGroupByTypes]
    },
    // 添加管理部门
    saveDepartmentDialog () {
      this.form.validateFields(
        (err, values) => {
          if (err) {
            return
          }
          Object.assign(this.userManageDeptWrapper, values)
          this.userManageDeptWrapper.nameSpace = this.namespaceCode
          this.userManageDeptWrapper.userId = this.instructorId
          const url = '/userManage/user/dept'
          this.$http.post(url, this.userManageDeptWrapper, userBaseHttp).then((resp) => {
            if (resp && resp.status === 200) {
              this.userManageDeptWrapperList.push(resp.data.data)
              this.$message.success('编辑成功')
            }
            this.departmentDialog = false
          })
        })
    },
    //    删除上课教师标签
    delTag (item, index) {
      const url = '/userManage/user/dept-del/' + item.id
      this.$http.post(url, {}, userBaseHttp).then((resp) => {
        this.userManageDeptWrapperList.splice(index, 1)
        this.userManageDeptWrapperList = [...this.userManageDeptWrapperList]
      })
    },
    //    保存可分配角色
    saveAssignablePerms () {
      this.spinning = true
      const url = `/userManage/batch/role?userId=${this.selectedInstInfoWrapper.id}`
      this.userManageVO.nameSpace = this.namespaceCode
      this.userManageVO.instructorId = this.selectedInstInfoWrapper.id
      this.userManageVO.roleIdList = []
      this.userManageVO.roleIdList = this.selectedKeys
      this.$http.postJson(url, this.userManageVO, userBaseHttp).then((resp) => {
        if (resp && resp.status === 200) {
          this.refresh()
          this.$message.success('保存成功')
        }
      })
      setTimeout(() => {
        this.spinning = false
      }, 500)
    },
    refresh () {
      const url = `/userManage/user-nameSpace/permission`
      this.$http.get(url, { nameSpace: this.namespaceCode, userId: this.selectedInstInfoWrapper.id }, userBaseHttp).then(resp => {
        if (resp && resp.status === 200) {
          // 权限数据
          this.permWrapperGroupByTypes = resp.data.data
          this.originalList = deepClone(resp.data.data)
          for (let i = 0; i < this.permWrapperGroupByTypes.length; i++) {
            this.permWrapperGroupByTypes[i].authorityVOList = []
            if (this.permWrapperGroupByTypes[i] && this.permWrapperGroupByTypes[i].krimPermTWrapperList.length > 0) {
              const pagePermissions = []
              const otherPermissions = []
              this.permWrapperGroupByTypes[i].krimPermTWrapperList.forEach(item => {
                if (item.typeName === '页面权限') {
                  pagePermissions.push(item)
                } else {
                  otherPermissions.push(item)
                }
              })
              this.permWrapperGroupByTypes[i].authorityVOList.push({ title: '页面权限', permissionsDetails: pagePermissions })
              this.permWrapperGroupByTypes[i].authorityVOList.push({
                title: '其他权限',
                permissionsDetails: otherPermissions
              })
            }
          }
        }
        this.showPerm = false
      })
    },
    // 给表格添加index
    getTabIndex (tabList) {
      for (let i = 0; i < tabList.length; i++) {
        tabList[i].index = i
      }
    },
    // 表格单行展开
    expanded (expanded, record) {
      if (!expanded) {
        const index = this.expandList.findIndex(item => {
          return item === record.index
        })
        this.expandList.splice(index, 1)
      } else {
        this.expandList.push(record.index)
      }
      this.expandAllRowState = Boolean(this.expandList.length)
    },
    // 表格全部展开
    expandAllRow (dataList) {
      const rowKeyArr = []
      if (!this.expandAllRowState) {
        dataList.forEach(item => {
          rowKeyArr.push(item.index)
        })
        this.expandList = rowKeyArr
        this.expandAllRowState = !this.expandAllRowState
      } else {
        this.expandList = []
        this.expandAllRowState = !this.expandAllRowState
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .basic-info-table{
    .ant-checkbox{
      margin-top: 0;
    }
  }
  .basic-info-title{
    vertical-align: -8px;
  }
  .functionModuleTitle{
    font-size: 16px;
    font-weight: 500;
    color:rgba(0,0,0,0.85);
    margin-bottom: 16px;
  }
  .functionModuleName{
    font-size: 15px;
    font-weight: 500;
    color:rgba(0,0,0,0.85);
    margin-bottom: 16px;
  }
  .permission-table-user-input{
    padding:0 10px 24px 0;
  }
  .permission-table-user{
    overflow: auto;
    max-height: 828px;
    .content-detail-box-function{
      margin-bottom: 16px;
    }
    .perm-detail-title{
      font-size: 14px;
      color: #595959;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .perm-detail-content{
      display: flex;
      flex-flow: wrap;
      .perm-detail-name{
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      >div{
        background: rgb(230,239,250);
        border-radius: 3px;
        padding: 8px 16px;
        width: calc(33.3% - 13px);
        margin-right: 16.5px;
        margin-bottom: 16px;
        &:nth-child(3n+3){
          margin-right: 0;
        }
      }
    }
  }
  @media screen and (max-width: 1700px) {
    .permission-table-user{
      .perm-detail-content{
        >div{
          width: calc(50% - 8px);
          margin-right: 16px;
          &:nth-child(3n+3){
            margin-right: 16px;
          }
          &:nth-child(2n+2){
            margin-right: 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .permission-table-user{
      .perm-detail-content{
        >div{
          width: 100%;
          margin-right: 0;
          &:nth-child(3n+3),
          &:nth-child(2n+2){
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container-user{
    overflow: hidden;
    >div{
      width: calc(50% - 12px);
    }
    .content-detail-cont{
      background: #fff;
      /*margin-top: 25px;*/
      overflow: hidden;
      >button{
        margin: 0 10px 10px 10px;
        float: right;
      }
      .basic-dep-info{
        margin-bottom: 24px;
      }
      .basic-info {
        .basic-info-user{
          >div{
            >span{
              &:first-child{
                width: 90px;
                text-align: right;
                display: inline-block;
              }
            }
          }
          .det-item{
            width: calc(66.6% - 16px);
          }
        }
        .title {
          font-size: 15px;
          font-weight: bold;
          padding-bottom: 10px;
        }
        .basic-info-list {
          overflow: hidden;
          > div {
            padding-bottom: 10px;
            float: left;
            width: 33%;
            .label-item {
              width: 35%;
              text-align: right;
              display: inline-block;
            }
            .info-item {
              padding-left: 5px;
            }
          }
        }
      }
    }
    .content-left{
      float: left;
    }
    .content-right{
      float: right;
    }
  }
  .container-box{
    //@include box;
  }
  .table-container {
    //@include tableTwo;
  }
  .table-container{
    padding: 0px;
  }
  .col-6{
    width: calc(50% - 10px);
    min-height: 300px;
    background-color: #fff;
    padding: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .no-right-margin{
    margin-right: 0;
  }

  .title-info>h3{
    font-size: 19px;
    margin-left: 5px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #888;
    margin-top: 10px;
  }
  .min-height{
    min-height: 620px;
  }

  .user-info-box{
    width: 90%;
    margin: 10px auto;
    border: 1px solid #eee;
  }
  .user-title{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .user-info{
    font-size: 14px;
    font-weight: normal;
    padding-left: 10px;
  }
  .content-row{
    height:30px;
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }

  .del-icon{
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .del-icon{
    background-color: #D15B47;
  }
  .table-2{
    width: 50%;
  }
  .userRole{
    padding: 0px;
    table tbody tr{
      height: 30px;
      line-height: 30px;
      >td:first-child input{
        height: 30px!important;
        line-height: 30px!important;
      }
    }
  }
  .assignablePermissions{
    padding: 0px;
    table tbody tr{
      height: 30px;
      line-height: 30px;
      >td:first-child input{
        height: 30px!important;
        line-height: 30px!important;
      }
    }
  }
  .userRoleInfo{
    padding-bottom: 0;
    min-height: 250px;
    .content-row:first-child{
      margin-top: 5px;
    }
    .content-row:last-child{
      margin-bottom: 5px;
    }
    .user-info-box{
      width: 100%;
    }
    .content-row{
      height: 35px;
      line-height: 35px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
      >.user-title{
        text-align: left;
        padding-left: 10px;
      }
      >.user-info{
        text-align: center;
      }
    }
  }
  /*静态框样式*/
  .modal-body{
    padding: 10px 15px;
    overflow: hidden;
    border:1px solid #f5f5f5;
  }
  .modal-body-table table{
    width: 100%;
    border:1px solid #f5f5f5;
  }
  .modal-body-table th,
  .modal-body-table td{
    width: 50%;
    padding: 12px 8px;
  }
  .modal-body-table th{
    text-align: right;
    background-color: #f5f5f5;
    line-height: 1.42857143;

    padding-left: 5px;
  }
  .modal-body-table td{
    line-height: 1.42857143;

    text-align: left;
    padding-right: 5px;
  }
  .permission-option>select,
  .permission-input>input{
    width: 100%;
    height:32px;
    outline: none;
    padding-left: 8px;
  }
  .permission-option>select{
    border-color: #d2d6de;
  }
  .permission-option>.el-select {
    width:100%;
  }
  .permission-option>select:focus,
  .permission-input>input:focus{
    border-color: #1e90ff;
  }
  .permission-input>input{
    border:1px solid #d2d6de;
    padding-left: 12px;
  }
  .xin{
    color: #E91E63;
    padding-left: 4px;
  }
  .expand-all {
    position: absolute;
    display: inline-block;
    width: 2.9%;
    min-width: 50px;
    height: 53px;
    top: 2px;
    left: 0;
    border: none;
    color: #40a9ff;
    text-align: center;
    line-height: 53px;
    z-index: 10;
  }
  /*end*/
</style>
