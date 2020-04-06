<!--查看未处理的选课信息-->
<template>
  <div>
    <template v-if="stuWithModule.length>0">
      <el-button type="primary" @click="admitAll" :disabled="admitList.length===0" style="margin-bottom: 10px">通过选课
      </el-button>
      <el-collapse v-model="activeName" accordion>
        <template v-for="module in stuWithModule">
          <el-collapse-item :title="getTitle(module)" :name=module.id>
            <el-table :data="module.userModules" style="width: 100%" @selection-change="handleSelection">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="user.username" label="学号"></el-table-column>
              <el-table-column prop="user.name" label="姓名"></el-table-column>
              <el-table-column prop="user.class_id" label="班级"></el-table-column>
              <el-table-column prop="user.year" label="年级"></el-table-column>
              <el-table-column prop="user.school" label="学院" show-overflow-tooltip></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-popconfirm
                    confirmButtonText='确定'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="确定要拒绝选课吗？"
                    @onConfirm="rejectApply(scope.row,module.id)"
                  >
                    <el-button slot="reference" type="text">拒绝</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </template>
      </el-collapse>
    </template>

    <template v-else>
      <div class="center-in-center " style="z-index: unset">
        <img src="../../../static/image/noTeam.png" alt="还没有组过队伍">
        <p>还没有新的信息</p>
      </div>
    </template>

  </div>
  <!--</div>-->
</template>

<script>
  import {mapState, mapMutations} from "vuex"

  export default {
    name: "UnauthorizedStuList",
    props: ["moduleIdForUnauth"],
    data() {
      return {
        stuWithModule: [],
        dialogVisible: false,
        activeName: "",
        admitList: []
      }
    },
    watch: {
      activeName(newValue, oldValue) {
        this.admitList = []
      }
    },

    methods: {
      /**
       * 获取所有未处理的请求
       */
      getUnauthorizedStuList() {
        this.axios({
          method: "get",
          url: "curriculum/module/",
          params: {
            teacherId: 2//要改
          }
        })
          .then(response => {
            if (response.data instanceof Array) {
              this.stuWithModule = response.data
            } else {
              this.util.returnErr.bind(this, response.data)
            }
          })
          .catch(err => {
          })
      },

      /**
       * 拒绝用户请求
       * @param row
       * @param moduleId
       */
      rejectApply(row, moduleId) {
        this.axios({
          method: "post",
          url: "/curriculum/module/reject/",
          params: {
            moduleId: moduleId,
            userId: row.user.username
          }
        })
          .then(response => {
            if (response.data === 0) {
              this.getUnauthorizedStuList()
              this.util.feedbackInfo(this, 0)
            }
          })
          .catch(err => {
          })
      },

      /**
       * 拼接title字符串
       * @param module
       * @returns {string}
       */
      getTitle(module) {
        return module.project.course.course_name + "-" + module.project.project_name + "-" + module.date + "日" + module.time + " 批次"
      },

      /**
       * 表格选择发生变化
       * @param selection
       */
      handleSelection(selection) {
        this.admitList = this.util.getPropFormListObj(selection, "username", "user")
      },

      /**
       * 批量通过所有选择的选课
       */
      admitAll() {
        this.axios({
          method: "post",
          url: "/curriculum/module/dispose/",
          params: {
            moduleId: this.activeName
          },
          data: this.admitList
        })
          .then(response => {
            if (response.data === 0) {
              this.getUnauthorizedStuList()
              this.util.feedbackInfo(this, 0)
            }
          })
          .catch(err => {
          })
      },
    },

    mounted() {
      this.getUnauthorizedStuList()
    },
  }
</script>

<style scoped>
  .center-in-center {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
