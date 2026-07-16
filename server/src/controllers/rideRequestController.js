import Ride from "../models/Ride.js";
import RideRequest from "../models/RideRequest.js";
import User from "../models/User.js";
import createNotification from "../utils/createNotification.js";

// ================= REQUEST RIDE =================
export const requestRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Driver cannot request own ride
    if (ride.driver.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own ride",
      });
    }

    // Check seats
    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    // Already requested?
    const existingRequest = await RideRequest.findOne({
      ride: ride._id,
      student: req.user.id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Ride request already sent",
      });
    }

    const request = await RideRequest.create({
      ride: ride._id,
      student: req.user.id,
      driver: ride.driver,
    });

    const student = await User.findById(req.user.id);

    await createNotification({
      receiver: ride.driver,
      sender: req.user.id,
      title: "New Ride Request",
      message: `${student.name} requested your ride.`,
      type: "ride_request",
    });

    res.status(201).json({
      success: true,
      message: "Ride request sent successfully",
      request,
    });
  } catch (error) {
    console.error("Request Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DRIVER REQUESTS =================
export const getDriverRequests = async (req, res) => {
  try {
    const requests = await RideRequest.find({
      driver: req.user.id,
    })
      .populate("student", "name email phone")
      .populate("ride");

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Driver Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= MY REQUESTS =================
export const getMyRequests = async (req, res) => {
  try {
    const requests = await RideRequest.find({
      student: req.user.id,
    })
      .populate("ride")
      .populate("driver", "name phone");

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("My Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= APPROVE REQUEST =================
export const approveRequest = async (req, res) => {
  try {
    const request = await RideRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const ride = await Ride.findById(request.ride);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    request.status = "approved";

    ride.passengers.push(request.student);
    ride.availableSeats -= 1;

    await request.save();
    await ride.save();

    await createNotification({
      receiver: request.student,
      sender: req.user.id,
      title: "Ride Approved",
      message: "Your ride request has been approved.",
      type: "ride_approved",
    });

    res.status(200).json({
      success: true,
      message: "Ride request approved",
    });
  } catch (error) {
    console.error("Approve Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= REJECT REQUEST =================
export const rejectRequest = async (req, res) => {
  try {
    const request = await RideRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "rejected";

    await request.save();

    await createNotification({
      receiver: request.student,
      sender: req.user.id,
      title: "Ride Rejected",
      message: "Your ride request has been rejected.",
      type: "ride_rejected",
    });
    res.status(200).json({
      success: true,
      message: "Ride request rejected",
    });
  } catch (error) {
    console.error("Reject Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
