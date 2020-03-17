<template>
  <div>

    <!--    第一行-->
    <el-row :gutter="20">
      <!--      个人信息-->
      <el-col :span="6">
        <userInfo></userInfo>
      </el-col>

<!--      <el-col :span="18">-->
        <!--        我的消息-->
<!--        <NewMessage></NewMessage>-->
<!--      </el-col>-->
    </el-row>


    <!--    第二行-->
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="12">-->

<!--        <i class="el-icon-message"><span class="subTitle">我的申请</span>-->
<!--        </i>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <i class="el-icon-mobile"><span class="subTitle">需要组队的课程</span></i>-->
<!--      </el-col>-->
<!--    </el-row>-->


<!--    <el-row :gutter="20">-->
<!--      <el-col :span="12">-->
<!--        <MyApplication></MyApplication>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <CreateTeam></CreateTeam>-->
<!--&lt;!&ndash;        <div class="grid-content bg-purple">本周课表</div>&ndash;&gt;-->
<!--      </el-col>-->
<!--    </el-row>-->


    <!--    第三行-->
    <div id="selectedCoursed">
      <el-row :gutter="20">
        <el-col :span="24">

          <i class="el-icon-notebook-2">
            <span class="subTitle"> 已选课程</span>
          </i>

        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!--      已选课程-->
        <el-col :span="24">
          <selectedCourses></selectedCourses>
        </el-col>
      </el-row>
    </div>


  </div>

</template>

<script>
  import userInfo from "../userInfo";
  import MyApplication from "./MyApplication";
  import NewMessage from "../Nav/NewMessage";
  import SelectedCourses from "./SelectedCourses";
  import CreateTeam from "./CreateTeam";

  export default {
    name: "HostPage",
    components: {userInfo, MyApplication, NewMessage, SelectedCourses,CreateTeam}

  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    height: 247px;
    min-height: 36px;

  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .subTitle{
    color: #737373;
  }
</style>
