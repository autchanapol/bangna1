import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages *****/
const Starter = lazy(() => import("../views/Starter.js"));
const Login = lazy(() => import("../views/ui/Login"));
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

/***** Error Fallback Component *****/
const ErrorFallback = () => <div>Something went wrong! Please try again.</div>;

/*****Routes Function*****/
const ThemeRoutes = (isAuthenticated, setIsAuthenticated) => [
  {
    path: "/",
    element: isAuthenticated ? (
      <Suspense fallback={<div>Loading...</div>}>
        <FullLayout />
      </Suspense>
    ) : (
      <Navigate to="/login" />
    ),
    children: [
      { index: true, element: <Navigate to="/starter" /> }, // Default route
      { path: "starter", element: isAuthenticated ? <Starter /> : <Navigate to="/login" /> },
      { path: "addbed", element: isAuthenticated ? <Addbed /> : <Navigate to="/login" /> },
      { path: "ward", element: isAuthenticated ? <Ward /> : <Navigate to="/login" /> },
      { path: "bedActive", element: isAuthenticated ? <BedActive /> : <Navigate to="/login" /> },
      { path: "orderFood", element: isAuthenticated ? <OrderFood /> : <Navigate to="/login" /> },
      { path: "report", element: isAuthenticated ? <Report /> : <Navigate to="/login" /> },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading Login Page...</div>}>
        <Login
          onLogin={() => {
            setIsAuthenticated(true);
          }}
        />
      </Suspense>
    ),
  },
  {
    path: "/logout",
    element: (
      <Suspense fallback={<div>Logging out...</div>}>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />, // Redirect สำหรับเส้นทางที่ไม่รู้จัก
  },
];

export default ThemeRoutes;


// import { lazy, Suspense } from "react";
// import { Navigate } from "react-router-dom";
// import { useEffect } from "react";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages *****/
// const Starter = lazy(() => import("../views/Starter.js"));
// const Login = lazy(() => import("../views/ui/Login"));
// const Addbed = lazy(() => import("../views/ui/Addbed.js"));
// const Ward = lazy(() => import("../views/ui/Ward.js"));
// const BedActive = lazy(() => import("../views/ui/BedActive.js"));
// const OrderFood = lazy(() => import("../views/ui/OrderFood.js"));
// const Report = lazy(() => import("../views/ui/Report.js"));

// /***** Logout Component *****/
// const Logout = ({ setIsAuthenticated }) => {
//   useEffect(() => {
//     localStorage.clear(); // ลบข้อมูลทั้งหมดใน localStorage
//     setIsAuthenticated(false); // ตั้งค่าให้ isAuthenticated เป็น false
//   }, [setIsAuthenticated]);

//   return <Navigate to="/login" replace />;
// };

// /***** Error Fallback Component *****/
// const ErrorFallback = () => <div>Something went wrong! Please try again.</div>;

// /*****Routes Function*****/
// const ThemeRoutes = (isAuthenticated, setIsAuthenticated) => [
//   {
//     path: "/",
//     element: isAuthenticated ? (
//       <Suspense fallback={<div>Loading...</div>}>
//         <FullLayout />
//       </Suspense>
//     ) : (
//       <Navigate to="/login" />
//     ),
//     children: [
//       { path: "starter", element: isAuthenticated ? <Starter /> : <Navigate to="/login" /> },

//       { path: "addbed", element: isAuthenticated ? <Addbed /> : <Navigate to="/login" /> },
//       { path: "ward", element: isAuthenticated ? <Ward /> : <Navigate to="/login" /> },
//       { path: "bedActive", element: isAuthenticated ? <BedActive /> : <Navigate to="/login" /> },
//       { path: "orderFood", element: isAuthenticated ? <OrderFood /> : <Navigate to="/login" /> },
//       { path: "report", element: isAuthenticated ? <Report /> : <Navigate to="/login" /> },
//     ],
//   },
//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<div>Loading Login Page...</div>}>
//         <Login
//           onLogin={() => {
//             setIsAuthenticated(true);
//           }}
//         />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/logout",
//     element: (
//       <Suspense fallback={<div>Logging out...</div>}>
//         <Logout setIsAuthenticated={setIsAuthenticated} />
//       </Suspense>
//     ),
//   },
//   {
//     path: "*",
//     element: <Navigate to="/login" />, // Redirect สำหรับเส้นทางที่ไม่รู้จัก
//   },
// ];

// export default ThemeRoutes;


// const MyAccout = lazy(() => import("../views/ui/MyAccout"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
      // { path: "alerts", element: isAuthenticated ? <Alerts /> : <Navigate to="/login" /> },
      // { path: "badges", element: isAuthenticated ? <Badges /> : <Navigate to="/login" /> },
      // { path: "buttons", element: isAuthenticated ? <Buttons /> : <Navigate to="/login" /> },
      // { path: "cards", element: isAuthenticated ? <Cards /> : <Navigate to="/login" /> },
      // { path: "grid", element: isAuthenticated ? <Grid /> : <Navigate to="/login" /> },
      // { path: "table", element: isAuthenticated ? <Tables /> : <Navigate to="/login" /> },
      // { path: "forms", element: isAuthenticated ? <Forms /> : <Navigate to="/login" /> },
      // { path: "myAccout", element: isAuthenticated ? <MyAccout /> : <Navigate to="/login" /> },
      // { path: "breadcrumbs", element: isAuthenticated ? <Breadcrumbs /> : <Navigate to="/login" /> },