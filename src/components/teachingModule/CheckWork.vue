<template>
  <div>
    <el-button type="primary" @click="downloadAll">打包下载</el-button>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary">查询</el-button>
    <PreviewPdf :pdf-url="url" ref="previewPdf" ></PreviewPdf>
    <el-table
      :data="workList"
      style="width: 100%">
      <el-table-column prop="username" label="学号" width="180"></el-table-column>
      <el-table-column prop="user.name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="user.class_id" label="班级"></el-table-column>
      <el-table-column prop="user.school" label="学院"></el-table-column>
      <el-table-column prop="teacher" label="老师"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"  @click="previewPDF(scope.row)">查看报告</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import PreviewPdf from "../common/PreviewPdf";

  export default {
    name: "CheckWork",
    components: {PreviewPdf},
    data() {
      return {
        workList: [],
        courseId: "",
        userId:"",
        url: "",
        isShow: false
      }
    },
    methods: {
      getWorkList() {
        this.axios({
          method: "get",
          url: "/task/homework/list",
          params: {
            courseId: 1//到时候要改
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.workList = response.data
            } else {
              this.util.returnErr("操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      previewPDF(row) {
        console.log( row )

        this.$refs.previewPdf.url="/api/task/homework/check/?courseId="+row.course_id+"&userId="+row.username
        this.$refs.previewPdf.isShow=true
        this.$refs.previewPdf.courseId=row.course_id
        this.$refs.previewPdf.userId=row.user.username
        this.isShow=true
      },
      downloadAll() {
        this.axios({
          method: "get",
          url: "/task/homework/download/all/",
          params: {
            courseId:1//到时候要改
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.getWorkList()
    }

  }
</script>

<style scoped>

</style>
