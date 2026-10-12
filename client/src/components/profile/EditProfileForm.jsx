import { useState } from "react";
import { updateProfile } from "../../services/userService";
import toast from "react-hot-toast";

const EditProfileForm = ({
  user,
  onClose,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    college: user?.college || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }

    try {
      setLoading(true);

      const response = await updateProfile(formData);

      if (response.success) {
        toast.success(response.message);

        onProfileUpdated(response.user);

        onClose();
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-blue-600 ">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* College */}
          <div>
            <label className="mb-2 block font-medium">
              College
            </label>

            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProfileForm;