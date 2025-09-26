import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Feedbacks() {
  const { token } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token]);

  // 🔹 Delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
      setError("Failed to delete feedback");
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Feedback</h2>
      {feedbacks.length === 0 ? (
        <Alert variant="info">No feedback submitted yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, index) => (
              <tr key={f._id}>
                <td>{index + 1}</td>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td>{f.message}</td>
                <td>{f.rating ? `${f.rating} ⭐` : "N/A"}</td>
                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(f._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Feedbacks;
