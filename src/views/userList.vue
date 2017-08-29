<template>
  <div id='userList'>
    <iframe id="child" class='' height='1000' src="http://localhost:8090"></iframe>
    <div class="note">
      <el-button type="primary" icon="edit" @click='reEdit'>权限设置</el-button>
    </div>
    <div class="clearfix clearfixed">
      <el-input class="handle-del mr2 fl" placeholder="用户名称" v-model='UserName'></el-input>
      <el-input class="handle-del mr2 fl" placeholder="手机号" v-model='PhoneNum'></el-input>
      <el-input class="handle-del mr2 fl" placeholder="编号" v-model='Id'></el-input>
      <el-button class="handle-del mr2 fl" type="primary" icon="search" @click='search'>开始搜索</el-button>
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
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="编号"
        prop="id"
        width="175">
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="PhoneNumber"
        label="手机号"
        width="160"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Email"
        label="邮箱"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="CurScore"
        label="当前积分"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="HisScore"
        label="累计积分"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 40, 60, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataLength">
      </el-pagination>
    </div>
    <div class="fixed" v-if='openOne'>
      <div class="poa poaOne poaOneB">
        <h4 class="titleHed">{{titleHeader}}</h4>
        <i class="poa poaRight el-icon-close" @click='closeOne(false)'></i>
        <el-table class='tableMargin'
          ref="multipleTabled"
          :data="tableData4"
          v-if = 'tableData4'
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          height='340'
          @selection-change="handleSelectionChanged">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            type="selection"            
            width="50">
          </el-table-column>
          <el-table-column
            label="角色"
            prop="rolesName"
            width="425">
          </el-table-column>
        </el-table>
      <!--<div class="block blocked">
        <el-pagination
          @size-change="handleSizeChanged"
          @current-change="handleCurrentChanged"
          :current-page="currentPaged5"
          :page-sizes="[20, 40, 60, 80, 100]"
          :page-size="pageSized"
          layout="total, prev, pager, next, jumper"
          :total="tableDataLengthed">
        </el-pagination>
      </div>-->
      <div class="clearfix">
          <el-button class="fr buttonPoa" type="primary" icon="close" @click='closeOne(false)'>取消</el-button>
          <el-button class="fr buttonPoa" type="primary" @click='closeOne(true)' icon="check">保存</el-button>
        
        </div>
    </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
  import userService from '@/services/userService'
  export default {
    data () {
      return {
        titleHeader: '',
        input: '',
        valued: '',
        optionsed: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        openOne: false,
        openTwo: false,
        formInline: {
          user: '',
          region: ''
        },
        tableData4: [],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎1',
          id: '01',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          id: '01',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          id: '王小虎4',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          id: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          id: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          id: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          id: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        multipleSelectioned: [],
        RoleIds: [],
        currentPage4: 1,
        currentPaged5: 1,
        pageSize: 20,
        pageSized: 20,
        tableDataLength: 0,
        tableDataLengthed: 0,
        row: 0,
        input3: '',
        input4: '',
        input5: '',
        select: '',
        UserName: '',
        Id: '',
        PhoneNum: ''
      }
    },
    created () {
      this.get({page: this.currentPage4, rows: this.pageSize})
      window.onload = function () {
        window.frames[0].postMessage('getcolor', 'http://localhost:8090')
      }
      window.addEventListener('message', function (e) {
        // var color = e.data
        if (e.srcElement.location.href.indexOf('userList') >= 0) {
          sessionStorage.setItem('coloredUerList', e.data)
        }
        console.log(2134577, sessionStorage.coloredUerList, e, e.srcElement.location.href)
      }, false)
    },
    mounted () {
//    window.onload = function () {
//      window.frames[0].postMessage('getcolor', 'http://localhost:8090')
//    }
//    window.addEventListener('message', function (e) {
//      // var color = e.data
//      sessionStorage.setItem('colored', e.data)
//      console.log(2134577, sessionStorage.colored, e)
//    }, false)
    },
    methods: {
      search () {
        // Id={Id}&UserName={UserName}&PhoneNumber={PhoneNumber}
        this.get({Id: this.Id, UserName: this.UserName, PhoneNumber: this.PhoneNum, page: this.currentPage4, rows: this.pageSize})
      },
      get (params) {
        userService.getUserList(params)
        .then(response => {
          console.log(222, response)
          this.tableDataLength = response.count
          this.tableData3 = response.data
        })
      },
      closeOne (bool) {
        if (bool === false) {
          this.$message({
            type: 'info',
            message: '已取消修改!'
          })
        } else {
          for (var i = 0; i < this.multipleSelectioned.length; i++) {
            this.RoleIds.push(this.multipleSelectioned[i].rolesId)
            console.log(444456, this.RoleIds)
            this.RoleIds = this.unique1(this.RoleIds)
          }
          userService.updateMemberRole({id: this.multipleSelection[0].id, RoleIds: this.RoleIds})
          .then(response => {
            console.log(455, response)
            this.multipleSelectioned = []
            this.RoleIds = []
            // this.get({page: this.currentPage4, rows: this.pageSize})
          })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
        this.openOne = false
      },
      reEdit () {
        this.titleHeader = '添加信息'
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一条数据!'
          })
        } else {
          userService.getAllRoles(this.multipleSelection[0].id)
          .then(response => {
            console.log(6666, response)
            this.tableDataLengthed = response.count
            if (response.data.length === 0) {
              this.tableData4.splice(0, this.tableData4.length, response.data)
            } else {
              this.tableData4 = response.data
              this.getRole()
            }
            this.openOne = true
          })
//        userService.getRole({id: this.multipleSelection[0].id})
//        .then(response => {
//          this.openOne = true
//          console.log(66667, response.data.memberRole)
//          // this.tableDataLengthed = response.count
//          // this.openOne = true
//          if (response.data.memberRole === null) {
//          } else {
//            var numLength = response.data.memberRole.split('')
//            console.log(1222, numLength)
//            for (var i = 0; i < numLength.length; i++) {
//              if (numLength[i] === '0') {
//                // console.log(121, i)
//              } else {
//                this.$refs.multipleTabled.toggleRowSelection(this.tableData4[i])
//              }
//            }
//          }
//        })
        }
      },
      reAdd () {
        this.titleHeader = '添加信息'
        this.openOne = true
      },
      getRole () {
        userService.getRole({id: this.multipleSelection[0].id})
          .then(response => {
            this.openOne = true
            console.log(66667, response.data.memberRole)
            // this.tableDataLengthed = response.count
            // this.openOne = true
            if (response.data.memberRole === null) {
            } else {
              var numLength = response.data.memberRole.split('')
              console.log(1222, numLength)
              for (var i = 0; i < numLength.length; i++) {
                if (numLength[i] === '0') {
                  // console.log(121, i)
                } else {
                  this.$refs.multipleTabled.toggleRowSelection(this.tableData4[i])
                }
              }
            }
          })
      },
      open4 () {
        this.$confirm('确定要将该项删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        console.log(4444, this.multipleSelection)
      },
      handleSizeChange (val) {
        // console.log('每页 {val} 条')
        this.pageSize = val
        this.get({page: this.currentPage4, rows: this.pageSize})
      },
      handleCurrentChange (val) {
        console.log('当前页{val}')
        this.currentPage4 = val
        this.get({page: this.currentPage4, rows: this.pageSize})
      },
      handleSelectionChanged (val) {
        this.multipleSelectioned = val
        console.log(44445, this.multipleSelectioned)
      },
      handleSizeChanged (val) {
        // console.log('每页 {val} 条')
        this.pageSized = val
      },
      unique1 (array) {
        var n = [] // 一个新的临时数组
        // 遍历当前数组
        for (var i = 0; i < array.length; i++) {
        // 如果当前数组的第i已经保存进了临时数组，那么跳过，
        // 否则把当前项push到临时数组里面
          if (n.indexOf(array[i]) === -1) n.push(array[i])
        }
        return n
      },
      handleCurrentChanged (val) {
        // console.log('当前页{val}')
        this.currentPaged5 = val
      }
    }
  }
