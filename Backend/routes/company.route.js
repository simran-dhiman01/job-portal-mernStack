import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany, deleteCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register a new company
router.post("/register", isAuthenticated, registerCompany);

// Get all companies
router.get("/get", isAuthenticated, getCompany);

// Get company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update company
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

// Delete company
router.delete("/delete/:id", isAuthenticated, deleteCompany);

export default router;