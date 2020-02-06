<template>
  <div>
    <!--    <el-row>-->
    <!--      <el-button @click="outerVisible=true">添加课程</el-button>-->
    <!--      <el-button type="primary" :disabled="!editDisable">编辑课程</el-button>-->
    <!--      <el-button type="primary" :disabled="!editDisable">添加班级</el-button>-->
    <!--      <el-button type="success">导出</el-button>-->
    <!--      <el-button type="warning">检索</el-button>-->
    <!--      <el-button type="danger" @click="deleteCourse" :disabled="!editDisable">删除</el-button>-->
    <!--    </el-row>-->
    <CommonOperation></CommonOperation>
    <CourseList ref="CourseList" @deleteCourseList="initDeleteList"></CourseList>
  </div>
</template>

<script>
  import CourseList from "./CourseList";
  import {mapMutations} from 'vuex'
  import CommonOperation from "../../common/CommonOperation";

  export default {
    name: "CourseLibrary",
    components: {CourseList, CommonOperation},
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        form: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          teacher: '',
          isTeam: false,
          maxNum: ''
        },
        formInit: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          teacher: '',
          isTeam: false,
          maxNum: ''
        },
        span: 20,
        formLabelWidth: '100px',
        courseId: "",
        multipleSelection: [],
        editDisable: false,
        bindDisable: false,
        deleteDisable: false
      };
    },
    methods: {


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


      ...mapMutations(['updateCurrentStatus'])
    },
    watch: {
      selectedCourse() {
        let length = this.selectedCourse.length;
        if (length !== 1) {
          //只有选中一门课程时,才能编辑课程或者给课程添加班级
          this.editDisable = false;
          this.bindDisable = false;
        } else {
          this.editDisable = true;
          this.bindDisable = true;
        }

        this.deleteDisable = length > 0;
        console.log(this.deleteDisable)
      }
    },
    computed: {
      selectedCourse() {
        return this.multipleSelection
      }
    },
    beforeMount() {
      let payload = {
        targetKey: "btnFamily",
        targetVal: 10
      };
      this.updateCurrentStatus(payload);
    }
  }
</script>

<style scoped>

</style>