</script>
<style>
  .blocked{
    margin-top:10px;
  }
  .poaOneB.poaOne{
    width:550px;
    margin-left:-275px;
  }
  .titleHed{
    margin:5px 10px 10px;
  }
  #userList .el-table.tableMargin .el-table__header-wrapper table{
    margin:10px auto 0;
    text-align: center!important;
  }
  #userList .el-table.tableMargin th{
    text-align: center!important;
  }
  .tableMargin .el-table__body-wrapper table{
    margin:0 auto;
    text-align: center;
  }
  .fixed{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    left:0;
    top:0;
    z-index: 222;
  }
  .poa{
    position: absolute;
    
  }
  .buttonPoa{
    margin:30px 10px;
  }
  .poaOne{
    border-radius: 4px;
    width:400px;
    height:500px;
    left:50%;
    top:50%;
    margin-left:-200px;
    margin-top:-250px;
    background:#fff;
  }
  .poaRight{
    cursor:pointer;
    right:10px;
    top:10px;
    font-size: 14px;
  }
  .fl{
    float:left;
  }
  .fr{
    float:right;
  }
  .clearfix {
    *zoom: 1;
  }
  .el-input.mr2{
    width:160px;
    margin-right:10px;
  }
  .clearfixed{
    margin:10px 0;
  }
  .el-form-item.mr2{
    margin-bottom: 0;
  }
  .clearfix:after {
    display: table;
    content: '';
    clear: both;
  }
  .table_box{
    min-height: 720px;
    margin-bottom:20px;
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
    /*width:350px;*/
    margin: 10px 0;
  }
  .select{
    width: 90px !important;
  }
</style>
