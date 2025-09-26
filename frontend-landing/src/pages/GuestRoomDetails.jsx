import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Carousel } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function GuestRoomDetails() {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Error fetching room", err);
      }
    };
    fetchRoom();
  }, [id]);

  const handleReserve = async () => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/reservations",
        {
          user: user._id,
          room: room._id,
          checkIn,
          checkOut,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reservation successful! Hope you enjoy your stay.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Error reserving room");
    }
  };

  if (!room) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        {/* 🔹 Image Carousel */}
        {room.images?.length > 0 && (
          <Carousel>
            {room.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:5000${img}`}
                  alt={`Room image ${index + 1}`}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        <Card.Body>
          <Card.Title>Room {room.roomNumber}</Card.Title>
          <Card.Text>
            <strong>Type:</strong> {room.type} <br />
            <strong>Price:</strong> ${room.price}/night <br />
            <strong>Status:</strong>{" "}
            <span
              className={
                room.status === "available" ? "text-success" : "text-danger"
              }
            >
              {room.status}
            </span>
          </Card.Text>

          {/* Reservation Form */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Check-In</Form.Label>
              <Form.Control
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check-Out</Form.Label>
              <Form.Control
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleReserve}
              disabled={room.status !== "available"}
            >
              Reserve
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
