<template>
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
</template>

<script>
  export default {
    name: "NewCourseForm",
    data() {
      return {
        form: {
          name: '',
          code: '',
          credit: '',
          hours: '',
          teachers: '',
          isTeam: false,
          maxNum: ''
        },
        formLabelWidth: '100px',
        courseId: "",
        span: 20,
      }
    },


  }
</script>

<style scoped>

</style>
