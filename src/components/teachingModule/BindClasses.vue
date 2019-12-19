<template>
  <div>
    <el-select v-model="value1" multiple placeholder="请选择">
      <!--      在这个地方,value是index.也就是被选中的item的索引,最后把这些存储在value1数组中-->
      <el-option
        v-for="(item,index) in checkList"
        :key=index
        :label="item.name"
        :value=index>
      </el-option>
    </el-select>


    <el-button @click="bindAll" size="mini" type="primary">绑定班级</el-button>
    <div style="border: 1px solid black">
      <!--            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--      <el-checkbox>全选</el-checkbox>-->
      <div style="margin: 15px 0;"></div>
      <!--                  <el-checkbox-group v-model="checkedClasses" @change="handleCheckedCitiesChange">-->
      <el-checkbox-group>

        <template v-for="key1 in value1">
          <el-checkbox v-for="(classInfo,index) in checkList[key1].classesList" :label="classInfo.class_id"
                       :key="classInfo.class_id">
            {{classInfo.class_id}}
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BindClasses",
    data() {
      return {
        value1: [],
        checkList: [],
        checkedClasses: [],
        checkAll: false,
        isIndeterminate: true
      }
    },
    props: ["bindId", "urlTarget"],
    methods: {
      bindAll() {
        this.axios({
          method: "post",
          url: this.urlTarget,
          params: {
            bindId: this.bindId,
          },
          data: this.checkedClasses,
        })
          .then(response => {
            if (response.data === 0) {
              this.innerVisible = false

              this.$message({
                message: "操作成功",
                type: "successful",
                duration: 1500,
                showClose: true
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getSchoolStructure() {
        this.axios({
          method: "get",
          url: "/schools",
        })
          .then(response => {
            this.checkList = response.data
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.getSchoolStructure()
    }

  }
</script>

<style scoped>

</style>
