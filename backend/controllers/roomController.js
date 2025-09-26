import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";

// Create Room
export const createRoom = async (req, res) => {
  try {
    console.log("FILES:", req.files);   // 👈 check if Multer received images
    console.log("BODY:", req.body);     // 👈 check form fields
    const { roomNumber, type, price, status } = req.body;

    // Save file paths
    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/rooms/${file.filename}`)
      : [];

    const room = new Room({
      roomNumber,
      type,
      price,
      status,
      images: imagePaths,
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error("ROOM ERROR:", err.message);  // 👈 full error details
    res.status(500).json({ error: err.message });
  }
};

// Get all rooms with reservation info
export const getRooms = async (req, res) => {
  try {
    // Fetch rooms
    const rooms = await Room.find();

    // For each room, check if reserved
    const roomsWithReservation = await Promise.all(
      rooms.map(async (room) => {
        const reservation = await Reservation.findOne({ room: room._id }).populate("user", "name email");
        return {
          ...room._doc,
          reservationId: reservation ? reservation._id : null,
          reservedBy: reservation ? reservation.user : null,
        };
      })
    );

    res.json(roomsWithReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Room
export const updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;

    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/rooms/${file.filename}`)
      : [];

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        roomNumber,
        type,
        price,
        status,
        ...(imagePaths.length > 0 && { images: imagePaths }), // ✅ update only if new images uploaded
      },
      { new: true }
    );

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};