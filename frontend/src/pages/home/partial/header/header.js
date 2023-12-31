import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Blog</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="login" className="to-left">
            Log In
          </Nav.Link>
          <Nav.Link href="registration" className="to-left">
            Registration
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
