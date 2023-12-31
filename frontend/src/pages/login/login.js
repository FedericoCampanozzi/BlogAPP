import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSharedState } from "../../shared/state-context";
import { loginAPI } from "../../shared/api";

const Login = () => {
  const navigate = useNavigate();
  const { setUserAuth } = useSharedState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginFunction = () => {
    loginAPI(username, password, setUserAuth);
    navigate("/");
  };
  const handleTextChangeEvent = (event, setMethod) => {
    setMethod(event.target.value);
  };
  return (
    <div>
      <Form className="p-5 form-border">
        <h1>Log In</h1>
        <Form.Group className="mb-3">
          <div className="py-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="txt_username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => handleTextChangeEvent(event, setUsername)}
            />
          </div>
          <div className="py-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="txt_password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => handleTextChangeEvent(event, setPassword)}
            />
          </div>
        </Form.Group>
        <Button variant="outline-dark" onClick={loginFunction}>
          <FontAwesomeIcon icon={faRightToBracket} /> Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
