import Notification from "../models/Notification.js";

// ================= GET MY NOTIFICATIONS =================
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user.id,
    })
      .populate("sender", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= MARK AS READ =================
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("Mark Read Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DELETE NOTIFICATION =================
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};