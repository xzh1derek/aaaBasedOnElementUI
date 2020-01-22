<!--存放所有的显示表单的dialog-->
<template>
  <div>
    <!--    编辑学生信息的表单dialog -->
    <el-dialog title="填写学生信息" :visible.sync="editStuDiaVisible">
      <el-form :model="originData">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="originData.username" readonly></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="originData.name"></el-input>
        </el-form-item>

        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="originData.qq"></el-input>
        </el-form-item>

        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-input v-model="originData.year"></el-input>
        </el-form-item>

        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="originData.class_id"></el-input>
        </el-form-item>


        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="originData.school"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editStuDiaVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "DialogForm",
    data() {
      return {
        editStuDiaVisible: false,
        diaVisible: false,
        formLabelWidth: '120px'
      }
    },
    props: ["originData"],
    computed: {

      ...mapState(["btnFamily"])
    },
    methods: {
      //上传新的学生信息
      submitNewInfo() {
        this.axios({
          method: "post",
          url: "/students/update",
          params: {
            userId: this.originData.username
          },
          data: this.originData
        })
          .then(response => {
            this.util.feedbackInfo(this, response.data)
            this.editStuDiaVisible = false;
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    watch: {
     //监控diaVisible的值 组件父组件只需要改变diaVisible的值 组件内部通过btnFamily判断到底要使用哪个dialog
      diaVisible(){
        switch (this.btnFamily) {
          case 0:this.editStuDiaVisible=this.diaVisible;break;//学生相关操作,该
          case 1:this.editStuDiaVisible=this.diaVisible;break;
          case 2:this.editStuDiaVisible=this.diaVisible;break;

        }
      }
    },
    mounted() {
      console.log("this.btnFamily:" + this.btnFamily)


    }
  }
</script>

<style scoped>

</style>
