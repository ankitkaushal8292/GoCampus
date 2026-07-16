import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    availableSeats: {
  type: Number,
  required: true,
  min: 0,
},

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Ride", rideSchema);