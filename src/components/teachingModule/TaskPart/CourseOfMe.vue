<template>
  <div>
    <el-button type="primary" style="margin-bottom: 10px" @click="showPublishDialog">发布作业</el-button>
    <PublishTask :course-info="tableData" ref="publishTask"></PublishTask>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border
      fit>
      <el-table-column prop="course_code" label="课程编号" width="180"></el-table-column>
      <el-table-column prop="course_name" label="课程名" width="180"></el-table-column>
      <el-table-column prop="credit" label="学分"></el-table-column>
      <el-table-column prop="hours" label="学时"></el-table-column>
      <el-table-column prop="max_num" label="组队最大人数"></el-table-column>
      <el-table-column prop="stu_num" label="学生数"></el-table-column>
      <el-table-column label="已发布任务" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getTask(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDialog(scope.row)">上传资料</el-button>
          <el-button type="text" size="small" @click="downloadFiles(scope.row)">下载资料</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="目前的任务为:"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        截至时间:{{taskInfo.deadline}}
      </div>
      <div>
        是否组队:{{taskInfo.isTeamwork===false?"否":"是"}}
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <UploadDialog ref="uploadDialog"></UploadDialog>
  </div>
</template>

<script>
  import UploadDialog from "./UploadDialog";
  import PublishTask from "./PublishTask";

  export default {
    name: "CourseOfMe",
    components: {UploadDialog, PublishTask},
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        taskInfo: {}
      }
    },
    methods: {
      getList() {
        this.axios({
          method: "get",
          url: "/task/",
          params: {
            teacherId: 1
          }
        })
          .then(response => {
            response.data instanceof Array
              ? this.tableData = response.data
              : this.util.returnErr.call(this, "操作失败")
          })
          .catch(err => {
            console.log(err)
          })
      },

      getTask(row) {
        this.axios({
          method: "get",
          url: "/task/homework",
          params: {
            courseId: row.id
          }
        })
          .then(response => {
            if (response.data instanceof Object) {
              this.taskInfo = response.data
              this.dialogVisible = true
            } else {
              this.util.returnErr.call(this,"操作失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      showDialog(row) {
        this.$refs.uploadDialog.otherParams.courseId = row.id
        this.$refs.uploadDialog.dialogVisible = true
      },
      downloadFiles(row) {
        this.axios({
          method: "get",
          url: "/task/template/download/",
          params: {
            courseId: row.id,
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },
      showPublishDialog() {
        this.$refs.publishTask.dialogVisible = true
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>

</style>
