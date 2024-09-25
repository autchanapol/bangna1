import React from "react";
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  Button,
  ButtonGroup,
} from "reactstrap";

function Addbed() {
  return (
    <>
      <h1> Addbed</h1>
      <Col lg="12">
      <Button className="btn" color="success">
        เพิ่มเตียง
      </Button>
      </Col>
      <br/>
      <Col lg="12">
      <Card>
      <CardBody className="">
      <Table bordered>
        <thead>
          <tr>
            <th>เลขเตียง</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>สิทธิ</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>UC</td>
            <td>
              {" "}
              <Button className="btn" color="primary">
                แก้ไข
              </Button>
            </td>
            <td>
              {" "}
              <Button className="btn" color="danger">
                ลบ
              </Button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>UC</td>
            <td>
              {" "}
              <Button className="btn" color="primary">
                แก้ไข
              </Button>
            </td>
            <td>
              {" "}
              <Button className="btn" color="danger">
                ลบ
              </Button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>UC</td>
            <td>
              {" "}
              <Button className="btn" color="primary">
                แก้ไข
              </Button>
            </td>
            <td>
              {" "}
              <Button className="btn" color="danger">
                ลบ
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      </CardBody>
      </Card>
      </Col>
    </>
  );
}

export default Addbed;
