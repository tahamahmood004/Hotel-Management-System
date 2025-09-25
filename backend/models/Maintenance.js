import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    issue: { type: String, required: true },
    staff: { type: String }, // could be assigned technician
    status: {
      type: String,
      enum: ["reported", "in-progress", "resolved"],
      default: "reported",
    },
    notes: { type: String },
    reportedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", maintenanceSchema);
