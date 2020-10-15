import config from '@/config'
/**
 * 成绩权限路由
 * @type { *[] }
 */
const resultUrl = config.httpRoot + '/sam'
const resultRouterMap = [
  {
    path: resultUrl + '/Home',
    name: 'Home',
    coordinateX: 1,
    coordinateY: 1,
    iconCls: 'icon-zhuye',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '主页',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: resultUrl + '/ScoreInput',
    name: 'ScoreInput',
    iconCls: '',
    menuLevel: 0,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩录入',
      matched: [{ path: '', name: '成绩录入' }]
    }
  },
  {
    path: resultUrl + '/GradeChanges',
    name: 'GradeChanges',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-zuoye',
    menuLevel: 0,
    meta: {
      target: '_blank',
      parentName: '课程列表',
      pageTitle: '新建成绩变更',
      matched: [{ path: 'CurriculumSchedule', name: '课程列表' }, { path: '', name: '新建成绩变更' }]
    }
  },
  {
    path: resultUrl + '/GradeReviewMange',
    name: 'GradeReviewMange',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-shenhexiangmu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '审核管理',
      matched: [{ path: '', name: '审核管理' }]
    }
  },
  {
    path: resultUrl + '/GradeDatabaseManagement',
    name: 'GradeDatabaseManagement',
    coordinateX: 1,
    coordinateY: 7,
    iconCls: 'icon-chaxun',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩库管理',
      matched: [{ path: '', name: '成绩库管理' }]
    }
  },
  {
    path: resultUrl + '/ResultInquiry',
    name: 'ResultInquiry',
    coordinateX: 1,
    coordinateY: 8,
    iconCls: 'icon-chaxun',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩查询',
      matched: [{ path: '', name: '成绩查询' }]
    }
  },
  {
    path: resultUrl + '/GradeConversion',
    name: 'GradeConversion',
    coordinateX: 1,
    coordinateY: 8,
    iconCls: 'icon-qiehuanfanxiangnizhuanmianxing',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩转换',
      matched: [{ path: '', name: '成绩转换' }]
    }
  },
  {
    path: resultUrl + '/ScoreManagement',
    name: 'ScoreManagement',
    coordinateX: 1,
    coordinateY: 9,
    iconCls: 'icon-kechengguanli5',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩管理',
      matched: [{ path: '', name: '成绩管理' }]
    }
  },
  {
    path: resultUrl + '/AchievementChangeAlarm',
    name: 'AchievementChangeAlarm',
    coordinateX: 1,
    coordinateY: 10,
    iconCls: 'icon-kechengguanli5',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '成绩异动报警',
      matched: [{ path: '', name: '成绩异动报警' }]
    }
  },
  {
    path: resultUrl + '/ResitManagement',
    name: 'ResitManagement',
    coordinateX: 1,
    coordinateY: 10,
    iconCls: 'icon-kaoshiguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '主页',
      pageTitle: '补考管理',
      matched: [{ path: '', name: '补考管理' }]
    }
  },
  {
    path: resultUrl + '/CourseRecognition',
    name: 'CourseRecognition',
    iconCls: 'icon-moban-copy',
    coordinateX: 1,
    coordinateY: 11,
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      permission: ['ViewCourseRecognitionPage'],
      namespaceCode: 'KR_SAM',
      pageTitle: '成绩认定',
      parentName: '主页',
      matched: [{ path: '', name: '成绩认定' }]
    }
  },
  /**
   * * --------------------------------管理台---------------------------------------
   */
  {
    path: resultUrl + '/ManageConsolo',
    name: 'ManageConsolo',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-shuangren',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '管理台',
      namespaceCode: 'KR_SAM',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: resultUrl + '/AdminPermission',
    name: 'AdminPermission',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      // requireAuth: true,
      parentName: '',
      pageTitle: '权限',
      namespaceCode: 'KR_SAM',
      permission: ['ViewAdminPermissionPage'],
      matched: [{ path: '', name: '权限' }]
    }
  },
  {
    path: resultUrl + '/AdminRole',
    name: 'AdminRole',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '',
      pageTitle: '角色',
      namespaceCode: 'KR_SAM',
      matched: [{ path: '', name: '角色' }]
    }
  },
  {
    path: resultUrl + '/AdminUser',
    name: 'AdminUser',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-yonghu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '用户',
      namespaceCode: 'KR_SAM',
      permission: ['ViewAdminUserPage'],
      matched: [{ path: '', name: '用户' }]
    }
  },
  {
    path: resultUrl + '/AdminWorkManage',
    name: 'AdminWorkManage',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-moban-copy',
    menuLevel: 2,
    meta: {
      target: '_blank',
      // requireAuth: true,
      permission: ['ViewWorkflowPage'],
      namespaceCode: 'KR_SAM',
      pageTitle: '工作流',
      parentName: '管理台',
      matched: [{ path: '', name: '工作流' }]
    }
  },
  {
    path: resultUrl + '/AnnouncementManagement',
    name: 'AnnouncementManagement',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-tubiaoku-',
    menuLevel: 2,
    meta: {
      target: '_blank',
      // requireAuth: true,
      permission: ['ViewWorkflowPage'],
      namespaceCode: 'KR_SAM',
      pageTitle: '公告管理',
      parentName: '管理台',
      matched: [{ path: '', name: '公告管理' }]
    }
  },
  {
    path: resultUrl + '/AdminTimeManagement',
    name: 'AdminTimeManagement',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-shijian6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      // requireAuth: true,
      // permission: ['ViewAdminTimeManagementPage'],
      namespaceCode: 'KR_SAM',
      pageTitle: '时间',
      parentName: '管理台',
      matched: [{ path: '', name: '时间' }]
    }
  }
  /**
   * -----------------------------------------------------------------------
   */
]

export default {
  name: '成绩管理',
  code: 'sam',
  icon: 'icon-server_05',
  originRouters: resultRouterMap
}
