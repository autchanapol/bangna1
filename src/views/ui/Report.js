import React, { useState, useRef, CSSProperties, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./css/A4Document.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Modal, FormGroup, Label, Row } from "reactstrap";
const Report = () => {
  const printRef = useRef();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("userId");
    if (storedUsername) {
      setUserId(storedUsername);
    }
  }, []);

  const data = [
    { id: 1, title: "รายการที่ 1", description: "รายละเอียดของรายการที่ 1" },
    { id: 2, title: "รายการที่ 2", description: "รายละเอียดของรายการที่ 2" },
    { id: 3, title: "รายการที่ 3", description: "รายละเอียดของรายการที่ 3" },
    // เพิ่มรายการข้อมูลตามต้องการ
  ];


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

  return (
    <>
      <Row className="align-items-center">
        <Col lg="auto">
          <Button className="btn " color="primary" onClick={handleDownloadPdf}>
            Dowloads
          </Button>
        </Col>
      </Row>
      <div ref={printRef} className="a5-document-landscape">
        {data.map((item) => (
          <div key={item.id} className="item-row">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Report;
