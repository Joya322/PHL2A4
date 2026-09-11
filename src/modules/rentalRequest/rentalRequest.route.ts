import { Router } from "express";
import { rentalRequestControllers } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();
// all done
router.post(
  "/",
  auth(UserRole.TENANT),
  rentalRequestControllers.createRentalRequest,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.LANDLORD),
  rentalRequestControllers.getAllRentalRequests,
); // need modification with access

router.get(
  "/:rentalRequestId",
  auth(UserRole.TENANT, UserRole.ADMIN, UserRole.LANDLORD),
  rentalRequestControllers.getRentalRequestById,
);

export const rentalRoutes = router;
