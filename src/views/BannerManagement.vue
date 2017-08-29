<template>
  <div>
    <iframe id="child" class='' height='1000' src="http://localhost:8090"></iframe>
    <div class="note">
      <el-button type="primary" icon="plus" @click='reAdd'>添加</el-button>
      <el-button type="primary" icon="edit" @click='reEdit'>修改</el-button>
      <el-button type="primary" @click="open4" icon="delete">删除</el-button>
    </div>
    <div class="clearfix clearfixed">
      <el-input class="handle-del mr2 fl" placeholder="ID" v-model='Id'></el-input>
      <el-input class="handle-del mr2 fl" placeholder="标题" v-model='Title'></el-input>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item class="handle-del mr2 fl" label="类别">
        <el-select v-model="Category" >
          <el-option v-for='it in optionsed' :label="it.label" :value="it.value"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <el-button class="handle-del mr2 fl" type="primary" icon="search" @click='searchCon'>开始搜索</el-button>
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
        width="60">
      </el-table-column>
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="编号"
        prop="id"
        width="65">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="url"
        label="点击地址"
        width="380"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="PicUrl"
        label="图片地址"
        width="380"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="para1"
        label="备用地址"
        width="320"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Category"
        label="类别"
        width="150"
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
    	<div class="poa poaOne">
    	  <h4 class="titleH">{{titleHeader}}</h4>
    	  <i class="poa poaRight el-icon-close" @click='closeOne'></i>
    	  <div class="outCwidth outCwidthWaring"><span class="cWidth">请选择图片:</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.PicUrl" placeholder='上传封面'></el-input></div>
    	    <span class='picOption'><i class="el-icon-plus"></i>图片选择</span>
    	    <formDataupload :uptoken="uploadToken" :formId="browse_button" @setUploadedFileInfo="setUploadedFileInfo"></formDataupload>
    	  </div>
    	  <div class="outCwidth"><span class="cWidth">标题:</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.title"></el-input></div>
    	  </div>
    	  <div class="outCwidth"><span class="cWidth">类别:</span>
          <div class="inCwidth">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="handle-del mr2 fl">
              <el-select v-model="tableDataPush.Category" placeholder="--请选择类别--">
                <!--<el-option label="主页" value="homePageTop"></el-option>
                <el-option label="主页底部" value="homePageBottom"></el-option>
                <el-option label="内容页" value="recommend"></el-option>-->
                <el-option v-for='it in optionsed' :label="it.label" :value="it.value"></el-option>
              </el-select>
            </el-form-item>
            </el-form>
          </div>
        </div>
    	  <div class="outCwidth outCwidthWaring"><span class="cWidth">点击链接:</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.Url"></el-input></div>
    	    <span class='picOption picShowMsg por'>请输入链接地址
    	       <span class="poa inPicShowMsg"></span>
    	    </span>
    	  </div>
    	  <div class="outCwidth"><span class="cWidth">备选链接:</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.para1"></el-input></div>
    	  </div>
    	  <div class="outCwidth"><span class="cWidth">排序:</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.sort"></el-input></div>
    	  </div>
    	  <div class="outCwidth"><span class="cWidth">对应ID(选填):</span>
    	    <div class="inCwidth"><el-input v-model="tableDataPush.id" disabled></el-input></div>
    	  </div>
    	  <div class="clearfix">
    	    <el-button class="fr buttonPoa" type="primary" icon="close" @click='closeOne(false)'>取消</el-button>
    	    <el-button class="fr buttonPoa" type="primary" @click='closeOne(true)' icon="check">确定</el-button>        
    	  </div>
    	  
    	</div>    	
    </div>
  </div>
</template>

