import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";
import Invoice from "../models/Invoice.js";

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

    if (!user || !room || !checkIn || !checkOut) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if room is already reserved in the same date range
    const overlapping = await Reservation.findOne({
      room,
      $or: [
        {
          checkIn: { $lte: checkOut },
          checkOut: { $gte: checkIn },
        },
      ],
      status: { $ne: "cancelled" }, // cancelled rooms don’t block new reservations
    });

    if (overlapping) {
      return res
        .status(400)
        .json({ error: "Room already reserved for these dates" });
    }

    const reservation = new Reservation({
      user,
      room,
      checkIn,
      checkOut,
      status: "booked",
    });
    await reservation.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Checkout reservation
export const checkoutReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id)
      .populate("room")
      .populate("user");
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // calculate nights
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const total = reservation.room.price * nights;

    // mark reservation checked-out
    reservation.status = "checked-out";
    await reservation.save();

    // create invoice
    const invoice = new Invoice({
      reservation: reservation._id,
      amount: total,
    });
    await invoice.save();

    res.json({
      message: "Checkout successful",
      invoiceId: invoice._id, // 👈 return invoice id
    });
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
