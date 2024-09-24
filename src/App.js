import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้าแรก
    const username = localStorage.getItem("username");
    if (username) {
      setIsAuthenticated(true);  // ถ้ามีข้อมูลผู้ใช้ ให้ตั้งค่าว่าล็อกอินแล้ว
    } else {
      setIsAuthenticated(false);  // ถ้าไม่มีข้อมูลผู้ใช้ ให้ถือว่ายังไม่ได้ล็อกอิน
    }
  }, []);  // useEffect นี้จะทำงานครั้งเดียวเมื่อโหลดแอปครั้งแรก

  const routing = useRoutes(ThemeRoutes(isAuthenticated, setIsAuthenticated));

  return <div>{routing}</div>;
};

export default App;
