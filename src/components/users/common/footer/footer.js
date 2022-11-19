import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.scss";
import logo from "../../../../assets/img/logo/logo-white.png";
import { settings } from "../../../../utils/settings";
import { Link } from "react-router-dom";
import ContactInfo from "../../contact/contact-info/contact-info";

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Container>
        <Row className="g-5">
          <Col md={6} lg={12} xl={3}>
            <Link to="/" title={settings.siteName}>
              <img src={logo} alt={settings.siteName} className="img-fluid"/>
            </Link>
            <p>
              Check out our new fleet of cars, latest offers, our advantages and
              free extras online. Choose from one of our new car models.
            </p>
          </Col>
          <Col md={6} lg={4} xl={3}>
              <h2>Quick Links</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/vehicles">Vehicles</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
          </Col>
          <Col md={6} lg={4} xl={3}>
            <h2>Working Hours</h2>
            <ul>
              <li>Mon-Fri: 09:00AM - 09:00PM</li>
              <li>Saturday: 09:00AM - 07:00PM</li>
              <li>Sunday: 09:00AM - 05:00PM</li>
            </ul>
          </Col>
          <Col md={6} lg={4} xl={3}>
            <h2>Contact Us</h2>
            <ContactInfo/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
