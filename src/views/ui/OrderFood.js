import React, { useState, useRef, CSSProperties, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  Col,
  Table,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  FormText,
  Input,
  Row,
  InputGroup,
  InputGroupText,
  // InputGroupAddon,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useReactToPrint } from "react-to-print";
import AsyncSelect from "react-select/async";
import "./css/Modal.css";
import "./css/A4Document.css";
import { Calendar } from "react-feather";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import สไตล์
import {
  GetFoods,
  getWard,
  UpdateOrderFood,
  GetOrderFoodfrmDate,
  GetBedsActivefrmDate,
  AddOrderFoods,
} from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// var DatePicker = require("reactstrap-date-picker");
const OrderFood = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // กำหนดค่าเริ่มต้นให้ selectedDate เป็นวันที่ปัจจุบัน
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const componentRef = useRef();
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [selectedWards, setSelectedWards] = useState([]);
  const [selectedWardsShow, setSelectedWardsShow] = useState([]);
  const [foodOption, setFoodOption] = useState([]);
  const [bedData, setBedData] = useState([]);
  const [bedActiveData, setBedActiveData] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal
  const [error, setError] = useState(null); // สถานะสำหรับจัดการข้อผิดพลาด
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [selectedOption, setSelectedOption] = useState("");
  const printRef = useRef();
  useEffect(() => {
    const storedUsername = localStorage.getItem("userId");
    if (storedUsername) {
      setUserId(storedUsername);
    }
    fetchWardData(); // เรียกฟังก์ชันเพื่อดึงข้อมูล
    fetchFoodData();
    fetchOrderFoodfrmDate();
  }, []);

  const fetchOrderFoodfrmDate = async () => {
    try {
      const res = await GetOrderFoodfrmDate(startDate, endDate); // เรียกใช้ API จาก services.js
      console.log("GetOrderFoodfrmDate res", res.data); // res.data คือข้อมูลที่ได้จาก server

      setBedData(res.data);

      // setWardOptions(options); // อัปเดต wardOptions ด้วยข้อมูลที่แปลงแล้ว
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const fetchWardData = async () => {
    try {
      const res = await getWard(); // เรียกใช้ API จาก services.js
      console.log("ward res", res.data); // res.data คือข้อมูลที่ได้จาก server

      // แปลงข้อมูล JSON จาก API เป็นโครงสร้างที่ต้องการใน wardOptions
      const options = res.data.map((ward) => ({
        value: ward.id.toString(),
        label: ward.wardName,
      }));

      setWardOptions(options); // อัปเดต wardOptions ด้วยข้อมูลที่แปลงแล้ว
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");
  };

  // Reusable function to show success alert
  const showWarningAlert = (message) => {
    toast.warning(message, {
      position: "top-center", // ใช้ตำแหน่งกลางด้านบน
      autoClose: 1500, // ปิดอัตโนมัติหลังจาก 2 วินาที
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // Reusable function to show success alert
  const showSuccessAlert = (message) => {
    toast.success(message, {
      position: "top-center", // ใช้ตำแหน่งกลางด้านบน
      autoClose: 1500, // ปิดอัตโนมัติหลังจาก 2 วินาที
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const fetchFoodData = async () => {
    try {
      const res = await GetFoods(); // เรียกใช้ API จาก services.js
      console.log("food res", res.data); // res.data คือข้อมูลที่ได้จาก server

      // แปลงข้อมูล JSON จาก API เป็นโครงสร้างที่ต้องการใน wardOptions
      const options = res.data.map((food) => ({
        value: food.id.toString(),
        label: food.foodName,
      }));

      setFoodOption(options); // อัปเดต wardOptions ด้วยข้อมูลที่แปลงแล้ว
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClickOpen = () => {
    setSelectedWardsShow(0);
    setBedActiveData([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const confirmed = window.confirm("ต้องการบันทึกข้อมูล การสั่งอาหาร");
    if (confirmed) {
      const jsonData = {
        data: bedActiveData,
        CreatedBy: parseInt(userId), // เพิ่ม CreatedBy แยกจาก data
      };

      console.log("JSON Data:", JSON.stringify(jsonData));

      try {
        const res = await AddOrderFoods(jsonData);
        if (res && res.data) {
          const { success, message } = res.data;
          console.log("AddOrderFoods response:", message);
          if (success) {
            showSuccessAlert(message);
            fetchOrderFoodfrmDate();
            setOpen(false);
          } else {
            alert("Failed to save: " + message);
          }
        } else {
          console.log("Unexpected response format:", res);
        }
      } catch (error) {
        console.error("Error saving order foods:", error);
      }
    }
  };

  const handleModify = async (id) => {
    console.log("OrderFoodId : ", id);
    const confirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการ Check out ?");
    if (confirmed) {
      const res = await UpdateOrderFood(id, 0, userId);
      console.log("api UpdateOrderFood", res.data); // res.data คือข้อมูลที่ได้จาก server
      if (res && res.data) {
        const { success, message, orderFoodId } = res.data;
        if (success) {
          fetchOrderFoodfrmDate();
          showSuccessAlert(message + " ID : " + orderFoodId);
        }
      }
    } else {
      console.log("ยกเลิกการลบ");
    }
  };

  // confirmAlert({
  //   title: 'Confirm to delete',
  //   message: 'Are you sure you want to delete this?',
  //   buttons: [
  //     {
  //       label: 'Yes',
  //       onClick: () => setOpen(false)
  //     },
  //     {
  //       label: 'No',
  //       onClick: () => setOpen(false)

  //     }
  //   ]
  // });

  // const bedData = [
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     ward: "1",
  //     food: "อาหารอ่อน",
  //     remark: "ไม่เอาไก่",
  //   },
  //   // เพิ่มข้อมูลตามต้องการ
  // ];

  // wardOptions = [
  //   { value: "1", label: "Ward 1" },
  //   { value: "2", label: "Ward 2" },
  //   { value: "3", label: "Ward 3" },
  //   { value: "4", label: "Ward 4" },
  // ];

  // foodOption = [
  //   { value: 1, label: "อาหารปกติ" },
  //   { value: 2, label: "อาหารอ่อน" },
  //   { value: 3, label: "อาหารเหลว" },
  //   { value: 4, label: "งดอาหาร" },
  //   // เพิ่มข้อมูลตามต้องการ
  // ];

  // ฟังก์ชันกรองข้อมูล bedData ตามการค้นหาและการเลือก ward
  const filteredData = bedData.filter((bed) => {
    const matchesSearchTerm =
      bed.bedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWard = selectedWards.length
      ? selectedWards.some((ward) => bed.ward === parseInt(ward.value, 10))
      : true;
    return matchesSearchTerm && matchesWard;
  });

  // คำนวณข้อมูลสำหรับการแบ่งหน้า
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage); // ใช้ข้อมูลหลังการแบ่งหน้า

  // ฟังก์ชันสำหรับการเปลี่ยนหน้า
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleShowBedActiveFrmWard = () => {
    console.log("handleShowBedActiveFrmWard");
    if (selectedWardsShow) {
      const wardId = parseInt(selectedWardsShow.value, 10); // แปลงเป็น int
      console.log("Ward ID:", wardId); // ใช้ค่า wardId ในที่นี้
      fetchBedActiveData(wardId);
    } else {
      console.log("No Ward selected");
      showWarningAlert("No Ward selected");
    }
    // console('Ward' , selectedWardsShow);
  };

  const fetchBedActiveData = async (wardId) => {
    try {
      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0]; // แปลงเป็น "YYYY-MM-DD"
      // setCurrentDate(formattedDate);
      const res = await GetBedsActivefrmDate(wardId, formattedDate);

      const fetchedData = res.data.map((bed) => ({
        ...bed,
        foodType: parseInt(foodOption[0]?.value, 10) || null, // กำหนดค่าเริ่มต้นเป็น 1 ถ้ามี foodOption
        note: "", // เพิ่ม field เริ่มต้น
      }));

      console.log(
        "GetBedsActivefrmDate res",
        JSON.stringify(fetchedData, null, 2)
      ); // res.data คือข้อมูลที่ได้จาก server
      setBedActiveData(fetchedData);
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const data = [
    { id: 1, title: "รายการที่ 1", description: "รายละเอียดของรายการที่ 1" },
    { id: 2, title: "รายการที่ 2", description: "รายละเอียดของรายการที่ 2" },
    { id: 3, title: "รายการที่ 3", description: "รายละเอียดของรายการที่ 3" },
    // เพิ่มรายการข้อมูลตามต้องการ
  ];
  const handleOpenReport = () => {
    // window.open('/report', '_blank', 'width=800,height=600');
    console.log("filteredData", JSON.stringify(filteredData));
    navigate("/report", { state: { data: filteredData } }); // ส่ง array data ไปยังหน้า /report
  };

  const handleSelectChange = (selectedOption, bedId) => {
    setBedActiveData((prevData) =>
      prevData.map((bed) =>
        bed.id === bedId
          ? { ...bed, foodType: parseInt(selectedOption.value, 10) }
          : bed
      )
    );
  };

  return (
    <>
      <div>
        <h1> สั่งอาหารผู้ป่วยใน </h1>
        <Col lg="12">
          <Button
            className="btn "
            color="success"
            style={{ marginRight: "10px" }}
            onClick={handleClickOpen}
          >
            สั่งอาหาร
          </Button>
        </Col>
        <br />

        <Row className="align-items-center">
          <Col lg="auto">
            <Label for="startDate">กำหนดวันที่</Label>
            <InputGroup style={{ maxWidth: "300px", marginBottom: "20px" }}>
              <InputGroupText>
                <Calendar size={16} />
              </InputGroupText>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select a date"
                customInput={<Input />}
                style={{ fontSize: "10px" }}
                dateFormat="dd-MM-yyyy"
              />
            </InputGroup>
          </Col>
          <Col lg="auto"></Col>
          <Col lg="auto">
            <Label for="endDate">จนถึง</Label>
            <InputGroup style={{ maxWidth: "300px", marginBottom: "20px" }}>
              <InputGroupText>
                <Calendar size={16} />
              </InputGroupText>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select a date"
                customInput={<Input />}
                dateFormat="dd-MM-yyyy"
              />
            </InputGroup>
          </Col>
          <Col lg="auto">
            <Button
              className="btn "
              color="info"
              onClick={fetchOrderFoodfrmDate}
            >
              ค้นหาวันที่
            </Button>
          </Col>
          <Col lg="auto">
            <Button className="btn " color="primary" onClick={handleOpenReport}>
              สร้างเอกสารสั่งอาหาร
            </Button>
          </Col>
        </Row>

        <Col lg="12">
          <Label for="searchInput">ค้นหา</Label>
          <Input
            id="searchInput"
            type="text"
            placeholder="ค้นหา เตียง หรือ ผู้ป่วย ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px", maxWidth: "300px" }}
          />

          <Col lg="12">
            <Label for="wardSelect">เลือก Ward</Label>
            <Select
              id="wardSelect"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "500px",
                }),
                control: (provided) => ({
                  ...provided,
                  minHeight: "40px",
                }),
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={wardOptions}
              onChange={(selected) => setSelectedWards(selected || [])} // อัปเดตค่า ward ที่เลือก
            />
          </Col>
          <br />
          <Card>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>ID.</th>
                    <th>เลขห้อง</th>
                    <th>ชื่อผู้ป่วย</th>
                    <th>สิทธิ</th>
                    <th>วันที่</th>
                    <th>ประเภทอาหาร</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((bed) => (
                    <tr key={bed.id}>
                      <th scope="row">{bed.id}</th>
                      <td>{bed.bedName}</td>
                      <td>{bed.patient}</td>
                      <td>{bed.ucName}</td>
                      <td>{bed.createdDate}</td>
                      <td>{bed.foodName}</td>
                      <td>
                        <Button
                          className="btn"
                          color="danger"
                          onClick={() => handleModify(bed.id)}
                        >
                          ลบ
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <ReactPaginate
          previousLabel={"ก่อนหน้า"}
          nextLabel={"ถัดไป"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />

        {/* ตัวจัดการแสดง Toast */}
        <ToastContainer />

        {/* Modal สำหรับแจ้งเตือน */}

        <React.Fragment>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>สั่งอาหารผู้ป่วยใน</DialogTitle>
            <DialogContent>
              <DialogContentText>
                สั่งอาหาร โดยผู้ใช้จะต้องเลือก ประเภทอาหาร ให้ครบทุกเตียง และกด
                SAVE
              </DialogContentText>
              <FormControl sx={{ mt: 2, minWidth: 120 }}></FormControl>
              <FormGroup>
                <Label for="name">เลือก Ward</Label>
                <Select
                  // defaultValue={wardOptions[0]} // เลือกค่าเริ่มต้นเป็น Ward 1
                  options={wardOptions} // ใช้ตัวเลือก Wards อย่างเดียว
                  onChange={(selected) => setSelectedWardsShow(selected || [])} // อัปเดตค่า ward ที่เลือก
                />

                <Button
                  style={{ marginTop: "10px" }}
                  color="secondary"
                  onClick={handleShowBedActiveFrmWard}
                >
                  แสดงข้อมูล
                </Button>
              </FormGroup>

              <Row>
                <Card>
                  <CardBody>
                    <div className="table-container">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>เลขห้อง</th>
                            <th>ประเภทอาหาร</th>
                            <th>หมายเหตุ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bedActiveData.map((bed) => (
                            <tr key={bed.id}>
                              <th scope="row">{bed.id}</th>
                              <td>{bed.bedName}</td>
                              <td>
                                <Select
                                  options={foodOption} // ใช้ตัวเลือก Wards หรือปรับแต่งตามต้องการ
                                  defaultValue={foodOption[0]} // ค่าเริ่มต้น
                                  // onChange={(selected) => console.log(selected)} // ฟังก์ชันเมื่อเลือก
                                  onChange={(selected) =>
                                    handleSelectChange(selected, bed.id)
                                  }
                                />
                              </td>
                              <td>
                                <Input
                                  type="text"
                                  placeholder="กรอกข้อมูล..."
                                  // onChange={(e) => console.log(e.target.value)} // ฟังก์ชันเมื่อกรอกข้อมูล
                                  onChange={(e) =>
                                    setBedActiveData((prevData) =>
                                      prevData.map((b) =>
                                        b.id === bed.id
                                          ? { ...b, note: e.target.value }
                                          : b
                                      )
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Row>

              {/* </Box> */}
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleSave}>
                SAVE
              </Button>
              <Row></Row>
              <Button color="danger" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>

      {/* <div ref={printRef} className="a5-document-landscape">
        {data.map((item) => (
          <div key={item.id} className="item-row">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default OrderFood;
