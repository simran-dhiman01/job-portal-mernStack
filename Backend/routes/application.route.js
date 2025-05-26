import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

// Apply for a job
router.get("/apply/:id", isAuthenticated, applyJob);

// Get all applied jobs
router.get("/get", isAuthenticated, getAppliedJobs);

// Update application status
router.post("/status/:id/update", isAuthenticated, updateStatus);

// Get applicants for a job
router.get("/applicants/:id", isAuthenticated, getApplicants);

export default router;
