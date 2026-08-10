import { Router } from "express";
import { landlordController } from "./landlord.controller";

const router = Router();

router.post("/properties", landlordController.createNewProperty);
router.put("/properties/:id", landlordController.updateProperty);
router.delete("/properties/:id", landlordController.deleteProperty);
router.get("/requests", landlordController.getAllRentalRequests);
router.patch("/requests/:id", landlordController.modifyRentalRequest);


export const landlordRoute = router;