import PersonalCenter from "../components/teamModule/PersonalCenter";
import teamList from "../components/teamModule/team-list";
import myTeam1 from "../components/teamModule/myTeam";
import MyTasks from "../components/teamModule/MyTasks";
import BookingExperiment from "../components/chooseCourse/BookingExperiment";
import HostPage from "../components/teamModule/HostPage";
import TeachingManagement from "../components/teachingModule/TeachingManagement";
import CourseLibrary from "../components/teachingModule/Course/CourseLibrary";
import ProjectLibrary from "../components/teachingModule/ProjectPart/ProjectLibrary";
import ModuleLibrary from "../components/teachingModule/ModulePart/ModuleLibrary";
import MyTimetable from "../components/teachingModule/Timetable/MyTimetable";
import CourseOfMe from "../components/teachingModule/TaskPart/CourseOfMe";
import CheckWork from "../components/teachingModule/CheckWork";
import CurriculaVariableManagement from "../components/CurriculaVariableManagement/CurriculaVariableManagement";
import UnauthorizedStuList from "../components/CurriculaVariableManagement/UnauthorizedStuList";

let teacherMenu = [
  {
    path: '/user/',
    component: PersonalCenter,
    redirect: "/user/info",
    meta: {
      identity: 10,
      text: "个人管理",
      key: 8,
      nav: true
    },
    children: [
      {
        path: "info",
        component: HostPage,
        meta: {
          text: "主页",
          key: 2,
          nav: true
        }
      },
    ]
  },
  {
    path: '/teaching/',
    redirect: "/teaching/courses",
    component: TeachingManagement,
    meta: {
      text: "课程管理",
      nav: true
    },
    children: [
      {
        path: "courses",
        component: CourseLibrary,
        meta: {
          text: "实验课程库",
          nav: true

        }
      },
      {
        path: "plan",
        component: ProjectLibrary,
        meta: {
          text: "教学计划",
          nav: true

        }
      },
      {
        path: "schedule",
        component: ModuleLibrary,
        meta: {
          text: "排课管理",
          nav: true

        }
      },
      {
        path: 'time',
        component: MyTimetable,
        meta: {
          text: "我的课表",
          nav: true
        },
        children: []

      },
      {
        path: 'task',
        component: CourseOfMe,
        meta: {
          text: "实验任务",
          nav: true

        },

      },
      {
        path: 'check',
        component: CheckWork,
        meta: {
          text: "批改作业",
          nav: true

        },
      },
    ]

  },
  {
    path: '/variable/',
    redirect: "/variable/management",
    component: CurriculaVariableManagement,
    meta: {
      text: "选课管理",
      nav: true

    },
    children: [
      {
        path: "management",
        component: UnauthorizedStuList,
        meta: {
          text: "未处理选课",
          nav: true

        }
      },
    ]
  },
];
let studentMenu = [
  {
    path: '/user/',
    component: PersonalCenter,
    redirect: "/user/info",
    meta: {
      identity: 10,
      text: "个人管理",
      nav: true,
      teamleader: false,
      key: 8
    },
    children: [
      {
        path: "/user/info",
        component: HostPage,
        meta: {
          text: "主页",
          teamleader: true,
          key: 2,
          nav: true

        }
      },
      {
        path: "/user/team",
        component: myTeam1,
        meta: {
          text: "我的队伍",
          teamleader: true,
          nav: true,
          key: 20,
        }
      },
      {
        path: "/user/list",
        component: teamList,
        meta: {
          text: "队伍大厅",
          teamleader: true,
          key: 2,
          nav: true

        }
      },
      {
        path: '/user/task',
        component: MyTasks,
        meta: {
          text: "实验任务",
          teamleader: true,
          key: 2,
          nav: true

        }
      },
      {
        path: '/user/choose',
        component: BookingExperiment,
        meta: {
          text: "实验预约",
          teamleader: true,
          key: 2,
          nav: true

        }
      },

    ]
  },
]
export {teacherMenu, studentMenu};
