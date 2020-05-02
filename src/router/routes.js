import myTeam from '../components/teamModule/myTeam'
import teamList from '../components/teamModule/team-list'
import Login from "../components/Login";
import PersonalCenter from "../components/teamModule/PersonalCenter";
import NewMessage from "../components/Nav/NewMessage";
import userInfo from "../components/userInfo";
import TeachingManagement from "../components/teachingModule/TeachingManagement";
import CourseLibrary from "../components/teachingModule/Course/CourseLibrary";
import ProjectLibrary from "../components/teachingModule/ProjectPart/ProjectLibrary";
import ModuleLibrary from "../components/teachingModule/ModulePart/ModuleLibrary";
import SystemManagement from "../components/Administration/SystemManagement";
import SchoolClass from "../components/Administration/SchoolClass";
import StuManagement from "../components/Administration/StuManagement";
import HostPage from "../components/teamModule/HostPage";
import BookingExperiment from "../components/chooseCourse/BookingExperiment";
import CurriculaVariableManagement from "../components/CurriculaVariableManagement/CurriculaVariableManagement";
import MyTimetable from "../components/teachingModule/Timetable/MyTimetable";
import UnauthorizedStuList from "../components/CurriculaVariableManagement/UnauthorizedStuList";
import TeacherManagement from "../components/Administration/TeacherManagement";
import TeamManagement from "../components/Administration/TeamManagement";
import MyTasks from "../components/teamModule/MyTasks";
import CourseOfMe from "../components/teachingModule/TaskPart/CourseOfMe";
import CheckWork from "../components/teachingModule/CheckWork";

// identity为10时,这个路由是公共路由
// const routes =
//   [
//     {
//       path: '/user/',
//       component: PersonalCenter,
//       redirect: "/user/info",
//       meta: {
//         identity: 10,
//         text: "个人管理",
//         teamleader: false,
//         key: 8
//       },
//       children: [
//         {
//           path: "info",
//           component: HostPage,
//           meta: {
//             text: "主页",
//             teamleader: true,
//             key: 2
//           }
//         },
//         {
//           path: "myTeam",
//           component: myTeam,
//           meta: {
//             text: "我的队伍",
//             teamleader: true,
//             key: 2
//           }
//         },
//         {
//           path: "list",
//           component: teamList,
//           meta: {
//             text: "队伍大厅",
//             teamleader: true,
//             key: 2
//           }
//         },
//         {
//           path: 'task',
//           component: MyTasks,
//           meta: {
//             text: "实验任务",
//             teamleader: true,
//             key: 2
//           }
//         },
//         {
//           path: 'choose',
//           component: BookingExperiment,
//           meta: {
//             text: "实验预约",
//             teamleader: true,
//             key: 2
//           }
//         },
//
//       ]
//     },
//
//     {
//       path: '/login',
//       component: Login,
//       meta: {
//         text: "登录",
//         teamleader: false,
//         key: 5
//       }
//     },
//
//     {
//       path: '/teaching/',
//       redirect: "/teaching/courses",
//       component: TeachingManagement,
//       meta: {
//         text: "课程管理"
//       },
//       children: [
//         {
//           path: "courses",
//           component: CourseLibrary,
//           meta: {
//             text: "实验课程库"
//           }
//         },
//         {
//           path: "plan",
//           component: ProjectLibrary,
//           meta: {
//             text: "教学计划"
//           }
//         },
//         {
//           path: "schedule",
//           component: ModuleLibrary,
//           meta: {
//             text: "排课管理"
//           }
//         },
//         {
//           path: 'time',
//           component: MyTimetable,
//           meta: {
//             text: "我的课表"
//           },
//           children: []
//
//         },
//         {
//           path: 'task',
//           component: CourseOfMe,
//           meta: {
//             text: "实验任务"
//           },
//
//         },
//         {
//           path: 'check',
//           component: CheckWork,
//           meta: {
//             text: "批改作业"
//           },
//         },
//       ]
//
//     },
//
//     {
//       path: '/variable/',
//       redirect: "/variable/management",
//       component: CurriculaVariableManagement,
//       meta: {
//         text: "选课管理"
//       },
//       children: [
//         {
//           path: "management",
//           component: UnauthorizedStuList,
//           meta: {
//             text: "未处理选课"
//           }
//         },
//       ]
//     },
//
//     {
//       path: '/school/',
//       component: SystemManagement,
//       redirect: "/school/school_classes",
//       meta: {
//         text: "系统管理",
//         teamleader: false,
//         key: 100
//       },
//       children: [
//         {
//           path: "school_classes",
//           component: SchoolClass,
//           meta: {
//             text: "院班管理"
//           }
//         },
//         {
//           path: "students",
//           component: StuManagement,
//           meta: {
//             text: "学生管理"
//           }
//         },
//         {
//           path: "teacher",
//           component: TeacherManagement,
//           meta: {
//             text: "教师管理"
//           }
//         },
//         {
//           path: "team",
//           component: TeamManagement,
//           meta: {
//             text: "队伍管理"
//           }
//         },
//       ]
//     },
//
//
//     {
//       path: '/message/',
//       component: NewMessage,
//       meta: {
//         clearAll: true,
//         text: "我的消息",
//         teamleader: false,
//         key: 7
//       }
//     },
//
//   ];








const routes =
  [
    {
      path: '/',
      redirect:'/user/info/',
      meta: {
        nav:false
      }
    },
    {
      path: '/login',
      component: Login,
      name:"login",
      meta: {
        text: "登录",
        nav:false
      }
    },
    {
      path: '/message/',
      component: NewMessage,
      meta: {
        clearAll: true,
        text: "我的消息",
        key: 7,
        nav:false
      }
    },

  ];


export default routes;
