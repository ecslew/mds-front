import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: resolve => require(['@/components/home'], resolve)
    },
    // 项目列表
    {
      path: '/project',
      component: resolve => require(['@/components/project'], resolve)
    },
    // 创建项目入口
    {
      path: '/projectCreate',
      component: resolve => require(['@/components/project-create'], resolve)
    },
    // 提交步骤
    {
      path: '/projectSteps',
      component: resolve => require(['@/components/project-steps'], resolve)
    },
    // 提交项目表单
    {
      path: '/projectRelease',
      component: resolve => require(['@/components/project-release'], resolve)
    },
    // 编辑项目
    {
      path: '/projectModify',
      component: resolve => require(['@/components/project-modify'], resolve),
      props: (route) => ({
        eosID: route.query.eosID
      })
    },
    // 项目详情
    {
      path: '/projectDetail',
      component: resolve => require(['@/components/project-detail'], resolve),
      props: (route) => ({
        id: route.query.id
      })
    },
    // 我的项目
    {
      path: '/myProject',
      component: resolve => require(['@/components/my-project'], resolve)
    },
    // 我支持的项目
    {
      path: '/projectBacked',
      component: resolve => require(['@/components/project-backed'], resolve)
    }
  ]
})