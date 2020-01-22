<template>
  <div class="paginationClass">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10 ,20, 40]"
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
        pagesize: 10,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
        listInfo: [],
        currentPage: 1,//初始页
      }
    },
    props: ['targetUrl1', 'targetUrl2'],//url1:获取表单内容的url  url2:获取表单条数的url
    computed:{
      renovateCheck(){
        return this.readyForRenovate
      },
      ...mapState(["readyForRenovate"])
    },
    methods: {
      getItemList() {
        return this.axios({
          method: "get",
          url: this.targetUrl1,
          params: {
            page: this.currentPage,
            rows: this.pagesize
          }
        })
      },

      getTotalPages() {
        return this.axios({
          method: "get",
          url: this.targetUrl2,
          params: {
            rows: this.pagesize
          }
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
      renovateCheck(){//监听 readyForRenovate ,如有变化就重新从后台获取数据
        this.freshList()
      }
    },
    mounted() {
      this.freshList()
    }
  }
</script>

<style scoped>

</style>
