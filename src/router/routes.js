import myTeam from '../components/my-team'
import teamList from '../components/team-list'
import newRequest from '../components/new-request'
import navbar from "../components/navbar";
const routes =
  [
    {
      path: '/',
      component: teamList,
      meta:{
        text:"队伍列表",
        teamleader:false
      }
    },
    {
      path: '/request',
      component: newRequest,
      meta:{
        text:"入队申请",
        teamleader:false
      }
    },
    {
      path: '/my_team',
      component: myTeam,
      meta:{
        text:"我的队伍",
        teamleader:false
      }
    }
  ];
export default routes;
