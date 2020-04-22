<!--保存所有由登录教师发布的Module-->
<template>
  <div>
    <button v-if="isShow"
            style="position:absolute;right:150px;top:5px;z-index: 2000"
            @click="isShow=false"
            title="关闭pdf预览">关闭
    </button>
    <el-table :data="moduleList" style="width: 100%" height="80vh" stripe border>
      <el-table-column prop="project.course.course_name" label="课程名" width="180"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="project.project_name" label="projectName" width="180"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="project.hours" label="学时"></el-table-column>
      <el-table-column prop="project.course.credit" label="学分"></el-table-column>
      <el-table-column prop="date" label="日期" width="180px"></el-table-column>
      <el-table-column prop="time" label="时间" width="180px"></el-table-column>
      <el-table-column prop="location" label="地点" width="180px"></el-table-column>
      <el-table-column label="下载资料">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="downloadFiles(scope.row)">下载资料</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="stu_num" label="总人数"></el-table-column>
      <el-table-column prop="cur_num" label="当前人数"></el-table-column>


      <el-table-column fixed="right" label="操作" width="180">
        <template slot="header" slot-scope="scope">
          <el-switch v-model="switch1" active-text="仅显示未完成" title="点击切换所有Module（包括已经过期的Module）和未完成的Module"></el-switch>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDialog(scope.row)">上传报告</el-button>
          <el-button type="text" size="small" @click="previewPdf(scope.row)">预览报告</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload
        class="upload-demo"
        action="/api/curricula/pdf/post/"
        accept=".pdf"
        ref="upload"
        drag
        :data="otherParams"
        multiple
        :limit="1"
        :auto-upload="false"
        :on-success="successHandler">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">上传报告(Pdf),大小限制1M</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=submitUpload>上传</el-button>
      </span>
    </el-dialog>
    <embed id="pdfPlayer" :src=pdfUrl
           type="application/pdf" width="100%" height="100%"
           style="position:absolute;
             left: 0;
             top: 0;
             z-index: 1000" v-if="isShow">
  </div>
</template>

<script>

  export default {
    name: "MyTasks",
    data() {
      return {
        moduleList: [],//保存module信息
        targetModule: -1,//传递给StuListOfModule的moduleId,为-1时,就不加载组件
        switch1: true,//判断是否加载全部课程信息
        timeForClass: "",//用于传给导出成excel按键的数据
        date: "",//用于传给导出成excel按键的数据
        dialogVisible: false,
        fileList: [],
        otherParams: {},
        isShow: false,
        pdfUrl:""
      }
    },
    components: {},
    methods: {

      /**
       * 查询课表
       */
      getTimetable(checkCode) {
        let url = checkCode === 1 ? "/curricula/future/" : "/curricula/all/"
        this.axios({
          method: "post",
          url: url,
          params: {
            userId: localStorage.token
          }
        })
          .then(response => {
            if (typeof response.data === 'object') {
              this.moduleList = response.data
            } else {
              this.util.returnErr.call(this, "失败")
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       *
       * @param row
       */
      showStuList(row) {
        this.targetModule = row.id
        this.timeForClass = row.time
        this.date = row.date
      },
      initModuleId() {
        this.targetModule = -2
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      previewPdf(row) {
        this.pdfUrl = "/api/curricula/pdf/view?userId="+localStorage.token+"&courseId="+row.id
        this.isShow = true
        // this.axios({
        //   method: "get",
        //   url: "/curricula/pdf/view/",
        //   params: {
        //     userId: localStorage.token,
        //     courseId: row.id
        //   }
        // })
        //   .then(response => {
        //     console.log(response)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      },
      downloadFiles(row) {
        this.axios({
          method: "get",
          url: "/curricula/template/download",
          params: {
            courseId: row.id
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },
      showDialog(row) {
        this.otherParams = {
          courseId: row.id,
          userId: localStorage.token
        }
        this.dialogVisible = true
      },
      successHandler(response, file, fileList) {
        if (response === 0) {
          this.dialogVisible = false;
          this.util.feedbackInfo(this, 0)
        } else {
          this.util.returnErr.call(this, response)

        }
      },

    },
    watch: {
      switch1(val) {
        if (val) {
          this.getTimetable(1)//switch为真时,显示未完成的module
        } else {
          this.getTimetable(2)//switch为真时,显示全部的module
        }
      }
    },
    mounted() {
      this.getTimetable(1)

    }
  }
</script>

<style scoped>

</style>
