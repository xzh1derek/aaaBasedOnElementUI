<template>
  <div>
    <div style="z-index: 10;position: relative">
      <TeamButton></TeamButton>
    </div>

    <div>
      <template>
        <div v-if="myTeamMember">
          <div v-for="(team,index) in myTeamMember" style="margin-bottom: 20px">
            <el-card>
              <div slot="header" class="clearfix">
                <span><b>{{team.course.course_name}}</b></span>
                <TeamOperation v-if="team.leader==token" :is-available="team.available" :is-display="team.is_display"
                               :team-id="team.id">
                </TeamOperation>
              </div>
              <div class="text item">
                <el-table :key="index" :data="team.memberDetails" stripe style="width: 100%" >
                  <el-table-column prop="name" label="组员姓名"  width="180"></el-table-column>
<!--                  用来找leader的,以后有时间做-->
<!--                  <el-table-column prop="username" :formatter="findLeader.bind(null,team)" label="学号" width="180">-->
                  <el-table-column prop="username"  label="学号" width="180"></el-table-column>
                  <el-table-column prop="class_id" label="班级" width="180"></el-table-column>
                  <el-table-column prop="qq" label="qq"></el-table-column>
                  <el-table-column prop="school" label="学院"></el-table-column>
                </el-table>

              </div>
            </el-card>
          </div>
        </div>


        <!--      !!!!不要删    如果没有数据-->
        <div v-else class="center-in-center " style="z-index: unset">
          <img src="../../../static/image/noTeam.png" alt="还没有组过队伍">
          <p>还没有组队,快去组队吧!!!</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import CreateTeam from "./CreateTeam";
  import TeamOperation from "./TeamOperation";
  import MyApplication from "./MyApplication";
  import TeamButton from "./TeamButton";

  export default {
    name: "my-team",
    components: {CreateTeam, TeamOperation, MyApplication, TeamButton},
    data() {
      return {
        myTeamMember: [],
        show: "true",
        available: "true",
        input: "",//与输入邀请人学号的输入框绑定,
        token: localStorage.token,
      }
    },
    watch: {
      ready4Renovate() {
        this.getMyTeam()
      }
    },
    computed: {
      ready4Renovate() {
        return this.readyForRenovate
      },
      ...mapState(['userInfoData', "readyForRenovate"])
    },
    methods: {
      /**
       * 获取我的队伍信息
       */
      getMyTeam() {
        let self = this;
        self.axios({
          url: '/team',
          params: {
            userId: localStorage.token
          }
        })
          .then((res) => {//把返回的所有队伍信息存起来用来显示.
            if (res.data.length === 0) {
              self.myTeamMember = null
              return
            }
            self.myTeamMember = res.data//这里要改
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


      //用来找谁是leader,以后有时间做
      findLeader(team, row, column, cellValue, index) {
        console.log(arguments)
        if(arguments[0].leader===arguments[1].row.username){
          return "backgroundColor:green"
        }
      },
    },
    mounted() {
      this.getMyTeam()
    }
  }
</script>

<style scoped>
  #outer {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  #left {
    flex: 5;
  }

  #right {
    flex: 2;
    border: 1px solid grey;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


  .text {
    font-size: 14px;
    border-bottom: 1px solid #d6eef1;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card {
    margin-top: 20px;
    margin-bottom: 20px
  }

  .box-card {
    width: 100px;
    margin-bottom: 200px;

  }

  .center-in-center {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
