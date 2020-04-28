<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><b>{{userInfoData.name}}</b></span>
        <el-popover
          placement="bottom"
          title="请选择操作:"
          width="50"
          trigger="click">
          <div style="text-align: center">
            <el-button type="text">更新资料</el-button>
            <el-button type="text">修改密码</el-button>
          </div>
          <el-button slot="reference" style="float: right; padding: 3px 0" type="text">修改密码/QQ</el-button>
        </el-popover>

      </div>
      <div class="text item">
        学号 : {{userInfoData.username}}
      </div>
      <div class="text item">
        学院 : {{userInfoData.school}}
      </div>
      <div class="text item">
        班级 : {{userInfoData.class_id}}
      </div>
      <div class="text item">
        QQ : {{userInfoData.qq}}
      </div>
    </el-card>

  </div>
</template>


<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "userInfo",
    data() {
      return {
        info: localStorage.getItem("userInfo"),
        visible: false
      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .box-card {
    width: 200px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
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
    width: 300px;
  }
</style>
