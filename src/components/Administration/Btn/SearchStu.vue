<template>
  <div>
    <div style="margin: 20px 0;width: 40%">
      <el-collapse-transition>
        <div v-show="show">
          <el-input placeholder="请输入完整名称" v-model="targetModel" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="学号" value=1></el-option>
              <el-option label="姓名" value=2></el-option>
              <el-option label="班级" value=3></el-option>
              <el-option label="年级" value=4></el-option>
              <el-option label="学院" value=5></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="emitSearchStu" title="搜索">搜索</el-button>
          </el-input>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchStu",
    data() {
      return {
        show: false,
        targetModel: "",
        stuInfo: {
          name: '',
          username: '',
          class_id: '',
          school: '',
          year: '',
        },
        stuInfoBackUp: {
          name: '',
          username: '',
          class_id: '',
          school: '',
          year: '',
        },
        select: "1",
        search: ""
      }
    },
    watch: {
      select(val) {
        this.stuInfo = Object.assign(this.stuInfo, this.stuInfoBackUp)
      },
      targetModel(val) {
        setTimeout(function () {
          if (!val) {
            this.$emit("showAll")
          }
        }.bind(this), 1500)
      }
    },
    methods: {
      onSubmit() {
        for (let key in this.stuInfo) {
          if (this.stuInfo[key]) {
            this.axios({
              method: "get",
              url: "/students/search/",
              params: this.stuInfo
            })
              .then(response => {
                console.log(response)
              })
              .catch(err => {
                console.log(err)
              })
            return
          }
        }
        this.util.returnErr.call(this, "请至少填写一项信息")
      },
      emitSearchStu() {
        switch (this.select) {
          case "1" :
            this.stuInfo.username = this.targetModel;
            break;
          case "2" :
            this.stuInfo.name = this.targetModel;
            break;
          case "3" :
            this.stuInfo.class_id = this.targetModel;
            break;
          case "4" :
            this.stuInfo.year = this.targetModel;
            break;
          case "5" :
            this.stuInfo.school= this.targetModel;
            break;
        }
        this.$emit("getRequiredList", this.stuInfo)
      }
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
