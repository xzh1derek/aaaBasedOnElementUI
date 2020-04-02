<!--实验预约的父组件-->
<template>
  <div>
    <CourseCanBeSelected></CourseCanBeSelected>
  </div>
</template>

<script>
  import CourseCanBeSelected from "./CourseCanBeSelected";

  export default {
    name: "BookingExperiment",
    components: {CourseCanBeSelected}
  }
</script>

<style scoped>

</style>
