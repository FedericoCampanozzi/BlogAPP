import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./header.css";
import { useSharedState } from "../../../../shared/state-context";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useSharedState();
  const logout = () => {
    setUserAuth(null);
  };
  const login = () => {
    const fromAddPost = false;
    navigate("/login", {
      state: {
        fromAddPost
      }
    });
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Blog</Navbar.Brand>
        <Nav className="me-auto">
        {userAuth === undefined || userAuth === null ? (
          <>
            <Button variant="outline-light" onClick={login}>
              Log In
            </Button>
            <Button variant="outline-light" onClick={ () => {navigate("/registration")} }>
              Registration
            </Button>
          </>
        ) : (
          <>
            <span style={{ color: "white" }}>Welcome back { userAuth?.username } </span>
            <Button variant="outline-light" onClick={logout}>
              Log Out
            </Button>
          </>
        )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
