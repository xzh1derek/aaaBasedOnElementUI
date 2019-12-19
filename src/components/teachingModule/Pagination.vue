<template>
  <div class="paginationClass">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40]"
      :page-size="pagesize"
      :background='true'
      :pager-count="pagerCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ListInfo.length" class="pageControl">
    </el-pagination>
  </div>

</template>

<script>
  export default {
    name: "Pagination",
    data(){
      return{
        currentPage: 1,//初始页
        pagesize: 10,//每一页的数量,
        pagerCount: 5,//展示到多少页时 中间显示...，取值在5~21之间
        listInfo:[]
      }
    },
    methods: {
      handleSizeChange(size) {
        //选择 一页展示多少数据时 调用的方法
        this.pagesize = size;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(currentPage) {
        //点击页面项 的函数响应
        this.currentPage = currentPage;
        this.currentChangePage(this.courseListInfo, currentPage)
      },
      //分页方法（重点）
      currentChangePage(list, currentPage) {
        let from = (currentPage - 1) * this.pagesize;
        let to = currentPage * this.pagesize;
        this.tempList = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tempList.push(list[from]);
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
