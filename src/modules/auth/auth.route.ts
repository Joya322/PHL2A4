import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/register", authControllers.userRegistration);

router.post("/login", authControllers.login);

// ...
router.get("/me", authControllers.me);

export const authRoutes = router;