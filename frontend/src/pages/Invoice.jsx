import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import api from "../api/axios";

export default function Invoice() {
  const { id } = useParams(); // reservationId
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(`/invoices/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error("Error fetching invoice", err);
      }
    };
    fetchInvoice();
  }, [id]);

  if (!invoice) return <p className="text-center mt-4">Loading invoice...</p>;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3>Invoice</h3>
        <p><strong>Reservation ID:</strong> {invoice.reservationId}</p>
        <p><strong>Guest:</strong> {invoice.guest?.name} ({invoice.guest?.email})</p>
        <p><strong>Room:</strong> {invoice.room?.roomNumber} ({invoice.room?.type})</p>
        <p><strong>Check-In:</strong> {new Date(invoice.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-Out:</strong> {new Date(invoice.checkOut).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> {invoice.nights}</p>
        <h5><strong>Total:</strong> ${invoice.total}</h5>
      </Card>
    </Container>
  );
}
