import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect after logout
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{ backgroundColor: "#3A5795" }} // 🔹 Navy Blue
      variant="dark"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}
        >
          🏨 LuxuryStay Hospitality
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className="text-white"
              style={({ isActive }) => ({
                color: isActive ? "yellow" : "white",
              })}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to=""
              className="text-white"
              style={({ isActive }) => ({
                color: isActive ? "yellow" : "white",
              })}
            >
              Reservation
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className="text-white"
              style={({ isActive }) => ({
                color: isActive ? "yellow" : "white",
              })}
            >
              About us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/feedback"
              className="text-white"
              style={({ isActive }) => ({
                color: isActive ? "yellow" : "white",
              })}
            >
              Feedback
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className="text-white"
              style={({ isActive }) => ({
                color: isActive ? "yellow" : "white",
              })}
            >
              Contact
            </Nav.Link>

            {/* ✅ Conditional Auth Links */}
            {user ? (
              <>
                <Nav.Link
                  className="text-warning fw-bold"
                  disabled
                >
                  Hi, {user.name}
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="text-white"
                  style={({ isActive }) => ({
                    color: isActive ? "yellow" : "white",
                  })}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="text-white"
                  style={({ isActive }) => ({
                    color: isActive ? "yellow" : "white",
                  })}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
