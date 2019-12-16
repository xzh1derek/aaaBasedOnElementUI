<template>
  <div>
    <el-select v-model="value1" multiple placeholder="请选择">
      <el-option
        v-for="(item,index) in checkList"
        :key=index
        :label="item.label"
        :value=index>
      </el-option>
    </el-select>

    <el-button @click="bindAll" size="mini" type="primary">绑定班级</el-button>
    <div style="border: 1px solid black">
      <!--      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <el-checkbox>全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <!--            <el-checkbox-group v-model="checkedClasses" @change="handleCheckedCitiesChange">-->
      <el-checkbox-group v-model="checkedClasses">
        <!--            <el-checkbox-group>-->
        <template v-for="key1 in value1">
          <el-checkbox v-for="(className,index) in checkList[key1].classes" :label="className" :key="className">
            {{className}}
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
        checkList: [
          {
            label: "通院",
            classes: [1601011, 1601012, 1601013, 1601014, 1601051, 1601052, 1601041, 1601018, 1601019]
          },
          {
            label: "计院",
            classes: [1602011, 1602012, 1602013, 1602014, 1602051, 1602052, 1602041, 1602018, 1602019]
          },
          {
            label: "电院",
            classes: [1603011, 1603012, 1603013, 1603014, 1603051, 1603052, 1603041, 1603018, 1603019]
          },
          {
            label: "软件",
            classes: [1604011, 1604012, 1604013, 1604014, 1604051, 1604052, 1604041, 1604018, 1604019]
          }
        ],
        checkedClasses: []
      }
    },
    props:["courseId"],
    methods: {
      bindAll() {
        console.log(this.value1)
        console.log(this.checkedClasses)
        this.axios({
          method: "post",
          url: '/course/bind',
          params: {
            courseId: this.courseId,
          },
          data:this.checkedClasses,
        })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      console.log(this.courseId)
    }

  }
</script>

<style scoped>

</style>
