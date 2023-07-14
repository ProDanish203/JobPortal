import { Router } from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController, getUserController } from "../controllers/userController.js";
const router = Router();


//Get user data 
router.post("/getUser", userAuth, getUserController)

router.put('/update-user', userAuth, updateUserController)

export default router