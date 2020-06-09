import React from "react";

const page1 = React.lazy(() => import("./views/Base/page1/page1"));

const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/skills", exact: true, name: "skills", component: page1 },
];

export default routes;
