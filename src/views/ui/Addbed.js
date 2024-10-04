import React, { useState } from "react";
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
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal
  const [formData, setFormData] = useState({ name: "", description: "" }); // เก็บข้อมูลฟอร์ม
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [selectedWards, setSelectedWards] = useState([]); // เก็บ ward ที่เลือกจาก Select
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();

  const bedData = [
    { id: 1, name: "bed 1", description: "รายละเอียด bed 1", ward: "1" },
    { id: 2, name: "bed 2", description: "รายละเอียด bed 2", ward: "1" },
    { id: 3, name: "bed 3", description: "รายละเอียด bed 3", ward: "1" },
    { id: 4, name: "bed 4", description: "รายละเอียด bed 4", ward: "2" },
    { id: 5, name: "bed 5", description: "รายละเอียด bed 5", ward: "2" },
    { id: 6, name: "bed 6", description: "รายละเอียด bed 6", ward: "3" },
    { id: 7, name: "bed 7", description: "รายละเอียด bed 7", ward: "3" },
    { id: 8, name: "bed 8", description: "รายละเอียด bed 8", ward: "4" },
    // เพิ่มข้อมูลตามต้องการ
  ];

  const wardOptions = [
    { value: "1", label: "Ward 1" },
    { value: "2", label: "Ward 2" },
    { value: "3", label: "Ward 3" },
    { value: "4", label: "Ward 4" },
  ];

  // ฟังก์ชันกรองข้อมูล bedData ตามการค้นหาและการเลือก ward
  const filteredData = bedData.filter((bed) => {
    const matchesSearchTerm = bed.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesWard = selectedWards.length
      ? selectedWards.some((ward) => bed.ward === ward.value)
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
    setFormData({ name: "", description: "" }); // เคลียร์ฟอร์มสำหรับการเพิ่ม
    setModal(true);
  };

  const handleModify = (id) => {
    const bed = bedData.find((bed) => bed.id === id); // หา Bed ที่ต้องการแก้ไข
    setheadMessage("แก้ไข Bed เลขที่ " + id);
    setFormData({ name: bed.name, description: bed.description }); // ตั้งค่า formData
    setModal(true);
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((bed) => (
                  <tr key={bed.id}>
                    <th scope="row">{bed.id}</th>
                    <td>{bed.name}</td>
                    <td>{bed.description}</td>
                    <td>
                      <Button
                        className="btn"
                        color="primary"
                        onClick={() => handleModify(bed.id)}
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
    </>
  );
}

export default Addbed;
