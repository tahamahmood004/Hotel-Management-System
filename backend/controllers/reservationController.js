import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

export const createReservation = async (req, res) => {
  try {
    const { user, room, checkIn, checkOut } = req.body;

    const reservation = new Reservation({ user, room, checkIn, checkOut });
    await reservation.save();

    await Room.findByIdAndUpdate(room, { status: "occupied" });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkoutReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "checked-out" },
      { new: true }
    );

    if (reservation) {
      await Room.findByIdAndUpdate(reservation.room, { status: "available" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
