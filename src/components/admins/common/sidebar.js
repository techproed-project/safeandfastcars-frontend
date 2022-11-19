import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import logo from "../../../assets/img/logo/logo-white.png";
import { logout } from "../../../store/slices/auth-slice";
import { question } from "../../../utils/functions/swal";
import "./sidebar.scss";
import {
    RiHome3Line,
    RiUser3Line,
    RiCarLine,
    RiFileList3Line,
    RiLogoutCircleRLine,
    RiDashboardLine,
    RiMessage3Line
  } from "react-icons/ri";
  import "./sidebar.scss";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        secureLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="admin-sidebar">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          <img src={logo} alt="" className="img-fluid"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
                <RiDashboardLine/> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
                <RiUser3Line/> Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/vehicles">
                <RiCarLine/> Vehicles
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations">
                <RiFileList3Line/> Reservations
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/messages">
                <RiMessage3Line/> Messages
            </Nav.Link>
            <Nav.Link as={Link} to="/">
                <RiHome3Line/> Web Site
            </Nav.Link>
                <Nav.Link onClick={handleLogout}><RiLogoutCircleRLine/> Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
