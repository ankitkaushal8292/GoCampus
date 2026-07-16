import User from "../models/User.js";
import Ride from "../models/Ride.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import RideRequest from "../models/RideRequest.js";

export const getUserProfile = async (req, res) => {
  try {
    // Find user by ID from JWT token
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// ================= STUDENT DASHBOARD =================
export const getStudentDashboard = async (req, res) => {
  try {
    // Student ki approved/joined rides
    const rides = await Ride.find({
      passengers: req.user.id,
    })
      .populate("driver", "name email phone")
      .sort({ date: 1 });

    // Student ki saari ride requests
    const rideRequests = await RideRequest.find({
      student: req.user.id,
    });

    // Dashboard Stats
    const totalBookings = rideRequests.length;

    const pendingRequests = rideRequests.filter(
      (request) => request.status === "pending"
    ).length;

    const approvedRequests = rideRequests.filter(
      (request) => request.status === "approved"
    ).length;

    const rejectedRequests = rideRequests.filter(
      (request) => request.status === "rejected"
    ).length;

    const completedBookings = rides.filter(
      (ride) => ride.status === "completed"
    ).length;

    const upcomingRides = rides.filter(
      (ride) => ride.status === "active"
    ).length;

    res.status(200).json({
      success: true,
      totalBookings,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      completedBookings,
      upcomingRides,
      rides,
    });

  } catch (error) {
    console.error("Student Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, college } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (college) user.college = college;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Prevent same password
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPLOAD PROFILE IMAGE =================
export const uploadProfileImage = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "GoCampus/ProfileImages",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    const result = await uploadFromBuffer();

    // Update user
    const user = await User.findById(req.user.id);

    user.profileImage = result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {
    console.error("Upload Profile Image Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DELETE ACCOUNT (SOFT DELETE) =================
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
  console.error("========== PROFILE IMAGE ERROR ==========");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};