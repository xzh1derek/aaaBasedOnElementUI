import myTeam from '../components/teamModule/my-team'
import teamList from '../components/teamModule/team-list'
import newRequest from '../components/teamModule/new-request'
import navbar from "../components/teamModule/navbar";
import Team from "../components/Team";
import Login from "../components/Login";
import CompleteInfo from "../components/CompleteInfo";
import test from "../components/test";
import teamOperate from "../components/teamModule/teamOperate";
import NewMessage from "../components/NewMessage";

const routes =
  [
    {
      path: '/',
      component: test,
      meta: {
        text: "主页",
        teamleader: false,
        key: 8
      }
    },
    {
      path: '/team',
      component: Team,
      meta: {
        text: "组队",
        teamleader: false,
        key: 4
      },
      // children: [
      //   {
      //     path: '/',
      //     component: myTeam,
      //     meta: {
      //       text: "我的队伍",
      //       teamleader: false,
      //       key: 3
      //     }
      //   },
      //   {
      //     path: '/request',
      //     component: newRequest,
      //     meta: {
      //       text: "入队申请",
      //       teamleader: true,
      //       key: 2
      //     }
      //   },
      //   {
      //     path: '/list',
      //     component: teamList,
      //     meta: {
      //       text: "队伍大厅",
      //       teamleader: false,
      //       key: 1
      //     }
      //   },
      // ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        text: "登录",
        teamleader: false,
        key: 5
      }
    },
    {
      path: '/complete',
      component: CompleteInfo,
      meta: {
        text: "完善个人信息",
        teamleader: false,
        key: 6
      }
    },
    {
      path: '/message',
      component: NewMessage,
      meta: {
        text: "我的消息",
        teamleader: false,
        key: 7
      }
    } ,

  ];
export default routes;
