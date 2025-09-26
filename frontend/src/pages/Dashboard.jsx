import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaCalendarCheck,
  FaUsers,
  FaBroom,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ redirect to login page after logout
  };

  const cards = [
    {
      title: "Manage Rooms",
      text: "Add, update, or remove hotel rooms.",
      icon: <FaBed size={40} className="mb-3 text-primary" />,
      action: () => navigate("/rooms"),
      variant: "primary",
      roles: ["admin", "receptionist"], // ✅ visible for admin & receptionist
    },
    {
      title: "Reservations",
      text: "View and manage all reservations.",
      icon: <FaCalendarCheck size={40} className="mb-3 text-success" />,
      action: () => navigate("/reservations"),
      variant: "success",
      roles: ["admin", "receptionist", "guest"], // ✅ all roles can see
    },
    {
      title: "Users",
      text: "Manage registered users and roles.",
      icon: <FaUsers size={40} className="mb-3 text-info" />,
      action: () => navigate("/users"),
      variant: "info",
      roles: ["admin"], // ✅ only admin sees
    },
    {
      title: "Housekeeping",
      text: "Track and manage housekeeping tasks.",
      icon: <FaBroom size={40} className="mb-3 text-warning" />,
      action: () => navigate("/housekeeping"),
      variant: "warning",
      roles: ["admin", "receptionist"], // ✅ admin & receptionist

    },
    {
      title: "Maintenance",
      text: "Report and resolve maintenance issues.",
      icon: <FaTools size={40} className="mb-3 text-danger" />,
      action: () => navigate("/maintenance"),
      variant: "danger",
      roles: ["admin", "receptionist"], // ✅ admin & receptionist
    },
  ];

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Welcome, {user?.name}</h2>
          <p className="text-muted">Role: {user?.role}</p>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Logout
        </Button>
      </div>

      <Row xs={1} md={2} className="g-4">
        {cards
        .filter((card) => card.roles.includes(user?.role)) // ✅ role filter
        .map((card, idx) => (
          <Col key={idx}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                {card.icon}
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button variant={card.variant} onClick={card.action}>
                  Go
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
