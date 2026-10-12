import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const { closeLogin, openRegister } = useModal();
  const { login } = useAuth();

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await loginUser(formData);

      if (response.success) {
  toast.success(response.message);


  login(response.user, response.token);


  setFormData({
    email: "",
    password: "",
  });

  setErrors({});


  closeLogin();


  if (response.user.role === "student") {
    navigate("/student/dashboard");
  } else {
    navigate("/driver/dashboard");
  }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <button
          onClick={closeLogin}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Login to your GoCampus account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">


          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

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
                {showPassword ? <FaEyeSlash className="cursor-pointer"/> : <FaEye className="cursor-pointer" />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              closeLogin();
              openRegister();
            }}
            className="font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
};

export default LoginModal;