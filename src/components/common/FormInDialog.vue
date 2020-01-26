<!--存放所有编辑信息时显示表单的dialog-->
<template>
  <div>
    <!--    编辑学生信息的表单dialog -->
    <el-dialog title="填写学生信息" :visible.sync="editStuDiaVisible" @close="diaVisible=false">
      <el-form :model="originData">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="originData.username" readonly title="本字段不允许更改"></el-input>
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

    <!--    编辑课程信息的表单dialog -->
    <el-dialog title="填写课程信息" :visible.sync="editCourseDiaVisible" @close="diaVisible=false">
      <el-form :model="originData">
        <el-form-item label="课程代码" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="originData.course_code" autocomplete="off" required></el-input>
          </el-col>
        </el-form-item>
        <!---->
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="originData.course_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <!---->
        <!---->
        <el-form-item label="学分" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="originData.credit" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <!---->
        <el-form-item label="总学时" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="originData.hours" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <!---->
        <el-form-item label="是否要组队" :label-width="formLabelWidth">
          <el-switch v-model="originData.is_team" autocomplete="off"></el-switch>
        </el-form-item>
        <el-form-item label="成队最大人数" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="originData.max_num" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="diaVisible = false">取 消</el-button>
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
        editStuDiaVisible: false,//编辑学生信息dia的可见度
        editCourseDiaVisible: false,//编辑course信息dia的可见度
        editModuleDiaVisible: false,////编辑module信息dia的可见度
        diaVisible: false,//父组件直接改变的属性,再在组件内赋给相应的值
        formLabelWidth: '120px',
        span: 20
      }
    },
    props: ["originData","targetUrl"],
    computed: {
      ...mapState(["btnFamily"])
    },
    methods: {
      //上传新的学生信息
      submitNewInfo() {
        // if (this.originData.teachers){
        //   delete this.originData.teachers
        // }

        this.originData.is_published=true
        this.originData.teacher=0

        this.axios({
          method: "post",//一律都是update
          url: this.targetUrl,
          params: {
            userId: this.originData.username
          },
          data: this.originData
        })
          .then(response => {
            this.util.feedbackInfo(this, response.data)
            // this.editStuDiaVisible = false;
            this.diaVisible = false;


          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    watch: {
      //监控diaVisible的值 组件父组件只需要改变diaVisible的值 组件内部通过btnFamily判断到底要使用哪个dialog
      diaVisible() {
        switch (this.btnFamily) {
          case 0://学生相关操作
            this.editStuDiaVisible = this.diaVisible;
            break;
          case 5://module相关操作
            this.editModuleDiaVisible = this.diaVisible;
            break;
          case 10://course相关操作
            this.editCourseDiaVisible = this.diaVisible;
            break;

        }
      }
    },
  }
</script>

<style scoped>

</style>
