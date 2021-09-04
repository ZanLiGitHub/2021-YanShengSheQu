const routes = [
  {
    path: '/',
    //component: () => import('layouts/MainLayout.vue'),
    component: () => import('layouts/login.vue'),
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue') /*()=>import延迟加载*/
      },
      // //档案管理
      // {
      //   path: '/xjda',
      //   component: () => import('pages/dagl/xjda.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgda',
      //   component: () => import('pages/dagl/xgda.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/dacx',
      //   component: () => import('pages/dagl/dacx.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgda_xg',
      //   component: () => import('pages/dagl/xgda_xg.vue') /*()=>import延迟加载*/
      // },
      // //商户管理
      // {
      //   path: '/xjsh',
      //   component: () => import('pages/shgl/xjsh.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgsh',
      //   component: () => import('pages/shgl/xgsh.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/shcx',
      //   component: () => import('pages/shgl/shcx.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgsh_xg',
      //   component: () => import('pages/shgl/xgsh_xg.vue') /*()=>import延迟加载*/
      // },
      // //小区管理
      // {
      //   path: '/xjxq',
      //   component: () => import('pages/xqgl/xjxq.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgxq',
      //   component: () => import('pages/xqgl/xgxq.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xqcx',
      //   component: () => import('pages/xqgl/xqcx.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgxq_xg',
      //   component: () => import('pages/xqgl/xgxq_xg.vue') /*()=>import延迟加载*/
      // },
      // //网格管理
      // {
      //   path: '/xjwg',
      //   component: () => import('pages/wggl/xjwg.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgwg',
      //   component: () => import('pages/wggl/xgwg.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/wgcx',
      //   component: () => import('pages/wggl/wgcx.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgwg_xg',
      //   component: () => import('pages/wggl/xgwg_xg.vue') /*()=>import延迟加载*/
      // },
      // //AI消防
      // {
      //   path: '/xfxx',
      //   component: () => import('pages/aixf/xfxx.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xjxftd',
      //   component: () => import('pages/aixf/xjxftd.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgxftd',
      //   component: () => import('pages/aixf/xgxftd.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xgxftd_xg',
      //   component: () => import('pages/aixf/xgxftd_xg.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xftdcx',
      //   component: () => import('pages/aixf/xftdcx.vue') /*()=>import延迟加载*/
      // },
      //
      // //系统管理
      // {
      //   path: '/khgys',
      //   component: () => import('pages/xtsz/khgys.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xt_xz',
      //   component: () => import('pages/xtsz/xt_xz.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xt_xg',
      //   component: () => import('pages/xtsz/xt_xg.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/yhgl',
      //   component: () => import('pages/xtsz/yhgl.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/yhgl_xz',
      //   component: () => import('pages/xtsz/yhgl_xz.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/yhgl_xg',
      //   component: () => import('pages/xtsz/yhgl_xg.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/lspz',
      //   component: () => import('pages/xtsz/lspz.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/xmlxwh',
      //   component: () => import('pages/xtsz/xmlxwh.vue') /*()=>import延迟加载*/
      // },
      // {
      //   path: '/sglxwh',
      //   component: () => import('pages/xtsz/sglxwh.vue') /*()=>import延迟加载*/
      // },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
