import Housekeeping from "../models/Housekeeping.js";

export const getHousekeeping = async (req, res) => {
  try {
    const tasks = await Housekeeping.find().populate("room", "roomNumber type");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHousekeeping = async (req, res) => {
  try {
    const task = new Housekeeping(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateHousekeeping = async (req, res) => {
  try {
    const task = await Housekeeping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHousekeeping = async (req, res) => {
  try {
    const task = await Housekeeping.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
