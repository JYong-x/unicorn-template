<template>
  <u-container :skeleton="show">
    <div
      v-if="!show"
      class="u-page-button"
    >
      <a
        type="primary"
        @click="addDiaLog"
      >
        <a-icon type="plus"></a-icon>添加权限
      </a>
    </div>
    <div
      id="admin-permission"
      class="container-all"
    >
      <div class="content-detail content-detail-perm">
        <div class="content-detail-input">
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
      </div>
      <div class="content-detail content-detail-function content-detail-perm">
        <div class="content-detail-box">
          <a-spin
            :spinning="spinning"
          >
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
                        <span>[{{ it.name }}]{{ it.description }}</span>
                      </template>
                      <span
                        class="perm-detail-name"
                      >[{{ it.name }}]{{ it.description }}</span>
                    </a-popover>
                    <span class="perm-detail-action">
                      <a-icon
                        type="edit"
                        @click="editDiaLog(record,index,item,num,it,i)"
                      ></a-icon>
                      <a-popconfirm
                        cancel-text="取消"
                        ok-text="确定"
                        title="确定删除?"
                        @confirm="delPermissionList(record,index,item,num,it,i)"
                      >
                        <a-icon
                          type="delete"
                        >
                        </a-icon>
                      </a-popconfirm>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a-spin>
        </div>
      </div>
      <div>
        <a-modal
          :visible="permissionDialog"
          :mask-closable="maskClosable"
          cancel-text="取消"
          ok-text="确认"
          title="添加/编辑权限"
          wrap-class-name="admin-permission-modal"
          @cancel="handleCancel"
          @ok="savePermission"
        >
          <div>
            <a-form :form="form">
              <div>
                <a-form-item
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  label="功能模块"
                  has-feedback
                >
                  <a-input
                    v-decorator="['functionModule',{rules: [{ required: true, message: '请输入功能模块!' }]}]"
                    :max-length="20"
                    @click="linkFunctionModuleName"
                    @change="linkFunctionModule"
                  ></a-input>
                </a-form-item>
                <div
                  v-if="functionModuleList"
                  class="input-tab"
                >
                  <span
                    v-for="(item,index) of functionModuleNameList"
                    :key="index"
                    @click="changeModuleName(item)"
                  >
                    <span>{{ item }}</span>
                  </span>
                </div>
              </div>
              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="权限类别"
                has-feedback
              >
                <a-select
                  v-decorator="['typeId',{rules: [{ required: true, message: '请选择功能模块!' }]}]"
                  show-search
                  style="width: 100%;"
                  option-filter-prop="children"
                >
                  <a-select-option
                    v-for="item of krimPermTypeDtoList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.typeName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="权限名称"
                has-feedback
              >
                <a-input
                  v-decorator="['name',{rules: [{ required: true, message: '请输入权限名称!' }]}]"
                  :max-length="40"
                  @change="handleInput"
                ></a-input>
              </a-form-item>
              <a-form-item
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
                label="权限内容"
                has-feedback
              >
                <a-input
                  v-decorator="['description',{rules: [{ required: true, message: '请输入权限内容!' }]}]"
                  :max-length="30"
                ></a-input>
              </a-form-item>
            </a-form>
          </div>
        </a-modal>
      </div>
    </div>
  </u-container>
</template>

<script>
import deepClone from 'lodash.clonedeep'
import pick from 'lodash.pick'
import { httpConfig } from '@/config'

const userBaseHttp = httpConfig.userApi

