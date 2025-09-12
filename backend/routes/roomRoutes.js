import express from "express";
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.array("images", 4), createRoom);
router.get("/", getRooms);
router.put("/:id", upload.array("images", 4), updateRoom);
router.delete("/:id", deleteRoom);

export default router;
