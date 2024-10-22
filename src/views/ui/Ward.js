import React, { useState , useEffect } from "react";
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
import { getWard } from "../../services/services";

// สร้างสไตล์สำหรับการจัดตำแหน่ง Modal ให้แสดงกลางหน้าจอ
const CenteredModal = styled.div`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* ให้ Modal อยู่กลางหน้าจอ */
  }
`;


const Ward = () => {
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const [wardData, setWardData] = useState([]); // สร้าง state สำหรับเก็บข้อมูลที่ได้จาก API
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [error, setError] = useState(null); // สถานะสำหรับจัดการข้อผิดพลาด
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal
  const [formData, setFormData] = useState({ name: "", description: "" }); // เก็บข้อมูลฟอร์ม


  useEffect(() => {
    fetchWardData(); // เรียกฟังก์ชันเพื่อดึงข้อมูล

  }, []); 

  const handleAdd = () => {
    setheadMessage("เพิ่ม Ward");
    setFormData({ name: "", description: "" }); // เคลียร์ฟอร์มสำหรับการเพิ่ม
    setModal(true);
  };

  const handleModify = (id) => {
    const ward = wardData.find((ward) => ward.id === id); // หา Ward ที่ต้องการแก้ไข
    setheadMessage("แก้ไข Ward เลขที่ " + id);
    setFormData({ name: ward.wardName, description: ward.remarks }); // ตั้งค่า formData
    setModal(true);
  };

  
    const fetchWardData = async () => {
      try {
        const res = await getWard(); // เรียกใช้ API จาก services.js
        console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
        setWardData(res.data); // เก็บข้อมูล response จาก API ลงใน state
      } catch (error) {
        setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
      } finally {
        setLoading(false); // หยุดการโหลดข้อมูล
      }
    }
  

  //  wardData = [
  //   { id: 1, name: "Ward 1", description: "รายละเอียด Ward 1" },
  //   { id: 2, name: "Ward 2", description: "รายละเอียด Ward 2" },
  //   { id: 3, name: "Ward 3", description: "รายละเอียด Ward 3" },
  //   { id: 4, name: "Ward 4", description: "รายละเอียด Ward 4" },
  //   { id: 5, name: "Ward 5", description: "รายละเอียด Ward 5" },
  //   { id: 6, name: "Ward 6", description: "รายละเอียด Ward 6" },
  //   { id: 7, name: "Ward 7", description: "รายละเอียด Ward 7" },
  //   { id: 8, name: "Ward 8", description: "รายละเอียด Ward 8" },
  //   // เพิ่มข้อมูลตามต้องการ
  // ];

  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า

  // ฟังก์ชันที่ใช้กรองข้อมูลจากการค้นหา
  const filteredData = wardData.filter((ward) =>
    ward.wardName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // คำนวณข้อมูลสำหรับการแบ่งหน้า
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage); // ใช้ข้อมูลหลังการแบ่งหน้า

  // ฟังก์ชันสำหรับการเปลี่ยนหน้า
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h1>Ward</h1>
      {/* ช่องค้นหาข้อมูล */}
   

      <Col lg="12">
        <Button className="btn" color="success" onClick={handleAdd}>
          เพิ่ม Ward
        </Button>
        
      </Col>
      <br />
      <Col lg="12">
      <Input
        type="text"
        placeholder="ค้นหา Ward..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: "300px" }}
      />
        <Card>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((ward) => (
                  <tr key={ward.id}>
                    <th scope="row">{ward.id}</th>
                    <td>{ward.wardName}</td>
                    <td>{ward.remarks}</td>
                    <td>
                      <Button
                        className="btn"
                        color="primary"
                        onClick={() => handleModify(ward.id)}
                      >
                        แก้ไข
                      </Button>{" "}
                      <Button className="btn" color="danger">
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

      {/* Modal สำหรับแจ้งเตือน */}
      <CenteredModal>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{headMessage}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">ชื่อ Ward</Label>
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
              <Label for="description">รายละเอียด</Label>
              <Input
                id="description"
                name="description"
                placeholder="รายละเอียด Ward"
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </CenteredModal>
    </div>
  );
};

export default Ward;
