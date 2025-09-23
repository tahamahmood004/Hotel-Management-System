import { useState, useEffect, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function EditReservation({ show, handleClose, reservation, onSuccess }) {
  const { token, user } = useContext(AuthContext);

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    room: reservation?.room?._id || "",
    user: reservation?.user?._id || "",
    checkIn: reservation?.checkIn?.split("T")[0] || "",
    checkOut: reservation?.checkOut?.split("T")[0] || "",
    status: reservation?.status || "reserved",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get("/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    };

    const fetchUsers = async () => {
      if (user?.role === "admin" || user?.role === "receptionist") {
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      }
    };

    fetchRooms();
    fetchUsers();
  }, [token, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/reservations/${reservation._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess();
      handleClose();
    } catch (err) {
      alert(err.response?.data?.error || "Error updating reservation");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Room dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Room</Form.Label>
            <Form.Select name="room" value={formData.room} onChange={handleChange} required>
              <option value="">-- Select Room --</option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.roomNumber} ({r.type})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* User dropdown */}
          {(user?.role === "admin" || user?.role === "receptionist") && (
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Select name="user" value={formData.user} onChange={handleChange} required>
                <option value="">-- Select User --</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {/* Dates */}
          <Form.Group className="mb-3">
            <Form.Label>Check-In</Form.Label>
            <Form.Control
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check-Out</Form.Label>
            <Form.Control
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value="reserved">Reserved</option>
              <option value="checked-in">Checked-In</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
