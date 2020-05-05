<!--新建module的表单-->
<template>
  <div>
    <el-form :model="form">
      <el-form-item label="Project编号" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="multipleSelection[0].id" autocomplete="off" readonly></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Module批次" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.module_index" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>


      <el-form-item label="Module日期" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.dateOfString" autocomplete="off" type="date"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Module时间" :label-width="formLabelWidth"  >
        <el-col :span=span>
          <el-input v-model="form.time" autocomplete="off" placeholder="例 14:00-16:00" ></el-input>
        </el-col>
      </el-form-item>



      <el-form-item label="Module地点" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.location" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <!--任选需要填人数 isFixed=false时-->
      <el-form-item label="学生数" :label-width="formLabelWidth" v-if="!this.multipleSelection[0].is_fixed">
        <el-col :span=span>
          <el-input v-model="form.stu_num" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="16">
        <div class="grid-content "></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" @click="createItem" style="align-self: center">创建课程</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from '../../../store/store'
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "NewModuleDialog",
    store,
    data() {
      return {
        form: {
          project_id: '',
          module_index: '',
          dateOfString: "",
          time: "",
          location: '',
          stu_num: '',
        },
        formInit: {
          project_id: '',
          module_index: '',
          location: '',
          stu_num: '',
        },
        submittedData: [],
        formLabelWidth: '100px',
        courseId: "",
        span: 20,
      }
    },
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      createItem() {
        //点击提交之后,要先把当前的内容存进要提交的数据里
        let result = this.util.deepClone(this.form)
        result.project_id = this.multipleSelection[0].id
        this.submittedData.push(result)


        let self = this;
        let params = this.submittedData;
        this.axios({
          method: "post",
          url: "/module/add",
          data: this.submittedData
        })
          .then(response => {
            //固定排课时,需要选班级
            console.log(response)
            if (this.multipleSelection[0].is_fixed) {
              this.$emit("showInner", response.data)
            } else {
              this.$emit("closeOuter")
            }

            this.form = this.formInit
            //
            // this.$refs.CourseList.initCourseList();
          })
          .catch(err => {
            console.log(err)
          })
      },
    }


  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
