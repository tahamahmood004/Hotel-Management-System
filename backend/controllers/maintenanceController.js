import Maintenance from "../models/Maintenance.js";

export const getMaintenance = async (req, res) => {
  try {
    const tasks = await Maintenance.find().populate("room", "roomNumber type");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMaintenance = async (req, res) => {
  try {
    const task = new Maintenance(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMaintenance = async (req, res) => {
  try {
    const task = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMaintenance = async (req, res) => {
  try {
    const task = await Maintenance.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
