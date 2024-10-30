import React, { useState, useEffect } from "react";
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
  Input,
} from "reactstrap";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getWard,
  GetBeds,
  InsertBeds,
  UpdateBeds,
  UpdateBeds_status,
} from "../../services/services";
// สร้างสไตล์สำหรับการจัดตำแหน่ง Modal ให้แสดงกลางหน้าจอ
const CenteredModal = styled.div`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* ให้ Modal อยู่กลางหน้าจอ */
  }
`;

function Addbed() {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [bedData, setBedData] = useState([]); // สร้าง state สำหรับเก็บข้อมูลที่ได้จาก API
  const [error, setError] = useState(null); // สถานะสำหรับจัดการข้อผิดพลาด
  const [wardData, setWardData] = useState([]); // สร้าง state สำหรับเก็บข้อมูลที่ได้จาก API
  const [wardOptions, setWardOptions] = useState([]);
  const [headStatus, setheadStatus] = useState(0);
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal
  const [formData, setFormData] = useState({
    name: "",
    remarks: "",
    ward_id: 0,
  }); // เก็บข้อมูลฟอร์ม
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [selectedWards, setSelectedWards] = useState([]); // เก็บ ward ที่เลือกจาก Select
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();

  //SELECTOR//
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("userId");
    if (storedUsername) {
      // ถ้าเคยล็อกอินแล้ว ให้นำผู้ใช้ไปที่หน้า starter
      setUserId(storedUsername);
    }
    fetchWardData(); // เรียก fetchWardData เมื่อ component โหลด
    fetchBeds();
  }, []);

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

  // bedData = [
  //   { id: 1, name: "bed 1", description: "รายละเอียด bed 1", ward: "1" },
  //   { id: 2, name: "bed 2", description: "รายละเอียด bed 2", ward: "1" },
  //   { id: 3, name: "bed 3", description: "รายละเอียด bed 3", ward: "1" },
  //   { id: 4, name: "bed 4", description: "รายละเอียด bed 4", ward: "2" },
  //   { id: 5, name: "bed 5", description: "รายละเอียด bed 5", ward: "2" },
  //   { id: 6, name: "bed 6", description: "รายละเอียด bed 6", ward: "3" },
  //   { id: 7, name: "bed 7", description: "รายละเอียด bed 7", ward: "3" },
  //   { id: 8, name: "bed 8", description: "รายละเอียด bed 8", ward: "4" },
  //   // เพิ่มข้อมูลตามต้องการ
  // ];

  // const wardOptions = [
  //   { value: "1", label: "Ward 1" },
  //   { value: "2", label: "Ward 2" },
  //   { value: "3", label: "Ward 3" },
  //   { value: "4", label: "Ward 4" },
  // ];

  const fetchWardData = async () => {
    try {
      const res = await getWard(); // เรียกใช้ API จาก services.js
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      setWardData(res.data); // เก็บข้อมูล response จาก API ลงใน state

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

  const fetchBeds = async () => {
    try {
      const res = await GetBeds();
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      setBedData(res.data);
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  // ฟังก์ชันกรองข้อมูล bedData ตามการค้นหาและการเลือก ward
  const filteredData = bedData.filter((bed) => {
    const matchesSearchTerm = bed.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesWard = selectedWards.length
      ? selectedWards.some((ward) => bed.wardId.toString() === ward.value)
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

  const handleAdd = () => {
    setheadMessage("เพิ่ม Bed");
    setheadStatus(1);
    setFormData({ name: "", remarks: "" }); // เคลียร์ฟอร์มสำหรับการเพิ่ม
    setModal(true);
  };

  const handleModify = (id) => {
    const bed = bedData.find((bed) => bed.id === id); // หา Bed ที่ต้องการแก้ไข
    setId(id);
    setheadStatus(2);
    setheadMessage("แก้ไข Bed เลขที่ " + id);
    setFormData({
      name: bed.name,
      remarks: bed.remarks,
      ward_id: bed.wardId,
    }); // ตั้งค่า formData
    setModal(true);
  };

  const handleSubmit = async () => {
    console.log("Submitted:", formData);
    if (formData.name == null || formData.name.trim() == "") {
      window.alert("Please enter a valid name");
    } else if (formData.ward_id == null || formData.ward_id == 0) {
      window.alert("Please select a valid Ward");
    } else {
      if (headStatus == 1) {
        const res = await InsertBeds(
          formData.name,
          formData.ward_id,
          formData.remarks,
          "1",
          userId
        );
        console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
        if (res && res.data) {
          const { success, message, bedId } = res.data;
          if (success) {
            fetchBeds();
            showSuccessAlert(message + " ID : " + bedId);
          }
        } else {
        }
      } else {
        console.log("Bed Id : ", id);
        console.log("Data to be sent:", {
          id,
          name: formData.name,
          ward_id: formData.ward_id,
          remarks: formData.remarks,
          userId,
        });
        const res = await UpdateBeds(
          id,
          formData.name,
          formData.ward_id,
          formData.remarks,
          userId
        );
        console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
        if (res && res.data) {
          const { success, message, bedId } = res.data;
          if (success) {
            fetchBeds();
            showSuccessAlert(message + " ID : " + bedId);
          }
        }
      }
      toggleModal();
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?");

    if (confirmed) {
      const bed = wardData.find((bed) => bed.id === id); // หา Ward ที่ต้องการแก้ไข
      setId(id);
      console.log("Data to be sent:", {
        id,
        
        userId,
      });
      const res = await UpdateBeds_status(id, 0, userId);
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server

      if (res && res.data) {
        const { success, message, bedId } = res.data;
        if (success) {
          fetchBeds();
          showSuccessAlert(message + " ID : " + bedId);
        }
      }
    } else {
      console.log("ยกเลิกการลบ");
    }
  };

  return (
    <>
      <h1> Bed</h1>
      <Col lg="12">
        <Button className="btn" color="success" onClick={handleAdd}>
          เพิ่มเตียง
        </Button>
      </Col>
      <br />
      <Col lg="12">
        <Label for="searchInput">ค้นหา</Label>
        <Input
          id="searchInput"
          type="text"
          placeholder="ค้นหา เตียง..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "20px", maxWidth: "300px" }}
        />
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
        <br />
        <Card>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ward</th>
                  <th>Name</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((bed) => (
                  <tr key={bed.id}>
                    <th scope="row">{bed.id}</th>
                    <td>{bed.wardName}</td>
                    <td>{bed.name}</td>
                    <td>{bed.remarks}</td>
                    <td>
                      <Button
                        className="btn"
                        color="primary"
                        onClick={() => handleModify(bed.id)}
                      >
                        แก้ไข
                      </Button>{" "}
                      <Button
                        className="btn"
                        color="danger"
                        onClick={() => handleDelete(bed.id)}
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

      {/* การแบ่งหน้า */}
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
      <CenteredModal>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{headMessage}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Ward</Label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={
                  wardOptions.find(
                    (option) =>
                      option.value ===
                      (formData.ward_id ? formData.ward_id.toString() : "")
                  ) || null // ตรวจสอบค่าให้แน่ใจว่าไม่เป็น undefined
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    ward_id: selectedOption ? selectedOption.value : null,
                  })
                }
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                options={wardOptions}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">ชื่อเตียง</Label>
              <Input
                id="name"
                name="name"
                placeholder="ชื่อ Ward"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="remarks">รายละเอียด</Label>
              <Input
                id="remarks"
                name="remarks"
                placeholder="รายละเอียด Ward"
                type="text"
                value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </CenteredModal>
    </>
  );
}

export default Addbed;
