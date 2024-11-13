import axios from "axios";

// สร้าง instance ของ axios เพื่อกำหนดค่าพื้นฐาน
const api = axios.create({
  baseURL: "https://localhost:44353/", // URL หลักของ API
  timeout: 5000, // กำหนดเวลาหมดอายุ request
  headers: {
    "Content-Type": "application/json",
  },
});

// ฟังก์ชันสำหรับการเรียก API POST เพื่อล็อกอิน
export const loginUser = async (username, password) => {
  try {
    const res = await api.post("api/Users/Login", {
      username: username,
      password: password,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("Login error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const getWard = async () => {
  try {
    const res = await api.get("api/Wards/GetWards", {});
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("getWard error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const InsertWards = async (WardName, Remarks, Status, CreatedBy) => {
  try {
    const res = await api.post("api/Wards/InsertWard", {
      WardName,
      Remarks,
      Status,
      CreatedBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateWard error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateWard = async (Id, WardName, Remarks, UpdateBy) => {
  try {
    const res = await api.post("api/Wards/UpdateWard", {
      Id,
      WardName,
      Remarks,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateWard error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateWard_status = async (Id, Status, UpdateBy) => {
  try {
    const res = await api.post("api/Wards/UpdateWard", {
      Id,
      Status,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("Login error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetBeds = async () => {
  try {
    const res = await api.get("api/Beds/GetBeds", {});
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBeds error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetUc = async () => {
  try {
    const res = await api.get("api/Uc/GetUc", {});
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBeds error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetBedsWhereWard = async (WardId) => {
  try {
    const res = await api.get("api/Beds/GetBedsFrmWard", {
      params: { WardId }, // ส่งแบบนี้ในกรณีใช้ get ?WardId=5
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBeds error:", error);

    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const InsertBeds = async (Name, WardId, Remarks, Status, CreatedBy) => {
  try {
    const res = await api.post("api/Beds/InsertBed", {
      Name,
      WardId,
      Remarks,
      Status,
      CreatedBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("InsertBeds error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateBeds = async (Id, Name, WardId, Remarks, UpdateBy) => {
  try {
    const res = await api.post("api/Beds/UpdateBed", {
      Id,
      Name,
      Remarks,
      WardId,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateBeds error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateBeds_status = async (Id, Status, UpdateBy) => {
  try {
    const res = await api.post("api/Beds/UpdateBed", {
      Id,
      Status,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateBeds_status error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetBedActive = async () => {
  try {
    const res = await api.get("api/BedActives/GetBedsActive", {});
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBedsActive error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const InsertBedActive = async (
  BedId,
  UdId,
  HnName,
  Remarks,
  Status,
  CreatedBy
) => {
  try {
    const res = await api.post("api/BedActives/InsertBedActive", {
      BedId,
      UdId,
      HnName,
      Remarks,
      Status,
      CreatedBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("InsertBedsActive error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateBedActive = async (Id, Status, UpdateBy) => {
  try {
    const res = await api.post("api/BedActives/UpdateBedActive", {
      Id,
      Status,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateBedsActive error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetBedsActivefrmDate = async (WardId, dataOrder) => {
  try {
    const formattedDate =
      dataOrder instanceof Date
        ? dataOrder.toISOString().split("T")[0] // แปลงเป็น "YYYY-MM-DD"
        : dataOrder; // ใช้ dataOrder เดิมถ้าไม่ใช่ Date object

    const res = await api.get("api/BedActives/GetBedsActivefrmDate", {
      params: { dataOrder: formattedDate, WardId: WardId },
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBedsActivefrmDate error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetOrderFoodfrmDate = async (startData, endData) => {
  try {
    const formattedStartData =
      startData instanceof Date
        ? startData.toISOString().split("T")[0] // แปลงเป็น "YYYY-MM-DD"
        : startData; // ใช้ dataOrder เดิมถ้าไม่ใช่ Date object

    const formattedEndData =
      endData instanceof Date
        ? endData.toISOString().split("T")[0] // แปลงเป็น "YYYY-MM-DD"
        : endData; // ใช้ dataOrder เดิมถ้าไม่ใช่ Date object

    // แสดงพารามิเตอร์ใน console ก่อนที่จะส่งคำขอ
    console.log("Params:", {
      startData: formattedStartData,
      endData: formattedEndData,
    });

    const res = await api.get("api/OrderFoods/GetOrderFoodfrmDate", {
      params: { startData: formattedStartData, endData: formattedEndData },
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetBedsActivefrmDate error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const GetFoods = async () => {
  try {
    const res = await api.get("api/Foods/GetFoods", {});
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("GetFoods error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const AddOrderFoods = async (jsonData) => {
  try {
    const res = await api.post("api/OrderFoods/AddOrderFood", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("AddOrderFoods error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

export const UpdateOrderFood = async (Id, Status, UpdateBy) => {
  try {
    const res = await api.post("api/OrderFoods/UpdateOrderFood", {
      Id,
      Status,
      UpdateBy,
    });
    return res; // ส่งข้อมูล response กลับไป
  } catch (error) {
    console.error("UpdateOrderFood error:", error);
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อจัดการต่อ
  }
};

//params: { WardId }, // ส่งแบบนี้ในกรณีใช้ get ?WardId=5
