import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Login = lazy(() => import("../views/ui/Login"));
const MyAccout = lazy(() => import("../views/ui/MyAccout"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Addbed = lazy(() => import("../views/ui/Addbed.js"));
const Ward = lazy(() => import("../views/ui/Ward.js"));
const BedActive = lazy(() => import("../views/ui/BedActive.js"));
const OrderFood = lazy(() => import("../views/ui/OrderFood.js"));
const Report = lazy(() => import("../views/ui/Report.js"));

/***** Logout Component *****/
const Logout = ({ setIsAuthenticated }) => {
  useEffect(() => {
    localStorage.clear(); // ลบข้อมูลทั้งหมดใน localStorage
    setIsAuthenticated(false); // ตั้งค่าให้ isAuthenticated เป็น false
  }, [setIsAuthenticated]);

  return <Navigate to="/login" replace />;
};

/*****Routes Function*****/
const ThemeRoutes = (isAuthenticated, setIsAuthenticated) => [
  {
    path: "/",
    element: isAuthenticated ? <FullLayout /> : <Navigate to="/login" />,
    children: [
      // { path: "about", element: <About /> },  // ตั้งเป็น about หรือหน้าอื่นที่ต้องการ
      { path: "starter", element: <Starter /> },
      { path: "alerts", element: <Alerts /> },
      { path: "badges", element: <Badges /> },
      { path: "buttons", element: <Buttons /> },
      { path: "cards", element: <Cards /> },
      { path: "grid", element: <Grid /> },
      { path: "table", element: <Tables /> },
      { path: "forms", element: <Forms /> },
      { path: "myAccout", element: <MyAccout /> },
      { path: "breadcrumbs", element: <Breadcrumbs /> },
      { path: "addbed", element: <Addbed /> },
      { path: "ward", element: <Ward /> },
      { path: "bedActive", element: <BedActive /> },
      { path: "orderFood", element: <OrderFood /> },
      { path: "report", element: <Report /> },
    
    ],
  },
  {
    path: "/login",
    element: (
      <Login
        onLogin={() => {
          setIsAuthenticated(true);
        }}
      />
    ),
  },
  {
    path: "/logout",
    element: <Logout setIsAuthenticated={setIsAuthenticated} />,
  },
];


export default ThemeRoutes;
