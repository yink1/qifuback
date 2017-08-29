<template>
  <div>
    
    <div class="note">
      <el-button  class="el-icon-check right" @click="open('服务', '上线')"> 上线 </el-button>
      <el-button  class="el-icon-close refuse" @click="open('服务', '下线')"> 下线 </el-button>
      <el-button  class="el-icon-close refuse" @click="open('服务', '删除')"> 删除 </el-button>
      <!--<el-button  class="el-icon-close refuse" @click="dialogVisible = true"> 修改 </el-button>-->
      <el-button  class="el-icon-close refuse" @click="changeShow"> 修改 </el-button>
      <el-button  class="el-icon-plus right"  @click="editDialog = true"> 管理标签 </el-button>
    </div>
    <div class="search">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
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
            <el-input v-model="filters.service" placeholder="服务名称" class='serviceName'></el-input>
            <el-input v-model="filters.author" placeholder="发布者" class='authorName'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectList">查询</el-button>
          </el-form-item>
      </el-form>
    </el-col>
    </div>
    <div class="table_box">
    <el-table
      ref="multipleTable"
      :data="serviceListData"
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
        label="编号">
        <template scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="Name"
        label="名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="ContactPhone"
        label="联系电话"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="City"
        label="城市"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Introduce"
        label="服务简介"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="OwnerName"
        label="发布者"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
        width="110"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="90"
        show-overflow-tooltip>
      </el-table-column>
       <el-table-column
        prop="Recommend"
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
    </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[20, 40, 60, 80, 100]"
        :page-size="pageNumber"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <p class="dio_p_box">
          <span>推荐值</span>
          <el-input v-model="recommendVal" placeholder="推荐值" class='recommend'></el-input>
        </p>
        <p class="dio_p_box">
          <span>预算推荐值</span>
          <el-input v-model="presetRecommendVal" placeholder="预算推荐值" class='recommend'></el-input>
        </p>
        <p class="dio_p_box">
          <span>推荐开始时间</span>
          <el-date-picker
            v-model="recommendStartTime"
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
            v-model="recommendEndTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1"
            class='recommend'>
          </el-date-picker>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
          <!--changeShow-->
          <el-button type="primary" @click="changeInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加标签"
        :visible.sync="editDialog"
        size="tiny"
        :before-close="handleClose" class='add_tag'>
        <div class="edit_box">
          <span>标签</span>
          <el-tree :data="newData" :props="defaultProps" @node-click="handleNodeClick" :render-content='renderContentDoc'></el-tree>
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
  import service from '@/services/service.js'
  import labelService from '@/services/labelService'
  export default {
    data () {
      return {
        serviceListData: [],
        restaurants: [],
        state1: '',
        dialogVisible: false,
        editDialog: false,
        tableData: [],
//      被选中项的数组集合
        multipleSelection: [],
        currentPage: 1,
        pageNumber: 20,
        select: '',
        totalPage: 0,
        filters: {
          service: '',
          CertificationConfirmed: '',
          author: ''
        },
        reason: '',
        refuseValue: '',
        options: [{
          value: '200',
          label: '上线'
        }, {
          value: '204',
          label: '下线'
        }, {
          value: '404',
          label: '删除'
        }],
        value: '',
        recommendVal: '',
        presetRecommendVal: '',
        recommendStartTime: '',
        recommendEndTime: '',
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
          label: 'label'
        }
      }
    },
    created () {
      this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
    },
    methods: {
//    获取列表信息
      get (params) {
        service.getServiceList(params)
        .then(response => {
          this.serviceListData = response.data
          this.totalPage = response.count.Result
          console.log('getServiceList')
          console.log(response)
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
        console.log('选中')
        console.log(rows)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log('选中')
        console.log(val)
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
//    每页多少条
      handleSizeChange (val) {
        console.log('每页' + val + '条')
        this.pageNumber = val
        this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
      },
//    第几页
      handleCurrentChange (val) {
        console.log('当前页' + val + '条')
        this.currentPage = val
        this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
      },
      open (val, done) {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'info',
            message: '请选择需要操作的' + val
          })
        } else {
          this.$confirm('确定要将该' + val + done, '信息提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var serviceIdArr = []
            var changeStatus = 0
            for (var i = 0; i < this.multipleSelection.length; i++) {
              serviceIdArr.push(this.multipleSelection[i].id)
            }
            console.log('serviceIdArr')
            console.log(serviceIdArr)
            if (done === '上线') {
              changeStatus = 200
            } else if (done === '下线') {
              changeStatus = 204
            } else if (done === '删除') {
              changeStatus = 404
            }
            service.changeServiceStatus({Id: serviceIdArr, type: changeStatus})
            .then(response => {
              console.log('changeServiceStatus')
              console.log(response)
              console.log('response.msg = ' + response.msg)
              if (response.msg === 'ok') {
                this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
                this.$message({
                  type: 'success',
                  message: done + '成功!'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消' + done
            })
          })
        }
      },
      changeShow () {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'info',
            message: '请选择需要修改的服务'
          })
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            type: 'info',
            message: '请单选'
          })
        } else {
          this.dialogVisible = true
        }
      },
      changeInfo () {
        console.log('点击确定')
        service.changeServiceInfo({'Id': this.multipleSelection[0].id,
          'Recommend': this.recommendVal,
          'PresetRecommend': this.presetRecommendVal,
          'RecommendStartTime': this.recommendStartTime,
          'RecommendEndTime': this.recommendEndTime})
        .then(response => {
          console.log('changeServiceInfo')
          console.log(response)
          console.log('response.msg = ' + response.msg)
          this.dialogVisible = false
          if (response.msg === 'ok') {
            this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
            this.$message({
              type: 'success',
              message: '修改信息成功!'
            })
          }
        })
      },
      selectList () {
        console.log('查询' + this.select + '   ' + this.filters.service + '   ' + this.filters.author)
        this.get({'Name': this.filters.service, 'Status': this.select, 'OwnerName': this.filters.author, 'page': this.currentPage, 'rows': this.pageNumber})
      },
      renderContentDoc: function (createElement, { node, data, store }) {
        console('标签 renderContentDoc')
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
//                    _this.getDocLabel()
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
        console('标签 renderContent')
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
                  console.log('click click click click click ')
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
//                    self.getDocLabel()
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
<style>
  .dn{
    display: none;
  }
  .table_box{
    min-height: 720px;
  }
  .note span{
    font-size: 14px;
    color: #666;
    margin-right: 10px;
  }
  .note i{
    margin-right: 6px;
  }
  .note .right{
    color: #00deb2;
  }
  .note .refuse{
    color: #FF0000;
  }
  .search{
    margin: 10px 0;
  }
  .select{
    width: 90px !important;
  }
  .dialogWidth{
    width: 100%;
  }
  .serviceName,.authorName{
    width: 45%;
    float: left;
    margin-left: 10px;
  }
  .select{
    width: 250px;
  }
  .input_box{
    margin-right: 0 !important;
  }
  .dio_p_box>span{
    width: 100px;
    display: block;
    float: left;
  }
  .recommend{
    width: 60% !important;
    margin-left: 10px;
  }
  .dio_p_box{
    margin-bottom: 10px;
    clear: both;
  }
  .dio_p_box:last-child{
    margin-bottom: 0;
  }
  .edit_box{
    width: 100%;
    border: 1px solid rgb(209, 229, 229);
    margin: 5px 0;
    max-height: 150px;
    overflow: auto;
  }
  .all_tag_box{
    max-height:200px;
  }
  .edit_box .el-tree{
    border: none;
  }
  .edit_box>span{
    background-color: rgb(209,229,229);
    padding-left: 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: #777;
    font-size: 16px;
  }
  .add_tag .el-dialog__body{
    padding-top: 10px ;
  }
  .edit{
    display: none;
  }
  .el-tree-node__content:hover .edit{
    display: block;
  }
</style>
