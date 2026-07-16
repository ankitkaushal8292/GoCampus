import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

import {
  requestRide,
  getDriverRequests,
  getMyRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/rideRequestController.js";

const router = express.Router();

// ================= STUDENT =================

// Request Ride
router.post(
  "/request/:rideId",
  protect,
  authorize("student"),
  requestRide
);

// My Requests
router.get(
  "/my-requests",
  protect,
  authorize("student"),
  getMyRequests
);

// ================= DRIVER =================

// All Requests
router.get(
  "/driver-requests",
  protect,
  authorize("driver"),
  getDriverRequests
);

// Approve Request
router.put(
  "/approve/:id",
  protect,
  authorize("driver"),
  approveRequest
);

// Reject Request
router.put(
  "/reject/:id",
  protect,
  authorize("driver"),
  rejectRequest
);

export default router;