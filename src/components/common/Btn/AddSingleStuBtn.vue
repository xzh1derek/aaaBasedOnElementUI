<template>
  <div>
    <el-button @click="dialogVisible=true">添加学生</el-button>


    <el-dialog
      title="请填写被添加学生学号:"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input v-model="multipleSelection[0].course_name"  readonly v-if="multipleSelection[0]"></el-input>
      <el-input v-model="stuId" placeholder="请输入学生学号"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSingleStu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";


  export default {
    name: "AddSingleStuBtn",
    data() {
      return {
        dialogVisible: false,
        stuId: ""//需要绑定的学生学号
      }
    },
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      /**
       * 提交新绑定学生的信息
       */
      submitSingleStu() {
        this.axios({
          url:"/course/students/add",
          method:"post",
          params:{
            userId:this.stuId,
            courseId:this.multipleSelection[0].id
          }
        })
        .then(response=>{
          this.util.feedbackInfo(this,response.data)
        })
        .catch(err=>{
          console.log(err)
        })
        this.dialogVisible=false
      }
    }
  }
</script>

<style scoped>

</style>
