
import React, { useState, useEffect } from "react";
import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user1.jpg";
import probg from "../assets/images/bg/download.jpg";

const menuItems = [
  {
    id: "ward",
    text: "Ward",
    link: "/ward",
    icon: "bi bi-people",
  },
  {
    id: "addbed",
    text: "Bed",
    link: "/addbed",
    icon: "bi bi-people",
  },
  {
    id: "bedActive",
    text: "Bed Active",
    link: "/bedActive",
    icon: "bi bi-people",
  },
  {
    id: "orderFood",
    text: "Order Food",
    link: "/orderFood",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const [name, setName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setName(storedUsername);
    }
  }, []);

  return (
    <div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
        </div>
        <div className="bg-dark text-white p-2">{name || "USER"}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {menuItems.map((menu) => (
            <NavItem key={menu.id} className="sidenav-bg">
              <Link
                to={menu.link}
                className={`nav-link py-3 ${
                  location.pathname === menu.link ? "active" : "text-secondary"
                }`}
              >
                <i className={menu.icon}></i>
                <span className="ms-3 d-inline-block">{menu.text}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { Button, Nav, NavItem } from "reactstrap";
// import { Link, useLocation } from "react-router-dom";
// import user1 from "../assets/images/users/user1.jpg";
// import probg from "../assets/images/bg/download.jpg";

// const navigation = [
//   {
//     title: "Ward",
//     href: "/ward",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Bed",
//     href: "/addbed",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Bed Active",
//     href: "/bedActive",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Order Food",
//     href: "/orderFood",
//     icon: "bi bi-people",
//   },
// ];

// const Sidebar = () => {
//   const [name, setName] = useState("");
//   const location = useLocation(); // ใช้ตรวจสอบ URL ปัจจุบัน

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setName(storedUsername);
//     }
//   }, []);

//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };

//   return (
//     <div>
//       <div className="d-flex align-items-center"></div>
//       <div
//         className="profilebg"
//         style={{ background: `url(${probg}) no-repeat` }}
//       >
//         <div className="p-3 d-flex">
//           <img src={user1} alt="user" width="50" className="rounded-circle" />
//           <Button
//             color="white"
//             className="ms-auto text-white d-lg-none"
//             onClick={showMobilemenu}
//           >
//             <i className="bi bi-x"></i>
//           </Button>
//         </div>
//         <div className="bg-dark text-white p-2 ">{name || "USER"}</div>
//       </div>
//       <div className="p-3 mt-2">
//         <Nav vertical className="sidebarNav">
//           {navigation.map((navi, index) => (
//             <NavItem key={index} className="sidenav-bg">
//               <Link
//                 to={navi.href}
//                 className={`nav-link py-3 ${
//                   location.pathname === navi.href ? "active" : "text-secondary"
//                 }`}
//               >
//                 <i className={navi.icon}></i>
//                 <span className="ms-3 d-inline-block">{navi.title}</span>
//               </Link>
//             </NavItem>
//           ))}
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// // import { Button, Nav, NavItem } from "reactstrap";
// // import { Link, useLocation } from "react-router-dom";
// // import user1 from "../assets/images/users/user1.jpg";
// // import probg from "../assets/images/bg/download.jpg";
// // import { React, useState, useEffect } from "react";
// // console.log("probg",probg);
// // const navigation = [
  
// //   {
// //     title: "Ward",
// //     href: "/ward",
// //     icon: "bi bi-people",
// //   },
// //   {
// //     title: "Bed",
// //     href: "/addbed",
// //     icon: "bi bi-people",
// //   },
// //   {
// //     title: "Bed Active",
// //     href: "/bedActive",
// //     icon: "bi bi-people",
// //   },
// //   {
// //     title: "Order Food",
// //     href: "/orderFood",
// //     icon: "bi bi-people",
// //   },

// // ];

// // const Sidebar = () => {
// //   const [name, setName] = useState('');
// //   useEffect(() => {
// //     // ตรวจสอบว่าเคยล็อกอินหรือไม่
   

// //     const storedUsername = localStorage.getItem("username");
// //     if (storedUsername) {
// //       // ถ้าเคยล็อกอินแล้ว ให้นำผู้ใช้ไปที่หน้า starter
// //       setName(storedUsername);
// //     }
// //   }, []); // ลำดับการใช้งาน navigate ถูกต้องแล้ว


// //   const showMobilemenu = () => {
// //     document.getElementById("sidebarArea").classList.toggle("showSidebar");
// //   };
// //   let location = useLocation();

// //   return (
// //     <div>
// //       <div className="d-flex align-items-center"></div>
// //       <div
// //         className="profilebg"
// //         style={{ background: `url(${probg}) no-repeat` }}
// //       >
// //         <div className="p-3 d-flex">
// //           <img src={user1} alt="user" width="50" className="rounded-circle" />
// //           <Button
// //             color="white"
// //             className="ms-auto text-white d-lg-none"
// //             onClick={() => showMobilemenu()}
// //           >
// //             <i className="bi bi-x"></i>
// //           </Button>
// //         </div>
// //         <div className="bg-dark text-white p-2 ">{name || 'USER'}</div>
// //       </div>
// //       <div className="p-3 mt-2">
// //         <Nav vertical className="sidebarNav">
// //           {navigation.map((navi, index) => (
// //             <NavItem key={index} className="sidenav-bg">
// //               <Link
// //                 to={navi.href}
// //                 className={
// //                   location.pathname === navi.href
// //                     ? "active nav-link py-3"
// //                     : "nav-link text-secondary py-3"
// //                 }
// //               >
// //                 <i className={navi.icon}></i>
// //                 <span className="ms-3 d-inline-block">{navi.title}</span>
// //               </Link>
// //             </NavItem>
// //           ))}
// //         </Nav>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// // {
//   //   title: "Dashboard",
//   //   href: "/starter",
//   //   icon: "bi bi-speedometer2",
//   // },
//   // {
//   //   title: "Alert",
//   //   href: "/alerts",
//   //   icon: "bi bi-bell",
//   // },
//   // {
//   //   title: "Badges",
//   //   href: "/badges",
//   //   icon: "bi bi-patch-check",
//   // },
//   // {
//   //   title: "Buttons",
//   //   href: "/buttons",
//   //   icon: "bi bi-hdd-stack",
//   // },
//   // {
//   //   title: "Cards",
//   //   href: "/cards",
//   //   icon: "bi bi-card-text",
//   // },
//   // {
//   //   title: "Grid",
//   //   href: "/grid",
//   //   icon: "bi bi-columns",
//   // },
//   // {
//   //   title: "Table",
//   //   href: "/table",
//   //   icon: "bi bi-layout-split",
//   // },
//   // {
//   //   title: "Forms",
//   //   href: "/forms",
//   //   icon: "bi bi-textarea-resize",
//   // },
//   // {
//   //   title: "Breadcrumbs",
//   //   href: "/breadcrumbs",
//   //   icon: "bi bi-link",
//   // },
//   // {
//   //   title: "About2",
//   //   href: "/about",
//   //   icon: "bi bi-people",
//   // },