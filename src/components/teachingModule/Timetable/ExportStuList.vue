<!--导出选择了某个module的学生信息-->
<template>
  <div>
    <el-button @click="export2Excel" type="primary">导出Excel</el-button>
  </div>
</template>

<script>
  export default {
    name: "ExportStuList",
    data() {
      return {
        tHeader: "",//用于控制表头
        innerFilter: "",//用于控制每一列显示json哪个属性
        defaultTitle: "",//用于控制表头
      }
    },
    props: ["stuInfo", "timeForClass", "date"],

    methods: {
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        var _this = this
        require.ensure([], () => {
          const {export_json_to_excel} = require('../../../vendor/Export2Excel');
          //获取用户的信息
          let userData = this.formatJson(_this.innerFilter, this.stuInfo);
          export_json_to_excel(_this.tHeader, userData, this.defaultTitle);
        })
      }
    },

    mounted() {
      this.tHeader = ['学号', '姓名', '班级', '年级', '学院'];
      this.innerFilter = ['username', 'name', 'class_id', 'year', 'school'];
      this.defaultTitle = this.date + "日" + this.timeForClass + "批次名单"
    }
  }
</script>

<style scoped>

</style>
