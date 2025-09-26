import { useState, useEffect } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function GuestHome() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data.filter((r) => r.status === "available")); // ✅ only available rooms
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {/* Full Screen Width Slider */}
      <Carousel style={{ width: "100vw" }}>
        {rooms.slice(0, 3).map((room) => (
          <Carousel.Item key={room._id}>
            <img
              className="d-block"
              src={
                room.images?.length > 0
                  ? `http://localhost:5000${room.images[0]}`
                  : "https://via.placeholder.com/400x200?text=No+Image"
              } // ✅ show first image
              alt={room.type}
              style={{ width: "100vw", height: "600px", objectFit: "cover" }}
            />
            <Carousel.Caption
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h3>Room {room.roomNumber}</h3>
              <p>
                {room.type} - ${room.price}/night
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Explore Our Rooms */}
      <div className="container my-5">
        <h1
          className="text-center mb-5"
          style={{ color: "#000080", fontWeight: "bold" }}
        >
          Explore Our Rooms
        </h1>
        <div className="row">
          {rooms.map((room) => (
            <div key={room._id} className="col-md-4 mb-4">
              <Card>
                {room.images?.length > 0 && (
                  <Card.Img
                    variant="top"
                    src={
                      room.images?.length > 0
                        ? `http://localhost:5000${room.images[0]}`
                        : "https://via.placeholder.com/400x200?text=No+Image" // fallback
                    }
                    alt={room.type}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>Room {room.roomNumber}</Card.Title>
                  <Card.Text>
                    Type: {room.type} <br />
                    Price: ${room.price}/night
                  </Card.Text>
                  <Button onClick={() => navigate(`/room/${room._id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuestHome;
