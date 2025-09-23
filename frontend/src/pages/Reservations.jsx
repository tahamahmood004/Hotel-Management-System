import { useEffect, useState, useContext } from "react";
import { Table, Container, Button, Badge, Form } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import NewReservation from "./NewReservation";
import EditReservation from "./EditReservation";
import { useNavigate } from "react-router-dom";

export default function Reservations() {
  const { token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchId(value);

    if (value === "") {
      setFiltered(reservations);
    } else {
      const results = reservations.filter((r) =>
        r._id.toLowerCase().includes(value)
      );
      setFiltered(results);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    try {
      await api.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservations();
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting reservation");
    }
  };

  const statusVariant = (status) => {
    switch (status) {
      case "reserved": return "primary";
      case "checked-in": return "success";
      case "completed": return "secondary";
      case "cancelled": return "danger";
      default: return "dark";
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Reservations</h2>

      {/* Top Bar: Add & Search */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="success" onClick={() => setShowNewModal(true)}>
          + New Reservation
        </Button>
        <Form className="d-flex" style={{ maxWidth: "300px" }}>
          <Form.Control
            type="text"
            placeholder="Search by Reservation ID"
            value={searchId}
            onChange={handleSearch}
          />
        </Form>
      </div>

      {/* New Reservation Modal */}
      <NewReservation
        show={showNewModal}
        handleClose={() => setShowNewModal(false)}
        onSuccess={fetchReservations}
      />

      {/* Edit Reservation Modal */}
      {selectedReservation && (
        <EditReservation
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          reservation={selectedReservation}
          onSuccess={fetchReservations}
        />
      )}

      {/* Reservation Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Room</th>
            <th>User</th>
            <th>Status</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((r) => (
              <tr key={r._id}>
                <td>{r._id}</td>
                <td>{r.room?.roomNumber || "N/A"} ({r.room?.type || "N/A"})</td>
                <td>
                  {r.user?.name || "Unknown"} <br />
                  <small className="text-muted">{r.user?.email || "Unknown"}</small>
                </td>
                <td>
                  <Badge bg={statusVariant(r.status)}>{r.status}</Badge>
                </td>
                <td>{r.checkIn ? new Date(r.checkIn).toLocaleDateString() : "-"}</td>
                <td>{r.checkOut ? new Date(r.checkOut).toLocaleDateString() : "-"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedReservation(r);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={async () => {
                      try {
                        const res = await api.put(`/reservations/${r._id}/checkout`, {}, {
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        alert("Checkout successful! Invoice generated.");
                        navigate(`/invoices/${r._id}`);
                        console.log("Invoice:", res.data.invoice); // 👈 for now, log it
                        fetchReservations();
                      } catch (err) {
                        alert(err.response?.data?.error || "Error during checkout");
                      }
                    }}
                  >
                    Checkout
                  </Button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No reservations found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
