import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav, NavItem, NavbarBrand, Container} from "react-bootstrap";

export const Heading = () => {
  return (
    <Navbar className="bg-dark">
      <Container>
        <NavbarBrand className="text-light">To-do List</NavbarBrand>
        <Nav>
          <NavItem>
            <Link className="btn btn-primary" to="/add">Add List</Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}
