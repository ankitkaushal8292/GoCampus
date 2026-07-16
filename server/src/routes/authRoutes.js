import express from "express";

import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validationMiddleware.js";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

// ================= AUTH ROUTES =================

// Register User
router.post(
  "/register",
  registerValidation,
  validateRequest,
  registerUser
);

// Login User
router.post(
  "/login",
  loginValidation,
  validateRequest,
  loginUser
);

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

export default router;