import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Reservations() {
  const { token, user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [roomId, setRoomId] = useState("");

  const createReservation = async () => {
    try {
      await api.post(
        "/reservations",
        {
          user: user._id,
          room: roomId,
          checkIn: "2025-09-07",
          checkOut: "2025-09-09",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reservation created!");
    } catch (err) {
      alert("Failed to reserve");
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await api.get("/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    };
    fetchReservations();
  }, [token]);

  return (
    <div>
      <h2>Reservations</h2>
      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={createReservation}>Book Room</button>

      <ul>
        {reservations.map((r) => (
          <li key={r._id}>
            Room: {r.room} | Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
