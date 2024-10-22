import axios from 'axios';

// สร้าง instance ของ axios เพื่อกำหนดค่าพื้นฐาน
const api = axios.create({
    baseURL: 'https://localhost:44353/', // URL หลักของ API
    timeout: 5000, // กำหนดเวลาหมดอายุ request
    headers: {
      'Content-Type': 'application/json',
    },
  });


  // ฟังก์ชันสำหรับการเรียก API POST เพื่อล็อกอิน
  export const loginUser = async (username, password) => {
    try {
      const res = await api.post('api/Users/Login', {
        username: username,
        password: password,
      });
      return res; // ส่งข้อมูล response กลับไป
    } catch (error) {
      console.error('Login error:', error);
      throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
    }
  };

  export const getWard = async () => {
    try {
      const res = await api.get('api/Wards/GetWards', {});
      return res; // ส่งข้อมูล response กลับไป
    } catch (error) {
      console.error('Login error:', error);
      throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
    }
  };
  