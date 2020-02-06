<!--获取院班信息-->
<template>
  <div id="cardContainer">
    <template v-for="schools in result">
      <el-card class="box-card" :body-style="{ paddingLeft: '20px'}">
        <div slot="header" class="clearfix">
          <span>{{schools.name}}</span>
          <SchoolOperation ref="operation" :school-id="getData(schools.id)" :school-name="getData(schools.name)"
                           @freshList="getList">
          </SchoolOperation>
        </div>
        <div v-for="classID in schools.classesList" :key="classID" class="text item"
             style="border-bottom: 1px solid #d6eef1;">
          {{ classID }}

          <el-popconfirm
            confirmButtonText='好的'
            cancelButtonText='不用了'
            icon="el-icon-info"
            iconColor="red"
            title="确定删除这个班级吗？"
            @onConfirm="removeClass(getData(classID))">
            <el-button slot="reference" type="text" style="float: right; padding: 3px 0">删除
            </el-button>
          </el-popconfirm>
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
        result: {}
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
            this.result = response.data;//将获取到的院班信息赋值给 result 用于渲染
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       * 删除班级
       * @param classId   已经在v-for时通过getData函数传入
       */
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

      /**
       *实现在v-for时动态传入参数
       * @param data
       * @returns {*}
       */

      getData(data) {
        return data
      },

      showOperation() {
        this.$refs.operation.visible = true
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
