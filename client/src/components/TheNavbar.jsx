import { Button, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import useToast from "../hooks/useToast";

const TheNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    useToast("See you soon!", true);
    dispatch(logout());
    navigate("/signin", { replace: true });
  };
  return (
    <Navbar bg="light" expand="lg" style={{ marginLeft: 280 }}>
      <Container fluid>
        <div className="d-flex align-items-center w-100 justify-content-end">
          <div className="d-flex align-items-center">
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              className="me-4"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default TheNavbar;
