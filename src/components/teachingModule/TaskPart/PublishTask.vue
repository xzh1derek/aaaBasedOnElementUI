<template>
  <el-dialog
    title="请填写任务信息"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form ref="form" label-width="80px">
      <el-form-item label="课程">
        <el-col :span="22">
          <el-select v-model="courseId" placeholder="请选择课程" style="width: 100%">
            <el-option
              v-for="course in courseInfo"
              :key="course.id"
              :label="course.course_name"
              :value="course.id">
            </el-option>
          </el-select>
        </el-col>

      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="10">
          <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="datePicker"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center"> -</el-col>
        <el-col :span="10">
          <el-time-picker placeholder="选择时间" value-format="HH:mm:ss" v-model="timePicker"
                          style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="组队完成?">
        <el-switch v-model="isTeamwork" active-text="组队完成"
        title="合作完成按组交一份作业.否则每人交一份作业."></el-switch>
      </el-form-item>
    </el-form>


    <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="submitFile">确 定</el-button>
     </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "PublishTask",
    props: ["courseInfo"],
    data() {
      return {
        dialogVisible: false,
        isTeamwork: false,
        courseId: "",
        deadline: "",
        datePicker: "",
        timePicker: "12:00:00"
        // timePicker: new Date().toLocaleTimeString()
      }
    },
    methods: {
      submitFile() {
        this.axios({
          method: "post",
          url: "/task/homework/publish/",
          params: {
            courseId: this.courseId,
            isTeamwork: this.isTeamwork,
            deadline: this.datePicker + " " + this.timePicker
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.util.feedbackInfo(this, 0)
              this.dialogVisible = false
            } else {
              this.util.returnErr(response.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    mounted() {
      this.datePicker = new Date().toLocaleDateString().replace(/\//g, "-")
    }
  }
</script>

<style scoped>

</style>
