import { useRoutes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeRoutes from "./routes/Router";
import Header from "./layouts/Header"; // สมมติว่าคุณมีคอมโพเนนต์ Header

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ตรวจสอบสถานะการล็อกอินจาก localStorage เมื่อโหลดแอปพลิเคชัน
  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsAuthenticated(!!username); // ถ้ามี username ให้ตั้งค่าเป็น true
    console.log("Initial Username from localStorage:", username);
    console.log("Initial isAuthenticated set to:", !!username);
  }, []);

  // บันทึกเส้นทางล่าสุดใน localStorage เมื่อเส้นทางเปลี่ยนแปลงและล็อกอินอยู่
  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/login") {
      localStorage.setItem("lastRoute", location.pathname);
      console.log("Last route saved:", location.pathname);
    }
  }, [location.pathname, isAuthenticated]);

  // นำทางไปยังเส้นทางล่าสุดที่บันทึกไว้หลังจากล็อกอิน
  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute") || "/starter";
    console.log("Last route from localStorage:", lastRoute);
    console.log("IsAuthenticated on navigate:", isAuthenticated);

    if (isAuthenticated && location.pathname === "/login") {
      navigate(lastRoute, { replace: true });
      console.log("Navigating to last route:", lastRoute);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const routing = useRoutes(ThemeRoutes(isAuthenticated, setIsAuthenticated));

  return (
    <div>
      {/* ส่ง setIsAuthenticated ไปยัง Header */}
      {/* <Header setIsAuthenticated={setIsAuthenticated} /> */}
      {routing}
    </div>
  );
};

export default App;
