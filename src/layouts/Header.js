import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user1.jpg";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal); // เปิด/ปิด Modal

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const confirmLogout = () => {
    handleLogout(); // เมื่อยืนยันการ logout
    toggleModal(); // ปิด modal
  };

  const handleLogout = () => {
    const confirmed = window.confirm("แน่ใจหรือไม่ว่าคุณต้องการออกจากระบบ?");
    if (confirmed) {
      // ล้างข้อมูลการล็อกอินจาก localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("lastRoute");
  
      // ตั้งค่า isAuthenticated ให้เป็น false (ถ้ามีการใช้ใน App.js)
      // setIsAuthenticated(false);
  
      // นำทางไปยังหน้า Login
      navigate("/logout", { replace: true });
    }
  };
  

  const handleMyAccout = () => {
    navigate("/myAccout");
  };

  return (
    <>
      <Navbar color="primary" dark expand="md" className="fix-header">
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-3">
            <Logo />
          </div>
          <NavbarBrand href="/">
            <LogoWhite className=" d-lg-none" />
          </NavbarBrand>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>

          </Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              {/* <DropdownItem onClick={handleMyAccout}>My Account</DropdownItem> */}
              {/* <DropdownItem>Edit Profile</DropdownItem> */}
              <DropdownItem divider />
              {/* <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem> */}
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>ยืนยันการออกจากระบบ</ModalHeader>
        <ModalBody>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmLogout}>
            ยืนยัน
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Header;
