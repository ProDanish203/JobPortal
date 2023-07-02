import { Router } from "express";
import { regController } from "../controllers/authController.js";

const router = Router();

router.post("/register", regController)

export default router;