<!--处理一切与绑定有关的逻辑,包括为课程绑定班级等-->
<!--commonOperation用的是这个-->
<template>
  <div>
    <el-button @click="openBindDialog" v-if="isDisplay" :disabled="checkDisabled">{{btnText}}</el-button>
    <el-dialog
      title="请选择要绑定的班级"
      :visible.sync="BindDialogVisible"
      width="635px">
      <el-transfer filterable v-model="checkedItems" :data="checkList" :titles="['可选列表','已选列表']" :props="{
      key: 'class_id'}"></el-transfer>


      <!--      <el-transfer filterable v-model="checkedItems" :props="{key:135}" :value="checkList"-->
      <!--                   :titles="['可选列表','已选列表']"></el-transfer>-->
      <el-button @click="bindAll" type="primary" style="margin-top: 20px;">绑定班级</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "BindOnIt",
    data() {
      return {
        btnText: "",//按键上文字,根据btnFamily动态确认
        targetUrl: "",//提交函数目标地址,根据btnFamily动态确认
        BindDialogVisible: false,//控制绑定对话框是否可见
        value1: [],
        checkList: [],//保存所有要被选择的item
        checkedItems: [],//已经选择的项目
        structureUrl: "",//获取要被绑定的数据
        alreadyBoundList: "",//获取已经绑定的班级
        alreadyBoundUrl: "",//获取已经绑定的班级的url
        isDisabled: true,
        isDisplay: true
      }
    },
    computed: {
      checkDisabled() {
        if (this.btnFamily === 10 && this.multipleSelection.length === 1) {
          return false
        } else if (this.btnFamily === 5 && this.innerMultipleSelection.length === 1) {
          return false
        } else {
          return true
        }
      },
      ...mapState(["multipleSelection", "btnFamily", "innerMultipleSelection","readyForRenovate"])
    },
    watch: {},
    methods: {
      /**
       * 获取dialog初始数据
       */
      initBindList() {
        let self = this
        let params = {}
        if (self.btnFamily === 10) {
          params.courseId = self.multipleSelection[0].id//最后都改成id
        } else if (self.btnFamily === 5) {
          params.id = self.innerMultipleSelection[0].id
        } else {
          return
        }

        //获取已经绑定的数据
        function alreadyBound() {
          return self.axios({
            url: self.alreadyBoundUrl,
            method: "get",
            // params: {
            //   courseId: self.multipleSelection[0].id//最后都改成id
            // }
            params: params
          })
        }


        function getAllClasses() {
          return self.axios({
            url: self.structureUrl,
            method: "get",
            params: params
          })
        }


        self.axios.all([getAllClasses(), alreadyBound()])
          .then(self.axios.spread(function (classes, bound) {
            self.checkList = []
            //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            var alreadyHave = [];
            if (self.btnFamily === 10) {
              self.checkList = classes.data;
              // var alreadyHave = [];
              for (let i = 0; i < bound.data.length; i++) {
                for (let j = 0; j < bound.data[i].classesList.length; j++) {
                  alreadyHave.push(bound.data[i].classesList[j])
                }
              }
              self.checkedItems = alreadyHave;
              self.alreadyBoundList = alreadyHave
              console.log("checkList")
              console.log(self.checkList)
            } else if (self.btnFamily === 5) {
              for (let key in classes.data) {
                self.checkList.push(classes.data[key].classesList);
                // console.log(classes.data[key].classesList)
              }
              self.checkList = [].concat(...self.checkList)

              for (let i = 0; i < self.checkList.length; i++) {
                self.checkList[i] = {
                  class_id: self.checkList[i]
                }
              }
              console.log(self.checkList)
            }
          }))
          .catch(err => {
          })
      },


      /**
       * 将数据绑定给指定的内容
       */
      bindAll() {
        this.axios({
          method: "post",
          url: this.targetUrl,
          params: {
            // id: this.multipleSelection[0].id
            id: this.btnFamily === 10 ? this.multipleSelection[0].id : this.innerMultipleSelection[0].id
          },
          data: this.checkedItems,
        })
          .then(response => {
            if (response.data === 0) {
              this.BindDialogVisible = false;
              // this.$emit("bindComplete");//向父组件传递事件
              this.$message({
                message: "操作成功",
                type: "successful",
                duration: 1500,
                showClose: true
              })
              let payload = {
                targetKey:"readyForRenovate",
                targetUrl:!this.readyForRenovate
              }

            } else {
              this.util.returnErr.call(this, response.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      /**
       * 打开dialog并且获取初始数据
       */
      openBindDialog() {
        // this.$refs.bindDialog.BindDialogVisible = true
        this.BindDialogVisible = true
        this.initBindList()
      }
    },


    mounted() {//做组件加载早期准备
      switch (this.btnFamily) {
        case 10://course相关
          this.btnText = "绑定班级";
          this.structureUrl = "/class";
          this.targetUrl = "/course/bind";
          this.alreadyBoundUrl = "/course/classes";
          break;
        case 5://module相关
          this.btnText = "绑定班级";
          this.structureUrl = "/module/classes/";
          this.targetUrl = "/module/bind/";
          this.alreadyBoundUrl = "";
          break;
        case 0://学生相关
          this.isDisplay = false
          break;
        case 15://project相关
          this.isDisplay = false
          break;
      }
    }

  }
</script>

<style scoped>

</style>
