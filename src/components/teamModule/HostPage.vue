<template>
  <div>

    <!--    第一行-->
    <el-row :gutter="20">
      <!--      个人信息-->
      <el-col :span="6">
        <userInfo></userInfo>
      </el-col>
      <el-col :span="18">
        <!--        我的消息-->
        <NewMessage></NewMessage>
      </el-col>
    </el-row>


    <!--    第二行-->
    <el-row :gutter="20">
      <el-col :span="12">
        <MyApplication></MyApplication>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">本周课表</div>
      </el-col>
    </el-row>




<!--    第三行-->
    <div id="selectedCoursed">
      <el-row :gutter="20">
        <el-col :span="24">
          <b>
            <i class="el-icon-notebook-2"></i>已选课程
          </b>
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

  export default {
    name: "HostPage",
    components: {userInfo, MyApplication, NewMessage, SelectedCourses,MyApplication}

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
</style>
