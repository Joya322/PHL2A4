import { Router } from "express";
import { rentalRequestControllers } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(UserRole.TENANT),
  rentalRequestControllers.createRentalRequest,
);

router.get(
  "/",
  auth(UserRole.TENANT, UserRole.ADMIN, UserRole.LANDLORD),
  rentalRequestControllers.getAllRentalRequests,
);

router.get(
  "/:id",
  auth(UserRole.TENANT, UserRole.ADMIN, UserRole.LANDLORD),
  rentalRequestControllers.getRentalRequestById,
);

export const rentalRoutes = router;
