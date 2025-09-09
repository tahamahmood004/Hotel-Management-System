import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>

      <div>
        <a href="/rooms">Rooms</a> | <a href="/reservations">Reservations</a>
      </div>
    </div>
  );
}
