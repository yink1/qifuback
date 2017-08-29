<template>
  <div class="tagList">
    <el-input
    placeholder="输入标签关键字进行过滤"
    v-model="filterText" class='tagName'>
  </el-input>
  <el-tree :data="data2" 
    :props="defaultProps" 
    default-expand-all 
    :filter-node-method="filterNode" 
    :render-content="renderContent" 
    ref="tree2">
  </el-tree>
</div>
</template>
<script>
  import labelService from '@/services/labelService'
  export default {
    data () {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialog: false,
        editInfo: {
          id: '',
          Name: '',
          FatherPath: '',
          FatherId: '',
          RootId: ''
        }
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },
    created () {
      this.getAllLabelList()
    },
    methods: {
      getAllLabelList () {
        this.data2 = []
        labelService.adminLabelList({Name: ''})
        .then(response => {
          console.log('getLabel')
          console.log(response)
          for (var k = 0; k < response.data.length; k++) {
            this.$set(response.data[k], 'children', [])
          }
          for (var i = 0; i < response.data.length; i++) {
            for (var j = 0; j < response.data.length; j++) {
              if (response.data[i].FatherId === response.data[j].Id) {
                response.data[j].children.push(response.data[i])
              }
            }
          }
          this.data2.push(response.data[0])
          console.log('111111111')
          console.log(this.data2)
        })
      },
      editLabelInfo (params) {
        labelService.adminAddLabel({
          id: params.Id,
          Name: params.Name,
          FatherPath: params.FatherPath,
          FatherId: params.FatherId,
          RootId: params.RootId
        })
        .then(response => {
          console.log('getLabel')
          console.log(response)
          this.getAllLabelList()
        })
      },
      deleteLabel (data) {
        console.log(data)
        labelService.adminDeleteLabel({id: data.Id})
        .then(response => {
          console.log(response)
          this.getAllLabelList()
        })
      },
      filterNode (value, data) {
        if (!value) return true
        return data.Name.indexOf(value) !== -1
      },
      open (edit, data) {
        var self = this
        this.$prompt('标签名称:', edit + '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '该输入项为必输项'
        }).then(({ value }) => {
          if (edit === '修改') {
            data.Name = value
            console.log('weishenmaaaaa' + data.Id)
            self.editLabelInfo(data)
          } else if (edit === '添加') {
            data.Id = 0
            data.Name = value
            self.editLabelInfo(data)
          }
          this.$message({
            type: 'success',
            message: edit + '标签名为' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      deleteTag (data) {
        var self = this
        this.$confirm('确定要将该标签删除？', '信息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('1111', data)
          self.deleteLabel(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      renderContent: function (createElement, { node, data, store }) {
        var self = this
        return createElement('span', [
          createElement('span', node.data.Name),
          createElement('span', {
            attrs: {
              style: 'float: right; margin-right: 20px',
              class: 'edit'
            }
          }, [
            createElement('el-button', {
              attrs: {
                size: 'mini'
              },
              on: {
                click: function (event) {
                  event.stopPropagation()
                  console.info('点击了节点' + data.Id + '的删除按钮')
                  self.open('修改', data)
                }
              }
            }, '修改'),
            createElement('el-button', {
              attrs: {
                size: 'mini'
              },
              on: {
                click: function (event) {
                  event.stopPropagation()
                  console.info('点击了节点' + data.Id + '的添加按钮')
                  self.open('添加', data)
                }
              }
            }, '添加'),
            createElement('el-button', {
              attrs: {
                size: 'mini'
              },
              on: {
                click: function (event) {
                  event.stopPropagation()
                  console.info('点击了节点' + data.Id + '的删除按钮')
                  self.deleteTag(data)
                }
              }
            }, '删除')
          ])
        ])
      }
    }
  }
</script>
<style>
  .tagList .tagName{
    width: 250px;
    margin-bottom: 10px;
  }
  .el-message-box__wrapper .el-message-box__content{
    padding:10px 20px;
  }
</style>
