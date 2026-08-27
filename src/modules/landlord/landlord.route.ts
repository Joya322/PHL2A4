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

router.put("/properties/:propertyId", landlordControllers.updateProperty);
// ...
router.delete("/properties/:id", landlordControllers.deleteProperty);
router.get("/requests", landlordControllers.getAllRentalRequests);
router.patch("/requests/:id", landlordControllers.modifyRentalRequest);

export const landlordRoute = router;
