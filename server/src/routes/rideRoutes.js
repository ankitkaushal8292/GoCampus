import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validationMiddleware.js";

import {
  createRide,
  getAllRides,
  getMyRides,
  deleteRide,
  joinRide,
  leaveRide,
  searchRides,
  getDriverDashboard,
  updateRide,
  getMyBookings,
} from "../controllers/rideController.js";

import {
  createRideValidation,
} from "../validators/rideValidator.js";

const router = express.Router();

// ================= DRIVER ROUTES =================


// Driver Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("driver"),
  getDriverDashboard
);

// My Rides
router.get("/my-rides", protect, authorize("driver"), getMyRides);

// ================= STUDENT ROUTES =================

// Join Ride
router.post("/:id/join", protect, authorize("student"), joinRide);
// My Bookings
router.get(
  "/my-bookings",
  protect,
  authorize("student"),
  getMyBookings
);

// Update Ride (Only Driver)
router.put(
  "/:id",
  protect,
  authorize("driver"),
  updateRide
);

router.post(
  "/create",
  protect,
  authorize("driver"),
  createRideValidation,
  validateRequest,
  createRide
);

// Leave Ride
router.delete("/:id/leave", protect, authorize("student"), leaveRide);

// ================= COMMON ROUTES =================

// Search Rides
router.get("/search", protect, searchRides);

// Get All Rides
router.get("/", protect, getAllRides);

// Delete Ride
router.delete("/:id", protect, authorize("driver"), deleteRide);

export default router;