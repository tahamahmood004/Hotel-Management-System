import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["Single", "Double", "Suite"] },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    images: [{ type: String }], // ✅ store image file paths
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
