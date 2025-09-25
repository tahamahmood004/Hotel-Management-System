import { useEffect, useState, useContext } from "react";
import { Container, Table, Button, Badge, Form, Modal } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Maintenance() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    room: "",
    issue: "",
    staff: "",
    status: "reported",
    notes: "",
  });

  // Fetch maintenance tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/maintenance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching maintenance tasks", err);
    }
  };

  // Fetch users (admins & receptionists only)
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const staffUsers = res.data.filter(
        (u) => u.role === "admin" || u.role === "receptionist"
      );
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

  // Add task
  const handleAdd = async () => {
    try {
      await api.post("/maintenance", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error adding maintenance task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/maintenance/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting maintenance task");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Maintenance</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        + Add Task
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Issue</th>
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
              <td>{t.issue}</td>
              <td>{t.staff}</td>
              <td>
                <Badge
                  bg={
                    t.status === "resolved"
                      ? "success"
                      : t.status === "in-progress"
                      ? "warning"
                      : "danger"
                  }
                >
                  {t.status}
                </Badge>
              </td>
              <td>{t.notes}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(t._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Maintenance Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Room Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Select
                name="room"
                value={formData.room}
                onChange={handleChange}
              >
                <option value="">Select Room</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.roomNumber} ({r.type})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Issue */}
            <Form.Group className="mb-3">
              <Form.Label>Issue</Form.Label>
              <Form.Control
                type="text"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Staff Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Assign Staff</Form.Label>
              <Form.Select
                name="staff"
                value={formData.staff}
                onChange={handleChange}
              >
                <option value="">Select Staff</option>
                {users.map((u) => (
                  <option key={u._id} value={u.name}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="reported">Reported</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
              </Form.Select>
            </Form.Group>

            {/* Notes */}
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
