import React from "react";

const page1 = React.lazy(() => import("./views/Base/page1/page1"));
const teacher = React.lazy(() => import("./views/Base/teacherList/teacherList"));
const teacherAdd = React.lazy(() => import("./views/Base/teacherList/add"));
const teacherEdit = React.lazy(() => import("./views/Base/teacherList/edit"));
const train = React.lazy(() => import("./views/Base/train/train"));
const trainAdd = React.lazy(() => import("./views/Base/train/add"));


const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/page1", exact: true, name: "Page1", component: page1 },
  { path: "/teacher", exact: true, name: "teacher", component: teacher },
  { path: "/teacher/add", exact: true, name: "teacherAdd", component: teacherAdd },
  { path: "/teacher/edit/:id", exact: true, name: "teacherEdit", component: teacherEdit },
  { path: "/train", exact: true, name: "train", component: train },
  { path: "/train/add", exact: true, name: "trainAdd", component: trainAdd },
];

export default routes;
