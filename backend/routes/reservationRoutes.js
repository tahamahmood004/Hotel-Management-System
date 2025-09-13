import express from "express";
import {
  createReservation,
  getReservations,
  checkoutReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.put("/checkout/:id", checkoutReservation);

export default router;
