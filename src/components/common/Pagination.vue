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
      getSecondParams(){
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
        if (this.btnFamily === 10) {
          params.courseId = this.secondParams
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
        if (this.btnFamily === 10) {
          params.courseId = this.secondParams
        }
        return this.axios({
          method: "get",
          url: this.targetUrl2,
          params: params
        })
      },

      freshList() {
        let self = this
        this.axios.all([self.getItemList(), self.getTotalPages()])
          .then(self.axios.spread(function (acct, perms) {
            // 两个请求现在都执行完成
            self.listInfo = acct.data
            self.totalItems = perms.data
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

      getSecondParams(){
        this.freshList()
      }
    },
    mounted() {
      this.freshList()
    }
  }
</script>

<style scoped>
.paginationClass{
  margin-top: 10px;
}
</style>
