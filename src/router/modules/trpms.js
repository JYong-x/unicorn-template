import { httpConfig } from '@/config'
/**
 * 教改管理系统路由
 */
const trpmsUrl = httpConfig.appUrl + '/trpms/portal'

export const trpmsRouterMap = [
  {
    path: trpmsUrl + '/Home',
    name: 'Home',
    coordinateX: 1,
    coordinateY: 1,
    iconCls: 'fa fa-home',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '主页',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: trpmsUrl + '/ManageConsolo',
    name: 'ManageConsolo',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '管理台',
      requireAuth: true,
      permission: ['ViewManageConsoloPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: trpmsUrl + '/OffCampusStaff',
    name: 'OffCampusStaff',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-shuangren',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '校外人员',
      requireAuth: true,
      permission: ['ViewOffCampusStaffPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '校外人员' }]
    }
  },
  {
    path: trpmsUrl + '/AnnouncementManagement',
    name: 'AnnouncementManagement',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-xiugai4',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '公告管理',
      requireAuth: true,
      permission: ['ViewAnnouncementManagementPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '公告管理' }]
    }
  },
  {
    path: trpmsUrl + '/NotificationFunction',
    name: 'NotificationFunction',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-tongzhi_',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '通知功能',
      requireAuth: true,
      permission: ['ViewNotificationFunctionPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '通知功能' }]
    }
  },
  {
    path: '',
    name: 'EntryScore',
    iconCls: 'icon-jindu14',
    meta: {
      target: '_blank',
      requireAuth: true,
      permission: ['ViewDataPreparationPage'],
      namespaceCode: 'KR_TRPMS',
      pageTitle: ''
    }
  },
  {
    path: trpmsUrl + '/Category',
    name: 'Category',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '类别',
      permission: ['ViewCategoryPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '类别' }]
    }
  },
  {
    path: trpmsUrl + '/AdminPermission',
    name: 'AdminPermission',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '权限',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewAdminPermissionPage'],
      matched: [{ path: '', name: '权限' }]
    }
  },
  {
    path: trpmsUrl + '/AdminRole',
    name: 'AdminRole',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '',
      pageTitle: '角色',
      requireAuth: true,
      permission: ['ViewAdminRolePage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '角色' }]
    }
  },
  {
    path: trpmsUrl + '/AdminUser',
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
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewAdminUserPage'],
      matched: [{ path: '', name: '用户' }]
    }
  },
  {
    path: trpmsUrl + '/ProjectBatch',
    name: 'ProjectBatch',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-xiangmu2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      parentName: '',
      pageTitle: '项目批次',
      requireAuth: true,
      permission: ['ViewProjectBatchPage'],
      namespaceCode: 'KR_TRPMS',
      matched: [{ path: '', name: '项目批次' }]
    }
  },
  {
    path: trpmsUrl + '/Expert',
    name: 'Expert',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-zhaopin',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '专家评价管理',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewExpertPage'],
      matched: [{ path: '', name: '专家评价管理' }]
    }
  },
  {
    path: trpmsUrl + '/ExpertReviewBatch',
    name: 'ExpertReviewBatch',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-xiangmu2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '专家评审批次',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewExpertReviewBatchPage'],
      matched: [{ path: '', name: '专家评审批次' }]
    }
  },
  {
    path: trpmsUrl + '/ExpertReview',
    name: 'ExpertReview',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-confirm',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '专家评审',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewExpertReviewPage'],
      matched: [{ path: '', name: '专家评审' }]
    }
  },
  {
    path: trpmsUrl + '/EvaluateStandard',
    name: 'EvaluateStandard',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-pingjia5',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '评价指标',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewEvaluateStandardPage'],
      matched: [{ path: '', name: '评价指标' }]
    }
  },
  {
    path: trpmsUrl + '/Project',
    name: 'Project',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xiangmu2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '项目',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewProjectPage'],
      matched: [{ path: '', name: '项目' }]
    }
  },
  {
    path: trpmsUrl + '/ProjectManagement',
    name: 'ProjectManagement',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '项目管理',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewProjectManagementPage'],
      matched: [{ path: '', name: '项目管理' }]
    }
  },
  {
    path: trpmsUrl + '/ProjectChangeManagement',
    name: 'ProjectChangeManagement',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-change',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '项目变更管理',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewProjectChangeManagementPage'],
      matched: [{ path: '', name: '项目变更管理' }]
    }
  },
  {
    path: trpmsUrl + '/ProjectImport',
    name: 'ProjectImport',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-daoru1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      parentName: '',
      pageTitle: '项目导入',
      namespaceCode: 'KR_TRPMS',
      permission: ['ViewProjectImportPage'],
      matched: [{ path: '', name: '项目导入' }]
    }
  }
]

export default {
  name: '教学项目管理',
  code: 'trpms',
  namespace: 'KR_TRPMS',
  icon: 'icon-kechengguanli',
  originRouters: trpmsRouterMap
}
