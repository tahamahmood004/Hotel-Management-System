import express from "express";
import { submitFeedback, getFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// Public route → guests can submit feedback
router.post("/", submitFeedback);

//view feedback
router.get("/",getFeedback);

export default router;