export default {
  name: 'Permission',
  data () {
    return {
      maskClosable: false,
      spinning: false,
      permissionVOList: [],
      permissionCategoryFinder: [],
      module: '',
      rowItemDetail: {},
      permissionDialog: false,
      rowItem: {},
      rowItemLine: {},
      lastTime: 0,
      expandList: [],
      expandAllRowState: false,
      curIndex: -1,
      sendIndex: 0,
      prePermissionList: [],
      permissionList: [],
      curPermTWrapper: {},
      permWrapperGroupByTypes: [],
      krimPermTypeDtoList: [],
      originalList: [],
      permMenuFinders: [],
      functionModuleNameList: [],
      functionModuleList: false,
      clickFunction: true,
      indexOfSelectedLine: '',
      indexList: '',
      show: false,
      selected: {},
      namespaceCode: '',
      modalAdd: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
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
  created () {
    this.getPermissionInfo()
  },
  methods: {
    handleInput () {
      this.$nextTick(() => {
        let name = this.form.getFieldValue('name')
        if (name) {
          name = '' + name
          name = name.replace(/[^A-Za-z]*$/, '')
          this.form.setFieldsValue({ name: name })
        }
      })
    },
    //    进入页面获取数据
    getPermissionInfo () {
      this.show = true
      this.namespaceCode = this.$store.state.app.namespace
      this.$api.admin.permissionList({ nameSpace: this.namespaceCode }).then(res => {
        if (res.data) {
          // Dialog数据
          this.curPermTWrapper = res.data.curPermTWrapper
          // 权限类别Finder
          this.krimPermTypeDtoList = res.data.krimPermTypeDtoList
          // 页面Finder
          this.permMenuFinders = res.data.permMenuFinders
          // 表格数据
          this.permWrapperGroupByTypes = res.data.permWrapperGroupByTypes
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
          this.originalList = deepClone(this.permWrapperGroupByTypes)
        }
        this.show = false
      }, () => {
        this.show = false
      })
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
      this.spinning = false
    },

    // 删除
    delPermissionList (record, index, item, num, it, i) {
      this.spinning = true
      this.$api.admin.deletePermission(record.authorityVOList[num].permissionsDetails[i].id).then(res => {
        if (res.data) {
          this.permWrapperGroupByTypes[index].authorityVOList[num].permissionsDetails.splice(i, 1)
          this.permWrapperGroupByTypes[index].authorityVOList[num].permissionsDetails = [...this.permWrapperGroupByTypes[index].authorityVOList[num].permissionsDetails]
          this.permWrapperGroupByTypes[index].authorityVOList = [...this.permWrapperGroupByTypes[index].authorityVOList]
          this.permWrapperGroupByTypes = [...this.permWrapperGroupByTypes]
          this.originalList = deepClone(this.permWrapperGroupByTypes)
          this.$message.success('删除成功')
        }
        this.spinning = false
      })
    },
    //    添加DiaLog
    addDiaLog () {
      // 初始化数据
      this.curPermTWrapper = {}
      this.permissionDialog = true
      this.form = this.$form.createForm(this)
    },
    changeModuleName (str) {
      this.functionModuleList = false
      this.curPermTWrapper.functionModule = str
      // 等待表格渲染后设值
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.curPermTWrapper, 'functionModule'))
      })
    },
    linkFunctionModuleName () {
      if (this.clickFunction) {
        const functionModule = ' '
        this.$api.admin.functionModuleName({
          nameSpace: this.namespaceCode,
          moduleName: functionModule
        }).then(res => {
          if (res.data) {
            this.functionModuleNameList = res.data.data
            this.functionModuleList = true
          }
        })
        this.clickFunction = false
      }
    },
    // 功能模块联想
    linkFunctionModule () {
      this.$nextTick(() => {
        const functionModule = this.form.getFieldValue('functionModule')
        if (functionModule) {
          if (this.lastTime === 0) {
            this.lastTime = setTimeout(() => {
              this.$api.admin.functionModuleName({
                nameSpace: this.namespaceCode,
                moduleName: functionModule }
              ).then(res => {
                if (res.data) {
                  this.functionModuleNameList = res.data.data
                }
              })
              this.functionModuleList = true
            }, 600)
          } else {
            clearTimeout(this.lastTime)
            this.lastTime = setTimeout(() => {
              this.$api.admin.functionModuleName().then(res => {
                if (res.data) {
                  this.functionModuleNameList = res.datadata
                }
              })
              this.functionModuleList = true
            }, 600)
          }
        } else {
          this.lastTime = 0
          this.functionModuleList = false
        }
      })
    },
    // 关闭添加dialog
    handleCancel () {
      this.permissionDialog = false
      this.functionModuleList = false
    },
    // 给表格添加index
    getTabIndex (tabList) {
      if (tabList && tabList.length > 0) {
        for (let i = 0; i < tabList.length; i++) {
          tabList[i].index = i
        }
      }
    },
    //    编辑DiaLog
    editDiaLog (record, index, item, number, it, i) {
      this.permissionDialog = true
      this.curPermTWrapper = deepClone(it)
      this.curPermTWrapper.functionModule = record.functionModuleName
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.curPermTWrapper, 'functionModule', 'name', 'typeId', 'description'))
      })
      this.rowItem = record
      this.rowItem.index = index
      this.rowItemLine = item
      this.rowItemLine.index = number
      this.rowItemDetail = it
      this.rowItemDetail.index = i
    },

    //    添加/编辑确定DiaLog
    savePermission () {
      const _this = this
      this.form.validateFields(
        (err, values) => {
          if (err) {
            return
          }
          Object.assign(_this.curPermTWrapper, values)
          _this.curPermTWrapper.namespaceCode = _this.namespaceCode
          _this.permissionDialog = false
          _this.spinning = true
          if (_this.curPermTWrapper.id) {
            // 修改权限
            this.putJsonRequest(`/permManage`, _this.curPermTWrapper, userBaseHttp).then((res) => {
              if (res.data) {
                let str = ''
                let lineIndex = ''
                if (_this.rowItemDetail.id === res.data.data.id) {
                  _this.originalList.forEach((item) => {
                    if (item.krimPermTWrapperList && item.krimPermTWrapperList.length > 0) {
                      item.krimPermTWrapperList.forEach((line, index) => {
                        if (line.id === this.rowItemDetail.id) {
                          item.krimPermTWrapperList.splice(index, 1)
                        }
                      })
                    }
                  })
                  if (_this.curPermTWrapper.functionModule === _this.originalList[_this.rowItem.index].functionModuleName) {
                    str = '模块没变'
                    _this.originalList[_this.rowItem.index].krimPermTWrapperList.forEach((item, indexs) => {
                      if (item.typeId === _this.curPermTWrapper.typeId) {
                        str = '类别没变'
                        lineIndex = indexs
                      }
                    })
                    if (str === '类别没变') {
                      _this.originalList[_this.rowItem.index].krimPermTWrapperList.splice(lineIndex, 0, res.data.data)
                    }
                    if (str === '模块没变') {
                      _this.originalList[_this.rowItem.index].krimPermTWrapperList.push(res.data.data)
                    }
                  }
                  if (str === '') {
                    str = '模块改变'
                    _this.originalList.forEach((item, num) => {
                      if (item.functionModuleName === _this.curPermTWrapper.functionModule) {
                        str = '模块变更为其他'
                        item.krimPermTWrapperList.forEach((line, indexs) => {
                          if (line.typeId === _this.curPermTWrapper.typeId) {
                            str = '模块变，类别没变'
                            if (indexs === 0) {
                              lineIndex = indexs
                            } else {
                              lineIndex = indexs - 1
                            }
                          }
                        })
                        if (str === '模块变，类别没变') {
                          item.krimPermTWrapperList.splice(lineIndex, 0, res.data.data)
                        }
                      }
                      if (str === '模块变更为其他') {
                        item.krimPermTWrapperList.push(res.data.data)
                      }
                    })
                  }
                  if (str === '模块改变') {
                    const list = {}
                    list.krimPermTWrapperList = []
                    list.functionModuleName = _this.curPermTWrapper.functionModule
                    list.krimPermTWrapperList.push(res.data.data)
                    _this.originalList.push(list)
                  }
                }
              }
              _this.setPermVOList(_this.originalList)
            })
          } else {
            this.$api.admin.savePermission(_this.curPermTWrapper).then((res) => {
              if (res.data) {
                let index = 0
                let lineIndex = 0
                _this.originalList.forEach((item, num) => {
                  if (item.functionModuleName === _this.curPermTWrapper.functionModule) {
                    index = 1
                    item.krimPermTWrapperList.forEach((line, indexs) => {
                      if (line.typeId === _this.curPermTWrapper.typeId) {
                        index = 2
                        if (indexs === 0) {
                          lineIndex = indexs
                        } else {
                          lineIndex = indexs - 1
                        }
                      }
                    })
                    if (index === 2) {
                      item.krimPermTWrapperList.splice(lineIndex, 0, res.data.data)
                    }
                  }
                  if (index === 1) {
                    item.krimPermTWrapperList.push(res.data.data)
                    _this.getTabIndex(_this.permWrapperGroupByTypes[num].krimPermTWrapperList)
                  }
                })
                if (index === 0) {
                  const list = {}
                  list.krimPermTWrapperList = []
                  list.functionModuleName = _this.curPermTWrapper.functionModule
                  list.krimPermTWrapperList.push(res.data.data)
                  _this.originalList.push(list)
                }
                _this.setPermVOList(_this.originalList)
                _this.$message.success('添加成功')
              }
              _this.permissionDialog = false
            })
          }
        })
      this.spinning = false
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .admin-permission-modal {
    .input-tab{
      position: absolute;
      width: 314px;
      background-color: #fff;
      z-index: 2;
      margin-left: 98px;
      margin-top: -20px;
      color:rgba(0, 0, 0, 0.65);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      max-height: 270px;
      overflow-y: overlay;
      >span{
        display: block;
        cursor: pointer;
        >span{
          display: inline-block;
          padding: 5px 12px;
        }
        &:hover{
          background-color: #e6f7ff;
        }
      }
    }
  }
  #admin-permission {
    .permission-table{
      .ant-table-expanded-row{
        background-color: #fff;
        .permission-table-wrapperList{
          .ant-table-tbody{
            >tr{
              >td{
                border: 1px solid #e8e8e8;
                &:first-child{
                  border-bottom: 1px solid #fff;
                  border-top: 1px solid #fff;
                  border-left: 1px solid #fff;
                }
              }
              &:hover{
                >td{
                  &:first-child{
                    background-color: #fff;
                  }
                }
              }
            }
          }
        }
        &:hover{
          background-color: #fff;
        }
      }
    }

  }
