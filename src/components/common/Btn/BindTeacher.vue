<!--为课程添加执教老师-->
<template>
  <div>
    <el-button type="primary" @click="getTeacherList" v-if="btnFamily===10" :disabled="multipleSelection.length!==1"
               title="为课程添加执教老师">
      添加老师
    </el-button>
    <el-dialog
      title="请选择要绑定的班级"
      :visible.sync="dialogVisible"
      width="635px">
      <el-transfer filterable v-model="checkList" :data="checkedItems" :titles="['可选列表','已选列表']" :props="{
      key: 'id',label:'name'}"></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="" type="primary" style="margin:0 auto;" @click="bindTeacherOnCourse"
                   :disabled="!checkList.length">确认添加</el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "BindTeacher",
    data() {
      return {
        dialogVisible: false,
        checkList: [],//保存所有要被选择的item
        checkedItems: [],//已经选择的项目
      }
    },
    computed: {
      ...mapState(["multipleSelection", "btnFamily", "readyForRenovate"])
    },
    methods: {
      /**
       * 获取教师列表
       */
      getTeacherList() {
        this.axios({
          method: "get",
          url: "/course/teachers/",
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.checkedItems = response.data
              this.dialogVisible = true
            } else {
              this.util.returnErr.bind(this, response.data)
            }
          })
          .catch(err => {
            this.util.returnErr.call(this, "操作失败，请规范操作")
          })
      },

      /**
       * 为某门课程添加执教老师
       */
      bindTeacherOnCourse() {
        this.axios({
          method: "post",
          url: "/course/teachers/bind/",
          params: {
            courseId: this.multipleSelection[0].id
          },
          data: this.checkList
        })
          .then(response => {
            if (response.data === 0) {
              this.dialogVisible = false;
              let payload = {
                targetKey: "readyForRenovate",
                targetVal: !this.readyForRenovate
              };
              this.updateCurrentStatus(payload)

              this.util.feedbackInfo(this, 0)
            } else {
              this.util.returnErr.call(this, response.data)
            }
          })
          .catch(err => {
            this.util.returnErr.call(this, "操作失败，请规范操作。")
          })
      },
      ...mapMutations(["updateCurrentStatus"])
    }
  }
</script>

<style scoped>

</style>
