import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., Single, Double, Suite
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