</style>

<style lang="scss" scoped>
  /* @import "assets/styles/base.scss"; */
  .content-detail-perm{
    /* margin: 24px; */
  }
  .content-detail-function{
    /* padding: 10px 20px; */
    margin-top: 24px;
  }
  .content-btn{
    text-align: right;
  }
  .content-detail-box{
    .content-detail-box-function{
      margin-bottom: 16px;
    }
    .functionModuleName{
      font-size: 15px;
      font-weight: 500;
      color:rgba(0,0,0,0.85);
      margin-bottom: 16px;
    }
    .perm-detail-title{
      font-size: 14px;
      font-weight: 500;
      color: #595959;
      margin-bottom: 8px;
    }
    .perm-detail-content{
      display: flex;
      flex-flow: wrap;
      .perm-detail-action{
        >i{
          margin-left: 8px;
          &:first-child{
            color: #1890ff;
          }
          &:nth-child(2){
            color: red;
          }
        }
      }
      .perm-detail-name{
        display: inline-block;
        width: calc(100% - 60px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      >div{
        background: rgb(230,239,250);
        border-radius: 3px;
        padding: 8px 16px;
        width: calc(25% - 12px);
        margin-right: 16px;
        margin-bottom: 16px;
        &:nth-child(4n+4){
          margin-right: 0;
        }
      }
    }
  }
  .content-detail{
    /* margin: 25px; */
    background-color: #fff;
    .content-detail-input{
      >button{
        margin-left: 8px;
      }
    }
    .content-detail-button{
      float: right;
      margin: 0 10px;
    }
    .permission-table{
      padding: 43px 10px 10px 10px;
    }
  }
  .container-box{
    //@include box;
  }
  table{
    border-style:none;
    border-spacing: 0;
  }
  .table-container{
    width: 100%;
    margin-top:20px;
    margin-bottom:20px;
    padding:10px;
    background-color: #fff;
    overflow: hidden;
  }
  .content-table{
    width:100%;
  }
  .content-table>tbody:nth-child(odd)>tr{
    background-color: #f5f5f5;
  }
  .content-table>tbody:nth-child(even)>tr{
    background-color: #fff;
  }
  .content-title,
  .content-text{
    width:50%;
    text-align:left;
    height: 40px;
    line-height: 40px;
  }
  .content-title{
    background-color: #f5f5f5;
    color:#357ca5;
    font-size: 16px;
  }
  .content-info-table{
    width:200% !important;
    background-color: #fafad2;
    padding: 10px;
  }
  .content-info-table>tbody>tr:nth-child(even){
    background-color: #f5f5f5;
  }
  .content-info-table>tbody>tr:nth-child(odd){
    background-color: #fff;
  }
  .content-info-title,
  .content-info-text{
    text-align:left;
    height: 40px;
    line-height: 40px;
  }
  .content-info-title{
    background-color: #f5f5f5;
    color:#357ca5;
    font-size: 16px;
  }
  .btn-icon{
    cursor:pointer;
    font-size: 24px;
    color: #59cf56;
    font-weight: bold;
  }
  .btn-icon::selection{
    background-color: #fff;
  }

  /* 静态框样式 */
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
  .permission-option>select:focus,
  .permission-input>input{
    border:1px solid #d2d6de;
    padding-left: 12px;
  }
  .permission-input>input:focus{
    border-color: #1e90ff;
  }
  .tips{
    padding: 10px;
    font-size: 16px;
    color: #E91E63;
  }
  .expand-all {
    position: absolute;
    display: inline-block;
    width: 2.9%;
    min-width: 50px;
    height: 53px;
    top: 10px;
    left: 0;
    border: none;
    color: #40a9ff;
    text-align: center;
    line-height: 53px;
    z-index: 10;
  }
  @media screen and (max-width: 1600px) {
    .content-detail-box{
      .perm-detail-content{
        >div{
          width: calc(33.3% - 11px);
          margin-right: 16.5px;
          &:nth-child(4n+4){
            margin-right: 16.5px;
          }
          &:nth-child(3n+3){
            margin-right: 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .content-detail-box{
      .perm-detail-content{
        >div{
          width: calc(50% - 8px);
          margin-right: 16px;
          &:nth-child(3n+3),
          &:nth-child(4n+4){
            margin-right: 16px;
          }
          &:nth-child(2n+2){
            margin-right: 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    .content-detail-box{
      .perm-detail-content{
        >div{
          width: 100%;
          margin-right: 0;
          &:nth-child(3n+3),
          &:nth-child(4n+4){
            margin-right: 0;
          }
        }
      }
    }
  }

  /* end */
</style>
