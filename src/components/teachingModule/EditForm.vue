<template>

  <el-dialog title="填写课程详细信息:" :visible.sync="outerVisible" width="30%">
    <el-form :model="form">
      <el-form-item label="ModuleID" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.id" autocomplete="off" readonly></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Module批次" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.module_index" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Module时间" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Module地点" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.location" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <!--任选需要填人数 isFixed=false时-->
      <!--      <el-form-item label="学生数" :label-width="formLabelWidth" v-if="!this.multipleSelection[0].is_fixed">-->
        <el-form-item label="学生数" :label-width="formLabelWidth">
        <el-col :span=span>
          <el-input v-model="form.stu_num" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="editItem">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import store from "../../store/store"
  import {mapState} from "vuex"

  export default {
    name: "EditForm",
    store,
    data() {
      return {
        form: {
          id: "",
          location: "",
          module_index: "",
          stu_num: "",
          time: ""
        },
        outerVisible: false,
        formLabelWidth: "120px",
        span: 10
      }
    },
    computed: {
      getTrunkItems() {
        return this.trunkItems
      },
      ...mapState(["trunkItems"])
    },
    watch: {
      getTrunkItems() {
        this.form = this.util.deepClone(this.getTrunkItems)
      }
    },
    methods: {
      editItem() {
        this.axios({
          method: "post",
          url: "module/update",
          data: this.form
        })
          .then(response => {
            this.outerVisible = false
            console.log(response)

          })
          .catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>

</style>
