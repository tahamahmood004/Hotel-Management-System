import { useEffect, useState, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function GuestReservations() {
  const { token, user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchReservations = async () => {
      try {
        const res = await api.get("/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myReservations = res.data.filter((r) => r.user._id === user._id);
        setReservations(myReservations);
      } catch (err) {
        console.error("Error fetching reservations", err);
      }
    };
    fetchReservations();
  }, [user, token]);

  return (
    <Container className="mt-4">
      <h2>My Reservations</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r._id}>
              <td>{r.room.roomNumber}</td>
              <td>{new Date(r.checkIn).toLocaleDateString()}</td>
              <td>{new Date(r.checkOut).toLocaleDateString()}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
