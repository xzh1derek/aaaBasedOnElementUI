<template>
  <div>
    <el-row>
      <AddNewItem ref="addNew" class="inlineItem"></AddNewItem>
      <DeleteItem ref="removeItems" class="inlineItem" target-url="module/delete"></DeleteItem>
      <EditItem class="inlineItem"></EditItem>
      <ExportList class="inlineItem"></ExportList>
      <!--      上传学生Excel-->
      <UploadFile class="inlineItem"></UploadFile>
      <!--      添加单个学生信息-->
      <NewStudent class="inlineItem"></NewStudent>
      <!--      批量删除学生-->

      <!--      修改学生信息-->
      <!--      <el-button @click="outerVisible=true">添加课程</el-button>-->
      <!--      <el-button type="primary" :disabled="!editDisable">编辑课程</el-button>-->
      <!--      <el-button type="primary" :disabled="!editDisable">添加班级</el-button>-->
      <!--      <el-button type="success">导出</el-button>-->
      <!--      <el-button type="warning">检索</el-button>-->
      <!--      <el-button type="danger" @click="deleteCourse" :disabled="!editDisable">删除</el-button>-->
    </el-row>
  </div>
</template>

<script>
  import AddNewItem from "../teachingModule/AddNewItem";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  import DeleteItem from "../teachingModule/DeleteItem";
  import EditItem from "../teachingModule/EditItem";
  import UploadFile from "../teachingModule/UploadFile";
  import ExportList from "../teachingModule/ExportList";
  import NewStudent from "../Administration/NewStudent";

  export default {
    name: "CommonOperation",
    components: {AddNewItem, DeleteItem, EditItem, UploadFile, ExportList,NewStudent},
    store,
    data() {
      return {
        editDisable: false,
        bindDisable: false,
        deleteDisable: false
      }
    },
    watch: {
      selectedItems() {
        // console.log("this.selectedCourse.length:" + this.selectedItems.length)
        // console.log(this.multipleSelection)
        let length = this.selectedItems.length
        if (length !== 1) {

          //只有选中一门课程时,才能编辑课程或者给课程添加班级
          this.$refs.addNew.isDisabled = true;

        } else {
          this.$refs.addNew.isDisabled = false;
        }
      }
    },
    computed: {
      selectedItems() {
        return this.multipleSelection
      },
      ...mapState(["multipleSelection","btnFamily"])
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .inlineItem {
    display: inline;
  }
</style>
