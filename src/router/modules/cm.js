import config from '@/config'
/**
 * 课程
 */
const cmUrl = config.devUrl
const cmRouterMap = [
  {
    path: cmUrl + '/home?methodToCall=getHomePage&amp;viewId=PortalView',
    name: 'cmHome',
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
    path: cmUrl + '/course?methodToCall=getCourseConsolePage&amp;viewId=StartProposalView',
    name: 'CourseConsole',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewCourseConsolePage'],
      pageTitle: '课程管理'
    }
  },
  {
    path: cmUrl + '/course?methodToCall=getStartNewCurriculumPage&amp;viewId=StartProposalView',
    name: 'StartNewCurriculum',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-xinjianxiangmu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewStartNewCurriculumPage'],
      pageTitle: '新建课程'
    }
  },
  {
    path: cmUrl + '/course?methodToCall=getSearchCoursePage&amp;viewId=StartProposalView',
    name: 'LookUpCourse',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewLookUpCoursePage'],
      pageTitle: '课程库'
    }
  },
  {
    path: cmUrl + '/course?methodToCall=getSearchCoursePageForCourseManager&amp;viewId=StartProposalView',
    name: 'PerfectCourseSyllabus',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-baogaoyishenhe',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewPerfectCourseSyllabusPage'],
      pageTitle: '完善课程大纲'
    }
  },
  {
    path: cmUrl + '/course?methodToCall=getProposalReviewPage&amp;viewId=StartProposalView',
    name: 'BillReview',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-baogaoyishenhe',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewBillReviewPage'],
      pageTitle: '管理课程变更'
    }
  },
  {
    path: cmUrl + '/course?methodToCall=getCourseSetPage&amp;viewId=StartProposalView',
    name: 'CourseSet',
    coordinateX: 1,
    coordinateY: 7,
    iconCls: 'icon-rizhi1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewCourseSetPage'],
      pageTitle: '课程集'
    }
  },
  {
    path: cmUrl + '/trainProgram?methodToCall=getTrainProgramManagementPage&amp;viewId=ProgramView',
    name: 'ProgramConsole',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewProgramConsolePage'],
      pageTitle: '培养方案管理'
    }
  },
  {
    path: cmUrl + '/trainProgram?methodToCall=getStartNewTrainProgramPage&amp;viewId=ProgramView',
    name: 'StartNewProgram',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-xinjianwendang',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewStartNewProgramPage'],
      pageTitle: '新建培养方案'
    }
  },
  {
    path: cmUrl + '/trainProgram?methodToCall=getSearchTrainProgramPage&amp;viewId=ProgramView',
    name: 'FindProgram',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-zhinenghuaxuanpinicon1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewFindProgramPage'],
      pageTitle: '培养方案库'
    }
  },
  {
    path: cmUrl + '/trainProgram?methodToCall=getSearchProposalTrainProgramPage&amp;viewId=ProgramView',
    name: 'FindProposalProgram',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-iconfind',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewFindProposalProgramPage'],
      pageTitle: '管理培养方案变更'
    }
  },
  {
    path: cmUrl + '/trainProgram?methodToCall=getOpeningCourseInTrainProgramPage&amp;viewId=ProgramView',
    name: 'FindProposalProgram',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-ku1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewCheckStartCoursePlanPage'],
      pageTitle: '核对开课计划'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getManageConsolePage&amp;viewId=AdminView',
    name: 'cmConsole',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewConsolePage'],
      pageTitle: '管理台'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getManageCategoryPage&amp;viewId=AdminView',
    name: 'cmCategory',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewCategoryPage'],
      pageTitle: '类别'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getRuleConsolePage&amp;viewId=AdminView',
    name: 'cmRuleConsole',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-xitongguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewRuleConsolePage'],
      pageTitle: '规则'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getPermManagePage&amp;viewId=AdminView',
    name: 'cmPermissionManagementPage',
    coordinateX: 3,
    coordinateY: 4,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewPermissionManagementPage'],
      pageTitle: '权限'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getRolePage&amp;viewId=AdminView',
    name: 'cmRoleManager',
    coordinateX: 3,
    coordinateY: 5,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewRoleManagerPage'],
      pageTitle: '角色'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getUserManagementPage&amp;viewId=AdminView',
    name: 'cmUserRoleManager',
    coordinateX: 3,
    coordinateY: 6,
    iconCls: 'icon-yonghu6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewUserRoleManagerPage'],
      pageTitle: '用户'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getTimeSetPage&amp;viewId=AdminView',
    name: 'cmTimeSet',
    coordinateX: 3,
    coordinateY: 7,
    iconCls: 'icon-rizhi1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewTimeSetPage'],
      pageTitle: '时间'
    }
  },

  {
    path: cmUrl + '/admin?methodToCall=getWorkFlowManagePage&amp;viewId=AdminView',
    name: 'cmWorkFlowManage',
    coordinateX: 3,
    coordinateY: 8,
    iconCls: 'icon-baogaoyishenhe',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewWorkFlowManagePage'],
      pageTitle: '工作流'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getGraduationCreditPage&amp;viewId=AdminView',
    name: 'GraduationCredit',
    coordinateX: 3,
    coordinateY: 9,
    iconCls: 'icon-caozuorizhi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewGraduationCreditPage'],
      pageTitle: '毕业学分要求'
    }
  },
  {
    path: cmUrl + '/admin?methodToCall=getCourseManagerPage&amp;viewId=AdminView',
    name: 'CourseManager',
    coordinateX: 3,
    coordinateY: 10,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_CM',
      permission: ['ViewCourseManagerPage'],
      pageTitle: '课程负责人'
    }
  }
]

export default {
  name: '课程/培养方案管理',
  code: 'cm',
  icon: 'icon-kecheng9',
  originRouters: cmRouterMap
}
