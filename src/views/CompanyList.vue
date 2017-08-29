<template>
  <div>
    <div class="note">
       <!--<span><i class="el-icon-check right"></i>批准</span>
      <span><i class="el-icon-close refuse"></i>拒绝</span>
      -->
       <el-button  @click="btnUpdateStatus('ok')"  class="el-icon-check right"> 批准 </el-button>
       <el-button   @click="dialogVisible = true"  class="el-icon-close refuse"> 拒绝 </el-button>
    </div>
    <div class="search">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
          <el-form-item > 
          <el-select v-model="filters.CertificationConfirmed" placeholder="请选择"> 
             <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
          <el-form-item >
          <el-input v-model="filters.ShortName" placeholder="公司简称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="get">查询</el-button>
        </el-form-item>
        </el-form>
    </el-col>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    size="tiny" class="dialogWidth">
      <!--<el-select v-model="refuseValue" placeholder="请选择理由">
      <el-option
        v-for="item in refuseOption"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>-->
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <span class="sub-title">拒绝理由</span>
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect">
          </el-autocomplete>
      </el-col>
    </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnUpdateStatus('no')">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <div class="table_box">
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selsChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="公司名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ShortName"
        label="公司名称简写"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Introduce"
        label="公司介绍"
        width="600"
       >
      </el-table-column>
      <el-table-column
        prop="CertificationConfirmed"
        label="状态"
        width="80"
        :formatter="formatSex"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="公司网址"
        min-width="100"
        show-overflow-tooltip>
        <template scope="scope">
          <a :href='scope.row.WebSite' target='_blank'>{{scope.row.WebSite}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="LogoUrl"
        label="公司logo"
        min-width="100"
        show-overflow-tooltip>
        <template scope="scope">
          <a :href='scope.row.LogoUrl' target='_blank'>{{scope.row.LogoUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="CertificationUrl"
        label="证书地址"
        width="100"
        show-overflow-tooltip>
         <template scope="scope">
          <a :href='scope.row.CertificationUrl' target='_blank'>{{scope.row.CertificationUrl}}</a>
        </template>
      </el-table-column>
       <el-table-column
        prop="City"
        label="城市"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="PhoneNum"
        label="手机号"
        width="130"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Email"
        label="邮箱"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="MailingAddress"
        label="收件地址"
        min-width="100"
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
        :current-page="1"
        layout="total, prev, pager, next, jumper"
        :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import companyService from '@/services/companyService'
  export default {
    data () {
      return {
        restaurants: [],
        state1: '',
        dialogVisible: false,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        select: '',
        total: 0,
        filters: {
          ShortName: '',
          CertificationConfirmed: ''
        },
        reason: '',
        refuseValue: '',
        options: [{
          value: 'true',
          label: '通过'
        }, {
          value: 'false',
          label: '不通过'
        }, {
          value: '',
          label: '未审核'
        }],
        value: '',
        sels: []
      }
    },
    created () {
      this.get(this.currentPage)
    },
    watch: {
      currentPage (val) {
        this.get()
      }
    },
    mounted () {
      console.log('mounted')
      this.restaurants = this.loadAll()
    },
    methods: {
      Url (WebSite) {
        this.$router.go(WebSite)
      },
      formatSex: function (row, column) {
        if (row.CertificationConfirmed === true) {
          return '通过'
        } else if (row.CertificationConfirmed === false) {
          return '不通过'
        } else {
          return '未审核'
        }
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
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
        console.log(this.restaurants)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () {
        return [
          { 'value': '企业三证信息与企业不符合' }
        ]
      },
      handleSelect (item) {
        console.log(item)
      },
      selsChange (sels) {
        this.sels = sels
      },
      handleSizeChange (val) {
        console.log('每页 {val} 条')
      },
      handleCurrentChange (val) {
        console.log('当前页{val}')
        this.currentPage = val
      },
      get () {
        console.log('get dagta')
        companyService.getAdminCompanyList({'ShortName': this.filters.ShortName, 'CertificationConfirmed': this.filters.CertificationConfirmed, 'page': this.currentPage, 'rows': 10})
        // 接收请求返回值
        .then(response => {
          this.tableData = response.data
          this.total = response.count
          console.log('this.tableData')
          console.log('this.total')
          console.log(this.tableData)
          console.log(this.total)
        })
      },
      btnUpdateStatus: function (upType) {
        var ids = this.sels.map(item => item.id).join()
        this.$confirm('确认要执行该操作吗？', '操作', {
          type: 'warning'
        }).then(() => {
          if (upType === 'no') {
            upType = 1
            this.reason = this.state1
          } else if (upType === 'ok') {
            upType = 2
            this.reason = ''
          }
          this.listLoading = true
          let para = { 'ids': ids, 'upType': upType, 'reason': this.reason }
          companyService.adminUpStatus(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.get()
          })
        }).catch(() => {
        })
      }
    }
  }
</script>

