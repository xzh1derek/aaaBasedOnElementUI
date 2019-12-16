<template>
  <div>
    <el-row>
      <el-button @click="outerVisible=true">添加课程</el-button>
      <el-button type="primary" :disabled="!editDisable">编辑课程</el-button>
      <el-button type="primary" :disabled="!editDisable">添加班级</el-button>
      <el-button type="success">导出</el-button>
      <el-button type="warning">检索</el-button>
      <el-button type="danger" @click="deleteCourse" :disabled="!deleteDisable">删除</el-button>
    </el-row>

    <el-dialog title="填写课程详细信息:" :visible.sync="outerVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.code" autocomplete="off" required></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="学分" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.credit" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="总学时" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.hours" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="老师" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.teachers" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="是否要组队" :label-width="formLabelWidth">
          <el-switch v-model="form.isTeam" autocomplete="off"></el-switch>
        </el-form-item>
        <el-form-item label="成队最大人数" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="form.maxNum" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-dialog
        width="30%"
        title="添加班级"
        :visible.sync="innerVisible"
        append-to-body>
        <BindClasses :course-id="courseId"></BindClasses>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCourse">创建课程</el-button>
      </div>
    </el-dialog>
    <div>
      <CourseList ref="CourseList" @deleteCourseList="initDeleteList"></CourseList>
    </div>
  </div>
</template>

<script>
  import BindClasses from "./BindClasses";
  import CourseList from "./CourseList";

  export default {
    name: "CourseLibrary",
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        form: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          teachers: '',
          isTeam: false,
          maxNum: ''
        },
        formInit: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          teachers: '',
          isTeam: false,
          maxNum: ''
        },
        span: 20,
        formLabelWidth: '100px',
        courseId: "",
        multipleSelection: [],
        editDisable:false,
        bindDisable:false,
        deleteDisable:false
      };
    },
    components: {BindClasses, CourseList},
    methods: {
      createCourse() {
        let self = this
        let params = this.form;
        this.axios({
          method: "post",
          url: "/course/new",
          params
        })
          .then(response => {
            this.courseId = response.data
            this.innerVisible = true
            this.outerVisible = false
            this.form = this.formInit

            this.$refs.CourseList.initCourseList();
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteCourse() {
        let self = this
        this.axios({
          method: "delete",
          url: "/course/delete",
          params: {
            courseId: this.multipleSelection[0].id
          }
        })
          .then(response => {
            this.$refs.CourseList.initCourseList();
            this.util.feedbackInfo(self, response.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      initDeleteList(data) {
        this.multipleSelection = data
      },
    },
    watch:{
      selectedCourse() {
        console.log("this.selectedCourse.length:"+this.selectedCourse.length)
       let length = this.selectedCourse.length
        console.log("length:"+length)
        if (length !== 1){
          //只有选中一门课程时,才能编辑课程或者给课程添加班级
          this.editDisable = false;
          this.bindDisable = false;
        }else {
          this.editDisable = true;
          this.bindDisable = true;
        }

        this.deleteDisable = length > 0;
        console.log(this.deleteDisable)
      }
    },
    computed:{
        selectedCourse(){
          return this.multipleSelection
      }
    }
  }
</script>

<style scoped>

</style>
