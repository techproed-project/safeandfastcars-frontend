import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/admins/common/sidebar";

const AdminTemplate = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9} className="p-5">{children}</Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
