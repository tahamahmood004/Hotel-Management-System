import express from "express";
import { generateInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/:reservationId", generateInvoice);

export default router;
