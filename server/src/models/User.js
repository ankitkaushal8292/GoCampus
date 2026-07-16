import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
       select: false,
    },

    role: {
      type: String,
      enum: ["student", "driver"],
      default: "student",
    },

    phone: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    isDeleted: {
  type: Boolean,
  default: false,
},

deletedAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;