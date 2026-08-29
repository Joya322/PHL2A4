import { Router } from "express";
import { landlordControllers } from "./landlord.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/properties",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  landlordControllers.createProperty,
);

router.put(
  "/properties/:propertyId",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  landlordControllers.updateProperty,
);

router.delete(
  "/properties/:propertyId",
  auth(UserRole.LANDLORD, UserRole.ADMIN),
  landlordControllers.deleteProperty,
);

router.get("/requests", auth(UserRole.LANDLORD), landlordControllers.getAllRentalRequestsForMyProperties);

router.patch(
  "/requests/:rentalRequestId",
  auth(UserRole.LANDLORD),
  landlordControllers.changeRentalRequestStatus,
);

export const landlordRoutes = router;
