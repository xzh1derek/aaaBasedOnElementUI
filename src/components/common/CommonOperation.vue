<template>
  <div class="outer">
    <el-row>
      <AddNewItem ref="addNew" class="inlineItem"></AddNewItem>
      <!--      <EditItem class="inlineItem"></EditItem>-->
      <ExportList class="inlineItem"></ExportList>

      <!--      绑定按键-->
      <BindBtn class="inlineItem"></BindBtn>

      <!--      添加单个学生-->
      <AddSingleStuBtn class="inlineItem"></AddSingleStuBtn>
      <BindTeacher class="inlineItem"></BindTeacher>
      <PublishBtn class="inlineItem"></PublishBtn>

      <DeleteItem ref="removeItems" class="inlineItem"></DeleteItem>
      <!--      上传学生Excel  始终时最后一个按键,否则会换行-->
      <UploadFile class="inlineItem"></UploadFile>
    </el-row>
  </div>
</template>

<script>
  import AddNewItem from "./Btn/AddNewItem";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  import DeleteItem from "./Btn/DeleteItem";
  import EditItem from "./Btn/EditItem";
  import UploadFile from "./Btn/UploadFile";
  import ExportList from "./Btn/ExportList";
  import BindBtn from "./Btn/BindBtn";
  import AddSingleStuBtn from "./Btn/AddSingleStuBtn";
  import BindTeacher from "./Btn/BindTeacher";
  import PublishBtn from "./Btn/PublishBtn";

  export default {
    name: "CommonOperation",
    components: {
      BindBtn,
      PublishBtn,
      BindTeacher,
      AddNewItem,
      DeleteItem,
      EditItem,
      UploadFile,
      ExportList,
      AddSingleStuBtn
    },
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
        let length = this.selectedItems.length;
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
      ...mapState(["multipleSelection", "btnFamily"])
    },
    methods: {
      ...mapMutations(["updateCurrentStatus"])
    },

    beforeDestroy() {
      //组件销毁前,先初始化vuex中的状态
      let payload = {
        targetKey: "multipleSelection",
        targetVal: [],
      };
      this.updateCurrentStatus(payload)
      payload.targetKey = "innerMultipleSelection"
      this.updateCurrentStatus(payload)
    },
  }
</script>

<style scoped>
  .inlineItem {
    display: inline;
  }

  .outer {

    margin-bottom: 10px;
  }
</style>
