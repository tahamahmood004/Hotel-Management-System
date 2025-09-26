import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function GuestRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "25rem" }} className="p-3 shadow">
            <h3 className="text-center">Register</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" onChange={handleChange}>
                  <option value="guest">Guest</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
