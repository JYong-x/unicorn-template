<template>
  <div class="container-all">
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
      class=""
    >
      <div class="content-role">
        <div class="content-detail-left">
          <div
            class="top-btn"
          >
            <a-button
              type="primary"
              @click="addRoleTo()"
            >
              添加
            </a-button>
          </div>
          <div class="table-container">
            <div class="roleTable">
              <a-spin :spinning="spinning">
                <a-table
                  :columns="columns"
                  :data-source="krim_role_t_dtos"
                  :pagination="false"
                  :row-key="record => record.id"
                  :scroll="{y: 605}"
                >
                  <span
                    slot="active"
                    slot-scope="text, record"
                  >
                    <span><span
                      :class="record.active==='Y' ? 'endStatus':''"
                      class="positionStatus"
                    ></span>{{ record.active==='Y' ? '可用' : '失效' }}</span>
                  </span>
                  <span
                    slot="action"
                    slot-scope="text, record,index"
                  >
                    <a
                      v-if="record.action === true"
                      @click="getRoleDetailPage(record,index)"
                    >修改</a>
                    <span v-else>修改中</span>
                  </span>
                </a-table>
              </a-spin>
            </div>
          </div>
        </div>
        <div class="content-detail-right">
          <!--空闲时间-->
          <div v-if="!toLayOut">
            <div><span class="functionModuleTitle">编辑角色</span></div>
            <div class="contentBlock">
              <no-trapezoid-img
                :show="true"
                :show-btn="false"
                massage="请选择编辑或添加角色"
              ></no-trapezoid-img>
            </div>
          </div>
          <div v-else>
            <div>
              <span class="functionModuleTitle">编辑角色</span>
              <div class="role-info-search">
                <div class="label-input">
                  <a-form :form="form">
                    <a-form-item
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                      label="角色名称"
                      has-feedback
                    >
                      <a-input
                        v-decorator="['name',{rules: [{ required: true, message: '请输入角色名称!' }]}]"
                        :max-length="20"
                        style="width: 100%"
                      ></a-input>
                    </a-form-item>
                  </a-form>
                </div>
                <div class="label-input">
                  <a-form-item
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    label="角色描述"
                    has-feedback
                  >
                    <a-input
                      v-model="curRole.description"
                      :max-length="20"
                      style="width: 100%"
                    ></a-input>
                  </a-form-item>
                </div>
                <div class="label-input">
                  <a-form :form="form">
                    <a-form-item
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol"
                      label="分类"
                      has-feedback
                    >
                      <a-select
                        v-decorator="['type',{rules: [{ required: true, message: '请选择分类!' }]}]"
                        option-filter-prop="children"
                        style="width: 100%"
                        show-search
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
                  </a-form>
                </div>
                <div class="label-input label-active-input">
                  <span>角色状态：</span>
                  <a-radio-group v-model="curRole.active">
                    <a-radio value="Y">
                      可用
                    </a-radio>
                    <a-radio value="N">
                      失效
                    </a-radio>
                  </a-radio-group>
                </div>
              </div>
              <div class="permission-table-role-input">
                <a-input
                  v-model="module"
                  placeholder="请输入权限名称搜索"
                  style="width: 377px"
                  @keyup.enter="search()"
                ></a-input>
                <a-button @click="search">
                  搜索
                </a-button>
              </div>
              <a-spin :spinning="spinningPermission">
                <div class="permission-table-role">
                  <div
                    v-for="(record,index) of permWrapperGroupByTypes"
                    :key="index"
                    class="content-detail-box-function"
                  >
                    <div
                      v-show="record.authorityVOList && record.authorityVOList.length>0"
                      class="functionModuleName"
                    >
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
                          <span class="perm-detail-action">
                            <!--操作-->
                            <a-checkbox
                              :checked="it.checked"
                              @change="changeSelectRole(it)"
                            ></a-checkbox>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a-spin>
            </div>
            <div class="footer-button">
              <div>
                <a-button @click="cancelRole">
                  取消
                </a-button>
                <a-button
                  :loading="saveFlag"
                  type="primary"
                  @click="saveRole"
                >
                  保存
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deepClone from 'lodash.clonedeep'
import noTrapezoidImg from './noTrapezoidImg'

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 260
  }, {
    title: '角色描述',
    key: 'description',
    dataIndex: 'description',
    width: 180
  },
  {
    title: '分类',
    key: 'type',
    dataIndex: 'type',
    width: 100
  },
  {
    title: '角色状态',
    key: 'active',
    dataIndex: 'active',
    scopedSlots: { customRender: 'active' },
    width: 100
  }, {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }]

