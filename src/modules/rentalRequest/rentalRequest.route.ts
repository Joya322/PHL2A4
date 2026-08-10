import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";

const router = Router();

router.post("/", rentalRequestController.submitRentalRequest);
router.get("/", rentalRequestController.getAllRentalRequests);
router.get("/:id", rentalRequestController.getRentalRequest);

export const rentalRoute = router;
