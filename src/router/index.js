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
    // 创建项目步骤
    {
      path: '/projectStep',
      component: resolve => require(['@/components/project-step'], resolve)
    },
    // 发布项目
    {
      path: '/projectRelease',
      component: resolve => require(['@/components/project-release'], resolve),
      props: (route) => ({
        type: route.query.type
      })
    },
    // 编辑项目
    {
      path: '/projectModify',
      component: resolve => require(['@/components/project-modify'], resolve),
      props: (route) => ({
        eosID: route.query.eosID,
        type: route.query.type
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
    // 购买产品
    {
      path: '/projectPurchase',
      component: resolve => require(['@/components/project-purchase'], resolve),
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
    },
    // 关于
    {
      path: '/about',
      component: resolve => require(['@/components/about'], resolve)
    },
    // 地址管理
    {
      path: '/address',
      component: resolve => require(['@/components/address'], resolve)
    }
  ]
})