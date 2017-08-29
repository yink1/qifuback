<template>
  <div>
    <div class="note">
      <span><i class="el-icon-check right"></i>批准</span>
      <span><i class="el-icon-close refuse"></i>拒绝</span>
    </div>
    <div class="search">
      <el-input placeholder="公司简称" v-model="input5">
        <el-select v-model="select" slot="prepend" placeholder="请选择" class='select'>
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
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
        label="编号"
        width="65">
        <template scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyShortName"
        label="公司名称简写"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="comapnyIntroduce"
        label="公司介绍"
        width="160"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="companyUrl"
        label="公司网址"
        width="110"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="logo"
        label="公司logo"
        width="110"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="diplomaAddress"
        label="证书地址"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
       <el-table-column
        prop="city"
        label="城市"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="收件地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="110"
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
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎1',
          number: '01',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          number: '01',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        currentPage4: 1,
        input3: '',
        input4: '',
        input5: '',
        select: ''
      }
    },
    methods: {
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
      },
      handleSizeChange (val) {
        console.log('每页 {val} 条')
      },
      handleCurrentChange (val) {
        console.log('当前页{val}')
      }
    }
  }
</script>
<style>
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
    width:350px;
    margin: 10px 0;
  }
  .select{
    width: 90px !important;
  }
</style>

