import express from "express";
import {
  createReservation,
  getReservations,
  checkoutReservation,
  updateReservation,
  deleteReservation
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.put("/:id/checkout", checkoutReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
