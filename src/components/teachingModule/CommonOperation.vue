<template>
  <div>
    <el-row>
      <AddNewItem ref="addNew" class="inlineItem"></AddNewItem>
      <DeleteItem ref="removeItems" class="inlineItem" ></DeleteItem>
    </el-row>
  </div>
</template>

<script>
  import AddNewItem from "./AddNewItem";
  import store from '../../store/store'
  import {mapState, mapMutations} from "vuex";
  import DeleteItem from "./DeleteItem";

  export default {
    name: "CommonOperation",
    components: {AddNewItem, DeleteItem},
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
        console.log("this.selectedCourse.length:" + this.selectedItems.length)
        let length = this.selectedItems.length
        if (length !== 1) {

          this.$refs.addNew.isDisabled = true;
          this.$refs.removeItems.isDisabled = true

          //只有选中一门课程时,才能编辑课程或者给课程添加班级
        } else {
          this.$refs.addNew.isDisabled = false;
          this.$refs.removeItems.isDisabled = false
        }
      }
    },
    computed: {
      selectedItems() {
        return this.multipleSelection
      },
      ...mapState(["multipleSelection"])
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
