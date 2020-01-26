<!--选择班级信息,绑定相关班级-->
<template>
  <div>
    <el-select v-model="value1" multiple placeholder="请先选择学院">
      <!--      在这个地方,value是index.也就是被选中的item的索引,最后把这些存储在value1数组中-->
      <el-option
        v-for="(item,index) in checkList"
        :key=index
        :label="item.name"
        :value=index>
      </el-option>
    </el-select>


    <div style="border: 1px solid gainsboro;min-height: 50px;margin-top: 10px">
      <!--            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--      <el-checkbox>全选</el-checkbox>-->
      <div style="margin: 15px;"></div>
      <!--                  <el-checkbox-group v-model="checkedClasses" @change="handleCheckedCitiesChange">-->
      <el-checkbox-group v-model="checkedClasses">
        <!--如果value1为空,就显示所有的班级-->
        <template v-for="key1 in value1">
          <!--        <template v-for="key1 in (checkList.length-1)" v-if="checkList">-->
          {{key1}}
          <el-checkbox v-for="(classInfo,index) in checkList[key1].classesList"
                       :label="classInfo"
                       :key="classInfo"
                       style="font-size: 20px;">
            {{classInfo}}
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
    <el-button @click="bindAll" type="primary" style="margin-top: 20px">绑定班级</el-button>
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
      }
    },
    props: ["bindId", "urlTarget", "structureUrl", "limit"],
    methods: {
      bindAll() {
        if (this.limit == 1) {
          if (this.checkedClasses.length > 2) {
            this.$message({
              message: "最多只能绑定两个班级",
              type: "warning",
              duration: 1500,
              showClose: true
            })
            return
          }
        }


        this.axios({
          method: "post",
          url: this.urlTarget,
          params: {
            id: this.bindId,
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
          url: this.structureUrl,
          params: {
            id: this.bindId
          }
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
