import { body } from "express-validator";

export const updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("phone")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("college")
    .optional()
    .trim(),
];

export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];