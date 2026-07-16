import { body } from "express-validator";

export const createRideValidation = [
  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required"),

  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("availableSeats")
    .isInt({ min: 1 })
    .withMessage("Available seats must be at least 1"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be 0 or greater"),
];