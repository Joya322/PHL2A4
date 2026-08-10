import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPayment);

export const paymentRoute = router;
