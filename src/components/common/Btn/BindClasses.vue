<!--选择被绑定的相关信息-->
<!--还没有被调用过-->
<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="BindDialogVisible"
      width="30%">
      <el-select v-model="value1" multiple placeholder="请先选择学院" style="width: 100%;min-width: 100px">
        <!--      在这个地方,value是index.也就是被选中的item的索引,最后把这些存储在value1数组中-->
        <el-option
          v-for="(item,index) in checkList"
          :key=index
          :label="item.name"
          :value=index>
        </el-option>
      </el-select>


      <div style="border: 1px solid gainsboro;min-height: 50px;margin-top: 10px;padding: 10px">
        <el-checkbox-group v-model="checkedItems">
          <!--如果value1为空,就显示所有的班级-->
          <template v-for="key1 in value1">
            {{key1}}
            <el-checkbox v-for="(classInfo,index) in checkList[key1].classesList"
                         :label="classInfo"
                         :key="classInfo"
                         style="font-size: 20px;">
              {{classInfo}}
            </el-checkbox>
          </template>
        </el-checkbox-group>


        <div>
          已保存的绑定
          {{alreadyBoundList}}
        </div>
      </div>
      <el-button @click="bindAll" type="primary" style="margin-top: 20px">绑定班级</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex"

  export default {
    name: "BindClasses",
    data() {
      return {
        value1: [],
        checkList: [],
        BindDialogVisible: false,//控制对话框是否显示
        checkedItems: [],//已经选择的项目
        targetUrl: "",//提交函数目标地址,根据btnFamily动态确认
        structureUrl: "",//获取要被绑定的数据
        alreadyBoundList: "",//获取已经绑定的班级
        alreadyBoundUrl: "",//获取已经绑定的班级的url
      }
    },
    computed: {
      ...mapState(["multipleSelection", "btnFamily"])
    },
    methods: {

      /**
       * 将数据绑定给指定的内容
       */
      bindAll() {
        this.axios({
          method: "post",
          url: this.targetUrl,
          params: {
            id: this.multipleSelection[0].id
          },
          data: this.checkedItems,
        })
          .then(response => {
            if (response.data === 0) {
              this.$emit("bindComplete");//向父组件传递事件
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


      /**
       * 获取要用来绑定的数据
       */
      getStructure() {
        this.axios({
          method: "get",
          url: this.structureUrl,
        })
          .then(response => {
            this.checkList = response.data
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      },


      initBindList() {
        let self = this

        //获取用来绑定的数据
        function getInitStructure() {
          return self.axios({
            url: self.structureUrl,
            method: "get",
          })
        }

        //获取已经绑定的数据
        function alreadyBound() {
          return self.axios({
            url: self.alreadyBoundUrl,
            method: "get",
            params: {
              courseId: self.multipleSelection[0].id//最后都改成id
            }
          })
        }


        self.axios.all([getInitStructure(), alreadyBound()])
          .then(self.axios.spread(function (acct, perms) {
            //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            self.checkList = acct.data;
            var alreadyHave = [];


            for (let i = 0; i < perms.data.length; i++) {
              for (let j = 0; j < perms.data[i].classesList.length; j++) {
                alreadyHave.push(perms.data[i].classesList[j])
              }
            }

            self.checkedItems = alreadyHave;
            self.alreadyBoundList = alreadyHave
          }))
          .catch(err => {
          })
      }
    },


    mounted() {
      switch (this.btnFamily) {
        case 10:
          this.structureUrl = "/schools";
          this.targetUrl = "/course/bind";
          this.alreadyBoundUrl = "/course/classes";

          break;
        case 5:
          this.structureUrl = "";
          this.targetUrl = "";
          this.alreadyBoundUrl = "";
          break;
        case 0:
          this.structureUrl = "";
          this.targetUrl = "";
          this.alreadyBoundUrl = "";
          break;

      }
      console.log('到这了')
      this.initBindList();
    },
    // updated() {
    //   this.initBindList();
    // }

  }
</script>

<style scoped>

</style>
