import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const { closeRegister, openLogin } = useModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // confirmPassword ko backend me nahi bhejna
      const { confirmPassword, ...userData } = formData;

      const response = await registerUser(userData);

      if (response.success) {
        toast.success(response.message);

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "student",
        });

        setErrors({});

        closeRegister();
        openLogin();
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
<div
  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
  onClick={closeRegister}
>      
<div
  className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>

        {/* Close Button */}
        <button
          onClick={closeRegister}
          className="absolute cursor-pointer top-4 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

       <h2 className="text-2xl font-bold text-center text-blue-600 ">
  Create Account
</h2>

        <p className="mt-1 text-center text-sm text-gray-500">
  Join GoCampus today
</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">College Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your college email"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Driver Fields */}
          {formData.role === "driver" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium">Vehicle Number</label>

                <input
                  type="text"
                  placeholder="MH12AB1234"
                  className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Vehicle Type</label>

                <select className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none">
                  <option>Bike</option>
                  <option>Car</option>
                </select>
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash className="cursor-pointer" /> : <FaEye className="cursor-pointer" />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showConfirmPassword ? <FaEyeSlash className="cursor-pointer"/> : <FaEye className="cursor-pointer" />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              closeRegister();
              openLogin();
            }}
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
