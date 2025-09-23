import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

// get reservations from mongoDB
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("room", "roomNumber type");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create reservation
export const createReservation = async (req, res) => {
  try {
    const { user, room, checkIn, checkOut } = req.body;

    const reservation = new Reservation({ user, room, checkIn, checkOut });
    await reservation.save();

    await Room.findByIdAndUpdate(room, { status: "booked" });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reservation
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

// Update reservation
export const updateReservation = async (req, res) => {
  try {
    const { room, user, checkIn, checkOut, status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { room, user, checkIn, checkOut, status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("room", "roomNumber type");

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete reservation
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};