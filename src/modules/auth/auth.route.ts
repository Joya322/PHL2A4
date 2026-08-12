import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.userRegistration);
router.post("/login", authController.login);
router.get("/me", authController.me);

export const authRoute = router;