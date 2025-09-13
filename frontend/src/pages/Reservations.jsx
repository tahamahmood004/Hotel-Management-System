import { useEffect, useState, useContext } from "react";
import NewReservation from "./NewReservation"; // import modal
import { Table, Container,Button, Badge } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Reservations() {
  const { token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  const statusVariant = (status) => {
    switch (status) {
      case "reserved":
        return "primary";
      case "checked-in":
        return "success";
      case "completed":
        return "secondary";
      case "cancelled":
        return "danger";
      default:
        return "dark";
    }
  };


  return (
    <Container className="mt-4">
      <h2 className="mb-3">Reservations</h2>
      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
        + New Reservation
      </Button>

      <NewReservation
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSuccess={fetchReservations}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Room</th>
            <th>User</th>
            <th>Status</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>
<tbody>
  {reservations.length > 0 ? (
    reservations.map((r) => (
      <tr key={r._id}>
        <td>{r._id}</td>
        <td>{r.room?.roomNumber || "N/A"} ({r.room?.type || "N/A"})</td>
        <td>
          {r.user?.name || "Unknown"} <br />
          <small className="text-muted">{r.user?.email || ""}</small>
        </td>
        <td>
          <Badge bg={statusVariant(r.status)}>{r.status}</Badge>
        </td>
        <td>{r.checkIn ? new Date(r.checkIn).toLocaleDateString() : "-"}</td>
        <td>{r.checkOut ? new Date(r.checkOut).toLocaleDateString() : "-"}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center">No reservations found</td>
    </tr>
  )}
</tbody>
      </Table>
    </Container>
  );
}
