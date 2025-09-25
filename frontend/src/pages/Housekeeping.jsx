import { useEffect, useState, useContext } from "react";
import { Container, Table, Button, Badge, Form, Modal } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Housekeeping() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ room: "", staff: "", status: "pending", notes: "" });

  // Fetch housekeeping tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/housekeeping", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching housekeeping tasks", err);
    }
  };

  // Fetch users (only admins & receptionists)
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const staffUsers = res.data.filter((u) => u.role === "admin" || u.role === "receptionist");
      setUsers(staffUsers);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // Fetch available rooms
  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const availableRooms = res.data.filter((r) => r.status === "available");
      setRooms(availableRooms);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchRooms();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await api.post("/housekeeping", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error adding housekeeping task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/housekeeping/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting housekeeping task");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Housekeeping</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>+ Add Task</Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Staff</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.room?.roomNumber}</td>
              <td>{t.staff}</td>
              <td>
                <Badge bg={
                  t.status === "completed" ? "success" :
                  t.status === "in-progress" ? "warning" : "secondary"
                }>
                  {t.status}
                </Badge>
              </td>
              <td>{t.notes}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(t._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Housekeeping Task</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            {/* Room Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Select name="room" value={formData.room} onChange={handleChange}>
                <option value="">Select Room</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.roomNumber} ({r.type})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Staff Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Assign Staff</Form.Label>
              <Form.Select name="staff" value={formData.staff} onChange={handleChange}>
                <option value="">Select Staff</option>
                {users.map((u) => (
                  <option key={u._id} value={u.name}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Status Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            {/* Notes */}
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" name="notes" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
