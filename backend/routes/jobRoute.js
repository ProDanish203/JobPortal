import { Router } from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, showJobController, updateJobController, deleteJobController, jobStatsController } from "../controllers/jobController.js";
const router = Router();


// Create Job
router.post("/create-job", userAuth, createJobController)
// Show User Created Jobs 
router.get("/all-jobs", userAuth, showJobController)
// Update Job
router.put("/update-job/:id", userAuth, updateJobController)
// Delete Job
router.delete("/delete-job/:id", userAuth, deleteJobController)
// Job Stats
router.get("/job-stats", userAuth, jobStatsController)

export default router;


