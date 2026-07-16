import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// ================= GET MY NOTIFICATIONS =================
router.get(
  "/",
  protect,
  getMyNotifications
);

// ================= MARK AS READ =================
router.put(
  "/:id/read",
  protect,
  markAsRead
);

// ================= DELETE NOTIFICATION =================
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;