import React from "react";

const page1 = React.lazy(() => import("./views/Base/page1/page1"));
const page2 = React.lazy(() => import("./views/Base/page2/page2"));
const teacher = React.lazy(() => import("./views/Base/teacherList/teacherList"));
const teacherAdd = React.lazy(() => import("./views/Base/teacherList/add"));
const teacherAddSkill = React.lazy(() => import("./views/Base/teacherList/addSkill"));
const teacherEdit = React.lazy(() => import("./views/Base/teacherList/edit"));
const train = React.lazy(() => import("./views/Base/train/train"));
const trainSc = React.lazy(() => import("./views/Base/train/Sc"));
const trainAdd = React.lazy(() => import("./views/Base/train/add"));
const trainDetails = React.lazy(() => import("./views/Base/train/details"));



const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/page1", exact: true, name: "Page1", component: page1 },
  { path: "/page2", exact: true, name: "Page2", component: page2 },
  { path: "/teacher", exact: true, name: "teacher", component: teacher },
  { path: "/teacher/add", exact: true, name: "teacherAdd", component: teacherAdd },
  { path: "/teacher/skill/:id", exact: true, name: "teacherAddSkill", component: teacherAddSkill },
  { path: "/teacher/edit/:id", exact: true, name: "teacherEdit", component: teacherEdit },
  { path: "/train", exact: true, name: "train", component: train },
  { path: "/train/Sc", exact: true, name: "Sc", component: trainSc },
  { path: "/train/add", exact: true, name: "trainAdd", component: trainAdd },
  { path: "/train/details/:id", exact: true, name: "trainDetails", component: trainDetails },
];

export default routes;
