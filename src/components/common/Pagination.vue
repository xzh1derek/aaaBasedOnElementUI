<template>
  <div class="paginationClass">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes=pageSizes
      :page-size="pagesize"
      :background='true'
      :pager-count="pagerCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems" class="pageControl">
    </el-pagination>

  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "Pagination",
    data() {
      return {
        stuList: [],
        totalItems: 1,
        pagesize: 9,//每一页的数量,
        pageSizes: [9, 20, 40],
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
        listInfo: [],
        currentPage: 1,//初始页
      }
    },
    props: ['targetUrl1', 'targetUrl2', "secondParams"],//url1:获取表单内容的url  url2:获取表单条数的url  secondParams：获取信息时可能需要的第三个参数
    computed: {
      renovateCheck() {
        return this.readyForRenovate
      },
      getSecondParams() {
        return this.secondParams
      },
      ...mapState(["readyForRenovate", "btnFamily"])
    },
    methods: {
      getItemList() {
        let params = {
          page: this.currentPage,
          rows: this.pagesize
        }
        if (this.secondParams) {
          if (!this.secondParams instanceof Object) {
            params.courseId = this.secondParams
          } else {
            params = Object.assign(params, this.secondParams)
          }
        }
        return this.axios({
          method: "get",
          url: this.targetUrl1,
          params: params
        })
      },

      getTotalPages() {
        let params = {
          rows: this.pagesize
        }
        if (this.secondParams) {
          if (!this.secondParams instanceof Object) {
            console.log("aaa")
            params.courseId = this.secondParams
          } else {
            console.log("bbb")
            params = Object.assign(params, this.secondParams)
          }
        }
        console.log(params)
        return this.axios({
          method: "get",
          url: this.targetUrl2,
          params: params
        })
      },

      freshList() {
        let _self = this
        var params1 = {
          page: _self.currentPage,
          rows: _self.pagesize,
        }
        if (_self.secondParams) {
          if (!(_self.secondParams instanceof Object)) {
            params1.courseId = this.secondParams
          } else {
            params1 = Object.assign(params1, _self.secondParams)
          }
        }
        function getItemList() {
          return _self.axios({
            method: "get",
            url: _self.targetUrl1,
            params: params1
          })
        }
        function getTotalPages() {
          return _self.axios({
            method: "get",
            url: _self.targetUrl2,
            params: params1
          })
        }


        _self.axios.all([getItemList(),getTotalPages()])
          .then(_self.axios.spread(function (acct, perms) {
            // 两个请求现在都执行完成
            _self.listInfo = acct.data
            _self.totalItems = perms.data
          }));
      },

      handleSizeChange(size) {
        //选择 一页展示多少数据时 调用的方法
        this.pagesize = size;
        this.freshList();
      },

      handleCurrentChange(currentPage) {
        //点击页面项 的函数响应
        this.currentPage = currentPage;
        this.freshList();
      },
    },
    watch: {
      listInfo() {
        this.$emit('rewriteList', this.listInfo)
      },
      renovateCheck() {//监听 readyForRenovate ,如有变化就重新从后台获取数据
        this.freshList()
      },

      getSecondParams() {
        if (location.pathname === "/user/list" || location.pathname === "/school/team") return
        this.freshList()
      }
    },
    mounted() {
      this.freshList()
    }
  }
</script>

<style scoped>
  .paginationClass {
    margin-top: 10px;
  }
</style>