<script>
  import bannerService from '@/services/bannerService'
  import formDataupload from '@/views/FormDataUpload'
  import qiniuService from '@/services/qiniuService'
  export default {
    data () {
      return {
        titleCon: '',
        idCon: '',
        browse_button: 'selServicePic',
        uploadToken: '',
        titleHeader: '',
        input: '',
        tableDataPush: {
          PicUrl: '',
          Url: '',
          title: '',
          id: '',
          Category: '',
          para1: '',
          sort: ''
        },
        pageSize: 20,
        row: 0,
        keyed: 0,
        valued: '',
        optionsed: [
          {
            value: 'homepage',
            label: 'homepage'
          }, {
            value: 'homePageTop',
            label: 'homePageTop'
          }, {
            value: 'homePageBottom',
            label: 'homePageBottom'
          }, {
            value: 'recommend',
            label: 'recommend'
          }, {
            value: 'serviceTop',
            label: 'serviceTop'
          }, {
            value: '',
            label: '全部'
          }
        ],
        openOne: false,
        openTwo: false,
        formInline: {
          user: '',
          region: ''
        },
        tableData3: [],
        tableDataPop: [],
        multipleSelection: [],
        currentPage4: 1,
        input3: '',
        input4: '',
        input5: '',
        select: '',
        tableDataLength: 0,
        Id: '',
        Title: '',
        Category: ''
      }
    },
    created () {
      this.get({Id: this.Id, Title: this.Title, Category: this.Category, page: this.currentPage4, rows: this.pageSize})
      this.getQiniuToken()
      window.onload = function () {
        window.frames[0].postMessage('getcolor', 'http://localhost:8090')
      }
      window.addEventListener('message', function (e) {
        // var color = e.data
        var myId = e.lastEventId
        if (e.srcElement.location.href.indexOf('bannerMananement') >= 0) {
          sessionStorage.setItem('colored', e.data)
          // var colored = e.data
        }
        console.log(21345778, sessionStorage.colored, e, myId)
      }, false)
    },
    mounted () {},
    watch: {
      message (n, o) {
        console.log(n)
      }
    },
    computed: {},
    methods: {
      searchCon () {
        this.get({Id: this.Id, Title: this.Title, Category: this.Category, page: this.currentPage4, rows: this.pageSize})
      },
      getQiniuToken () {
        qiniuService.getQiniuToken()
        .then(response => {
          this.uploadToken = response.uptoken
        })
      },
      setUploadedFileInfo (buttonId, fileName, restUrl) {
        console.log(121112, restUrl)
        this.tableDataPush.PicUrl = restUrl
        this.servicePic = restUrl
      },
      get (params) {
        bannerService.getAdminBannerList(params)
        .then(response => {
          console.log(222, response)
          this.tableDataLength = response.count
          this.tableData3 = response.data
        })
      },
      setCurrentRowed (row) {
        this.row = row
      },
      closeOne (bool) {
        if (bool === false) {
          this.tableDataPush = {
            PicUrl: '',
            Url: '',
            title: '',
            id: '',
            Category: '',
            para1: ''
          }
        } else {
          if (this.titleHeader === '修改banner') {
            bannerService.adminAddBanner(this.tableDataPush)
            .then(response => {
              console.log(455, this.tableDataPush, response)
              this.get({page: this.currentPage4, rows: this.pageSize})
            })
          } else if (this.titleHeader === '添加信息' && this.tableDataPush.PicUrl) {
            bannerService.adminAddBanner({PicUrl: this.tableDataPush.PicUrl, Url: this.tableDataPush.Url, title: this.tableDataPush.title, id: 0, Category: this.tableDataPush.Category, para1: this.tableDataPush.para1, para2: this.tableDataPush.para2})
            .then(response => {
              console.log(455, this.tableDataPush, response)
              this.get({page: this.currentPage4, rows: this.pageSize})
            })
          }
        }
        this.openOne = false
      },
      reEdit () {
        this.titleHeader = '修改banner'
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一条数据!'
          })
        } else {
          this.tableDataPush.PicUrl = this.multipleSelection[0].PicUrl
          this.tableDataPush.Url = this.multipleSelection[0].Url
          this.tableDataPush.title = this.multipleSelection[0].title
          this.tableDataPush.id = this.multipleSelection[0].id
          this.tableDataPush.Category = this.multipleSelection[0].Category
          this.tableDataPush.para1 = this.multipleSelection[0].para1
          this.openOne = true
        }
      },
      reAdd () {
        this.tableDataPush = {
          PicUrl: '',
          Url: '',
          title: '',
          id: '',
          Category: '',
          para1: ''
        }
        this.titleHeader = '添加信息'
        this.openOne = true
      },
      open4 () {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一条数据!'
          })
        } else {
          this.tableDataPush.PicUrl = this.multipleSelection[0].PicUrl
          this.tableDataPush.Url = this.multipleSelection[0].Url
          this.tableDataPush.title = this.multipleSelection[0].title
          this.tableDataPush.id = this.multipleSelection[0].id
          this.tableDataPush.Category = this.multipleSelection[0].Category
          this.tableDataPush.para1 = this.multipleSelection[0].para1
          // this.handleSelectionChange()
          this.$confirm('确定要将该项删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(2223, this.multipleSelection)
            bannerService.adminDeleteBanner(this.tableDataPush)
            .then(response => {
              console.log(456888, response)
              this.get({page: this.currentPage4, rows: this.pageSize})
            })
            this.$refs.multipleTable.clearSelection()
            // multipleSelection
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
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(123, this.multipleSelection)
      },
      handleSizeChange (val) {
        console.log(val)
        this.pageSize = val
        this.get({Id: this.Id, Title: this.Title, Category: this.Category, page: this.currentPage4, rows: this.pageSize})
      },
      handleCurrentChange (val) {
        console.log(val)
        this.currentPage4 = val
        this.get({Id: this.Id, Title: this.Title, Category: this.Category, page: this.currentPage4, rows: this.pageSize})
      }
    },
    components: {
      formDataupload
    }
  }
