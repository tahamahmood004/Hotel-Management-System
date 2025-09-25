import mongoose from "mongoose";

const housekeepingSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    staff: { type: String, required: true }, // could be linked to User later
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    notes: { type: String },
    scheduledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Housekeeping", housekeepingSchema);
