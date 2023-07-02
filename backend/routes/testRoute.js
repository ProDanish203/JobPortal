import { Router } from "express";
import { testPost } from "../controllers/testController.js";

const router = Router();

router.post("/testPost", testPost)

export default router;