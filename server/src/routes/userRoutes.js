import express from "express";

import {
  getUserProfile,
  getStudentDashboard,
  updateProfile,
  changePassword,
  uploadProfileImage,
  deleteAccount,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import validateRequest from "../middleware/validationMiddleware.js";

import {
  updateProfileValidation,
  changePasswordValidation,
} from "../validators/userValidator.js";

const router = express.Router();

// Get Logged-in User Profile
router.get("/profile", protect, getUserProfile);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfileValidation,
  validateRequest,
  updateProfile
);

// Upload Profile Image
router.put(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);

// Change Password
router.put(
  "/change-password",
  protect,
  changePasswordValidation,
  validateRequest,
  changePassword
);

// Student Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("student"),
  getStudentDashboard
);

// Delete Account
router.delete(
  "/account",
  protect,
  deleteAccount
);

export default router;