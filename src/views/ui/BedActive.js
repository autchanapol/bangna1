import React, { useState, useRef, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getWard,
  GetBedsWhereWard,
  GetUc,
  GetBedActive,
  InsertBedActive,
  UpdateBedActive,
} from "../../services/services";
const CenteredModal = styled.div`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* ให้ Modal อยู่กลางหน้าจอ */
  }
`;

const BedActive = () => {
  const [formData, setFormData] = useState({
    ward_id: 0,
    bed_id: 0,
    ucId: 0,
    name: "",
    HnName: "",
    remarks: "",
  }); // เก็บข้อมูลฟอร์ม
  const [userId, setUserId] = useState("");
  const [wardData, setWardData] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [bedOptions, setbedOptions] = useState([]);
  const [optionsData, setoptionsData] = useState([]);
  const [bedActiveData, setBedActiveData] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]); // เก็บ ward ที่เลือกจาก Select
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคีย์เวิร์ดที่ค้นหา
  const [error, setError] = useState(null); // สถานะสำหรับจัดการข้อผิดพลาด
  const [loading, setLoading] = useState(true); // สถานะสำหรับการโหลดข้อมูล
  const [currentPage, setCurrentPage] = useState(0); // เก็บหน้าปัจจุบัน
  const itemsPerPage = 20; // จำนวนรายการต่อหน้า
  const animatedComponents = makeAnimated();
  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [headMessage, setheadMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal

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
      fetchWardData();
      fetchUcData();
      fetchBedActiveData();
    }
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

  const fetchWardData = async () => {
    try {
      const res = await getWard(); // เรียกใช้ API จาก services.js
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      // setWardData(res.data); // เก็บข้อมูล response จาก API ลงใน state

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

  const fetchUcData = async () => {
    try {
      const res = await GetUc(); // เรียกใช้ API จาก services.js
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      // setWardData(res.data); // เก็บข้อมูล response จาก API ลงใน state

      // แปลงข้อมูล JSON จาก API เป็นโครงสร้างที่ต้องการใน wardOptions
      const options = res.data.map((uc) => ({
        value: uc.id,
        label: uc.name,
      }));

      setoptionsData(options); // อัปเดต wardOptions ด้วยข้อมูลที่แปลงแล้ว

      // ตั้งค่า ucId ให้เท่ากับค่าแรกของ optionsData ทันทีที่ข้อมูลพร้อม
      if (options.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ucId: options[0].value,
        }));
      }
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const fetchBedActiveData = async () => {
    try {
      const res = await GetBedActive(); // เรียกใช้ API จาก services.js
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      setBedActiveData(res.data); // เก็บข้อมูล response จาก API ลงใน state
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const fetchBedData = async (wardId) => {
    try {
      const res = await GetBedsWhereWard(wardId); // เรียกใช้ API จาก services.js
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      // setWardData(res.data); // เก็บข้อมูล response จาก API ลงใน state

      // แปลงข้อมูล JSON จาก API เป็นโครงสร้างที่ต้องการใน wardOptions
      const options = res.data.map((bed) => ({
        value: bed.id.toString(),
        label: bed.name,
      }));

      setbedOptions(options); // อัปเดต wardOptions ด้วยข้อมูลที่แปลงแล้ว
    } catch (error) {
      setError(error); // ถ้ามีข้อผิดพลาดให้เก็บไว้ใน error state
    } finally {
      setLoading(false); // หยุดการโหลดข้อมูล
    }
  };

  const handleSubmit = async () => {
    console.log("Submitted:", formData);
    const jsonData = {
      BedId: formData.bed_id,
      UdId: formData.ucId,
      HnName: formData.HnName,
      Remarks: formData.remarks,
      Status: 1,
      CreatedBy: userId,
    };

    // แปลงเป็น JSON string แล้วแสดงใน console
    console.log(JSON.stringify(jsonData, null, 2));

    if (formData.bed_id == 0) {
      showWarningAlert("Please Select Bed");
    } else if (formData.HnName.trim() == "") {
      showWarningAlert("Please Enter HN");
    } else {
      const res = await InsertBedActive(
        formData.bed_id,
        formData.ucId,
        formData.HnName,
        formData.remarks,
        1,
        userId
      );
      console.log("api res", res.data); // res.data คือข้อมูลที่ได้จาก server
      if (res && res.data) {
        const { success, message, bedActiveId } = res.data;
        if (success) {
          fetchBedActiveData();
          showSuccessAlert(message + " ID : " + bedActiveId);
          setModal(false);
        }
      } else {
      }
    }
  };

  const handleModify = async (id) => {
    console.log("BedActiveId : ", id);
    const confirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการ Check out ?");
    if (confirmed) {
      const res = await UpdateBedActive(id, 0, userId);
      console.log("api UpdateBedActive", res.data); // res.data คือข้อมูลที่ได้จาก server
      if (res && res.data) {
        const { success, message, bedActiveId } = res.data;
        if (success) {
          fetchBedActiveData();
          showSuccessAlert(message + " ID : " + bedActiveId);
        }
      }
    } else {
      console.log("ยกเลิกการลบ");
    }
  };

  // const bedData = [
  //   {
  //     id: 1,
  //     name: "bed 1",
  //     date: "30-09-2024",
  //     patient: "hn1233 aaaaaaa aaaaaaa",
  //     rights: "ประกันสังคม",
  //     description: "",
  //     ward: "1",
  //   },
  //   {
  //     id: 2,
  //     name: "bed 2",
  //     date: "30-09-2024",
  //     patient: "hn2456 bbbbbbb bbbbbbb",
  //     rights: "ประกันสังคม",
  //     description: "",
  //     ward: "1",
  //   },
  //   {
  //     id: 3,
  //     name: "bed 3",
  //     date: "30-09-2024",
  //     patient: "hn4644 ccccccc ccccccc",
  //     rights: "ประกันสังคม",
  //     description: "",
  //     ward: "2",
  //   },
  //   {
  //     id: 4,
  //     name: "bed 4",
  //     date: "30-09-2024",
  //     patient: "hn8768 ddddddd ddddddd",
  //     rights: "ประกันสังคม",
  //     description: "",
  //     ward: "2",
  //   },
  //   {
  //     id: 5,
  //     name: "bed 5",
  //     date: "30-09-2024",
  //     patient: "hn0987 fffffff fffffff",
  //     rights: "ประกันสังคม",
  //     description: "",
  //     ward: "3",
  //   },
  //   {
  //     id: 6,
  //     name: "bed 6",
  //     date: "30-09-2024",
  //     patient: "hn1345 ggggggg ggggggg",
  //     rights: "เงินสด",
  //     description: "",
  //     ward: "3",
  //   },
  //   {
  //     id: 7,
  //     name: "bed 7",
  //     date: "30-09-2024",
  //     patient: "hn9870 ttttttt ttttttt",
  //     rights: "ประกันสุขภาพ",
  //     description: "",
  //     ward: "4",
  //   },
  //   {
  //     id: 8,
  //     name: "bed 8",
  //     date: "30-09-2024",
  //     patient: "hn1001 hhhhhhh hhhhhhh",
  //     rights: "เงินสด",
  //     description: "",
  //     ward: "4",
  //   },
  //   // เพิ่มข้อมูลตามต้องการ
  // ];

  // wardOptions = [
  //   { value: "1", label: "Ward 1" },
  //   { value: "2", label: "Ward 2" },
  //   { value: "3", label: "Ward 3" },
  //   { value: "4", label: "Ward 4" },
  // ];

  const patientData = [
    { id: "HN001", name: "AAA AAAA" },
    { id: "HN002", name: "BBB BBB" },
    { id: "HN003", name: "CCC CCC" },
    { id: "HN004", name: "DDD DDD" },

    // เพิ่มข้อมูลตามต้องการ
  ];

  const colourOptions = [
    { value: "1", label: "Ward 1" },
    { value: "2", label: "Ward 2" },
    { value: "3", label: "Ward 3" },
  ];

  // const optionsData = [
  //   { id: 1, label: "ประกันสังคม" },
  //   { id: 2, label: "ประกันสุขภาพ" },
  //   { id: 3, label: "บัตรทอง" },
  //   { id: 4, label: "เงินสด" },
  //   { id: 5, label: "ฟรี" },
  // ];

  // ฟังก์ชันกรองข้อมูล bedData ตามการค้นหาและการเลือก ward
  const filteredData = bedActiveData.filter((bed) => {
    const matchesSearchTerm =
      bed.bedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    setheadMessage("เพิ่มผู้ป่วยเข้าเตียง");

    setFormData({
      ward_id: 0,
      bed_id: 0,
      // ucId: 0,
      name: "",
      HnName: "",
      remarks: "",
    }); // เคลียร์ฟอร์มสำหรับการเพิ่ม
    setModal(true);
  };

  // ฟังก์ชันค้นหาผู้ป่วย
  const handleSearch = () => {
    const foundPatient = patientData.find(
      (patient) =>
        patient.id.toLowerCase() === formData.patient.toLowerCase() ||
        patient.name.toLowerCase() === formData.patient.toLowerCase()
    );

    if (foundPatient) {
      // ถ้าพบข้อมูลผู้ป่วย
      alert(`Found: ${foundPatient.name} (${foundPatient.id})`);
      setFormData({ patient: foundPatient.name });
    } else {
      alert("ไม่พบผู้ป่วย");
    }
  };

  // ฟังก์ชันจัดการเมื่อกด Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrint = () => {
    // content: () => componentRef.current // ระบุส่วนที่ต้องการพิมพ์
    window.print(); // ฟังก์ชันสำหรับพิมพ์หน้า
  };

  // ฟังก์ชันสำหรับการพิมพ์
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

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
          {/* <Button
            className="btn "
            color="secondary"
            style={{ marginRight: "10px" }}
          >
            IMPORT EXCEL
          </Button> */}
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
                    <th>Ward No.</th>
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
                      <td>{bed.wardName}</td>
                      <td>{bed.bedName}</td>
                      <td>{bed.name}</td>
                      <td>{bed.udName}</td>
                      <td>{bed.createdDate}</td>
                      <td>
                        {/* <Button className="btn" color="primary">
                          แก้ไข
                        </Button> */}{" "}
                        <Button
                          className="btn"
                          color="danger"
                          onClick={() => handleModify(bed.id)}
                        >
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

      {/* ตัวจัดการแสดง Toast */}
      <ToastContainer />

      {/* Modal สำหรับแจ้งเตือน */}
      <CenteredModal>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{headMessage}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="ward">เลือก Ward</Label>
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
                onChange={(selectedOption) => {
                  // อัปเดต formData
                  setFormData({
                    ...formData,
                    ward_id: selectedOption
                      ? parseInt(selectedOption.value, 10)
                      : null,
                  });

                  // เรียกฟังก์ชัน fetchBedData ถ้ามี selectedOption
                  if (selectedOption) {
                    fetchBedData(parseInt(selectedOption.value, 10)); // แปลง selectedOption.value เป็น int และเรียกฟังก์ชัน
                  }
                }}
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
              <Label for="name">เลขเตียง</Label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={
                  bedOptions.find(
                    (option) =>
                      option.value ===
                      (formData.bed_id ? formData.bed_id.toString() : "")
                  ) || null // ตรวจสอบค่าให้แน่ใจว่าไม่เป็น undefined
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    bed_id: selectedOption
                      ? parseInt(selectedOption.value, 10)
                      : null,
                  })
                }
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                options={bedOptions}
              />
              {/* <Input
                id="name"
                name="name"
                placeholder="เลขเตียง"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              /> */}
            </FormGroup>
            <FormGroup>
              <Label for="HnName">คนไข้ / ผู้ป่วย </Label>
              <Input
                id="HnName"
                name="HnName"
                placeholder="คนไข้ / ผู้ป่วย"
                type="text"
                value={formData.HnName}
                onChange={(e) =>
                  setFormData({ ...formData, HnName: e.target.value })
                }
                // onKeyPress={handleKeyPress} // ฟังก์ชันสำหรับจับการกด Enter
              />
            </FormGroup>
            <FormGroup>
              <Label for="ucId">สิทธิการรักษา</Label>
              <Input
                id="ucId"
                name="ucId"
                type="select"
                value={formData.ucId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ucId: parseInt(e.target.value, 10), // แปลงเป็น int
                  })
                }
              >
                {optionsData.map((option) => (
                  <option key={option.value} value={option.value}>
                    {" "}
                    {/* ใช้ option.value ที่เป็น int */}
                    {option.label}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="remarks">หมายเหตุ</Label>
              <Input
                id="remarks"
                name="remarks"
                placeholder="หมายเหตุ"
                type="textarea"
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
};

export default BedActive;
