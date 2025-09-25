import User from "../models/User.js";

// ✅ Get all users (optionally filter guests)
export const getUsers = async (req, res) => {
  try {
    const role = req.query.role; // e.g. ?role=guest
    let filter = {};
    if (role) filter.role = role;

    const users = await User.find(filter).select("_id name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};