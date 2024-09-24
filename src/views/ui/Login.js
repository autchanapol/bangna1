import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Login = ({ onLogin }) => {


  const toggleModal = () => setModal(!modal); // ฟังก์ชันเปิด/ปิด Modal
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [modal, setModal] = useState(false); // สำหรับควบคุมการเปิด/ปิด Modal
  const [errorMessage, setErrorMessage] = useState(""); // ข้อความแจ้งเตือนใน Modal
  const navigate = useNavigate();


  useEffect(() => {
    // ตรวจสอบว่าเคยล็อกอินหรือไม่
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      // ถ้าเคยล็อกอินแล้ว ให้นำผู้ใช้ไปที่หน้า starter
      navigate("/starter", { replace: true });
    }
  }, [navigate]); // ลำดับการใช้งาน navigate ถูกต้องแล้ว

  const handleLogin = () => {
    const { username, password } = state;

    if (!username) {
      // ตรวจสอบว่าฟิลด์ username ว่างหรือไม่
      setErrorMessage("Please fill in username.");
      setModal(true);
    } else if (!password) {
      // ตรวจสอบว่าฟิลด์ password ว่างหรือไม่
      setErrorMessage("Please fill in password.");
      setModal(true);
    } else {

      // สมมุติว่าการตรวจสอบข้อมูลการล็อกอินสำเร็จ
      localStorage.setItem("username", username); // เก็บ username ไว้ใน localStorage

      onLogin(); // เรียกฟังก์ชันนี้เพื่อเปลี่ยนสถานะล็อกอินใน App.js
      navigate("/starter", { replace: true }); // เปลี่ยนเส้นทางไปหน้า Starter และใช้ replace: true เพื่อไม่ให้ย้อนกลับไปหน้า Login ได้
    }
  };

  return (
    <Container
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <Row>
        <Col>
          <Card
            style={{
              width: "400px",
            }}
          >
            <CardTitle
              style={{
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
              }}
              tag="h3"
              className="border-bottom p-3 mb-0"
            >
              {/* <i className="bi bi-bell me-2"> </i> */}
              Sign into your account
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="Username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Input your username"
                    value={state.username}
                    onChange={(e) =>
                      setState({ ...state, username: e.target.value })
                    }
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    id="Password"
                    name="password"
                    placeholder="Input your password"
                    value={state.password}
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                    type="password"
                  />
                </FormGroup>
                <div style={{ paddingTop: "10px" }}></div>
                <Button
                  className="btn"
                  color="primary"
                  size="lg"
                  block
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal สำหรับแจ้งเตือน */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Alert</ModalHeader>
        <ModalBody>{errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Login;
