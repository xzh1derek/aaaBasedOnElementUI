<template>
  <div>
    <el-row>
      <el-button @click="addNewFormData" :disabled="!editDisable">{{(multipleSelection.length!==0&&multipleSelection[0].projects.length===0)?"添加Project":"编辑Project"}}</el-button>
      <el-button type="primary" :disabled="!editDisable">编辑课程</el-button>
      <el-button type="primary" :disabled="!editDisable">添加班级</el-button>
      <el-button type="success">导出</el-button>
      <el-button type="warning">检索</el-button>
    </el-row>

    <el-dialog title="填写Project详细信息:" :visible.sync="outerVisible" width="30%">
      <!--      <NewCourseForm ></NewCourseForm>-->
      <el-form :model="modelFormData">
        <el-form-item label="课程编号" :label-width="formLabelWidth" hidden>
          <el-col :span=span>
            <el-input v-model="multipleSelection.length===0?'':multipleSelection[0].id" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程代码" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="multipleSelection.length===0?'':multipleSelection[0].course_code"
                      autocomplete="off" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="multipleSelection.length===0?'':multipleSelection[0].course_name"
                      autocomplete="off" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Project序号" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="projectIndex" autocomplete="off" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Project名称" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="modelFormData.project_name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="学时" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="modelFormData.hours" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="老师" :label-width="formLabelWidth">
          <el-col :span=span>
            <el-input v-model="modelFormData.teachers" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-dialog
        width="30%"
        title="添加班级"
        :visible.sync="innerVisible"
        append-to-body>
        <BindClasses :course-id="courseId" url-target="/project/add"></BindClasses>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addMore">再加一个</el-button>
        <el-button type="primary" @click="createProject">创建Project</el-button>
      </div>
    </el-dialog>
    <div>
      <ProjectList ref="ProjectList" @deleteCourseList="initDeleteList"></ProjectList>
    </div>
  </div>
</template>

<script>
  import BindClasses from "./BindClasses";
  import CourseList from "./CourseList";
  import NewCourseForm from "./NewCourseForm";
  import ProjectList from "./ProjectList";
  import {mapMutations} from 'vuex'

  export default {
    name: "CourseLibrary",
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        span: 20,
        formLabelWidth: '100px',
        courseId: "",
        multipleSelection: [],
        editDisable: false,
        addDisable: false,
        bindDisable: false,
        deleteDisable: false,
        projectIndex: 1,
        formData: [],
        modelFormData: {
          project_name: '',
          is_fixed: 1,
          hours: "",
          teachers: '',
        },
      };
    },
    components: {BindClasses, ProjectList, NewCourseForm},
    methods: {
      createProject() {
        let pushData = {};
        for (let key in this.modelFormData) {
          pushData[key] = this.modelFormData[key]
        }
        pushData.project_index = this.projectIndex;
        pushData.course_id = this.multipleSelection[0].id;
        this.formData.push(pushData)

        let nowHours = 0
        //判断学时是否够
        for (let key in this.formData) {
          nowHours += parseInt(this.formData[key].hours)
        }

        if (nowHours !== this.multipleSelection[0].hours) {
          alert("学时不匹配,请调整")
          return
        }


        let self = this
        let params = this.formData;
        this.axios({
          method: "post",
          url: "/project/add",
          data: this.formData
        })
          .then(response => {
            this.courseId = response.data
            this.outerVisible = false
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
      addNewFormData() {
        this.outerVisible = true;
      },
      addMore() {
        //需要添加下一个目标时,就再导入次个数据,此时表里就有一组数据了
        let pushData = {};
        for (let key in this.modelFormData) {
          pushData[key] = this.modelFormData[key]
        }
        pushData.project_index = this.projectIndex;
        pushData.course_id = this.multipleSelection[0].id;


        this.formData.push(pushData)
        this.projectIndex++;
        console.log(this.formData)

      },
      ...mapMutations(["updateVerification"])
    },
    watch: {
      selectedProject() {
        let length = this.selectedProject.length
        if (length !== 1) {
          //只有选中一门课程时,才能编辑课程或者给课程添加班级
          this.editDisable = false;
          this.bindDisable = false;
          this.addDisable = false
        } else {
          this.editDisable = true;
          this.bindDisable = true;
          this.addDisable = true;
        }

        this.deleteDisable = length > 0;
      },
      outerVisible() {
        //当对话框发生变化时,重置数据
        this.projectIndex = 1;
        this.formData = []
      }
    },
    computed: {
      selectedProject() {
        return this.multipleSelection
      },
    },
    mounted() {
      this.updateVerification("2");
    }
  }
</script>

<style scoped>

</style>
