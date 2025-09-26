import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
        navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className="p-4 shadow-sm"
      >
        <h3 className="text-center mb-3">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
}
