<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'el-icon-setting',
            index: 'serviceList',
            title: '服务列表'
          },
          {
            icon: 'el-icon-menu',
            index: '2',
            title: '表格',
            subs: [
              {
                index: 'basetable',
                title: '基础表格'
              },
              {
                index: 'vuetable',
                title: 'Vue表格组件'
              }
            ]
          },
          {
            icon: 'el-icon-date',
            index: 'docList',
            title: '文档列表'
          },
          {
            icon: 'el-icon-star-on',
            index: 'basecharts',
            title: '图表'
          },
          {
            icon: 'el-icon-upload2',
            index: 'tag',
            title: '标签列表'
          },
          {
            icon: 'el-icon-menu',
            index: 'CompanyList',
            title: '企业审核'
          },
          {
            icon: 'el-icon-menu',
            index: 'bannerMananement',
            title: 'banner列表'
          },
          {
            icon: 'el-icon-menu',
            index: 'userList',
            title: '用户列表'
          }
        ]
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path.replace('/', '')
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }
  
  .sidebar>ul {
    height: 100%;
  }
</style>
