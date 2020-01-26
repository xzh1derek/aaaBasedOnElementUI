<template>
  <div>
    <el-form :model="form">
      <el-form-item label="课程代码" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.code" autocomplete="off" required></el-input>
        </el-col>
      </el-form-item>
      <!---->
      <el-form-item label="课程名称" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <!---->
      <!---->
      <el-form-item label="学分" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.credit" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <!---->
      <el-form-item label="总学时" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.hours" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <!---->
      <el-form-item label="是否要组队" :label-width="formLabelWidth">
        <el-switch v-model="form.isTeam" autocomplete="off"></el-switch>
      </el-form-item>
      <el-form-item label="成队最大人数" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.maxNum" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <!--    <el-dialog-->
    <!--      width="30%"-->
    <!--      title="添加班级"-->
    <!--      :visible.sync="innerVisible"-->
    <!--      append-to-body>-->
    <!--      <BindClasses :bind-id="courseId" url-target="/course/bind" structure-url="/schools"></BindClasses>-->
    <!--    </el-dialog>-->

    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="createCourse">创建课程</el-button>
    </div>

  </div>
</template>

<script>
  import BindClasses from "./BindClasses";
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "NewCourseDialog",
    data() {
      return {
        form: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          // teacher: 0,
          isTeam: false,
          maxNum: ''
        },
        span: 20,
        formLabelWidth: '100px',
      }
    },
    components: {BindClasses},
    computed: {
      ...mapState(["readyForRenovate"])
    },
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
            //课程创建成功后,改变vuex里的状态以达到更新列表的目的
            let payload = {
              targetKey: "readyForRenovate",
              targetVal: !this.readyForRenovate
              };
              this.updateCurrentStatus(payload);

              this.$emit("submitSuccess")
          })
          .catch(err => {
            console.log(err)
          })
      },
      ...mapMutations(["updateCurrentStatus"])
    },

  }
</script>

<style scoped>

</style>
