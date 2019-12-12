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
import userInfo from "../components/userInfo";

// identity为10时,这个路由是公共路由
const routes =
  [
    {
      path: '/',
      component: test,
      meta: {
        identity: 10,
        text: "个人管理",
        teamleader: false,
        key: 8
      },
      children: [
        {
          path: "/",
          component: userInfo,
          meta: {
            text: "主页",
            teamleader: true,
            key: 2
          }
        },
        {
          path: "/myTeam",
          component: myTeam,
          meta: {
            text: "我的队伍",
            teamleader: true,
            key: 2
          }
        },
        {
          path: "/list",
          component: teamList,
          meta: {
            text: "队伍大厅",
            teamleader: true,
            key: 2
          }
        },
        {
          path: '/request',
          component: newRequest,
          meta: {
            text: "入队申请",
            teamleader: true,
            key: 2
          }
        },
        {
          path: '/task',
          component: newRequest,
          meta: {
            text: "实验任务",
            teamleader: true,
            key: 2
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
        },
      ]
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


  ];
export default routes;
