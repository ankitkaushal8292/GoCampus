import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { changePassword } from "../../services/userService";
import toast from "react-hot-toast";

const ChangePasswordForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = () => {
    if (formData.newPassword.length < 6) return "Weak";
    if (formData.newPassword.length < 10) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (formData.newPassword.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success(response.message);

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        onClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl text-white">
            <FaShieldAlt />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Change Password
            </h2>

            <p className="text-sm text-blue-100">
              Keep your account secure
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="text-3xl text-white transition hover:rotate-90"
        >
          <FaTimes />
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8"
      >

        {/* Current Password */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Current Password
          </label>

          <div className="relative">

            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 pr-14 transition focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            New Password
          </label>

          <div className="relative">

            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 pr-14 transition focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {formData.newPassword && (
            <p
              className={`mt-2 text-sm font-medium ${
                passwordStrength() === "Strong"
                  ? "text-green-600"
                  : passwordStrength() === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Password Strength : {passwordStrength()}
            </p>
          )}

        </div>

        {/* Confirm Password */}

        <div>

          <label className="mb-2 block font-semibold text-gray-700">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 pr-14 transition focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {formData.confirmPassword && (
            <p
              className={`mt-2 text-sm font-medium ${
                formData.confirmPassword === formData.newPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formData.confirmPassword === formData.newPassword
                ? "✓ Passwords Match"
                : "✗ Passwords Do Not Match"}
            </p>
          )}

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-gray-300 py-3 font-semibold transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
};

export default ChangePasswordForm;