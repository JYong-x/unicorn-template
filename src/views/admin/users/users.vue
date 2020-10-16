<template>
  <u-container :skeleton="show">
    <div
      class="u-page-button"
    >
      <a @click="showBatchDialog">
        <a-icon type="plus-circle"></a-icon>批量设置角色
      </a>
      <a
        type="primary"
        @click="addDiaLog()"
      >
        <a-icon type="plus"></a-icon>添加教师
      </a>
      <export-table
        :btn-type="{type:'link',size:'small',icon:'file'}"
        :download-obj="instInfoWrapperFilterObj"
        url="/instructor/user-manage/excel"
        type="后"
      >
      </export-table>
    </div>
    <div
      class="content-detail"
    >
      <u-filter
        :filters="filters"
        :finders="finders"
        @filter="filterTab"
      >
      </u-filter>
    </div>
    <div
      class="content-detail hasFooterBottom"
      style="padding: 0 0 16px 0"
    >
      <div class="table-container">
        <div id="userTable">
          <a-spin :spinning="spinning">
            <a-table
              :columns="columns"
              :row-key="record => record.id"
              :data-source="instructorInfoWrappers"
              :pagination="pagination"
              @change="classListTableChange"
            >
              <!--角色-->
              <span
                slot="roleStr"
                slot-scope="text"
              >
                <span v-if="text">
                  <a-tag
                    v-for="(item,index) of text.split(',')"
                    :key="index"
                    class="item-info-tag"
                  >
                    {{ item }}
                  </a-tag>
                </span>
              </span>
              <!--操作-->
              <span
                slot="action"
                slot-scope="text, record"
              >
                <a
                  v-show="record.idNumber"
                  @click="updateUser(record.encryptInstrId)"
                >编辑</a>
              </span>
              <span
                slot="gender"
                slot-scope="text, record"
              >
                <span>{{ record.gender==='1'? '男' : '女' }}</span>
              </span>
            </a-table>
          </a-spin>
        </div>
      </div>
    </div>
    <!--添加时的静态框-->
    <div>
      <a-modal
        v-model="modalAdd"
        :mask-closable="maskClosable"
        title="添加用户"
        ok-text="确认"
        class="showDialog"
        cancel-text="取消"
        @ok="determineDialog"
        @cancel="handleCancel"
      >
        <div
          v-if="toBeAddInstInfoWrapper"
          class=""
        >
          <a-form :form="form">
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="部门"
              has-feedback
            >
              <a-select
                v-decorator="['departmentId',{rules: [{ required: true, message: '请选择部门!' }]}]"
                show-search
                option-filter-prop="children"
              >
                <a-select-option
                  v-for="item of departmentFinder"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="姓名"
              has-feedback
            >
              <a-input
                v-decorator="['name',{rules: [{ required: true, message: '请输入姓名!' }]}]"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="性别"
              has-feedback
            >
              <a-select
                v-decorator="['gender',{rules: [{ required: true, message: '请选择性别!' }]}]"
                show-search
                option-filter-prop="children"
              >
                <a-select-option
                  v-for="item of instructorGenderFinder"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="工号"
              has-feedback
            >
              <a-input
                v-decorator="['code',{rules: [{ required: true, message: '请输入工号!' }]}]"
                @change="handleInput"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="统一认证号"
              has-feedback
            >
              <a-input
                v-decorator="['idNumber',{rules: [{ required: true, message: '请输入统一认证号!' }]}]"
                @change="handleId"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="邮箱"
              has-feedback
            >
              <a-input
                v-decorator="['email',{rules: [{ required: false, message: '请输入邮箱!' }]}]"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label="手机号"
              has-feedback
            >
              <a-input
                v-decorator="['phoneNumber',{rules: [{ required: false, message: '请输入手机号!' }]}]"
              >
              </a-input>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
    <!--批量设置角色-->
    <div>
      <a-drawer
        :closable="false"
        :footer="null"
        :mask="true"
        :mask-closable="maskClosable"
        :visible="batchRoleDialog"
        width="800px"
        title="批量设置角色"
        @close="handleCancel"
      >
        <div>
          <div class="save-cancel-content">
            <div class="save-cancel-con-time">
              <span class="number-time">1</span>
              <span class="number-line"></span>
              <span class="number-time">2</span>
            </div>
            <div class="save-cancel-con-role">
              <div>
                <span>设置分配角色</span>
                <div class="role-dialog-input">
                  <a-form-item
                    :label-col="labelColRole"
                    :wrapper-col="wrapperColRole"
                    label="角色"
                    has-feedback
                  >
                    <a-select
                      v-model="userManageVO.roleIdList"
                      show-search
                      style="width: 350px;"
                      mode="multiple"
                      option-filter-prop="children"
                    >
                      <a-select-option
                        v-for="item of roleOptionFinder"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div>
                <span>设置分配对象</span>
                <div>
                  <div class="role-dialog-input">
                    <a-form-item
                      :label-col="labelColRole"
                      :wrapper-col="wrapperColRole"
                      label="教师"
                      has-feedback
                    >
                      <a-input
                        v-model="nameOrCode"
                        style="width: 350px;"
                        placeholder="姓名/工号"
                      ></a-input>
                    </a-form-item>
                    <a-button @click="addTeacher">
                      添加
                    </a-button>
                  </div>
                  <div class="role-dialog-input">
                    <a-form-item
                      v-if="showTeacherFinder"
                      :label-col="labelColRole"
                      :wrapper-col="wrapperColRole"
                      label="重名"
                      has-feedback
                    >
                      <a-select
                        v-model="roleVOList.id"
                        show-search
                        style="width: 350px;"
                        option-filter-prop="children"
                        @change="addTeacherInList"
                      >
                        <a-select-option
                          v-for="item of teacherFinder"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}[{{ item.departmentName }}][{{ item.code }}]
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                </div>
                <div class="role-dialog-table">
                  <a-spin :spinning="spinningRole">
                    <a-table
                      :columns="columnsRole"
                      :row-key="record => record.id"
                      :data-source="roleInstructorInfoList"
                      :pagination="true"
                    >
                      <span
                        slot="action"
                        slot-scope="text, record,index"
                      >
                        <a-popconfirm
                          cancel-text="取消"
                          ok-text="确定"
                          title="确定删除?"
                          @confirm="delRoleList(index)"
                        >
                          <a>删除</a>
                        </a-popconfirm>
                      </span>
                    </a-table>
                  </a-spin>
                </div>
              </div>
            </div>
          </div>
          <div class="save-cancel-btn">
            <a-button @click="handleCancel">
              取消
            </a-button>
            <a-button
              type="primary"
              @click="submitBatch"
            >
              保存
            </a-button>
          </div>
        </div>
        <div
          v-if="batchRoleDialog"
          class="drawer-close-wrap"
          @click="handleCancel"
        >
          <a-icon type="close"></a-icon>
        </div>
      </a-drawer>
    </div>
  </u-container>
