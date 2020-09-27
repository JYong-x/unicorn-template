/**
 * 助教
 */
const tamsUrl = 'http://my.cqu.edu.cn/tams/portal'
const tpmsUrl = 'http://my.cqu.edu.cn/tpms/portal'
const tamsRouterMap = [
  {
    path: tamsUrl + '/home?methodToCall=getCommonHome&amp;viewId=PortalView',
    name: 'tamsHome',
    coordinateX: 1,
    coordinateY: 1,
    iconCls: 'icon-zhuye',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '主页'
    }
  },
  {
    path: tamsUrl + '/class?methodToCall=getClassListPage&amp;viewId=ClassView',
    name: 'ClassList',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewClassListPage'],
      pageTitle: '课程'
    }
  },
  {
    path: tamsUrl + '/ta?methodToCall=getTaListPage&amp;viewId=TaView',
    name: 'TaList',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTaListPage'],
      pageTitle: '助教'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getFundsPage&amp;viewId=AdminView',
    name: 'tamsFundsManagement',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewFundsManagementPage'],
      pageTitle: '津贴'
    }
  },
  {
    path: tamsUrl + '/event?methodToCall=getPublishEventPage&amp;viewId=EventView',
    name: 'Event',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-bumen1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewEventPage'],
      pageTitle: '活动'
    }
  },
  {
    path: tamsUrl + '/train?methodToCall=getTrainingConsolePage&amp;viewId=TrainView',
    name: 'TrainingConsole',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-kecheng8',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTrainingConsolePage'],
      pageTitle: '培训'
    }
  },

  {
    path: tamsUrl + '/train?methodToCall=trainCourseEnrollmentPage&amp;viewId=TrainView',
    name: 'SelectTrainingCourse',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-zhuanjia',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewSelectTrainingCoursePage'],
      pageTitle: '培训选课'
    }
  },
  {
    path: tamsUrl + '/train?methodToCall=getTrainInfoTableListPage&amp;viewId=TrainView',
    name: 'TrainInfoTableList',
    coordinateX: 1,
    coordinateY: 7,
    iconCls: 'icon-peixun3',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTrainInfoTableListPage'],
      pageTitle: '平行工作坊'
    }
  },
  {
    path: tamsUrl + '/train?methodToCall=getTrainingCourseSeatDistributionPage&amp;viewId=TrainView',
    name: 'TrainingCourseSeatDistribution',
    coordinateX: 1,
    coordinateY: 8,
    iconCls: 'icon-peixun-copy',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTrainingCourseSeatDistributionPage'],
      pageTitle: '集中培训'
    }
  },
  {
    path: tamsUrl + '/train?methodToCall=getTaTrainResultPage&amp;viewId=TrainView',
    name: 'TrainingTeachingAssistantsResultPage',
    coordinateX: 1,
    coordinateY: 9,
    iconCls: 'icon-peixun2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['TrainingTeachingAssistantsResultPage'],
      pageTitle: '助教培训结果'
    }
  },
  {
    path: tpmsUrl + '/statistics?methodToCall=getStatisticManagePage&amp;viewId=StatisticsView',
    name: 'tpmsStatisticManage',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-tongji',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewStatisticManagePage'],
      pageTitle: '统计'
    }
  },
  {
    path: tamsUrl + '/statistics?methodToCall=getActivityCount&amp;viewId=StatisticsView',
    name: 'ActivityCount',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewActivityCountPage'],
      pageTitle: '日志'
    }
  },
  {
    path: tamsUrl + '/statistics?methodToCall=getClassStatisticPage&amp;viewId=StatisticsView',
    name: 'ClassStatistics',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewClassStatisticsPage'],
      pageTitle: '课程'
    }
  },
  {
    path: tamsUrl + '/statistics?methodToCall=getTaStatisticPage&amp;viewId=StatisticsView',
    name: 'AssistantStatistics',
    coordinateX: 3,
    coordinateY: 4,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewAssistantStatisticsPage'],
      pageTitle: '助教'
    }
  },

  {
    path: '',
    name: 'tamsReview',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-pingjia3',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '评审'
    }
  },
  {
    path: tamsUrl + '/class?methodToCall=getReviewQuotaPage&amp;viewId=ClassView',
    name: 'ReviewQuota',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-zhuanjiaku',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewReviewQuotapage'],
      pageTitle: '名额'
    }
  },
  {
    path: tamsUrl + '/class?methodToCall=getConfigureReviewTeacherPage&amp;viewId=ClassView',
    name: 'ConfigureReviewTeacher',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-xiugai',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewConfigureReviewTeacherPage'],
      pageTitle: '评审教师'
    }
  },
  {
    path: tamsUrl + '/class?methodToCall=getReviewPage&amp;viewId=ClassView',
    name: 'ReviewPage',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewReviewPage'],
      pageTitle: '助教工作评价'
    }
  },
  {
    path: tamsUrl + '/ta?methodToCall=getTaTeacherEvalIndexPage&amp;viewId=TaView',
    name: 'TAIndicatorEntry',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-pingjia4',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTAIndicatorEntryPage'],
      pageTitle: '助教指标录入'
    }
  },

  {
    path: tamsUrl + '/ta?methodToCall=getTaStudentEvalPage&amp;viewId=TaView',
    name: 'TAEvaluationInformation',
    coordinateX: 2,
    coordinateY: 6,
    iconCls: 'icon-xiangqingchakan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTAEvaluationInformationPage'],
      pageTitle: '助教评教情况'
    }
  },
  {
    path: tamsUrl + '/ta?methodToCall=getExcellentTaSignInSettingPage&amp;viewId=TaView',
    name: 'ExcAssistantRegistrationSet',
    coordinateX: 2,
    coordinateY: 7,
    iconCls: 'icon-xueshengguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewExcAssistantRegistrationSetPage'],
      pageTitle: '卓越助教报名设置'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getManageStationPage&amp;viewId=AdminView',
    name: 'Review',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewManagerDashboardPage'],
      pageTitle: '管理台'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getConsolePage&amp;viewId=AdminView',
    name: 'tamsConsole',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewConsolePage'],
      pageTitle: '类别'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getRoleManagerPage&amp;viewId=AdminView',
    name: 'tamsRoleManager',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewRoleManagerPage'],
      pageTitle: '角色'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getUserRoleManagerPage&amp;viewId=AdminView',
    name: 'tamsUserRoleManager',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-yonghu6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewUserRoleManagerPage'],
      pageTitle: '用户'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getPermissionManagementPage&amp;viewId=AdminView',
    name: 'tamsPermissionManagement',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewPermissionManagementPage'],
      pageTitle: '权限'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getTermManagePage&amp;viewId=AdminView',
    name: 'TermManager',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-xiangqingchakan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTermManagerPage'],
      pageTitle: '批次'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getWorkFlowManagePage&amp;viewId=AdminView',
    name: 'tamsWorkFlowManage',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-xueshengguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewWorkFlowManagePage'],
      pageTitle: '工作流'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getTimeSetPage&amp;viewId=AdminView',
    name: 'TimeSettings',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-xiangqingchakan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewTimeSettingsPage'],
      pageTitle: '时间'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getStudentNoticePage&amp;viewId=AdminView',
    name: 'StudentNoticeInfo',
    coordinateX: 4,
    coordinateY: 9,
    iconCls: 'icon-fabu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewStudentNoticeInfoPage'],
      pageTitle: '学生通知'
    }
  },

  {
    path: tamsUrl + '/admin?methodToCall=getSyncInfoPage&amp;viewId=AdminView',
    name: 'SyncInfo',
    coordinateX: 4,
    coordinateY: 10,
    iconCls: 'icon-xiangqingchakan',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewSyncInfoPage'],
      pageTitle: '同步信息'
    }
  },
  {
    path: tamsUrl + '/admin?methodToCall=getBlackListPage&amp;viewId=AdminView',
    name: 'BlackList',
    coordinateX: 4,
    coordinateY: 11,
    iconCls: 'icon-xueshengguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TAMS',
      permission: ['ViewBlackListPage'],
      pageTitle: '黑名单'
    }
  }
]

export default {
  name: '助教管理',
  code: 'tams',
  icon: 'icon-jiaoshixinxi',
  originRouters: tamsRouterMap
}
