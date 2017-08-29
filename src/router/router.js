import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      children: [
        {
          path: '/serviceList',
          component: resolve => require(['@/views/serviceList.vue'], resolve)
        },
        {
          path: '/basetable',
          component: resolve => require(['@/views/BaseTable.vue'], resolve)
        },
        {
          path: '/vuetable',
          component: resolve => require(['@/views/VueTable.vue'], resolve) // vue-datasource组件
        },
        {
          path: '/docList',
          component: resolve => require(['@/views/DocList.vue'], resolve)
        },
        {
          path: '/vueeditor',
          component: resolve => require(['@/views/VueEditor.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
          path: '/markdown',
          component: resolve => require(['@/views/Markdown.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
          path: '/upload',
          component: resolve => require(['@/views/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
        },
        {
          path: '/basecharts',
          component: resolve => require(['@/views/BaseCharts.vue'], resolve) // vue-schart组件
        },
        {
          path: '/tag',
          component: resolve => require(['@/views/TagList.vue'], resolve) // 拖拽列表组件
        },
        {
          path: '/examine',
          component: resolve => require(['@/views/Examine.vue'], resolve) // 拖拽列表组件
        },
        {
          path: '/bannerMananement',
          component: resolve => require(['@/views/BannerManagement.vue'], resolve) // 拖拽列表组件
        },
        {
          path: '/userList',
          component: resolve => require(['@/views/userList.vue'], resolve) // 拖拽列表组件
        },
        {
          path: '/CompanyList',
          component: resolve => require(['@/views/CompanyList.vue'], resolve) // 拖拽列表组件
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/views/Login.vue'], resolve)
    }
  ]
})
