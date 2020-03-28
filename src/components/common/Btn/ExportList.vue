<template>
  <div>
    <el-button @click="export2Excel">导出数据</el-button>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "ExportList",
    data() {
      return {
        list: [],//用于存excel数据
        tHeader: "",//用于控制表头
        outerFilter: "",//用于控制每一列显示json哪个属性
        innerFilter: "",//用于控制每一列显示json哪个属性
        defaultTitle: "",//用于控制表头
        targetUrl: "",//目的url
        pathname: location.pathname,
      }
    },
    computed: {
      ...mapState(["multipleSelection"])
    },
    methods: {
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        var _this = this

        this.axios({
          method: "get",
          url: this.targetUrl,
          params: {
            courseId: this.multipleSelection[0].id
          }
        })
          .then(response => {
            require.ensure([], () => {
              const {export_json_to_excel} = require('../../../vendor/Export2Excel');
              //获取用户的信息
              const stuInfo = [];
              stuInfo.length = response.data.length;
              for (let i = 0; i < response.data.length; i++) {
                stuInfo[i] = response.data[i].user
              }


              let userData = this.formatJson(_this.innerFilter, stuInfo);
              let courseData = this.formatJson(_this.outerFilter, response.data);

              for (let j = 0; j < userData.length; j++) {
                userData[j] = userData[j].concat(courseData[j])
                console.log(j)
              }

              console.log(userData);
              export_json_to_excel(_this.tHeader, userData, _this.multipleSelection[0].course_name);
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    mounted() {
      // 通过switch判断每次导出excel的表格内容
      switch (this.pathname) {
        case "/teaching/courses" :
          this.tHeader = ['学号', '姓名', '班级', '学院', '队伍编号', '队长', '分数', '作业文件'];
          this.innerFilter = ['username', 'name', 'class_id', 'school'];
          this.outerFilter = ['team_id', 'is_leader', 'score', 'file'];
          this.targetUrl = "/course/students/export";
          break;
        case "/schedule" :
          this.tHeader = ['学号', '姓名', '班级', '学院'];
          this.innerFilter = ['username', 'name', 'class_id', 'school'];
          this.outerFilter = ['team_id', 'is_leader', 'score', 'file'];
          this.targetUrl = "/course/students/export";
          break;
        case "/course" :
          this.tHeader = ['学号', '姓名', '班级', '学院'];
          this.innerFilter = ['username', 'name', 'class_id', 'school'];
          this.outerFilter = ['team_id', 'is_leader', 'score', 'file'];
          this.targetUrl = "/course/students/export";
          break;
        default:
          break;
      }
    }
  }
</script>

<style scoped>

</style>
