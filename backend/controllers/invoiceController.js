import Invoice from "../models/Invoice.js";
import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";


export const generateInvoice = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId)
      .populate("user", "name email")
      .populate("room", "roomNumber type price");

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Calculate total nights
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const total = reservation.room.price * nights;

    const invoice = {
      reservationId: reservation._id,
      guest: reservation.user,
      room: reservation.room,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      nights,
      total,
    };

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};