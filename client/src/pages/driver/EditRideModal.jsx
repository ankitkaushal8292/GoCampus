import { useState, useEffect } from "react";

const EditRideModal = ({ ride, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    availableSeats: "",
    price: "",
  });

  useEffect(() => {
    if (ride) {
      setFormData({
        source: ride.source,
        destination: ride.destination,
        date: ride.date.split("T")[0],
        availableSeats: ride.availableSeats,
        price: ride.price,
      });
    }
  }, [ride]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Edit Ride
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            placeholder="Seats"
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 cursor-pointer py-2 rounded-lg bg-blue-600 text-white"
            >
              Update Ride
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditRideModal;