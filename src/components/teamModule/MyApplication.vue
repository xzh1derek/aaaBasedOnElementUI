<!--在这和里面写我的申请的相关操作-->
<template>
  <div>
    <template>
      <el-table :data="myApplication" stripe style="width: 100%" height="247">
        <el-table-column prop="receiver" label="接收人" width="180"></el-table-column>
        <el-table-column prop="teamId" label="目的队伍" width="180"></el-table-column>
        <el-table-column prop="text" label="缘由"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native.prevent="withdrawApply(scope.row)" type="text" size="small">撤回申请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: "MyApplication",
    data() {
      return {
        myApplication: []
      }
    },
    methods: {
      getMyApplication() {
        let self = this;
        self.axios({
          url: '/myApplication',
          params: {
            userId: localStorage.token
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            if (res.data.length == 0) {
              this.myApplication = []
              return
            }
            self.myApplication = res.data//这里要改
            console.log(self.myApplication)
          })
          .catch(error => {
            self.$message({
              message: "信息加载失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      },
      withdrawApply(row) {
        let self = this;
        this.axios({
          method: "post",
          url: '/withdraw',
          params: {
            mailId: row.id
          }
        })
          /////////////////////////////////////////////这里有问题
          .then((response) => {
            this.util.feedbackInfo(self, response.data)
            setTimeout(function () {
                self.getMyApplication()
              }
              , 100)
          })
          .catch(error => {
            this.$message({
              message: '操作失败!,请稍后再试',
              type: 'error',
              duration: 1500,
              showClose: true
            });
          })
      },
    },
    mounted() {
      this.getMyApplication()
    }
  }
</script>

<style scoped>

</style>
