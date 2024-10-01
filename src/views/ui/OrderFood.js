import React, { useState, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";

const CenteredModal = styled.div`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* ให้ Modal อยู่กลางหน้าจอ */
  }
`;

const OrderFood = () => {
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [selectedWards, setSelectedWards] = useState([]); // เก็บ ward ที่เลือกจาก Select
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal

  const bedData = [
    {
      id: 1,
      name: "bed 1",
      date: "30-09-2024",
      patient: "hn1233 aaaaaaa aaaaaaa",
      rights: "ประกันสังคม",
      ward: "1",
      food: "อาหารอ่อน",
      remark: "ไม่เอาไก่",
    },
    {
      id: 2,
      name: "bed 2",
      date: "30-09-2024",
      patient: "hn2456 bbbbbbb bbbbbbb",
      rights: "ประกันสังคม",
      ward: "1",
      food: "อาหารปกติ",
      remark: "ไม่เอาไก่",
    },
    {
      id: 3,
      name: "bed 3",
      date: "30-09-2024",
      patient: "hn4644 ccccccc ccccccc",
      rights: "ประกันสังคม",
      description: "",
      ward: "2",
      food: "อาหารปกติ",
      remark: "",
    },
    {
      id: 4,
      name: "bed 4",
      date: "30-09-2024",
      patient: "hn8768 ddddddd ddddddd",
      rights: "ประกันสังคม",
      description: "",
      ward: "2",
      food: "อาหารปกติ",
      remark: "",
    },
    {
      id: 5,
      name: "bed 5",
      date: "30-09-2024",
      patient: "hn0987 fffffff fffffff",
      rights: "ประกันสังคม",
      description: "",
      ward: "3",
      food: "อาหารปกติ",
      remark: "",
    },
    {
      id: 6,
      name: "bed 6",
      date: "30-09-2024",
      patient: "hn1345 ggggggg ggggggg",
      rights: "เงินสด",
      description: "",
      ward: "3",
      food: "อาหารปกติ",
      remark: "",
    },
    {
      id: 7,
      name: "bed 7",
      date: "30-09-2024",
      patient: "hn9870 ttttttt ttttttt",
      rights: "ประกันสุขภาพ",
      description: "",
      ward: "4",
      food: "อาหารปกติ",
      remark: "",
    },
    {
      id: 8,
      name: "bed 8",
      date: "30-09-2024",
      patient: "hn1001 hhhhhhh hhhhhhh",
      rights: "เงินสด",
      description: "",
      ward: "4",
      food: "อาหารปกติ",
      remark: "",
    },
    // เพิ่มข้อมูลตามต้องการ
  ];

  const wardOptions = [
    { value: "1", label: "Ward 1" },
    { value: "2", label: "Ward 2" },
    { value: "3", label: "Ward 3" },
    { value: "4", label: "Ward 4" },
  ];

  const foodData = [
    { id: 1, name: "อาหารปกติ" },
    { id: 2, name: "อาหารอ่อน" },
    { id: 3, name: "อาหารเหลว" },
    { id: 4, name: "งดอาหาร" },

    // เพิ่มข้อมูลตามต้องการ
  ];

  // ฟังก์ชันกรองข้อมูล bedData ตามการค้นหาและการเลือก ward
  const filteredData = bedData.filter((bed) => {
    const matchesSearchTerm =
      bed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.patient.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <>
      <div>
        <h1> Bed Active </h1>
        <Col lg="12">
          <Button
            className="btn "
            color="success"
            style={{ marginRight: "10px" }}
            onClick={handleAdd}
          >
            เพิ่มผู้ป่วย
          </Button>
          <label> </label>
          <Button
            className="btn "
            color="info"
            style={{ border: "10px" }}
            onClick={handlePrint}
          >
            พิมพ์หรือสร้าง PDF
          </Button>
        </Col>
        <br />
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
          {/* Ref ที่ใช้สำหรับพิมพ์ */}

          <Card>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>เลขห้อง</th>
                    <th>ชื่อผู้ป่วย</th>
                    <th>สิทธิ</th>
                    <th>วันที่เข้า</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((bed) => (
                    <tr key={bed.id}>
                      <th scope="row">{bed.id}</th>
                      <td>{bed.name}</td>
                      <td>{bed.patient}</td>
                      <td>{bed.rights}</td>
                      <td>{bed.date}</td>
                      <td>
                        {/* <Button className="btn" color="primary">
                          แก้ไข
                        </Button> */}{" "}
                        <Button className="btn" color="danger">
                          Check Out !
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
      </div>
    </>
  );
};

export default OrderFood;
