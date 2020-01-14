<template>
  <el-popover
    placement="bottom"
    title="请选择操作:"
    width="100"
    trigger="click">
    <div style="text-align: center">
      <el-button slot="reference"  type="text">添加新学院</el-button>
      <el-button slot="reference" type="text">修改学院名称</el-button>
      <el-button slot="reference" type="text">添加新班级</el-button>
      <el-button slot="reference" type="text">删除学院</el-button>
    </div>
    <el-button slot="reference" style="float: right; padding: 3px 0" type="text">操作</el-button>
<!--    <el-button slot="reference" >click 激活</el-button>-->
  </el-popover>
</template>

<script>
    export default {
        name: "SchoolOperation",
      data(){
          return{
            visible: false
          }
      }
    }
</script>

<style scoped>

</style>
