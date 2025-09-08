import Invoice from "../models/Invoice.js";
import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

export const generateInvoice = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId).populate("room");

    if (!reservation) return res.status(404).json({ msg: "Reservation not found" });

    const days =
      (new Date(reservation.checkOut) - new Date(reservation.checkIn)) /
      (1000 * 60 * 60 * 24);

    const amount = days * reservation.room.price;

    const invoice = new Invoice({ reservation: reservationId, amount });
    await invoice.save();

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
