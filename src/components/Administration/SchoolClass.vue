<template>
  <div id="cardContainer">
    <template v-for="schools in result">
      <el-card class="box-card" style="" :body-style="{ paddingLeft: '20px'}">
        <div slot="header" class="clearfix">
          <span>{{schools.name}}</span>
<!--          <el-button style="float: right; padding: 3px 0" type="text" @click="showOperation">操作1</el-button>-->
          <SchoolOperation ref="operation"></SchoolOperation>
        </div>
        <div v-for="classID in schools.classesList" :key="classID" class="text item"
             style="border-bottom: 1px solid #d6eef1;">
          {{ classID }}
          <el-button :id="forID(classID)" style="float: right; padding: 3px 0" type="text"
                     @click="removeClass(forID(classID))">删除
          </el-button>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
  import SchoolOperation from "./SchoolOperation";

  export default {
    name: "SchoolClass",
    data() {
      return {
        result: {},
      }
    },
    components: {SchoolOperation},
    methods: {
      getList() {//获取院班列表
        this.axios({
          url: "/schools",
          method: "get"
        })
          .then(response => {
            this.result = response.data;
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      removeClass(classId) {
        this.axios({
          method: "delete",
          url: "/class",
          params: {
            classId: classId
          }
        })
          .then(response => {
            let self = this;
            this.getList();
            this.util.feedbackInfo(self, response.data);
          })
          .catch(err => {
            console.log(err)
          })
      },

      forID(id) {
        return id
      },

      showOperation(){
        this.$refs.operation.visible= true
      }
    },
    mounted() {
      this.getList()
    },


  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {

    padding: 10px;

  }

  .item:hover {
    background-color: #f9f9f9;
  }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 382px;
    margin-bottom: 20px;
    margin-right: 20px;
    margin-left: 20px;
  }

  #cardContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }


</style>
