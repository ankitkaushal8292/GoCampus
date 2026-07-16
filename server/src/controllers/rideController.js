import Ride from "../models/Ride.js";
import RideRequest from "../models/RideRequest.js";

// ================= CREATE RIDE =================
export const createRide = async (req, res) => {
  try {
    const {
      source,
      destination,
      date,
      availableSeats,
      price,
    } = req.body;

    // Validation
    if (
      !source ||
      !destination ||
      !date ||
      availableSeats === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Optional: Prevent past dates
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Ride date cannot be in the past",
      });
    }

    const ride = await Ride.create({
      driver: req.user.id,
      source,
      destination,
      date,
      availableSeats,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
  } catch (error) {
    console.error("Create Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET ALL RIDES =================
export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: "active" })
      .populate("driver", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (error) {
    console.error("Get Rides Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET MY RIDES =================
export const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (error) {
    console.error("Get My Rides Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DELETE RIDE =================
export const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Driver can delete only own ride
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await ride.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ride deleted successfully",
    });
  } catch (error) {
    console.error("Delete Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// ================= JOIN RIDE =================
export const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Driver cannot join own ride
    if (ride.driver.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot join your own ride",
      });
    }

    // Check seat availability
    if (ride.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "No seats available",
      });
    }

    // Check if already joined
    const alreadyJoined = ride.passengers.some(
      (passenger) => passenger.toString() === req.user.id
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "You have already joined this ride",
      });
    }

    // Add student to passengers
    ride.passengers.push(req.user.id);

    // Decrease available seats
    ride.availableSeats -= 1;

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride joined successfully",
      ride,
    });

  } catch (error) {
    console.error("Join Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// ================= LEAVE RIDE =================
export const leaveRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Check if student has joined this ride
    const passengerIndex = ride.passengers.findIndex(
      (passenger) => passenger.toString() === req.user.id
    );

    if (passengerIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "You have not joined this ride",
      });
    }

    // Remove student from passengers
    ride.passengers.splice(passengerIndex, 1);

    // Increase available seats
    ride.availableSeats += 1;

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride left successfully",
      ride,
    });
  } catch (error) {
    console.error("Leave Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= SEARCH RIDES =================
export const searchRides = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    let filter = {
      status: "active",
    };

    // Source Search
    if (source) {
      filter.source = {
        $regex: source,
        $options: "i",
      };
    }

    // Destination Search
    if (destination) {
      filter.destination = {
        $regex: destination,
        $options: "i",
      };
    }

    // Date Search
    if (date) {
      const selectedDate = new Date(date);

      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filter.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    const rides = await Ride.find(filter)
  .populate("driver", "name phone")
  .sort({ date: 1 });

const ridesWithStatus = await Promise.all(
  rides.map(async (ride) => {
    const request = await RideRequest.findOne({
      ride: ride._id,
      student: req.user.id,
    });

    return {
      ...ride.toObject(),
      requestStatus: request ? request.status : null,
    };
  })
);

res.status(200).json({
  success: true,
  count: ridesWithStatus.length,
  rides: ridesWithStatus,
});

  } catch (error) {
    console.error("Search Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= DRIVER DASHBOARD =================
export const getDriverDashboard = async (req, res) => {
  try {
    // Driver ki saari rides
    const rides = await Ride.find({
      driver: req.user.id,
    }).populate("passengers", "name email");

    // Dashboard Stats
    const totalRides = rides.length;

    const activeRides = rides.filter(
      (ride) => ride.status === "active"
    ).length;

    const completedRides = rides.filter(
      (ride) => ride.status === "completed"
    ).length;

    const cancelledRides = rides.filter(
      (ride) => ride.status === "cancelled"
    ).length;

    const totalPassengers = rides.reduce(
      (total, ride) => total + ride.passengers.length,
      0
    );

    // Pending Ride Requests
    const pendingRequests = await RideRequest.countDocuments({
      driver: req.user.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      totalRides,
      activeRides,
      completedRides,
      cancelledRides,
      totalPassengers,
      pendingRequests,
      rides,
    });

  } catch (error) {
    console.error("Driver Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= UPDATE RIDE =================
export const updateRide = async (req, res) => {
  try {
    const { source, destination, date, availableSeats, price } = req.body;

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Only ride owner can update
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update only provided fields
    if (source) ride.source = source;
    if (destination) ride.destination = destination;
    if (date) ride.date = date;
    if (availableSeats !== undefined) ride.availableSeats = availableSeats;
    if (price !== undefined) ride.price = price;

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride updated successfully",
      ride,
    });

  } catch (error) {
    console.error("Update Ride Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= MY BOOKINGS =================
export const getMyBookings = async (req, res) => {
  try {
    const rides = await Ride.find({
      passengers: req.user.id,
    })
      .populate("driver", "name phone email")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (error) {
    console.error("My Bookings Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};