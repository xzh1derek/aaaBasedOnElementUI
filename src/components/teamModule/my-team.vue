<template>
  <div>

    <CreateTeam @updateMyTeam="getMyTeam"></CreateTeam>


    <template v-for="(team,index) in myTeamMember" style="margin-bottom: 20px">
      <div style="background-color: #5bc0de;width: 80%">
        <h1 style="display: inline;margin-right: 20px">{{team.course.course_name}}</h1><span>队伍编号:{{team.id}}</span>
      </div>
      <!--  <el-table  :key="index" :data="team.memberDetails" stripe style="width: 80%">-->
      <el-table :key="index" :data="team.memberDetails" stripe style="width: 80%">
        <el-table-column prop="name" label="组员姓名" width="180"></el-table-column>
        <el-table-column prop="username" label="学号" width="180"></el-table-column>
        <el-table-column prop="qq" label="qq"></el-table-column>
        <el-table-column prop="school" label="学院"></el-table-column>

<!--        <el-table-column-->
<!--          prop="leader"-->
<!--          label="标签"-->
<!--          width="100"-->
<!--          :filters="[{ text: '队长', value: localStorage.token }, { text: '组员', value: '公司' }]"-->
<!--          :filter-method="filterTag"-->
<!--          filter-placement="bottom-end">-->
<!--          <template slot-scope="scope">-->
<!--            <el-tag-->
<!--              :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
<!--              disable-transitions>{{scope.row.tag}}</el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->

      </el-table>
    </template>


  </div>
</template>

<script>
  import {mapState} from "vuex"
  import CreateTeam from "./CreateTeam";

  export default {
    name: "my-team",
    props: ['userInfoProp'],
    components: {CreateTeam},
    data() {
      return {
        myTeamMember: null,
      }
    },
    computed: {
      ...mapState(['userInfoData'])
    },
    methods: {
      getMyTeam() {
        let self = this;
        self.axios({
          url: '/team',
          params: {
            userId: localStorage.token
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            if (res.data.length == 0) {
              return
            }
            self.myTeamMember = res.data//这里要改
            console.log(self.myTeamMember)
            // self.myTeamMember = res.data.memberDetails//这里要改
          })
          .catch(error => {
            self.$message({
              message: "信息加载失败,请稍后再试",
              type: "error",
              duration: 1500,
              showClose: true
            })
          })
      },
      // filterTag(value, row) {
      //   return row.tag === value;
      // },
    },
    mounted() {
      this.getMyTeam()
    }
  }
</script>

<style scoped>

</style>
