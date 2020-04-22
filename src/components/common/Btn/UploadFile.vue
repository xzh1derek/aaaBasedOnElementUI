<template>
  <div style="margin: 0 6px">
    <el-button type="primary" @click="dialogVisible=true">导入学生信息</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload
        class="upload-demo"
        action="/api/students/upload"
        accept="xls"
        ref="upload"
        drag
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :file-list="fileList"
        v-if="isDisplay">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click=submitUpload>上传</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "UploadFile",
    data() {
      return {
        fileList: [],
        isDisplay: false,
        dialogVisible: false
      };
    },
    computed: {
      ...mapState(["btnFamily"])
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    },
    mounted() {
      if (this.btnFamily === 0) {
        this.isDisplay = true
      }
    }
  }
</script>

<style scoped>

</style>
