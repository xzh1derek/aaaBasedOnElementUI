<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><b>{{info.name}}</b></span>

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
        学号 : {{info.username}}
      </div>
      <div class="text item">
        学院 : {{info.school}}
      </div>
      <div class="text item">
        班级 : {{info.class_id}}
      </div>
      <div class="text item">
        QQ : {{info.qq}}
      </div>
    </el-card>


  </div>
</template>


<script>
  import store from '../store/store'
  import {mapState, mapMutations} from 'vuex'
  import PersonalCenter from './teamModule/PersonalCenter'
  import MyApplication from "./teamModule/MyApplication";
  import finalTest from "./teamModule/finalTest";

  export default {
    name: "userInfo",
    store,
    data() {
      return {
        info: JSON.parse(localStorage.getItem("userInfo")),
        visible: false
      }
    },
    components: { PersonalCenter, MyApplication, finalTest},
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      ...mapMutations(['initUserInfo', "updateTeam"])
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
