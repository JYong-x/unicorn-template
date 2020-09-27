/**
 * 四六级
 */
const examUrl = 'http://my.cqu.edu.cn/tams/portal'
const examRouterMap = [
  {
    path: '',
    name: 'SignUp',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '报名'
    }
  },
  {
    path: examUrl + '/invigilate?viewId=InvigilateView&amp;methodToCall=getInvigilatorApplicant&amp;pageId=pageInvigilatorApplicant',
    name: 'InvigilatorApplicant',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-shenqing6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewInvigilatorApplicantPagePermission'],
      pageTitle: '申请监考'
    }
  },
  {
    path: examUrl + '/?methodToCall=getCetApplyPage&amp;viewId=PortalView&amp;pageId=pageInfoBeforeCetApply',
    name: 'CetApplyPagePermission',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-shenqing6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewCetApplyPagePermission'],
      pageTitle: '四六级报名'
    }
  },
  {
    path: '',
    name: 'mange',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '管理'
    }
  },
  {
    path: examUrl + '/?methodToCall=getSetTimeInfoPage&amp;viewId=PortalView&amp;pageId=pageSetExmTimeInfo',
    name: 'SetTimeInfoPage',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-shijian2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewSetTimeInfoPagePermission'],
      pageTitle: '考次'
    }
  },
  {
    path: examUrl + '/?methodToCall=getRoleManagerPage&amp;viewId=PortalView&amp;pageId=pageRoleManager',
    name: 'examRoleManagerPage',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewRoleManagerPagePermission'],
      pageTitle: '角色'
    }
  },
  {
    path: examUrl + '/?methodToCall=getUserRoleManagerPageAll&amp;viewId=PortalView&amp;pageId=pageUserRoleManager',
    name: 'examUserRoleManager',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-yonghu6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewUserRoleManagerPagePermission'],
      pageTitle: '用户'
    }
  },
  {
    path: examUrl + '/?methodToCall=getPermissionManagementPage&amp;viewId=PortalView&amp;pageId=pagePermissionManagement',
    name: 'examPermissionManagementPage',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewPermissionManagementPagePermission'],
      pageTitle: '权限'
    }
  },
  {
    path: examUrl + '/?methodToCall=getSystemParameterPage&amp;viewId=PortalView&amp;pageId=pageSystemParameter',
    name: 'SystemParameter',
    coordinateX: 2,
    coordinateY: 6,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewSystemParameterPermission'],
      pageTitle: '系统配置'
    }
  },
  {
    path: examUrl + '/?methodToCall=getPermissionManagementPage&amp;viewId=PortalView&amp;pageId=pagePermissionManagement',
    name: 'PermissionManagementPage',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-caozuorizhi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewPermissionManagementPagePermission'],
      pageTitle: '日志'
    }
  },
  {
    path: examUrl + '/?methodToCall=getSystemParameterPage&amp;viewId=PortalView&amp;pageId=pageSystemParameter/?methodToCall=getBaseInfoPage&amp;viewId=PortalView&amp;pageId=pageBaseInfo',
    coordinateX: 2,
    coordinateY: 6,
    name: 'BaseInfo',
    iconCls: 'icon-chushihua',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewBaseInfoPagePermission'],
      pageTitle: '数据同步'
    }
  },
  {
    path: examUrl + '/syncUserInfo?viewId=SyncUserInfoView&amp;methodToCall=start&amp;pageId=pageSyncUserInfo',
    coordinateX: 2,
    coordinateY: 7,
    name: 'SyncUserInfo',
    iconCls: 'icon-shijiantongbu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewSyncUserInfoPagePermission'],
      pageTitle: '用户信息同步'
    }
  },
  {
    path: examUrl + '/?methodToCall=getStudentGradeImportPage&amp;viewId=PortalView&amp;pageId=pageGradeImport',
    coordinateX: 2,
    coordinateY: 8,
    name: 'GradeImport',
    iconCls: 'icon-xiangmujieduan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewGradeImportPagePermission'],
      pageTitle: '成绩导入'
    }
  },
  {
    path: '',
    name: 'Proctor',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '监考'
    }
  },
  {
    path: examUrl + '/invigilate?viewId=InvigilateView&amp;methodToCall=getInvigilatePreset&amp;pageId=pageInvigilatorPreset',
    name: 'InvigilatorPreset',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-c-apply',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewInvigilatorPresetPagePermission'],
      pageTitle: '名额设置'
    }
  },
  {
    path: examUrl + '/invigilate?viewId=InvigilateView&amp;methodToCall=getInvigilator&amp;pageId=pageInvigilatorManagement',
    name: 'examInvigilatorManagement',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewInvigilatorManagementPagePermission'],
      pageTitle: '监考安排'
    }
  },
  {
    path: examUrl + '/?methodToCall=getTimetablePage&amp;viewId=PortalView&amp;pageId=pageTimetable',
    name: 'Timetable',
    coordinateX: 3,
    coordinateY: 4,
    iconCls: 'icon-jindu4',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewTimetablePagePermission'],
      pageTitle: '考试编排'
    }
  },
  {
    path: examUrl + '/?methodToCall=getSignCheckPage&amp;viewId=PortalView&amp;pageId=pageSignCheck',
    name: 'SignCheckPage',
    coordinateX: 3,
    coordinateY: 5,
    iconCls: 'icon-jindu13',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewSignCheckPagePermission'],
      pageTitle: '培训签到'
    }
  },
  {
    path: examUrl + '/invigilate?viewId=InvigilateView&amp;methodToCall=getCollegeInvigilatorPage&amp;pageId=pageCollegeInvigilator',
    name: 'CollegeInvigilatorPage',
    coordinateX: 3,
    coordinateY: 6,
    iconCls: 'icon-academy',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewCollegeInvigilatorPagePermission'],
      pageTitle: '监考调整'
    }
  },
  {
    path: examUrl + '/invigilate?viewId=InvigilateView&amp;methodToCall=getExamPatrolListPage&amp;pageId=pagePatrolExam',
    name: 'PatrolExam',
    coordinateX: 3,
    coordinateY: 6,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewPatrolExamPagePermission'],
      pageTitle: '巡考'
    }
  },
  {
    path: examUrl + '/?methodToCall=getExamWorkerManagePage&amp;viewId=PortalView&amp;pageId=pageStaffMember',
    coordinateX: 3,
    coordinateY: 7,
    name: 'StaffMember',
    iconCls: 'icon-bd_niuren',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewStaffMemberPagePermission'],
      pageTitle: '工作人员'
    }
  },
  {
    path: '',
    name: 'other',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '其他'
    }
  },
  {
    path: examUrl + '/?methodToCall=getExmStudentPage&amp;viewId=PortalView&amp;pageId=pageExmStudent',
    name: 'ExmStudent',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-jiaoxueziyuan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewExmStudentPagePermission'],
      pageTitle: '学籍信息'
    }
  },
  {
    path: examUrl + '/?methodToCall=getApplicantInfoPage&amp;viewId=PortalView&amp;pageId=pageApplicantInfo',
    name: 'ApplicantInfoPage',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-rizhi1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewApplicantInfoPagePermission'],
      pageTitle: '考生信息'
    }
  },
  {
    path: examUrl + '/?methodToCall=getExamRoomPrintPage&amp;viewId=PortalView&amp;pageId=pageExamRoomPrint',
    name: 'ExamRoom',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-dayin1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewExamRoomPrintPagePermission'],
      pageTitle: '报表打印'
    }
  },
  {
    path: examUrl + '/?viewId=PortalView&amp;methodToCall=getStudentGradeDetailPage&amp;pageId=pageGradeView',
    name: 'GradeView',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-chakan7',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewGradeViewPagePermission'],
      pageTitle: '成绩查看'
    }
  },
  {
    path: examUrl + '/?viewId=PortalView&amp;methodToCall=getMessagePage&amp;pageId=pageMessage',
    name: 'examCollegeInvigilatorPage',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-youxiang1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_EXM',
      permission: ['ViewCollegeInvigilatorPagePermission'],
      pageTitle: '发送信息'
    }
  }
]

export default {
  name: '四六级考试',
  code: 'exam',
  icon: 'icon-svgmoban58',
  originRouters: examRouterMap
}
