import express from "express";
import {
  getHousekeeping,
  createHousekeeping,
  updateHousekeeping,
  deleteHousekeeping,
} from "../controllers/housekeepingController.js";

const router = express.Router();

router.get("/", getHousekeeping);
router.post("/", createHousekeeping);
router.put("/:id", updateHousekeeping);
router.delete("/:id", deleteHousekeeping);

export default router;
