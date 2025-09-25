import { useEffect, useState, useContext } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting user");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Users ({users.length})</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.role === "admin" ? "danger" : "secondary"}>
                  {u.role}
                </Badge>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
