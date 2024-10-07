import React, { useState, useRef, CSSProperties } from "react";
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
  Row,
} from "reactstrap";

import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useReactToPrint } from "react-to-print";
import AsyncSelect from "react-select/async";
import "./css/Modal.css";

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
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import สไตล์

const OrderFood = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [formData, setFormData] = useState({ name: "", description: "" }); // เก็บข้อมูลฟอร์ม
  const [selectedWards, setSelectedWards] = useState([]); // เก็บ ward ที่เลือกจาก Select
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {

    const confirmed = window.confirm("ต้องการบันทึกข้อมูล การสั่งอาหาร");
    if (confirmed) {
      setOpen(false)
    }
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
    
  };

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
      id: 1,
      name: "bed 1",
      date: "30-09-2024",
      patient: "hn1233 aaaaaaa aaaaaaa",
      rights: "ประกันสังคม",
      ward: "1",
      food: "อาหารอ่อน",
      remark: "ไม่เอาไก่",
    },
    // เพิ่มข้อมูลตามต้องการ
  ];

  const wardOptions = [
    { value: "1", label: "Ward 1" },
    { value: "2", label: "Ward 2" },
    { value: "3", label: "Ward 3" },
    { value: "4", label: "Ward 4" },
  ];

  const foodOption = [
    { value: 1, label: "อาหารปกติ" },
    { value: 2, label: "อาหารอ่อน" },
    { value: 3, label: "อาหารเหลว" },
    { value: 4, label: "งดอาหาร" },
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

  const handleAdd = () => {
    setheadMessage("เพิ่ม Bed");
    setFormData({ name: "", description: "" }); // เคลียร์ฟอร์มสำหรับการเพิ่ม
    setModal(true);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนหน้า
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
          <Card>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>No.</th>
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
                      <td>{bed.name}</td>
                      <td>{bed.patient}</td>
                      <td>{bed.rights}</td>
                      <td>{bed.date}</td>
                      <td>{bed.food}</td>
                      <td>
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
                สั่งอาหาร โดยผู้ใช้จะต้องเลือก ประเภทอาหาร ให้ครบทุกเตียง และกด SAVE
              </DialogContentText>
              <FormControl sx={{ mt: 2, minWidth: 120 }}></FormControl>
              <FormGroup>
                <Label for="name">เลือก Ward</Label>
                <Select
                  defaultValue={wardOptions[0]} // เลือกค่าเริ่มต้นเป็น Ward 1
                  options={wardOptions} // ใช้ตัวเลือก Wards อย่างเดียว
                />

                <Button style={{ marginTop: "10px" }} color="secondary">
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
                          {currentPageData.map((bed) => (
                            <tr key={bed.id}>
                              <th scope="row">{bed.id}</th>
                              <td>{bed.name}</td>
                              <td>
                                <Select
                                  options={foodOption} // ใช้ตัวเลือก Wards หรือปรับแต่งตามต้องการ
                                  defaultValue={foodOption[0]} // ค่าเริ่มต้น
                                  onChange={(selected) => console.log(selected)} // ฟังก์ชันเมื่อเลือก
                                />
                              </td>
                              <td>
                                <Input
                                  type="text"
                                  placeholder="กรอกข้อมูล..."
                                  onChange={(e) => console.log(e.target.value)} // ฟังก์ชันเมื่อกรอกข้อมูล
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
              <Button color="primary" onClick={handleSave}>SAVE</Button>
              <Row></Row>
              <Button color="danger" onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  );
};

export default OrderFood;
