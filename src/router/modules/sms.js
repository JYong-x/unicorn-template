/**
 * 学籍路由
 */
const smsUrl = 'http://my.cqu.edu.cn/sms/portal'
const smsRouterMap = [
  {
    path: smsUrl + '/home?methodToCall=getHomePage&amp;viewId=PortalView',
    name: 'smsHome',
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
    path: smsUrl + '/studentmanagement?methodToCall=getMySchoolRollPage&amp;viewId=StudentStatusView',
    name: 'MySchoolRoll',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-xuejiyidonggongzuoliucheng',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      permission: ['ViewMySchoolRollPage'],
      pageTitle: '我的学籍'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getMySchoolRollInfoPage&amp;viewId=StudentStatusView',
    name: 'SchoolRollInformation',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-gerenxinxi7',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      permission: ['ViewSchoolRollInformationPage'],
      pageTitle: '学籍信息'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getSchoolRollManagementPage&amp;viewId=StudentStatusView',
    name: 'SchoolRollManagement',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-xuejiguanli1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewSchoolRollManagementPage'],
      pageTitle: '学生'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getSchoolRollInfoPage&amp;viewId=StudentStatusView',
    name: 'smsSchoolRollLibrary',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-kucun1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewSchoolRollLibraryPage'],
      pageTitle: '学生库'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getStudentIdSettingPage&amp;viewId=AdminView',
    name: 'StudentNumberGeneratio',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-shengchengmulu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentNumberGenerationPage'],
      pageTitle: '批量导入学生'
    }
  },
  {
    path: smsUrl + '/statistic?methodToCall=getStatisticStudentNumPage&amp;viewId=StudentStatusView',
    name: 'StudentStatistics',
    coordinateX: 1,
    coordinateY: 7,
    iconCls: 'icon-tongji2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentStatisticsPage'],
      pageTitle: '学生统计'
    }
  },
  {
    path: smsUrl + '/statistic?methodToCall=getStatisticStudentNumPage&amp;viewId=StudentStatusView',
    name: 'ApplyManagement',
    coordinateX: 1,
    coordinateY: 8,
    iconCls: 'icon-xuejiyidonggongzuoliucheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewApplyManagementPage'],
      pageTitle: '学籍异动申请'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getRewardAndPunishPage&amp;viewId=StudentStatusView',
    name: 'RewardAndPunish',
    coordinateX: 1,
    coordinateY: 9,
    iconCls: 'icon-change',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewRewardAndPunishPage'],
      pageTitle: '奖励与处分'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getSMPunishPage&amp;viewId=StudentStatusView',
    name: 'Punish',
    coordinateX: 1,
    coordinateY: 10,
    iconCls: 'icon-punishment',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewPunishPage'],
      pageTitle: '处分'
    }
  },
  {
    path: smsUrl + '/graduationReview?methodToCall=getGraduationReviewManagementPage&amp;viewId=GraduationReviewView',
    name: 'GraduationReviewManagement',
    coordinateX: 1,
    coordinateY: 10,
    iconCls: 'icon-chakan7',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewGraduationReviewManagementPage'],
      pageTitle: '审查'
    }
  },
  {
    path: smsUrl + '/graduationReview?methodToCall=getGraduationReviewPage&amp;viewId=GraduationReviewView',
    name: 'GraduationReview',
    coordinateX: 1,
    coordinateY: 12,
    iconCls: 'icon-biye',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewGraduationReviewPage'],
      pageTitle: '毕业审查'
    }
  },
  {
    path: smsUrl + '/graduationReview?methodToCall=getStudentSelfCheckPage&amp;viewId=GraduationReviewView',
    name: 'StudentNumberGeneration',
    coordinateX: 1,
    coordinateY: 13,
    iconCls: 'icon-zhuanxue',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentNumberGenerationPage'],
      pageTitle: '学生自查'
    }
  },
  {
    path: smsUrl + '/academicAdvisor?methodToCall=getAcademicAdvisorManagementPage&amp;viewId=AcademicAdvisorView',
    name: 'AcademicAdvisorManagement',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-tongji2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewAcademicAdvisorManagementPage'],
      pageTitle: '学业导师'
    }
  },
  {
    path: smsUrl + '/academicAdvisor?methodToCall=getAcademicAdvisorAssignManagePage&amp;viewId=AcademicAdvisorView',
    name: 'ChoiceAcademy',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-fenpei',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewChoiceAcademyPage'],
      pageTitle: '分配管理'
    }
  },
  {
    path: smsUrl + '/academicAdvisor?methodToCall=countAcademicAdvisorInfo&amp;viewId=AcademicAdvisorView',
    name: 'GuidanceDetails',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-caozuorizhi1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewGuidanceDetailsPage'],
      pageTitle: '指导详情'
    }
  },
  {
    path: smsUrl + '/academicAdvisor?methodToCall=getMyAcademicAdvisorPage&amp;viewId=AcademicAdvisorView',
    name: 'smsMyAcademicAdvisor',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-kucun1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewMyAcademicAdvisorPage'],
      pageTitle: '我的学业导师'
    }
  },
  {
    path: smsUrl + '/academicAdvisor?methodToCall=getMyAcademicGuidancePage&amp;viewId=AcademicAdvisorView',
    name: 'MyAcademicGuidance',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-zhidao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewMyAcademicGuidancePage'],
      pageTitle: '我的学业指导'
    }
  },
  {
    path: smsUrl + '/majorLargeClass?methodToCall=getMajorLargeClassShuntingModulePage&amp;viewId=LargeClassView',
    name: 'LargeClassShunting',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-tongji2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewLargeClassShuntingPage'],
      pageTitle: '大类分流'
    }
  },
  {
    path: smsUrl + '/majorLargeClass?methodToCall=getMajorLargeClassManagePage&amp;viewId=LargeClassView',
    name: 'LargeClassManagement',
    coordinateX: 2,
    coordinateY: 6,
    iconCls: 'icon-renqunfenliu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewLargeClassManagementPage'],
      pageTitle: '分流设置'
    }
  },
  {
    path: smsUrl + '/majorLargeClass?methodToCall=getStudentWishFillInPage&amp;viewId=LargeClassView',
    name: 'DiversionVolunteer',
    coordinateX: 2,
    coordinateY: 7,
    iconCls: 'icon-renqunfenliu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewDiversionVolunteerPage'],
      pageTitle: '分流志愿'
    }
  },
  {
    path: smsUrl + '/majorLargeClass?methodToCall=getLargeClassShuntingSelectionPage&amp;viewId=LargeClassView',
    name: 'ShuntingSelect',
    coordinateX: 2,
    coordinateY: 8,
    iconCls: 'icon-shuangren',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewShuntingSelectPage'],
      pageTitle: '分流选拔'
    }
  },
  {
    path: smsUrl + '/majorLargeClass?methodToCall=getLargeClassPublishApplyReviewPage&amp;viewId=LargeClassView',
    name: 'LargeClassReleaseReview',
    coordinateX: 2,
    coordinateY: 9,
    iconCls: 'icon-baogaoyishenhe',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewLargeClassReleaseReviewPage'],
      pageTitle: '分流审核'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getOverseasExchangeManagementPage&amp;viewId=StudentStatusView',
    name: 'OverseasExchangeManagement',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-zhuanxue',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewOverseasExchangeManagementPage'],
      pageTitle: '校外长期交流'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getOverseasExchangeProjectsPage&amp;viewId=StudentStatusView',
    name: 'OverseasExchange',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-chuguo',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewOverseasExchangePage'],
      pageTitle: '校外长期交流管理'
    }
  },

  {
    path: smsUrl + '/studentmanagement?methodToCall=getMyOverseasExchProjApplicationsPage&amp;viewId=StudentStatusView',
    name: 'StudentOverseasExchange',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-chuguo',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentOverseasExchangePage'],
      pageTitle: '校外长期交流学分认定'
    }
  },
  {
    path: '',
    name: 'ShortTermExchange',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-fankui',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewShortTermExchangePage'],
      pageTitle: '短期交流'
    }
  },
  {
    path: smsUrl + '/shortTermStudy?methodToCall=queryShortTermStudyProjectVOCondition&amp;viewId=StudentStatusView',
    name: 'ShortTermExchangeProgram',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-fankui',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewShortTermExchangeProgramPage'],
      pageTitle: '短期交流项目'
    }
  },
  {
    path: smsUrl + '/shortTermStudy?methodToCall=queryShortTermStudyApproveApplyVOCondition&amp;viewId=StudentStatusView',
    name: 'ShortTermExchangeCertManagement',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-fankui',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewShortTermExchangeCertManagementPage'],
      pageTitle: '短期交流认定管理'
    }
  },
  {
    path: smsUrl + '/shortTermStudy?methodToCall=getStudentShortTermApplyVOList&amp;viewId=StudentStatusView',
    name: 'ShortTermExchangeCreditRecognition',
    coordinateX: 4,
    coordinateY: 9,
    iconCls: 'icon-renzheng3',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewShortTermExchangeCreditRecognitionPage'],
      pageTitle: '短期交流学分认定'
    }
  },
  {
    path: smsUrl + '/home?methodToCall=getHomePage&amp;viewId=PortalView',
    name: 'PostgraduateTutor',
    coordinateX: 4,
    coordinateY: 10,
    iconCls: 'icon-daoshi1',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewPostgraduateTutorPage'],
      pageTitle: '研究生导师'
    }
  },
  {
    path: smsUrl + '/tutor?methodToCall=getTutorChoiceDeptPage&amp;viewId=AcademicAdvisorView',
    name: 'PostgraduateChoiceAcademy',
    coordinateX: 4,
    coordinateY: 11,
    iconCls: 'icon-daoshiguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewPostgraduateChoiceAcademyPage'],
      pageTitle: '分配管理'
    }
  },
  {
    path: smsUrl + '/tutor?methodToCall=getStuTutorWishPage&amp;viewId=AcademicAdvisorView',
    name: 'PostgraduateWishFil',
    coordinateX: 4,
    coordinateY: 12,
    iconCls: 'icon-daoshi1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewPostgraduateWishFillPage'],
      pageTitle: '志愿填报'
    }
  },
  {
    path: smsUrl + '/tutor?methodToCall=getGuidanceMasterSelectionPage&amp;viewId=AcademicAdvisorView',
    name: 'GuidePostgraduateSelect',
    coordinateX: 4,
    coordinateY: 13,
    iconCls: 'icon-zhaopin2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewGuidePostgraduateSelectPage'],
      pageTitle: '指导研究生选拔'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getReviewManagementPage&amp;viewId=ReviewView',
    name: 'smsReviewManagement',
    coordinateX: 3,
    coordinateY: 1,
    iconCls: 'icon-tongji2',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewReviewManagementPage'],
      pageTitle: '学籍异动'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getStuApplicationsReviewPage&amp;viewId=ReviewView',
    name: 'ReviewApply',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewReviewApplyPage'],
      pageTitle: '学籍异动审核'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getEnrollmentModifyReviewPage&amp;viewId=ReviewView',
    name: 'SchoolRollChangeReview',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-tongji2',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewSchoolRollChangeReviewPage'],
      pageTitle: '学籍信息变更审核'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=searchDocumentNumberManagementInfo&amp;viewId=StudentStatusView',
    name: 'DocumentNumberManagement',
    coordinateX: 3,
    coordinateY: 4,
    iconCls: 'icon-moban',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewDocumentNumberManagementPage'],
      pageTitle: '文号管理'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getStuSchoolWorkWarnPage&amp;viewId=StudentStatusView',
    name: 'SchoolWorkWarn',
    coordinateX: 3,
    coordinateY: 5,
    iconCls: 'icon-jingshimian1',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewSchoolWorkWarnPage'],
      pageTitle: '学业警示'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getStuEnrollChangeWarningPage&amp;viewId=StudentStatusView',
    name: 'ChangeWarningExceedSchoolYearLimit',
    coordinateX: 3,
    coordinateY: 6,
    iconCls: 'icon-xuqiupingshen',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewChangeWarningExceedSchoolYearLimitPage'],
      pageTitle: '异动警示'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getCommonApplyInstructionPage&amp;viewId=AdminView',
    name: 'ChangeApplicationDescriptionList',
    coordinateX: 3,
    coordinateY: 7,
    iconCls: 'icon-shuoming',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewChangeApplicationDescriptionListPage'],
      pageTitle: '异动申请说明'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getTransferMajorSettingPage&amp;viewId=ReviewView',
    name: 'ChangeMajorSet',
    coordinateX: 3,
    coordinateY: 8,
    iconCls: 'icon-qiehuanfanxiangnizhuanmianxing',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewChangeMajorSetPage'],
      pageTitle: '转专业设置'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getCheckInAndRegisterManagementPage&amp;viewId=StudentStatusView',
    name: 'CheckInAndRegisterManagement',
    coordinateX: 3,
    coordinateY: 9,
    iconCls: 'icon-confirm',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewCheckInAndRegisterManagementPage'],
      pageTitle: '报到注册'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getStudentCheckedInPage&amp;viewId=StudentStatusView',
    name: 'StudentRegister',
    coordinateX: 3,
    coordinateY: 10,
    iconCls: 'icon-kecheng8',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentRegisterPage'],
      pageTitle: '学生报到'
    }
  },
  {
    path: smsUrl + '/studentmanagement?methodToCall=getStudentRegisterPage&amp;viewId=StudentStatusView',
    name: 'StudentEnrolment',
    coordinateX: 3,
    coordinateY: 11,
    iconCls: 'icon-baogaoyishenhe',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentEnrolmentPage'],
      pageTitle: '学生注册'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getStudentLabelManagementPage&amp;viewId=AdminView',
    name: 'StudentLabelManagement',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentLabelManagementPage'],
      pageTitle: '学生标签'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getStudentLabelSettingPage&amp;viewId=AdminView',
    name: 'StudentLabelSetting',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentLabelSettingPage'],
      pageTitle: '学生标签设置'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getStudentLabelPermissionPage&amp;viewId=AdminView',
    name: 'StudentLabelPermission',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-xitongguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewStudentLabelPermissionPage'],
      pageTitle: '学生标签权限'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getManageConsolePage&amp;viewId=AdminView',
    name: 'smsConsole',
    coordinateX: 5,
    coordinateY: 1,
    iconCls: 'icon-zhiwumingcheng',
    menuLevel: 1,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewConsolePage'],
      pageTitle: '管理台'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getRuleListPage&amp;viewId=AdminView',
    name: 'RuleList',
    coordinateX: 5,
    coordinateY: 2,
    iconCls: 'icon-zhaiyao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewRuleListPage'],
      pageTitle: '规则'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getManageCategoryPage&amp;viewId=AdminView',
    name: 'smsCategory',
    coordinateX: 5,
    coordinateY: 2,
    iconCls: 'icon-msnui-module',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewCategoryPage'],
      pageTitle: '类别'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getLogPage&amp;viewId=AdminView',
    name: 'LogList',
    coordinateX: 5,
    coordinateY: 3,
    iconCls: 'icon-server_05',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewLogListPage'],
      pageTitle: '日志'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getPermManagePage&amp;viewId=AdminView',
    name: 'smsPermissionManagement',
    coordinateX: 5,
    coordinateY: 4,
    iconCls: 'icon-zhaopin',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewPermissionManagementPage'],
      pageTitle: '权限'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getRolePage&amp;viewId=AdminView',
    name: 'smsRoleManager',
    coordinateX: 5,
    coordinateY: 5,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewRoleManagerPage'],
      pageTitle: '角色'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getUserManagementPage&amp;viewId=AdminView',
    name: 'smsUserRoleManager',
    coordinateX: 5,
    coordinateY: 6,
    iconCls: 'icon-yonghu',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewUserRoleManagerPage'],
      pageTitle: '用户'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getCounsellorSettingPage&amp;viewId=AdminView',
    name: 'CounselorSetup',
    coordinateX: 5,
    coordinateY: 7,
    iconCls: 'icon-iconfont-jiaoshi',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewCounselorSetupPage'],
      pageTitle: '辅导员'
    }
  },

  {
    path: smsUrl + '/admin?methodToCall=getTimeSetPage&amp;viewId=AdminView',
    name: 'smsTimeSet',
    coordinateX: 5,
    coordinateY: 8,
    iconCls: 'icon-zhaiyao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewTimeSetPage'],
      pageTitle: '时间'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getFunctionControlPage&amp;viewId=AdminView',
    name: 'ControlSwitch',
    coordinateX: 5,
    coordinateY: 9,
    iconCls: 'icon-jindu12',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewControlSwitchPage'],
      pageTitle: '控制开关'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getWorkFlowManagePage&amp;viewId=AdminView',
    name: 'smsWorkFlowManage',
    coordinateX: 5,
    coordinateY: 10,
    iconCls: 'icon-zhaiyao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewWorkFlowManagePage'],
      pageTitle: '工作流'
    }
  },
  {
    path: smsUrl + '/home?methodToCall=getAnnouncementEditListPage&amp;viewId=PortalView',
    name: 'EditBulletinBoard',
    coordinateX: 5,
    coordinateY: 11,
    iconCls: 'icon-xiugai4',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewEditBulletinBoardPage'],
      pageTitle: '公告管理'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=getTemplateManagementPage&amp;viewId=AdminView',
    name: 'UploadTemplate',
    coordinateX: 5,
    coordinateY: 12,
    iconCls: 'icon-tijiao',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewUploadTemplatePage'],
      pageTitle: '模板上传'
    }
  },
  {
    path: smsUrl + '/adminClass?methodToCall=getAdminClassInfoList&amp;viewId=AdminView',
    name: 'AdministrativeClassManagement',
    coordinateX: 5,
    coordinateY: 13,
    iconCls: 'icon-xuejiguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewAdministrativeClassManagementPage'],
      pageTitle: '行政班'
    }
  },
  {
    path: smsUrl + '/admin?methodToCall=queryMajorByCondition&amp;viewId=AdminView',
    name: 'ProfessionalManagement',
    coordinateX: 5,
    coordinateY: 14,
    iconCls: 'icon-xiangmuguanli',
    menuLevel: 2,
    meta: {
      target: '_blank',
      requireAuth: true,
      namespaceCode: 'KR_SMS',
      permission: ['ViewProfessionalManagementPage'],
      pageTitle: '专业'
    }
  }
]

export default {
  name: '学籍管理',
  code: 'sms',
  icon: 'icon-gerenxinxi7',
  originRouters: smsRouterMap
}
