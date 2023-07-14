import { Router } from "express";
import { testPost } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/testPost", userAuth, testPost)

export default router;