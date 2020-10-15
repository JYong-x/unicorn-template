import config from '@/config'

const teachEvaUrl = config.httpRoot + '/teach/portal'
const testUrl = config.httpRoot + '/test/portal'
const teachEvaRouterMap = [
  {
    path: teachEvaUrl,
    name: '',
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
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 2,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '查询/统计',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 3,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教结果查询',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 4,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教进度',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 5,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教统计',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 6,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评学统计',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 3,
    coordinateY: 7,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '问卷调查',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 1,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '评教管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 2,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教课程管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 3,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教结果管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 4,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '问卷管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 5,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '问卷设置',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 6,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '问卷填写',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 2,
    coordinateY: 7,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '问卷结果管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 1,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '评教/评学',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 2,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评教设置',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 3,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '指标管理',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 4,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '学生评教',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 5,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '同步评教',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 6,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '专家评教',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 7,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '领导评教',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 8,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '评学设置',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 9,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '学生评学',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 1,
    coordinateY: 10,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '教师评学',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 1,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 1,
    meta: {
      target: '_blank',
      pageTitle: '管理台',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 2,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '类别',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 3,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '时间',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 4,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '用户',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 5,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '角色',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: testUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 6,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '权限',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 7,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '日志',
      matched: [{ path: '', name: '' }]
    }
  },
  {
    path: teachEvaUrl,
    name: '',
    coordinateX: 4,
    coordinateY: 8,
    iconCls: 'icon-zhutiqiehuanicon',
    menuLevel: 2,
    meta: {
      target: '_blank',
      pageTitle: '工作流',
      matched: [{ path: '', name: '' }]
    }
  }
]

export default teachEvaRouterMap
