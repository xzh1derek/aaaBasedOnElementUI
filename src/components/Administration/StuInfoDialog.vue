<!--存放填写 学生信息 的表单-->
<template>
  <el-dialog title="填写学生信息" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="form">
      <el-form-item label="学号:" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年级:" :label-width="formLabelWidth">
        <el-input v-model="form.year" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班级:" :label-width="formLabelWidth">
        <el-input v-model="form.class_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学院:" :label-width="formLabelWidth">
        <el-input v-model="form.school" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">再加一个</el-button>
      <el-button type="primary" @click="newStu(true)">确定添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'

  export default {
    name: "StuInfoDialog",
    data() {
      return {
        dialogFormVisible: false,//控制当前dialog是否显示
        form: {//与表单内容绑定
          username: "",
          name: '',
          class_id: "",
          year: "",
          school: ""
        },
        formLabelWidth: '80px'//控制表单label宽度
      }
    },
    computed:{
      ...mapState(["readyForRenovate"])
    },
    methods: {
      newStu(bool) {
        this.axios({
          method: "post",
          url: "/students/add",
          data: this.form
        })
          .then(response => {
            let payload={
              targetKey:"readyForRenovate",
              targetVal:!this.readyForRenovate
            };
            this.util.feedbackInfo(this, response.data);
            if (bool) {//是否要关闭dialog bool-->true时,关闭
              this.dialogFormVisible = false
            }
            this.updateCurrentStatus(payload)//改变 "readyForRenovate" ,以达到让 Pagination 刷新页面的目的
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapMutations(["updateCurrentStatus"])

    }
  }
</script>

<style scoped>

</style>