export default {
  name: 'Role',
  components: { noTrapezoidImg },
  data () {
    return {
      columns,
      module: '',
      spinning: false,
      spinningPermission: false,
      show: false,
      toLayOut: false,
      addRole: false,
      saveFlag: false,
      oPermWrapperGroupByTypes: [],
      permWrapperVOList: [],
      active: '',
      typeFinder: [
        { id: '学院', name: '学院' },
        { id: '学校', name: '学校' },
        { id: '基础', name: '基础' },
        { id: '系统', name: '系统' }
      ],
      radioBtnVal: '所有权限',
      form: this.$form.createForm(this),
      curRole: {},
      krim_role_t_dtos: [],
      permWrapperGroupByTypes: [],
      defaultHookList: [],
      defaultHookListId: [],
      selectList: [],
      curRoleId: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
  },
  mounted () {
    this.getRoleInfo()
  },
  methods: {
    //    进入页面获取数据
    getRoleInfo () {
      this.show = true
      this.namespaceCode = this.$route.meta.namespaceCode
      this.$api.admin.roleList({ nameSpace: this.namespaceCode }).then(resp => {
        if (resp && resp.status === 200) {
          // 表格数据
          this.krim_role_t_dtos = resp.data.krim_role_t_dtos || []

          this.krim_role_t_dtos.forEach((item) => {
            item.action = true
          })
          this.show = false
        } else {
          this.show = false
        }
      })
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
      this.spinningPermission = true
      const _this = this
      const original = []
      const searchItem = ['typeName', 'name', 'description']
      this.permWrapperVOList.filter((item, index, arr) => {
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
        this.spinningPermission = false
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
    getPermissionInfo (item) {
      this.spinningPermission = true
      this.$api.admin.rolePermissions({ nameSpace: this.namespaceCode, id: item.encryptId }).then(resp => {
        // 表格数据
        this.permWrapperGroupByTypes = resp.data.permTWrappers
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
        this.permWrapperVOList = deepClone(this.permWrapperGroupByTypes)
        this.setChecked()

        setTimeout(() => {
          this.spinningPermission = false
        }, 500)
      }, () => {
        setTimeout(() => {
          this.spinningPermission = false
        }, 500)
      })
    },
    getAddPermissionInfo () {
      this.spinningPermission = true
      this.$api.admin.roleAddPermissions({ nameSpace: this.namespaceCode }).then(resp => {
        if (resp && resp.status === 200) {
          this.addRole = true
          this.permWrapperGroupByTypes = resp.data.data
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
          this.permWrapperVOList = deepClone(this.permWrapperGroupByTypes)
        }
      })
      setTimeout(() => {
        this.spinningPermission = false
      }, 500)
    },
    setChecked () {
      this.defaultHookList = []
      this.defaultHookListId = []
      if (this.permWrapperGroupByTypes && this.permWrapperGroupByTypes.length > 0) {
        this.permWrapperGroupByTypes.forEach((item) => {
          if (item.krimPermTWrapperList && item.krimPermTWrapperList.length > 0) {
            item.checked = true
            item.krimPermTWrapperList.forEach((line) => {
              if (line.checked === false || line.checked === null) {
                item.checked = false
              } else if (line.checked === true) {
                this.defaultHookList.push(line)
                this.defaultHookListId.push(line.id)
              }
            })
          } else {
            item.checked = false
          }
        })
      }
      this.permWrapperGroupByTypes = [...this.permWrapperGroupByTypes]
    },
    selectRole (item) {
      item.checked = !item.checked
      item.krimPermTWrapperList.forEach((line) => {
        if (item.checked === true) {
          line.checked = true
          this.changeRole(line)
        } else {
          line.checked = false
          this.changeRole(line)
        }
      })
      this.permWrapperGroupByTypes = [...this.permWrapperGroupByTypes]
    },
    changeSelectRole (item) {
      item.checked = !item.checked
      if (this.addRole) {
        this.permWrapperGroupByTypes = [...this.permWrapperGroupByTypes]
      }
      this.changeRole(item)
    },

    // 检查是否进行改变
    changeRole (item) {
      // let defaultVal = false;
      if (this.defaultHookListId) {
        if (item.checked === true) {
          this.defaultHookList.push(item)
          this.defaultHookListId.push(item.id)
        } else {
          this.defaultHookList.forEach((it, index) => {
            if (it.id === item.id) {
              this.defaultHookList.splice(index, 1)
            }
          })
          this.defaultHookListId.forEach((it, index) => {
            if (it === item.id) {
              this.defaultHookListId.splice(index, 1)
            }
          })
        }
      }
    },
    //    添加
    addRoleTo () {
      // this.radioBtnVal ='所有权限';
      this.toLayOut = true
      this.curRole = { active: 'Y' }
      this.krim_role_t_dtos.forEach((line) => {
        line.action = true
      })
      this.getAddPermissionInfo()
    },
    //    修改
    getRoleDetailPage (item, index) {
      this.krim_role_t_dtos.forEach((line) => {
        line.action = true
      })
      item.action = false
      // this.radioBtnVal ='所有权限';
      this.toLayOut = true
      this.curRole = deepClone(item)
      this.curRole.index = index
      this.$nextTick(() => {
        this.form.setFieldsValue({ name: this.curRole.name, type: this.curRole.type })
      })
      this.getPermissionInfo(item)
    },
    getAddPermissioId () {
      this.curRole.permissionIdList = []
      this.permWrapperGroupByTypes.forEach((item) => {
        item.krimPermTWrapperList.forEach((line) => {
          if (line.checked === true) {
            this.curRole.permissionIdList.push(line.id)
          }
        })
      })
    },
    //    保存数据
    saveRole () {
      this.form.validateFields(
        (err, values) => {
          if (err) {
            return
          }
          // 把form中的值 设置到wapper中
          this.spinning = true
          this.saveFlag = true
          const obj = {}
          Object.assign(obj, values)
          // this.selectList.forEach(it=>listId.push(it.id));
          this.curRole.namespaceCode = this.namespaceCode
          this.curRole.name = obj.name
          this.curRole.type = obj.type
          if (this.addRole) {
            this.getAddPermissioId()
          } else {
            this.curRole.permissionIdList = this.defaultHookListId
          }
          this.$api.admin.saveRole().then((resp) => {
            if (resp && resp.status === 200) {
              if (resp.data.code === 'validateFailure') {
                this.$message.error(resp.data.msg)
              } else {
                if (this.addRole) {
                  this.krim_role_t_dtos.push(resp.data.data)
                  this.krim_role_t_dtos.forEach((item) => {
                    item.action = true
                  })
                } else {
                  this.krim_role_t_dtos[this.curRole.index].type = this.curRole.type
                  this.krim_role_t_dtos[this.curRole.index].name = this.curRole.name
                  this.krim_role_t_dtos[this.curRole.index].description = this.curRole.description
                  this.krim_role_t_dtos[this.curRole.index].active = this.curRole.active
                }
                this.$message.success('保存成功')
                this.defaultHookListId = []
                this.defaultHookList = []
                this.curRole.action = true
                this.toLayOut = false
              }
            }
            this.saveFlag = false
            this.spinning = false
          }, () => {
            this.$message.error('保存失败')
            this.spinning = false
          })
          this.krim_role_t_dtos.forEach((line) => {
            line.action = true
          })
        })
    },
    cancelRole () {
      this.toLayOut = false
      this.krim_role_t_dtos.forEach((line) => {
        line.action = true
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  /*@import "assets/styles/base.scss";*/
  //@include  ant-Status;
  .permission-table-role{
    .ant-checkbox{
      margin-top: -4px;
    }
  }

</style>
<style lang="scss" scoped>
  .positionStatus{
    &:before{
      width: 6px;
      height: 6px;
      display: inline-block;
      content: '';
      border-radius: 50%;
      background: grey;
      vertical-align: 1px;
      margin-right: 2px;
    }
  }
  .endStatus{
    &:before{
      background: #52c41a;
    }
  }
  .page-main{
    margin-bottom: 76px;
  }
  .permission-table-role-input{
    padding-top: 10px;
    border-top: 1px solid #e8e8e8;
    >button{
      margin-left: 8px;
    }
  }
  .permission-table-role{
    padding-top: 10px;
    overflow: auto;
    max-height: 510px;
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
        width: calc(100% - 25px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      >div{
        background: rgb(230,239,250);
        border-radius: 3px;
        padding: 8px 16px;
        width: calc(33.3% - 11px);
        margin-right: 16.5px;
        margin-bottom: 16px;
        &:nth-child(3n+3){
          margin-right: 0;
        }
      }
    }
  }
  .functionModuleTitle{
    font-size: 16px;
    color:rgba(0,0,0,0.85);
    font-weight:500;
  }
  .functionModuleName{
    font-size: 15px;
    font-weight: 500;
    color:rgba(0,0,0,0.85);
    margin-bottom: 16px;
  }
  .roleTable{
    padding: 16px 0 0 0;
  }
  /*@import "assets/styles/base.scss";*/
  .container-box{
    //@include box;
  }
  .table-container {
    //@include tableTwo;
  }
  .btn-right{
    float: right;
  }
  .role-info-search{
    display: flex;
    flex-flow: wrap;
    margin-bottom: 6px;
    .label-radio{
      display: inline-block;
    }
    .label-active-input{
      height: 39px;
      line-height: 39px;
      >span{
        width: 25%;
        display: inline-block;
        text-align: right;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .label-input{
      display: inline-block;
      width: calc(50% - 12px)!important;
      margin-right: 12px;
      .ant-form-item{
        margin-bottom: 0;
      }
      .ant-form-item-control-wrapper{
        width: 70%;
      }
    }
  }
  .content-role{
    overflow: hidden;
    .top-btn{
      text-align: right;
    }
    >div{
      width: calc(50% - 12px);
      padding: 24px;
      background-color: #fff;
      border: 1px #e8e8e8 solid;
      border-radius: 4px;
    }
    .content-detail-left{
      float: left;
    }
    .content-detail-right{
      overflow: hidden;
      float: right;
      .footer-button{
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        right: 0;
        background: #fff;
        border-radius: 0 0 4px 4px;
        z-index: 1;
        margin: 0;
      }
      .title{
        padding-top: 8px;
        font-size: 17px;
        font-weight: bold;
      }
      .tipsContainer{
        font-size:70px;
        color: #ffc069;
        width: 100%;
        text-align: center;
      }
      .tipsContentText{
        font-size: 17px;
        color: rgb(96, 98, 102);
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 1795px) {
  }
  @media screen and (max-width: 1380px) {
    .permission-table-role{
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
</style>
