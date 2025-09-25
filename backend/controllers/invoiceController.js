import Invoice from "../models/Invoice.js";
import Reservation from "../models/Reservation.js";

export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate({
        path: "reservation",
        populate: [{ path: "user", select: "name email" }, { path: "room", select: "roomNumber type price" }]
      });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const reservation = invoice.reservation;
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    res.json({
      invoiceId: invoice._id,
      reservationId: reservation._id,
      guest: reservation.user,
      room: reservation.room,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      nights,
      total: invoice.amount,
      issuedAt: invoice.issuedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
