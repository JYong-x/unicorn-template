import { httpConfig } from '@/config'
/**
 * 教师教学档案
 */
const tpmsUrl = httpConfig.appUrl + '/tpms/portal'
const tpmsRouterMap = [
  {
    path: tpmsUrl + '/home?methodToCall=getTPMSHomePage&viewId=PortalView',
    name: 'tpmsHome',
    coordinateX: 1,
    coordinateY: 1,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '主页'
    }
  },
  {
    path: tpmsUrl + '/class?methodToCall=getMyPortfolio&amp;viewId=PortfolioView',
    name: 'PersonalCourse',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewPersonalCoursePage'],
      pageTitle: '我的档案'
    }
  },
  {
    path: tpmsUrl + '/portfolio?methodToCall=getAdminPerformanceQueryPage&amp;viewId=PortfolioView',
    name: 'AdministratorsPerformanceEvaluation',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-shenhe2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewAdministratorsPerformanceEvaluationPage'],
      pageTitle: '业绩查询'
    }
  },
  {
    path: tpmsUrl + '/class?methodToCall=getCourseInfoConfirmAndReportErrorPage&amp;viewId=ReviewView',
    name: 'CourseConfirmConsole',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewCourseConfirmConsolePage'],
      pageTitle: '教学班'
    }
  },
  {
    path: tpmsUrl + '/portfolio?methodToCall=getReviewConsolePage&amp;viewId=ReviewView',
    name: 'ReviewConsole',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewReviewConsolePage'],
      pageTitle: '审核'
    }
  },
  {
    path: tpmsUrl + '/achievement?methodToCall=getEduTeachingAchvPage&amp;viewId=ReviewView',
    name: 'AchievementReviewBlock',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewAchievementReviewBlockPage'],
      pageTitle: '成果'
    }
  },
  {
    path: '',
    name: 'AchievementReviewBlock',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-zhidaobiaozhun',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewOnlineTeachingPage'],
      pageTitle: '在线教学'
    }
  },
  {
    path: tpmsUrl + '/class?methodToCall=getManageClassAttendancePage&amp;viewId=PortfolioView',
    name: 'AchievementReviewBlock',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-tongji1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewBureauOnlineStatisticsTeaPage'],
      pageTitle: '在线教学情况统计'
    }
  },
  {
    path: tpmsUrl + '/class?methodToCall=getInstructorClassAttendancePage&amp;viewId=PortfolioView',
    name: 'AchievementReviewBlock',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-zhidaobiaozhun',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewTeachersTeachOnlinePage'],
      pageTitle: '在线教学情况'
    }
  },
  {
    path: '',
    name: 'BPackageMoney',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-mingxi',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewBPackageMoneyPage'],
      pageTitle: '岗位津贴'
    }
  },
  {
    path: tpmsUrl + '/statistics?methodToCall=getPgBInfoPage&amp;viewId=StatisticView',
    name: 'PostAllowanceCalculation',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewPostAllowanceCalculationPage'],
      pageTitle: '津贴核算'
    }
  },
  {
    path: tpmsUrl + '/statistics?methodToCall=getAllowanceDetailsPage&amp;viewId=StatisticView',
    name: 'AllowanceDetailsConsole',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewAllowanceDetailsConsolePage'],
      pageTitle: '津贴明细'
    }
  },
  {
    path: tpmsUrl + '/statistics?methodToCall=getBDataImportPage&amp;viewId=StatisticView',
    name: 'DataImport',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewDataImportPage'],
      pageTitle: '数据导入'
    }
  },
  {
    path: '',
    name: 'ManageConcole',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewManageConcolePage'],
      pageTitle: '管理台'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getCourseLabelManagePage&amp;viewId=AdminView',
    name: 'CourseLabelManage',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewCourseLabelManagePage'],
      pageTitle: '课程标签'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getConsolePage&amp;viewId=AdminView',
    name: 'ViewConsolePage',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewConsolePage'],
      pageTitle: '类别'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getRuleConsole&amp;viewId=AdminView',
    name: 'tpmsRuleConsole',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewRuleConsolePage'],
      pageTitle: '规则'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getRoleManagerPage&amp;viewId=AdminView',
    name: 'tpmsRoleManager',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewRoleManagerPage'],
      pageTitle: '角色'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getRoleManagerPage&amp;viewId=AdminView',
    name: 'tpmsUserRoleManager',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-yonghu6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewUserRoleManagerPage'],
      pageTitle: '用户'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getPermissionManagementPage&amp;viewId=AdminView',
    name: 'tpmsPermissionManagement',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewPermissionManagementPage'],
      pageTitle: '权限'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getTimeSetPage&amp;viewId=AdminView',
    name: 'tpmsTimeSet',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      permission: ['ViewTimeSetPage'],
      pageTitle: '时间'
    }
  },

  {
    path: tpmsUrl + '/admin?methodToCall=getWorkFlowManagePage&amp;viewId=AdminView',
    name: 'tpmsWorkFlowManagePage',
    coordinateX: 4,
    coordinateY: 9,
    iconCls: 'icon-xueshengguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['WorkFlowManagePage'],
      pageTitle: '工作流'
    }
  },
  {
    path: tpmsUrl + '/admin?methodToCall=getJournalLibPage&amp;viewId=AdminView',
    name: 'JournalLibrary',
    coordinateX: 4,
    coordinateY: 10,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_TPMS',
      permission: ['ViewJournalLibraryPage'],
      pageTitle: '期刊库'
    }
  }
]

export default {
  name: '教师教学档案',
  code: 'tpms',
  namespace: 'KR_TPMS',
  icon: 'icon-pici',
  originRouters: tpmsRouterMap
}
