import myTeam from '../components/teamModule/my-team'
import teamList from '../components/teamModule/team-list'
import newRequest from '../components/teamModule/new-request'
import navbar from "../components/teamModule/navbar";
import Team from "../components/Team";
import Login from "../components/Login";
import CompleteInfo from "../components/CompleteInfo";
const routes =
  [
    {
      path: '/',
      component: myTeam,
      meta:{
        text:"我的队伍",
        teamleader:false,
        key:3
      }
    },
    {
      path: '/request',
      component: newRequest,
      meta:{
        text:"入队申请",
        teamleader:true,
        key:2
      }
    },
    {
      path: '/list',
      component: teamList,
      meta:{
        text:"队伍大厅",
        teamleader:false,
        key:1
      }
    },
    {
      path: '/team',
      component: Team,
      meta:{
        text:"组队",
        teamleader:false,
        key:4
      }
    },
    {
      path: '/login',
      component: Login,
      meta:{
        text:"登录",
        teamleader:false,
        key:5
      }
    },
    {
      path: '/complete',
      component: CompleteInfo,
      meta:{
        text:"完善个人信息",
        teamleader:false,
        key:6
      }
    }
  ];
export default routes;
