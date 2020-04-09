<template>
  <el-dialog
    title="选择的学生名单"
    :visible.sync="dialogVisible"
    width="70%">
    <el-table :data="stuInfo" style="width: 100%">
      <el-table-column prop="user.name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="username" label="学号" width="180"></el-table-column>
      <el-table-column prop="user.class_id" label="班级" width="180"></el-table-column>
      <el-table-column prop="user.qq" label="qq"></el-table-column>
      <el-table-column prop="user.school" label="学院" show-overflow-tooltip></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入学号搜索选课学生"
            title="输入学号搜索选课学生,按回车搜索"
          @change="searchSomething"/>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @rewriteList="getListData" target-url1="/course/students/" target-url2="/course/students/pages/"
                :second-params="courseId"
                ref="page"
                v-show="showPagination"></Pagination>
    <span slot="footer" class="dialog-footer">
      <ExportList ref="export"></ExportList>
  </span>
  </el-dialog>
</template>

<script>
  import Pagination from "../../common/Pagination";
  import ExportList from "../../common/Btn/ExportList";
  import {mapMutations,mapState} from "vuex"

  export default {
    name: "StuOfCourse",
    data() {
      return {
        dialogVisible: false,
        stuInfo: [],
        stuInfoBackUp: [],//备份队伍信息,
        courseId: "",
        search: "",
        showPagination:true,

      }
    },
    watch: {
      dialogVisible(val) {
        if (val === false) {
          let payload = {
            targetKey: "multipleSelection",
            targetVal: []
          }
          this.updateCurrentStatus(payload)
        }
      },
      search(newVal) {
        if (!newVal) {
          this.stuInfo = this.stuInfoBackUp
          this.showPagination = true
        }
      }
    },
    components: {
      Pagination,
      ExportList
    },
    computed: {
      ...mapState(["regExpLibrary","multipleSelection"])
    },
    methods: {
      getListData(data) {
        this.stuInfo = data
        this.stuInfoBackUp = data
      },

      /**
       * 向后端请求搜索的数据
       * @param val
       */
      searchSomething(val) {
        // 判断输入是否合法
        if (!this.util.validateSomething.call(this, val, this.regExpLibrary.schoolIdReg)) {
          return
        }
        this.axios({
          url: "/course/students/search/",
          method: "post",
          params: {
            userId:val,
            courseId:this.multipleSelection[0].id
          }
        })
          .then(response => {
            if (response.data instanceof Object){
              this.showPagination = false
              this.stuInfo= [response.data]
            }else {
              this.util.returnErr.call(this,"该同学尚未选择此门课程")
            }

          })
          .catch(err => {
            console.log(err)
          })
      },

      ...mapMutations(["updateCurrentStatus"]),
    },
    mounted() {
      this.$refs.export.isDisabled = false
    }
  }
</script>

<style scoped>

</style>
