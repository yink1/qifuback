<template>
  <div>
    <div class="note">
      <el-button  class="el-icon-check right" @click="open('服务', '上线')"> 上线 </el-button>
      <el-button  class="el-icon-close refuse" @click="open('服务', '下线')"> 下线 </el-button>
      <el-button  class="el-icon-close refuse" @click="open('服务', '删除')"> 删除 </el-button>
      <el-button  class="el-icon-close refuse" @click="getDialog"> 修改 </el-button>
      <el-button  class="el-icon-plus right"  @click="editDialog = true"> 管理标签 </el-button>
    </div>
    <div class="search">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item > 
            <el-select v-model="select" placeholder="请选择" class='select'> 
               <el-option 
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class='input_box'>
            <el-input v-model="docTitle" placeholder="文档标题" class='docName'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="get('search')">查询</el-button>
          </el-form-item>
      </el-form>
    </el-col>
    </div>
    <div class="table_box">
    <el-table
      ref="multipleTable"
      :data="tableData3"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="Title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="Score"
        label="积分"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="OwnerName"
        label="创建者"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Status"
        label="状态"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Recommend"
        label="推荐值"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="PresetRecommend"
        label="预算推荐值"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="RecommendStartTime"
        label="推荐开始时间"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
       <el-table-column
        prop="RecommendEndTime"
        label="推荐结束时间"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <p class="dio_p_box">
        <span>推荐值</span>
        <el-input v-model="editInfo.Recommend" placeholder="推荐值" class='recommend'></el-input>
      </p>
      <p class="dio_p_box">
        <span>预算推荐值</span>
        <el-input v-model="editInfo.PresetRecommend" placeholder="预算推荐值" class='recommend'></el-input>
      </p>
      <p class="dio_p_box">
        <span>推荐开始时间</span>
        <el-date-picker
          v-model="editInfo.RecommendStartTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions1"
          class='recommend'>
        </el-date-picker>
      </p>
      <p class="dio_p_box">
        <span>推荐结束时间</span>
        <el-date-picker
          v-model="editInfo.RecommendEndTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions1"
          class='recommend'>
        </el-date-picker>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureEdit()">取 消</el-button>
        <el-button type="primary" @click="sureEdit('sure')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加标签"
      :visible.sync="editDialog"
      size="tiny"
      :before-close="handleClose" class='add_tag'>
      <div class="edit_box">
        <span>标签</span>
        <el-tree :data="newData" :props="defaultProps" @node-click="handleNodeClick" :renderContent='renderContentDoc'></el-tree>
      </div>      
      <div class="edit_box all_tag_box">
        <span>所有标签</span>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import docService from '@/services/docService'
  import labelService from '@/services/labelService'
  export default {
    data () {
      return {
        tableData3: [],
        restaurants: [],
        state1: '',
        dialogVisible: false,
        editDialog: false,
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        select: '',
        total: 0,
        docTitle: '',
        options: [{
          value: 200,
          label: '上线'
        }, {
          value: 204,
          label: '下线'
        }, {
          value: 404,
          label: '删除'
        }],
        editInfo: {
          Id: '',
          Recommend: '',
          PresetRecommend: '',
          RecommendStartTime: '',
          RecommendEndTime: ''
        },
        sels: [],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        data: [],
        newData: [],
        defaultProps: {
          children: 'children',
          Name: 'Name'
        },
        params: {//  获取全部的文档
          Id: '',
          Status: '',
          Title: '',
          page: 1,
          rows: 10
        },
        audit: {//  删除，下线，上线
          Id: [],
          type: 404
        }
      }
    },
    created () {
      this.get()
      this.getAllLabelList()
    },
    watch: {
      currentPage (val) {
        this.params.page = val
        this.get()
      },
      pageSize (val) {
        this.params.rows = val
        console.log(val)
        this.get()
      }
    },
    methods: {
      get (val) {
        this.tableData3 = []
        if (val === 'search') {
          this.params.Status = this.select
          this.params.Title = this.docTitle
        }
        docService.getAdminDocList(this.params)
        .then(response => {
          console.log('doc2222')
          console.log(response)
          this.total = response.count
          this.tableData3 = response.data
        })
      },
      upStatus () {
        this.audit.Id = []
        for (var j = 0; j < this.multipleSelection.length; j++) {
          this.audit.Id.push(this.multipleSelection[j].id)
        }
        docService.adminUpStatus({Id: this.audit.Id, type: this.audit.type})
        .then(response => {
          console.log('auditDoc')
          console.log(response)
          this.get()
        })
      },
      getAllLabelList () {
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
          this.data.push(response.data[0])
          console.log('111111111')
          console.log(this.data)
        })
      },
      getDocLabel () {
        this.newData = []
        labelService.adminGetTypeLabel({ObjectId: this.multipleSelection[this.multipleSelection.length - 1].id, ObjectType: 2})
        .then(response => {
          console.log('adminGetTypeLabel')
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
          this.newData.push(response.data[0])
        })
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
        if (val.length > 0) {
          this.getDocLabel()
        }
        console.log('handleSelectionChange')
        console.log(val)
        console.log(999, this.audit)
      },
      handleNodeClick (data) {
        console.log(data)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
//    改变每页条数
      handleSizeChange (val) {
        console.log('每页 ' + val)
        this.pageSize = val
        console.log()
      },
//    改变页数
      handleCurrentChange (val) {
        this.currentPage = val
        console.log('当前页' + val)
      },
//    打开修改信息弹窗
      getDialog () {
        if (this.multipleSelection.length > 0) {
          this.editInfo.Id = this.multipleSelection[0].id
          this.editInfo.Recommend = this.multipleSelection[0].Recommend
          this.editInfo.PresetRecommend = this.multipleSelection[0].PresetRecommend
          this.editInfo.RecommendStartTime = this.multipleSelection[0].RecommendStartTime
          this.editInfo.RecommendEndTime = this.multipleSelection[0].RecommendEndTime
          this.dialogVisible = true
        } else {
          alert('请选择文档')
        }
      },
//    修改信息
      sureEdit (val) {
        this.dialogVisible = false
        if (val === 'sure') {
          console.log(this.editInfo)
          docService.adminUpdateDoc(this.editInfo)
          .then(response => {
            console.log('adminUpdateDoc')
            console.log(response)
            if (response.msg === 'ok') {
              this.get()
            }
          })
        }
      },
      open (val, edit) {
        const _self = this
        this.$confirm('确定要将该' + val + edit + '？', '信息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (edit === '上线') {
            _self.audit.type = 200
          } else if (edit === '下线') {
            _self.audit.type = 204
          } else if (edit === '删除') {
            _self.audit.type = 404
          }
          console.log('11111111' + _self.audit)
          _self.upStatus()
          this.$message({
            type: 'success',
            message: edit + '成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + edit
          })
        })
      },
      renderContentDoc: function (createElement, { node, data, store }) {
        var _this = this
        console.log(node)
        if (node.data) {
          return createElement('span', [
            createElement('span', node.data.Name),
            createElement('div', {
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
                    if (data.children.length === 0) {
                      labelService.adminDeleteMainLabel({
                        ObjectId: _this.multipleSelection[_this.multipleSelection.length - 1].id,
                        ObjectType: 2,
                        LabelId: data.Id
                      })
                      .then(response => {
                        console.log('adminDeleteMainLabel222222')
                        console.log(response)
                        _this.getDocLabel()
                      })
                    } else {
                      alert('不能删除父节点标签')
                    }
                  }
                }
              }, '删除'),
              createElement('el-button', {
                attrs: {
                  size: 'mini'
                },
                on: {
                  click: function (event) {
                    event.stopPropagation()
                    labelService.adminSetMainLabel({
                      ObjectId: _this.multipleSelection[_this.multipleSelection.length - 1].id,
                      ObjectType: 2,
                      LabelId: data.Id
                    })
                    .then(response => {
                      console.log('adminSetMainLabel')
                      console.log(response)
                      _this.getDocLabel()
                      alert('设置成功')
                    })
                  }
                }
              }, '设置为主标签')
            ])
          ])
        } else {
          return createElement('span', '标签')
        }
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
                  labelService.adminUpdateObjectLabel({
                    ObjectId: self.multipleSelection[self.multipleSelection.length - 1].id,
                    ObjectType: 2,
                    LabelId: data.Id
                  })
                  .then(response => {
                    console.log('adminUpdateObjectLabel')
                    console.log(response)
                    if (response.msg === 'ok') {
                      alert('添加成功')
                      self.getDocLabel()
                    }
                  })
                }
              }
            }, '添加')
          ])
        ])
      }
    }
  }
</script>

