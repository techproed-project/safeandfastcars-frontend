import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import PasswordForm from "./password-form";
import ProfileForm from "./profile-form";

const Profile = () => {
  const user = useSelector(state=> state.auth.user);

  return (
    <Container>
      <Row className="g-5">
        <Col lg={2} className="text-center">
          <FaUserCircle size="120" />
          <h4>{`${user.firstName} ${user.lastName}`}</h4>
          <em>{user.email}</em>
        </Col>
        <Col lg={5}>
          <h3>Update Profile</h3>
          <ProfileForm user={user} />
        </Col>
        <Col lg={5}>
          <h3>Update Password</h3>
          <PasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
