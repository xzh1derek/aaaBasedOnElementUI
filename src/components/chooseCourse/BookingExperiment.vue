<!--实验预约的父组件-->
<template>
  <div>
    <ModuleTimeTable></ModuleTimeTable>
    <CourseCanBeSelected></CourseCanBeSelected>
  </div>
</template>

<script>
  import CourseCanBeSelected from "./CourseCanBeSelected";
  import ModuleTimeTable from "./btn/ModuleTimeTable";

  export default {
    name: "BookingExperiment",
    components: {CourseCanBeSelected,ModuleTimeTable}
  }
</script>

<style scoped>

</style>
