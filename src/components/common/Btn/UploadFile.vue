<template>
  <el-upload
    class="upload-demo"
    action="/api/students/upload"
    accept="xls"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
    v-if="isDisplay">
    <el-button type="primary">点击上传</el-button>
    <!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
  </el-upload>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        name: "UploadFile",
        fileList: [],
        isDisplay: false
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
