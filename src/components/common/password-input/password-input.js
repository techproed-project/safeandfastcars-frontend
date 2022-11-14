import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "./password-input.scss";

const PasswordInput = (props) => {
  const [type, setType] = useState("password");
  return (
    <InputGroup className="password-input">
      <Form.Control placeholder="Type password" type={type} {...props} />
      <InputGroup.Text>
        {type === "password" ? (
          <BsEye onClick={() => setType("text")} />
        ) : (
          <BsEyeSlash onClick={() => setType("password")} />
        )}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
