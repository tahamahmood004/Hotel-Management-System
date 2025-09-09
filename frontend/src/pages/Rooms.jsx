import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Rooms() {
  const { token } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get("/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    };
    fetchRooms();
  }, [token]);

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.roomNumber} - {room.type} - {room.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
