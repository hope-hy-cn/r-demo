import {
  Dashboard,
  WorkMailList,
  JobDiaryEdit,
  DepartmentList,
  DepartmentEdit,
  FinanceList,
  FinanceEdit,
  StaffList,
  StaffEdit,
  ModifyPassword,
  UserHomePage,
  UserInfoEdit,
  Notice,
  Activity
} from './pages'

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '管理首页',
    iconType: 'dashboard',
    isMenu: true,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/workmanagement/list',
    component: WorkMailList,
    title: '工作管理',
    iconType: 'read',
    isMenu: true,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/jobDiary/edit/:id',
    component: JobDiaryEdit,
    title: '编辑日志',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/staff/list',
    component: StaffList,
    title: '职员管理',
    iconType: 'user',
    isMenu: true,
    exact: false,
    roles: [0, 1]
  },
  {
    path: '/staff/edit/:id',
    component: StaffEdit,
    title: '职员信息修改',
    isMenu: false,
    exact: false,
    roles: [0, 1]
  },
  {
    path: '/finance/list',
    component: FinanceList,
    title: '财务管理',
    iconType: 'pay-circle',
    isMenu: true,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/finance/edit/:id',
    component: FinanceEdit,
    title: '账单修改',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/department/list',
    component: DepartmentList,
    title: '部门管理',
    iconType: 'team',
    isMenu: true,
    exact: false,
    roles: [0, 1]
  },
  {
    path: '/department/edit/:id',
    component: DepartmentEdit,
    title: '部门修改',
    isMenu: false,
    exact: false,
    roles: [0, 1]
  },
  // {
  //   path: '/news/list',
  //   component: NewsList,
  //   title: '消息中心',
  //   iconType: 'mail',
  //   isMenu: true,
  //   exact: false
  // },
  {
    path: '/head/modifyPassword',
    component: ModifyPassword,
    title: '修改密码',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/head/userHomePage',
    component: UserHomePage,
    title: '个人主页',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/head/userInfoEdit',
    component: UserInfoEdit,
    title: '个人信息编辑',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/information/notice',
    component: Notice,
    title: '消息中心',
    iconType: 'mail',
    isMenu: true,
    exact: false,
    roles: [0, 1, 2]
  },
  {
    path: '/information/activity',
    component: Activity,
    title: '活动',
    isMenu: false,
    exact: false,
    roles: [0, 1, 2]
  }
]

export default routes