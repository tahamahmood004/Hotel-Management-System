import express from "express";
import { createReservation, checkoutReservation } from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.put("/checkout/:id", checkoutReservation);

export default router;
