import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBed, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ redirect to login page after logout
  };

  const cards = [
    {
      title: "Manage Rooms",
      text: "Add, update, or remove hotel rooms.",
      icon: <FaBed size={40} className="mb-3 text-primary" />,
      action: () => navigate("/rooms"),
      variant: "primary",
    },
    {
      title: "Reservations",
      text: "View and manage all reservations.",
      icon: <FaCalendarCheck size={40} className="mb-3 text-success" />,
      action: () => navigate("/reservations"),
      variant: "success",
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
        {cards.map((card, idx) => (
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
