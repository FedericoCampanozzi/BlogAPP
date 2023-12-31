import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSharedState } from "../../shared/state-context";
import { loginAPI, putUserAPI } from '../../shared/api';
import './registration.css';

const Registration = () => {
    const navigate = useNavigate();
    const { setUserAuth } = useSharedState();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirthday, setDateOfBirthday] = useState(new Date());
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleTextChangeEvent = (event, setMethod) => {
      setMethod(event.target.value);
    };
    const registerFunction = () => {
        if(password === passwordConfirm) {
            putUserAPI( name, 
                        surname, 
                        dateOfBirthday,
                        username,
                        email,
                        password);
            loginAPI(username, password, setUserAuth);
            navigate("/");
        } else {
            console.error("passwords must be equal")
        }
    };

  return (
    <Form className="p-5 form-border">
    <h1>Register in our Blog</h1>
    <Form.Group className="mb-3">
        <div className="py-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
            id="txt_name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => handleTextChangeEvent(event, setName)}
        />
        </div>
        <div className="py-2">
        <Form.Label>Surname</Form.Label>
        <Form.Control
            id="txt_surname"
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(event) => handleTextChangeEvent(event, setSurname)}
        />
        </div>
        <div className="py-2">
        <Form.Label>Date of Birthday</Form.Label>
        <Form.Control
            id="dt_dof"
            type="date"
            placeholder="Date of Birthday"
            value={dateOfBirthday}
            onChange={(event) => handleTextChangeEvent(event, setDateOfBirthday)}
        />
        </div>
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
        <Form.Label>Email</Form.Label>
        <Form.Control
            id="email"
            type="email"
            value={email}
            onChange={(event) => handleTextChangeEvent(event, setEmail)}
        />
        </div>
        <div className="py-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
            id="txt_password"
            type="password"
            value={password}
            onChange={(event) => handleTextChangeEvent(event, setPassword)}
        />
        </div>
        <div className="py-2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
            id="txt_cpassword"
            type="password"
            value={passwordConfirm}
            onChange={(event) => handleTextChangeEvent(event, setPasswordConfirm)}
        />
        </div>
    </Form.Group>
    <Button variant="outline-dark" onClick={registerFunction}>
        Register
    </Button>
    </Form>
  );
};

export default Registration;
