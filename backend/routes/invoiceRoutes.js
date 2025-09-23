import express from "express";
import { generateInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

// ✅ Fetch invoice for a reservation
router.get("/:reservationId", generateInvoice);

export default router;
