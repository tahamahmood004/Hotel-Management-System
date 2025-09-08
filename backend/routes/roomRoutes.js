import express from "express";
import { createRoom, getRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", createRoom);   // Admin creates room
router.get("/", getRooms);      // View rooms

export default router;
