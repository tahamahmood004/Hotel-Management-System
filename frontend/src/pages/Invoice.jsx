import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import api from "../api/axios";
import jsPDF from "jspdf";

export default function Invoice() {
  const { id } = useParams();
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("'LuxuryStay Hospitality' Hotel Invoice", 20, 20);
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 20, 40);
    doc.text(`Reservation ID: ${invoice.reservationId}`, 20, 50);
    doc.text(`Guest: ${invoice.guest?.name} (${invoice.guest?.email})`, 20, 60);
    doc.text(`Room: ${invoice.room?.roomNumber} (${invoice.room?.type})`, 20, 70);
    doc.text(`Check-In: ${new Date(invoice.checkIn).toLocaleDateString()}`, 20, 80);
    doc.text(`Check-Out: ${new Date(invoice.checkOut).toLocaleDateString()}`, 20, 90);
    doc.text(`Nights: ${invoice.nights}`, 20, 100);
    doc.text(`Total: $${invoice.total}`, 20, 110);
    doc.text(`Issued At: ${new Date(invoice.issuedAt).toLocaleDateString()}`, 20, 120);

    doc.save(`invoice_${invoice.invoiceId}.pdf`);
  };

  if (!invoice) return <p className="text-center mt-4">Loading invoice...</p>;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3>'LuxuryStay Hospitality' Invoice</h3>
        <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
        <p><strong>Reservation ID:</strong> {invoice.reservationId}</p>
        <p><strong>Guest:</strong> {invoice.guest?.name} ({invoice.guest?.email})</p>
        <p><strong>Room:</strong> {invoice.room?.roomNumber} ({invoice.room?.type})</p>
        <p><strong>Check-In:</strong> {new Date(invoice.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-Out:</strong> {new Date(invoice.checkOut).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> {invoice.nights}</p>
        <h5><strong>Total:</strong> ${invoice.total}</h5>
        <p><small>Issued At: {new Date(invoice.issuedAt).toLocaleDateString()}</small></p>

        <Button variant="primary" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Card>
    </Container>
  );
}
