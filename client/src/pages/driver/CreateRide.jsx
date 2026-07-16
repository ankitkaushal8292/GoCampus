import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createRide } from "../../services/rideService";
import toast from "react-hot-toast";

const CreateRide = () => {
const [formData, setFormData] = useState({
  source: "",
  destination: "",
  date: "",
  availableSeats: "",
  price: "",
});

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.source.trim()) {
  newErrors.source = "Source is required";
}

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }


    if (!formData.availableSeats) {
      newErrors.availableSeats = "Available seats are required";
    }

    if (!formData.price) {
  newErrors.price = "Price is required";
}

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }


    // API call next step
try {
  const rideData = {
    ...formData,
    availableSeats: Number(formData.availableSeats),
    price: Number(formData.price),
  };

  const response = await createRide(rideData);

  if (response.success) {
    toast.success(response.message);

    setFormData({
      source: "",
      destination: "",
      date: "",
      availableSeats: "",
      price: "",
    });

    setErrors({});
  }
} catch (error) {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong");
  }
}
    // const response = await createRide(formData);
    // toast.success(response.message);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Create Ride
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Pickup */}
          <div>
            <label className="block mb-2 font-medium">
              Pickup Location
            </label>

            <input
              type="text"
              name="source"
value={formData.source}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full border rounded-lg px-4 py-3"
            />

            {errors.source && (
              <p className="mt-1 text-sm text-red-500">
                {errors.source}
              </p>
            )}
          </div>

          {/* Destination */}
          <div>
            <label className="block mb-2 font-medium">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              className="w-full border rounded-lg px-4 py-3"
            />

            {errors.destination && (
              <p className="mt-1 text-sm text-red-500">
                {errors.destination}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            {errors.date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.date}
              </p>
            )}
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-2 font-medium">
              Available Seats
            </label>

            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              placeholder="4"
              className="w-full border rounded-lg px-4 py-3"
            />

            {errors.availableSeats && (
              <p className="mt-1 text-sm text-red-500">
                {errors.availableSeats}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium">
              Price Per Seat (₹)
            </label>

            <input
              type="number"
             name="price"
value={formData.price}
              onChange={handleChange}
              placeholder="100"
              className="w-full border rounded-lg px-4 py-3"
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price}
              </p>
            )}
          </div>


          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Create Ride
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateRide;