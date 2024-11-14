import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Col, Button, Row } from "reactstrap";
import "./css/A4Document.css";

const Report = () => {
  const printRef = useRef();
  const location = useLocation();
  const { data } = location.state || {};

  const itemsPerPage = 8; // จำนวนข้อมูลต่อหน้า
  const pages = Math.ceil(data.length / itemsPerPage); // คำนวณจำนวนหน้าทั้งหมด

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFontSize(8);

    for (let page = 0; page < pages; page++) {
      const startIdx = page * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const currentPageData = data.slice(startIdx, endIdx); // ดึงข้อมูลตามหน้า

      // Render ข้อมูลในหน้าโดยสร้าง div ชั่วคราว
      const container = document.createElement("div");
      container.style.width = "210mm"; // ความกว้างของหน้า A4
      container.style.height = "297mm"; // ความสูงของหน้า A4
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.justifyContent = "flex-start";
      container.style.alignItems = "center";
      container.style.padding = "10px";

      currentPageData.forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.className = "item-row";
        itemContainer.style.fontSize = "8px";
        itemContainer.style.width = "100%";
        itemContainer.style.marginBottom = "5px";
        itemContainer.style.borderBottom = "1px solid #ddd";
        itemContainer.style.padding = "2px";

        itemContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
          <!-- คอลัมน์ซ้าย -->
          <div style="width: 50%; padding-right: 5px;">
            <h2 style="font-size: 10px; margin: 0;">คนไข้: ${item.patient}</h2>
            <p style="font-size: 8px; margin: 2px 0;">เตียง: ${item.bedName}</p>
            <p style="font-size: 8px; margin: 2px 0;">ประเภท UC: ${
              item.ucName
            }</p>
          </div>
      
          <!-- คอลัมน์ขวา -->
          <div style="width: 50%; padding-left: 5px;">
            <p style="font-size: 8px; margin: 2px 0;">วอร์ด: ${
              item.wardName
            }</p>
            <p style="font-size: 8px; margin: 2px 0;">อาหาร: ${
              item.foodName
            } หมายเหตุ: ${item.remarks || ""}</p>
            <p style="font-size: 8px; margin: 2px 0;">วันที่สร้าง: ${
              item.createdDate
            }</p>
          </div>
        </div>
      `;

        container.appendChild(itemContainer);
      });

      document.body.appendChild(container); // เพิ่ม container ชั่วคราวใน DOM

      const canvas = await html2canvas(container, {
        scale: 2, // ลด scale เพื่อลดความละเอียด
        useCORS: true, // ถ้ามีปัญหา CORS ให้ตั้งค่านี้
        width: container.clientWidth,
        height: container.clientHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      document.body.removeChild(container); // ลบ container ชั่วคราวออก

      if (page < pages - 1) pdf.addPage(); // เพิ่มหน้าใหม่หากยังไม่ถึงหน้าสุดท้าย
    }

    pdf.save("report.pdf");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col lg="auto">
          <Button className="btn" color="primary" onClick={handleDownloadPdf}>
            Download
          </Button>
        </Col>
      </Row>
      <div ref={printRef} className="a5-document-landscape">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="item-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1px 0", // ลดระยะห่างระหว่างแถวให้ติดกันมากขึ้น
                borderBottom: "1px solid #ddd", // เส้นคั่นระหว่างรายการ
              }}
            >
              {/* คอลัมน์ซ้าย */}
              <div style={{ width: "50%", paddingRight: "5px" }}>
                <h2 style={{ fontSize: "10px", margin: 0 }}>
                  คนไข้: {item.patient}
                </h2>
                <p style={{ fontSize: "8px", margin: "2px 0" }}>
                  เตียง: {item.bedName}
                </p>
                <p style={{ fontSize: "8px", margin: "2px 0" }}>
                  ประเภท UC: {item.ucName}
                </p>
              </div>
              {/* คอลัมน์ขวา */}
              <div style={{ width: "50%", paddingLeft: "0px" }}>
                <p style={{ fontSize: "8px", margin: "2px 0" }}>
                  Ward: {item.wardName}
                </p>
                <p style={{ fontSize: "8px", margin: "2px 0" }}>
                  อาหาร: {item.foodName} หมายเหตุ: {item.remarks}
                </p>
                <p style={{ fontSize: "8px", margin: "2px 0" }}>
                  วันที่สร้าง: {item.createdDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่มีข้อมูลที่จะแสดง</p>
        )}
      </div>
    </>
  );
};

export default Report;
