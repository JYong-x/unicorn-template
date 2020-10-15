import config from '@/config'
/**
 * 创新创业
 */
const srtpUrl = config.httpRoot + '/srtp/portal'
const srtpRouterMap = [
  {
    path: srtpUrl + '/project?methodToCall=getCommonHome&amp;viewId=ProjectView',
    name: 'Name',
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
    path: srtpUrl + '/project?methodToCall=getProjectList&amp;viewId=ProjectListView',
    name: 'srtpProjectList',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xiangmu',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewProjectListPage'],
      pageTitle: '项目'
    }
  },
  {
    path: srtpUrl + '/project?methodToCall=getPrjQueryPage&amp;viewId=ProjectListView',
    name: 'ProjectQuery',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-sousuo2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewProjectQueryPage'],
      pageTitle: '项目查询'
    }
  },
  {
    path: srtpUrl + '/project?methodToCall=getTeaProjectPage&amp;viewId=SubjectView',
    name: 'Subject',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-zuoye',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '课题'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getFundsPage&amp;viewId=AdminView',
    name: 'srtpFundsManagement',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-xiangmu',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewFundsManagementPage'],
      pageTitle: '经费'
    }
  },
  {
    path: srtpUrl + '/project?methodToCall=getReviewProjectForBatchPage&amp;viewId=ProjectView',
    name: 'PackageReviewRanking',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewPackageReviewRankingPage'],
      pageTitle: '审核'
    }
  },
  {
    path: srtpUrl + '/project?methodToCall=getPersonalProjectPage&amp;viewId=ProjectListView',
    name: 'PersonalProjectInquiry',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-sousuo2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewPersonalProjectInquiryPage'],
      pageTitle: '创新创业成果查询'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestCategoryPage&amp;viewId=ContestView',
    name: 'srtpContest',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-jiangli3',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '竞赛'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getMainDataImportPage&amp;viewId=ContestView',
    name: 'srtpStudentContestList',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-daoru',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewCompetitionInfoDataImportPage'],
      pageTitle: '数据导入'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestSignUpSelectionListPage&amp;viewId=ContestView',
    name: 'srtpStudentContestList',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewStudentContestListPage'],
      pageTitle: '竞赛报名'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestListPage&amp;viewId=ContestView',
    name: 'ContestManagement',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-jiangli3',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewContestManagementPage'],
      pageTitle: '竞赛管理'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestLevelPage&amp;viewId=ContestView',
    name: 'srtpStudentContestList',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-pingjia',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewContestLevelPage'],
      pageTitle: '竞赛级别'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestTypeInfoList&amp;viewId=ContestView',
    name: 'ContestManagement',
    coordinateX: 2,
    coordinateY: 6,
    iconCls: 'icon-jindu13',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewContestTypeInfoPage'],
      pageTitle: '竞赛类别'
    }
  },
  {
    path: srtpUrl + '/contest?methodToCall=getContestTypeLabelPage&amp;viewId=ContestView',
    name: 'srtpStudentContestList',
    coordinateX: 2,
    coordinateY: 7,
    iconCls: 'icon-jindu13',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewContestLabelCategoryPage'],
      pageTitle: '竞赛标签类别'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getExpertModuleConsolePage&amp;viewId=AdminView',
    name: 'ExpertModuleConsole',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewExpertModuleConsolePage'],
      pageTitle: '专家'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getExpertGroupPage&amp;viewId=AdminView',
    name: 'StudentContestList',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-peixun',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewExpertGroupPage'],
      pageTitle: '专家小组'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getExpertOpinionChoicePage&amp;viewId=AdminView',
    name: 'ManagerExpertOpinion',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-renwujibie',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewExpertOpinionPage', 'ViewManagerExpertOpinion'],
      pageTitle: '专家意见'
    }
  },
  {
    path: srtpUrl + '/statistics?methodToCall=getStatisticsManagePage&amp;viewId=StatisticView',
    name: 'srtpStatisticManage',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-tongji',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewStatisticManagePage'],
      pageTitle: '统计'
    }
  },
  {
    path: srtpUrl + '/statistics?methodToCall=getStuDistributionStatisticsPage&amp;viewId=StatisticView',
    name: 'StudentStatistic',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewStudentStatisticPage'],
      pageTitle: '学生'
    }
  },
  {
    path: srtpUrl + '/statistics?methodToCall=getInstDistributionStatisticsPage&amp;viewId=StatisticView',
    name: 'TeacherStatistic',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewTeacherStatisticPage'],
      pageTitle: '教师'
    }
  },
  {
    path: srtpUrl + '/statistics?methodToCall=getProjectGradeStatisticsPage&amp;viewId=StatisticView',
    name: 'ProjectGrade',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-yewumokuai',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewProjectGradePage'],
      pageTitle: '项目成绩'
    }
  },
  {
    path: srtpUrl + '/statistics?methodToCall=getProjectInfoStatisticPage&amp;viewId=StatisticView',
    name: 'ProjectStatistics',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-xiangmu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewProjectStatisticsPage'],
      pageTitle: '项目'
    }
  },

  {
    path: '',
    name: 'srtpConsole',
    coordinateX: 5,
    coordinateY: 1,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewManageConsole'],
      pageTitle: '管理台'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getTermManagePage&amp;viewId=AdminView',
    name: 'TermManagement',
    coordinateX: 5,
    coordinateY: 2,
    iconCls: 'icon-jieguotiaozheng_jieguotiaozheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewTermManagementPage'],
      pageTitle: '立项批次'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getContestTimeInfo&amp;viewId=AdminView',
    name: 'ContestTimeInfo',
    coordinateX: 5,
    coordinateY: 3,
    iconCls: 'icon-baogao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewContestTimeInfoPage'],
      pageTitle: '竞赛批次'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getReportTemplateManagementPage&amp;viewId=AdminView',
    name: 'ReportTemplateManagement',
    coordinateX: 5,
    coordinateY: 4,
    iconCls: 'icon-caidantubiao-05',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewReportTemplateManagementPage'],
      pageTitle: '模板'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getImportingProjectPage&amp;viewId=AdminView',
    name: 'ImportingProject',
    coordinateX: 5,
    coordinateY: 5,
    iconCls: 'icon-shenqingtijiao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewImportingProjectPage'],
      pageTitle: '项目导入'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getConsolePage&amp;viewId=AdminView',
    name: 'strpConsoleCat',
    coordinateX: 5,
    coordinateY: 6,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewConsolePage'],
      pageTitle: '类别'
    }
  },

  {
    path: srtpUrl + '/admin?methodToCall=getPermissionManagementPage&amp;viewId=AdminView',
    name: 'srtpPermissionManagement',
    coordinateX: 5,
    coordinateY: 7,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewPermissionManagementPage'],
      pageTitle: '权限'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getRoleManagerPage&amp;viewId=AdminView',
    name: 'srtpRoleManager',
    coordinateX: 5,
    coordinateY: 8,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewRoleManagerPage'],
      pageTitle: '角色'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getUserRoleManagerPage&amp;viewId=AdminView',
    name: 'srtpUserRoleManager',
    coordinateX: 5,
    coordinateY: 9,
    iconCls: 'icon-yonghu6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewUserRoleManagerPage'],
      pageTitle: '用户'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getTimeSetPage&amp;viewId=AdminView',
    name: 'srtpTimeSet',
    coordinateX: 5,
    coordinateY: 10,
    iconCls: 'icon-pingjia6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewTimeSetPage'],
      pageTitle: '时间'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getWorkFlowManagePage&amp;viewId=AdminView',
    name: 'srtpWorkFlowManage',
    coordinateX: 5,
    coordinateY: 11,
    iconCls: 'icon-pingjia6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewWorkFlowManagePage'],
      pageTitle: '工作流'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getCertificateClosurePage&amp;viewId=AdminView',
    name: 'EndProjectCertificate',
    coordinateX: 5,
    coordinateY: 12,
    iconCls: 'icon-pingjia6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewEndProjectCertificatePage'],
      pageTitle: '结题证书'
    }
  },
  {
    path: srtpUrl + '/admin?methodToCall=getPrjNumberRulePage&amp;viewId=AdminView',
    name: 'srtpProjectNumberRule',
    coordinateX: 5,
    coordinateY: 13,
    iconCls: 'icon-pingjia6',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SRTP',
      permission: ['ViewProjectNumberRulePage'],
      pageTitle: '项目编号生成'
    }
  }
]

export default {
  name: '创新实践平台',
  code: 'srtp',
  icon: 'icon-server_05',
  originRouters: srtpRouterMap
}
