import { useEffect, useState, useContext } from "react";
import { Table, Button, Modal, Form, Container, Image, Row, Col } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Rooms() {
  const { token } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "Single",
    price: "",
    status: "available",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch rooms
  const fetchRooms = async () => {
    const res = await api.get("/rooms", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, [token]);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload (max 4)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setFormData({ ...formData, images: files });

    // Preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Open modal for Add or Edit
  const handleShow = (room = null) => {
    setEditRoom(room);
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        type: room.type,
        price: room.price,
        status: room.status,
        images: [], // fresh upload for editing
      });
      setPreviewImages(room.images || []);
    } else {
      setFormData({
        roomNumber: "",
        type: "Single",
        price: "",
        status: "available",
        images: [],
      });
      setPreviewImages([]);
    }
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setPreviewImages([]);
  };

  // Save room (Create or Update)
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("roomNumber", formData.roomNumber);
      data.append("type", formData.type);
      data.append("price", formData.price);
      data.append("status", formData.status);

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      if (editRoom) {
        await api.put(`/rooms/${editRoom._id}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/rooms", data, {
          headers: { Authorization: `Bearer ${token}`
          // ,"Content-Type": "multipart/form-data"
         },
        });
      }

      fetchRooms();
      handleClose();
    } catch (err) {
      alert("Error saving room");
    }
  };

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
    } catch (err) {
      alert("Error deleting room");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Room Management</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShow()}>
        + Add Room
      </Button>

      {/* Rooms Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.type}</td>
              <td>${room.price}</td>
              <td>{room.status}</td>
              <td>
                <Row>
                  {room.images?.map((img, idx) => (
                    <Col xs={6} md={3} key={idx}>
                      <Image src={`http://localhost:5000${img}`} thumbnail />
                    </Col>
                  ))}
                </Row>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(room)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(room._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editRoom ? "Edit Room" : "Add Room"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Enter room number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Images (Max 4)</Form.Label>
              <Form.Control
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <Row className="mt-2">
                {previewImages.map((src, idx) => (
                  <Col xs={6} md={3} key={idx}>
                    <Image src={src} thumbnail />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editRoom ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
