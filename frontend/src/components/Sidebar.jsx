import { Nav } from "react-bootstrap";
import { FaBed, FaCalendarCheck, FaUsers, FaBroom, FaTools, FaSignOutAlt, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#343a40",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "1rem",
      }}
    >
      <h4 className="text-center mb-4">Hotel Management System</h4>
      <Nav className="flex-column">
        <Nav.Link onClick={() => navigate("/reservations")} className="text-light">
          <FaCalendarCheck className="me-2" /> Reservations
        </Nav.Link>

        {user?.role === "admin" && (
          <>
          <Nav.Link onClick={() => navigate("/rooms")} className="text-light">
          <FaBed className="me-2" /> Rooms
        </Nav.Link>
          <Nav.Link onClick={() => navigate("/users")} className="text-light">
            <FaUsers className="me-2" /> Users
          </Nav.Link>
        </>
        )}

        {(user?.role === "admin" || user?.role === "receptionist") && (
          <>
            <Nav.Link onClick={() => navigate("/housekeeping")} className="text-light">
              <FaBroom className="me-2" /> Housekeeping
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/maintenance")} className="text-light">
              <FaTools className="me-2" /> Maintenance
            </Nav.Link>
              <Nav.Link onClick={() => navigate("/feedbacks")} className="text-light">
              <FaComments className="me-2" /> Feedbacks
            </Nav.Link>
          </>
        )}

        <Nav.Link
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-danger mt-4"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
}