</template>

<script>
import { transitionAutoHeight } from '@/utils/util'
import ExportTable from '@/components/base/ExportTable'

const columns = [
  {
    title: '学院',
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 150
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    scopedSlots: { customRender: 'gender' },
    width: 80
  },
  {
    title: '工号',
    dataIndex: 'code',
    key: 'code',
    width: 100
  },
  {
    title: '统一认证号',
    dataIndex: 'idNumber',
    key: 'idNumber',
    width: 100
  },
  {
    title: '角色',
    dataIndex: 'roleStr',
    key: 'roleStr',
    scopedSlots: { customRender: 'roleStr' },
    width: 150
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 120
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 120
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 80
  }
]

const columnsRole = [
  {
    title: '部门',
    dataIndex: 'departmentName',
    key: 'departmentName'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '工号',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '统一认证号',
    dataIndex: 'idNumber',
    key: 'idNumber'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Users',
  components: {
    ExportTable
    // pagination
  },
  data () {
    return {
      columns,
      columnsRole,
      filters: [
        {
          title: '部门',
          field: 'departmentId',
          type: 'selectTree',
          options: { childrenName: 'subDepartmentVOList' },
          finder: 'departmentFinder'
        },
        {
          title: '姓名',
          field: 'name',
          type: 'input'
        },
        {
          title: '性别',
          field: 'gender',
          type: 'select',
          finder: 'genderFinder'
        },
        {
          title: '工号',
          field: 'code',
          type: 'input'
        },
        {
          title: '统一认证号',
          field: 'idNumber',
          type: 'input'
        }, {
          title: '角色',
          field: 'roleId',
          type: 'select',
          finder: 'roleOptionFinder'
        }
      ],
      finders: {
        departmentFinder: [],
        genderFinder: [],
        roleOptionFinder: []
      },
      advanced: false,
      maskClosable: false,
      show: true,
      spinning: false,
      spinningRole: false,
      batchRoleDialog: false,
      roleOptionFinder: [],
      roleVOList: [],
      roleInstructorInfoList: [],
      nameOrCode: '',
      teacherFinder: [],
      showTeacherFinder: false,
      userManageVO: {},

      modalAdd: false,
      instructorInfoWrappers: [],
      userInfoList: [],
      instInfoWrapperFilterObj: {},
      departmentFinder: [],
      instructorGenderFinder: [],
      toBeAddInstInfoWrapper: {},
      labelColTwo: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperColTwo: {
        xs: { span: 24 },
        sm: { span: 17 }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelColRole: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperColRole: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      form: this.$form.createForm(this),
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize // eslint-disable-line
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getDepartmentFinder()
  },
  methods: {
    //    展开搜索数据
    toggleAdvanced () {
      this.advanced = !this.advanced
      const transitionWrap = document.getElementsByClassName('experiment-info')
      transitionAutoHeight(transitionWrap[0])
    },
    //    进入页面获取数据
    getUserInfo () {
      this.show = true
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.instInfoWrapperFilterObj.currentPage = this.pagination.current
      this.instInfoWrapperFilterObj.pageSize = this.pagination.pageSize
      this.instInfoWrapperFilterObj.nameSpace = this.$route.meta.namespaceCode
      this.$api.admin.userList(this.instInfoWrapperFilterObj).then(res => {
        // 表格数据
        this.instructorInfoWrappers = res.data.instructorInfoWrapperList
        // // 学院Finder
        // this.departmentFinder = res.data.departmentFinder
        //
        // this.finders.departmentFinder = res.data.departmentFinder

        this.finders.genderFinder = res.data.genderOptionFinder

        this.finders.roleOptionFinder = res.data.roleOptionFinder
        this.finders = { ...this.finders }
        // 性别Finder
        this.instructorGenderFinder = res.data.genderOptionFinder
        // 角色
        this.roleOptionFinder = res.data.roleOptionFinder
        this.pagination.total = res.data.totalInstInfoNum
        this.getPageSize(this.pagination.total)
        setTimeout(() => {
          this.show = false
        }, 500)
      }, () => {
        setTimeout(() => {
          this.show = false
        }, 500)
      })
    },
    getDepartmentFinder () {
      this.$api.finder.departmentFinder().then(data => {
        if (data) {
          this.departmentFinder = data
          this.finders.departmentFinder = data
        }
      })
    },
    // 开课表格-设置页码
    getPageSize (total) {
      this.pagination.pageSizeOptions = []
      this.pagination.pageSizeOptions = ['10']
      if (total > 10) {
        const i = Math.ceil(total / 50)
        for (let j = 1; j <= i; j++) {
          const num = j * 50
          if (num > 200) {
            return
          }
          this.pagination.pageSizeOptions.push(num.toString())
        }
      }
    },
    // 批量添加教师
    addTeacher () {
      this.$api.admin.addInstructor({ value: this.nameOrCode }).then((res) => {
        if (res) {
          if (res.data && res.data.length > 1) {
            this.teacherFinder = res.data
            this.showTeacherFinder = true
          } else if (res.data && res.data.length === 1) {
            if (res.data[0].idNumber) {
              this.spinningRole = true
              this.roleInstructorInfoList.push(res.data[0])
              this.getTabIndex(this.roleInstructorInfoList)
              this.roleInstructorInfoList = [...this.roleInstructorInfoList]
              this.nameOrCode = ''
              setTimeout(() => {
                this.spinningRole = false
              }, 500)
            } else {
              this.$message.error('该教师没有统一认证号，不可以添加')
            }
          } else if (res.data && res.data === 0) {
            this.$message.error('没找到该教师')
          }
        }
      })
    },
    // 重名选择
    addTeacherInList () {
      this.spinningRole = true
      this.teacherFinder.forEach((item) => {
        if (this.roleVOList.id === item.id) {
          if (item.idNumber) {
            this.roleInstructorInfoList.push(item)
            this.getTabIndex(this.roleInstructorInfoList)
            this.showTeacherFinder = false
            this.nameOrCode = ''
          } else {
            this.$message.error('该教师没有统一认证号，不可以添加')
          }
        }
      })
      setTimeout(() => {
        this.spinningRole = false
      }, 500)
    },
    // 批量保存
    submitBatch () {
      this.spinning = true
      this.userManageVO.instructorIdList = []
      this.roleInstructorInfoList.forEach((item) => {
        this.userManageVO.instructorIdList.push(item.id)
      })
      this.userManageVO.instructorInfoWrapperList = this.roleInstructorInfoList
      this.userManageVO.nameSpace = this.$route.meta.namespaceCode
      this.$api.admin.batchSaveUsers(this.userManageVO).then((res) => {
        if (res) {
          this.batchRoleDialog = false
          const listName = []
          this.userManageVO.roleIdList.forEach((item) => {
            this.roleOptionFinder.forEach((line) => {
              if (item === line.id) {
                listName.push(line.name)
              }
            })
          })
          this.instructorInfoWrappers.forEach((line, index) => {
            this.userManageVO.instructorIdList.forEach((record) => {
              if (line.id === record) {
                this.instructorInfoWrappers[index].roleStrList = listName
                this.instructorInfoWrappers[index].roleStr = listName.toString()
              }
            })
          })
          this.instructorInfoWrappers = [...this.instructorInfoWrappers]
        }
        setTimeout(() => {
          this.spinning = false
        }, 500)
      })
      this.batchRoleDialog = false
      setTimeout(() => {
        this.spinning = false
      }, 500)
    },
    // 重置批量添加角色的数据
    resetData () {
      this.userManageVO = {}
      this.roleInstructorInfoList = []
    },
    classListTableChange (pag, filters, sorter) {
      this.pagination.current = pag.current
      this.pagination.pageSize = pag.pageSize
      this.pagination = { ...this.pagination }
      this.filter()
    },
    //    进入页面获取数据
    filterTab (params = this.instInfoWrapperFilterObj) {
      const pager = { ...this.pagination }
      pager.current = 1
      pager.currentPage = 1
      this.pagination = pager
      this.pagination = { ...this.pagination }
      this.instInfoWrapperFilterObj = { ...params }
      this.filter()
    },
    //    表格过滤数据
    filter () {
      this.spinning = true
      this.instInfoWrapperFilterObj.pageSize = this.pagination.pageSize
      this.instInfoWrapperFilterObj.currentPage = this.pagination.current
      this.instInfoWrapperFilterObj.nameSpace = this.$route.meta.namespaceCode
      this.$api.admin.userList(this.instInfoWrapperFilterObj).then((res) => {
        if (res) {
          // 更新表格数据
          this.instructorInfoWrappers = res.data.instructorInfoWrapperList
          this.pagination.total = res.data.totalInstInfoNum
          setTimeout(() => {
            this.spinning = false
            // 触发表格更新
            this.instructorInfoWrappers = [...this.instructorInfoWrappers]
            this.getPageSize(this.pagination.total)
            this.pagination = { ...this.pagination }
          }, 500)
        } else {
          setTimeout(() => {
            this.spinning = false
          }, 500)
        }
      })
    },
    // 重置
    reset () {
      this.instInfoWrapperFilterObj.roleId = null
      this.instInfoWrapperFilterObj.departmentId = null
      this.instInfoWrapperFilterObj.name = null
      this.instInfoWrapperFilterObj.gender = null
      this.instInfoWrapperFilterObj.code = null
      this.instInfoWrapperFilterObj.idNumber = null
      this.instInfoWrapperFilterObj = { ...this.instInfoWrapperFilterObj }
    },
    // 批量设置角色显示
    showBatchDialog () {
      this.resetData()
      this.batchRoleDialog = true
    },
    // 删除批量设置角色
    delRoleList (index) {
      this.spinningRole = true
      this.roleInstructorInfoList.splice(index, 1)
      setTimeout(() => {
        this.spinningRole = false
      }, 500)
    },
    //    添加DiaLog
    addDiaLog () {
      // 初始化数据
      this.toBeAddInstInfoWrapper = {}
      this.modalAdd = true
      // 等待表格渲染后设值 清空值
      this.$nextTick(() => {
        this.form.setFieldsValue({ departmentId: null, name: null, gender: null, code: null, idNumber: null })
      })
    },
    handleId () {
      this.$nextTick(() => {
        let idNumber = this.form.getFieldValue('idNumber')
        if (idNumber) {
          idNumber = '' + idNumber
          idNumber = idNumber.replace(/[^-?\d]/g, '')
          this.form.setFieldsValue({ idNumber: idNumber })
        }
      })
    },
    //    添加确定DiaLog
    determineDialog () {
      this.form.validateFields(
        (err, values) => {
          if (err) {
            return
          }
          // 把form中的值 设置到wapper中
          this.spinning = true
          Object.assign(this.toBeAddInstInfoWrapper, values)
          this.$api.admin.saveUser(this.toBeAddInstInfoWrapper).then((res) => {
            if (res) {
              const data = res.data
              const i = this.instructorInfoWrappers.findIndex(ele => ele.id === data.id)
              if (i === -1) {
                this.instructorInfoWrappers.push(data)
              }
              this.instructorInfoWrappers = [...this.instructorInfoWrappers]
              this.getTabIndex(this.instructorInfoWrappers)
              this.modalAdd = false
              setTimeout(() => {
                this.spinning = false
                this.$message.success('添加成功')
              }, 500)
            } else {
              setTimeout(() => {
                this.spinning = false
              }, 500)
            }
          })
        }
      )
    },
    //    修改跳转页面
    updateUser (id) {
      this.$router.push({
        path: '/edit-user',
        query: { id }
      })
    },
    handleCancel () {
      this.editDiaLog = false
      this.batchRoleDialog = false
    },
    handleInput () {
      this.$nextTick(() => {
        let code = this.form.getFieldValue('code')
        if (code) {
          code = '' + code
          code = code.replace(/[^-?\d]/g, '')
          this.form.setFieldsValue({ code: code })
        }
      })
    },
    // 给表格添加index
    getTabIndex (tabList) {
      for (let i = 0; i < tabList.length; i++) {
        tabList[i].index = i
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  /*@import "common/styles/base.scss";*/
  .save-cancel-content{
    overflow: hidden;
    .save-cancel-con-role{
      float: left;
      width: 710px;
    }
    .save-cancel-con-time{
      float: left;
      margin-right: 10px;
      .number-line{
        display: block;
        height: 35px;
        max-width: 1px;
        background: #1890ff;
        margin:10px 0 10px 15px;
      }
      .number-time{
        border-radius: 50%;
        display: block;
        width: 30px;
        height: 30px;
        background: #1890ff;
        color: #fff;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .save-cancel-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px;
    background: #fff;
    text-align: right;
  }
  .role-dialog-input{
    margin-left: -30px;
    .ant-form-item{
      width: 60%;
      display: inline-block;
    }
    >button{
      margin-top: 4px;
    }
  }
  .search-filter {
    //@include input;
  }
  .user-option>div {
    width: 100%;
  }
</style>
<!--修改页面的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
  /*@import "common/styles/base.scss";*/
  .content-detail{
    .u-filter{
      margin-bottom: 12px;
    }
  }
  .role-dialog-table{
    margin-top: 8px;
  }
  .user-content{
    .content-detail{
      background: #fff;
      /*margin: 24px;*/
    }
  }
  .loadingText{
    height:65px;
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
    font-size: 15px;
    padding-left: 5px;
  }
  .modal-body-table td{
    line-height: 1.42857143;

    text-align: left;
    padding-right: 5px;
  }
  .user-option>select,
  .user-input>input{
    width: 100%;
    height:32px;
    outline: none;
    padding-left: 8px;
  }
  .user-option>select{
    border-color: #d2d6de;
  }
  .user-option>select:focus,
  .user-input>input:focus{
    border-color: #1e90ff;
  }
  .user-input>input{
    border:1px solid #d2d6de;
    padding-left: 12px;
  }
  .xin{
    color: #E91E63;
    padding-left: 4px;
  }
  .showDialog{
    opacity: 1;
  }
  /*end*/
  .table-container{
    table .search-filter {
      th:nth-child(1){
        min-width: 200px;
      }
      th:nth-child(2){
        width: 10%;
        min-width: 100px;
      }
      th:nth-child(3){
        width: 10%;
        min-width: 100px;
      }
      th:nth-child(4){
        width: 15%;
        min-width: 120px;
      }
      th:nth-child(5){
        width: 20%;
        min-width: 150px;
      }
      th:last-child{
        width: 70px;
        min-width: 70px;
      }
    }
  }
  .user-content{
    .experiment-info {
      padding: 0 0 16px 0;
      overflow: hidden;
      transition: height ease .3s;
      .label-input{
        width: calc(20% - 10px);
        display: inline-block;
      }
      .search-btn-input{
        display: inline-block;
        margin-top: 5px;
        vertical-align: top;
      }
    }
  }
  .pull-right{
    float: right;
  }
  ::v-deep .ant-form-item{
    margin-bottom: 0;
  }
  .item-info-tag{
    list-style: none;
    font-feature-settings: "tnum";
    display: inline-block;
    height: auto;
    margin: 0 8px 0 0;
    padding: 0 7px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: default;
    margin-bottom: 4px;
    display: inline-block;
  }
  .experiment-info{
    > div {
      > div{
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
</style>
