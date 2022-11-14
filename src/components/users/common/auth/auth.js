import React, { useState } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo-white.png";
import { settings } from "../../../../utils/settings";
import { RiCloseCircleLine, RiHome7Line } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm } from "./login-form";
import RegisterForm from "./register-form";
import "./auth.scss";
import { useEffect } from "react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [defaultTab, setDefaultTab] = useState("login");
  const navigate = useNavigate();


  useEffect(()=> {
    const requestedTab = searchParams.get("type");
    setDefaultTab(requestedTab);
  }, [searchParams] )


  return (
    <Container fluid className="auth">
      <Row>
        <Col lg={7}>
          <img src={logo} alt={settings.siteName} />
          <div className="toolbar">
            <RiCloseCircleLine onClick={() => navigate(-1)} />
            <RiHome7Line onClick={() => navigate("/")} />
          </div>
        </Col>
        <Col lg={5}>
          <Card>
            <Card.Body>
              <Tabs activeKey={defaultTab} onSelect={(k) => setDefaultTab(k)}>
                <Tab eventKey="login" title="Login">
                  <LoginForm />
                </Tab>
                <Tab eventKey="register" title="Register">
                  <RegisterForm setDefaultTab={setDefaultTab}/>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
