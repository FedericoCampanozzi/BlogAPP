import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./header.css";
import { useSharedState } from "../../../../shared/state-context";
import { Button } from "react-bootstrap";

const Header = () => {
  const { userAuth, setUserAuth } = useSharedState();
  const logout = () => {
    setUserAuth(null);
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Blog</Navbar.Brand>
        <Nav className="me-auto">
        {userAuth === undefined || userAuth === null ? (
          <>
            <Nav.Link href="login" className="to-left">
              Log In
            </Nav.Link>
            <Nav.Link href="registration" className="to-left">
              Registration
            </Nav.Link>
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