</script>
<style>
  .mr2 .el-form--inline .el-form-item__label{
    float:left;
  }
  .titleH{
    margin:5px 10px;
  }
  .picOption{
    font-size: 12px;
  }
  .picShowMsg{
    padding:4px 4px;
    border-radius: 4px;
    background:#ffc;
    border:1px solid #E3C77E;
    margin-left:2px;
  }
  .inPicShowMsg{
    left:-5px;
    top:50%;
    margin-top:-3px;
    width:6px;
    height:6px;
    background:#ffc;
    boder:1px solid transparent;
    border-left:1px solid #E3C77E;
    border-bottom:1px solid #E3C77E;
    transform: rotate(45deg);
    z-index: 111111111;
  }
  .picOption i{
    color:green;
    border:1px solid green;
    margin-right:2px;
  }
  .cWidth{
    display: inline-block;
    width:100px;
    height:40px;
    font-size: 12px;
    line-height: 40px;
    text-align: right;
  }
  .outCwidth{
    margin-top:15px;
  }
  .el-select-dropdown{
    z-index:111111111111111111!important;
  }
  .inCwidth{
    width:200px;
    display: inline-block;
    vertical-align: top;
  }
  .inCwidth .el-form--inline .el-form-item{
    margin-right:0;
    margin-bottom:0;
  }
  .fixed{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    left:0;
    top:0;
    z-index: 22222222222;
  }
  .poa{
    position: absolute;
    
  }
  .buttonPoa{
    margin:30px 10px;
  }
  .poaOne{
    border-radius: 4px;
    width:415px;
    height:500px;
    left:50%;
    top:50%;
    margin-left:-205px;
    margin-top:-250px;
    background:#fff;
  }
  .poaRight{
    cursor:pointer;
    right:10px;
    top:10px;
    font-size: 14px;
  }
  .por{position: relative;}
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
    width:350px;
    margin: 10px 0;
  }
  .select{
    width: 90px !important;
  }
  .outCwidthWaring .el-input__inner{
    border:1px solid #f40;
  }
  #selServicePic .file-button {
    width: 105px;
    height: 40px;
    position: absolute;
    left: 305px;
    right: 0;
    top: 40px;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
}
</style>
