<template>
  <div>
    <el-button type="danger" @click="dialogVisible = true" :disabled="isDisabled">删除</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认要删除吗?确认后不可撤销</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  // import store from "../../store/store"
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "DeleteItem",
    data() {
      return {
        isDisabled: true,
        dialogVisible: false,
        targetUrl: "",//删除函数的目的地址,通过mounted钩子函数确定
        deleteData: "",//被删数据的集合,通过mounted钩子函数确定
        propName: "",//要从对象中提取哪个属性
      }
    },
    computed: {
      selectedItems() {
        if (location.pathname === "/teaching/schedule" || location.pathname === "/teaching/plan") {
          return this.innerMultipleSelection
        } else {
          return this.multipleSelection
        }
      },
      ...mapState(["multipleSelection", "btnFamily", "readyForRenovate", "innerMultipleSelection"])
    },
    watch: {
      //判断删除按钮是否可操作
      selectedItems(val) {
        this.isDisabled = val.length !== 1
      }
    },
    methods: {
      deleteItem() {
        let self = this
        // 这里用selectItems是因为不同的情况要删除不同的数据,有时候是操作外表格数据,有时候是操作内表格数据
        this.deleteData = this.util.getPropFormListObj(this.selectedItems, this.propName);//从对象集合中提取username属性
        this.axios({
          method: "delete",
          url: this.targetUrl,
          params: {
            courseId: this.selectedItems[0].id,
            id: this.selectedItems[0].id
          },
          data: this.deleteData
        })
          .then(response => {
            //成功后改变"readyForRenovate"的状态,list组件监听这个变量.一旦改变,就更新列表
            if (response.data===0){
            let payload = {
              targetKey: "readyForRenovate",
              targetVal: !this.readyForRenovate
            };
            this.dialogVisible = false
            this.util.feedbackInfo(self, response.data);
            this.updateCurrentStatus(payload)//改变 "readyForRenovate" ,以达到让 Pagination 刷新页面的目的
            }else {
              this.util.returnErr.call(this,response.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapMutations(["updateCurrentStatus"])
    },
    mounted() {
      switch (this.btnFamily) {
        case 0 ://删除学生相关操作
          this.targetUrl = "/students/delete";
          this.propName = "username";
          break;
        case 5 :
          this.targetUrl = "/module/delete";
          break;
        case 10 :
          this.targetUrl = "/course/delete";
          break;
        case 15 :
          this.targetUrl = "/project/delete";
          break;

      }
    }
  }
</script>

<style scoped>

</style>
