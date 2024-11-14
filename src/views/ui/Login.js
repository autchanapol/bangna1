import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/services";
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
  const [state, setState] = useState({ username: "", password: "" });
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { username, password } = state;
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      setModal(true);
      return;
    }

    try {
      const res = await loginUser(username, password);
      if (res && res.data) {
        console.log(res.data);
        const { success, name, userId, message } = res.data;
        if (success) {
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          localStorage.removeItem("lastRoute");

          localStorage.setItem("username", name);
          localStorage.setItem("userId", userId);
          onLogin(); // เรียกฟังก์ชันนี้เพื่ออัปเดต isAuthenticated ใน App.js
          navigate("/orderFood", { replace: true }); // เปลี่ยนเส้นทางไปหน้า Starter
        } else {
          setErrorMessage(message);
          setModal(true);
        }
      } else {
        setErrorMessage("No response from server.");
        setModal(true);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setModal(true);
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
          <Card style={{ width: "400px" }}>
            <CardTitle
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
              tag="h3"
              className="border-bottom p-3 mb-0"
            >
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
                <Button color="primary" size="lg" block onClick={handleLogin}>
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Alert</ModalHeader>
        <ModalBody>{errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(!modal)}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Login;
