import Feedback from "../models/Feedback.js";

// @desc Submit feedback
// @route POST /api/feedback
export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const feedback = new Feedback({ name, email, message, rating });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};
