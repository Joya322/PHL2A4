import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.TENANT), rentalRequestController.createRentalRequest);

// ...
router.get("/", rentalRequestController.getAllRentalRequests);
router.get("/:id", rentalRequestController.getRentalRequest);

export const rentalRoutes = router;
