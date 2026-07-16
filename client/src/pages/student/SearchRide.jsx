import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { searchRides } from "../../services/rideService";
import toast from "react-hot-toast";
import { requestRide } from "../../services/rideRequestService";

const SearchRide = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRides = async () => {
    try {
      const response = await searchRides(filters);

      if (response.success) {
        setRides(response.rides);
      }
    } catch (error) {
      toast.error("Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetchRides();
  };

  const handleRequestRide = async (rideId) => {
    try {
      const response = await requestRide(rideId);

      if (response.success) {
        toast.success(response.message);

        fetchRides();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send ride request",
      );
    }
  };
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Search Rides</h1>

        {/* Search Form */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              name="source"
              value={filters.source}
              onChange={handleChange}
              placeholder="Source"
              className="rounded-lg border px-4 py-3 focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="rounded-lg border px-4 py-3 focus:outline-none focus:border-blue-500"
            />

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Ride List */}

        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg">Loading rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="rounded-xl bg-white p-10 shadow text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No rides found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600">
                      {ride.source} → {ride.destination}
                    </h2>

                    <p className="mt-3">
                      📅 Date: {new Date(ride.date).toLocaleDateString()}
                    </p>

                    <p>
                      👤 Driver: <strong>{ride.driver?.name}</strong>
                    </p>

                    <p>💺 Seats: {ride.availableSeats}</p>

                    <p>💰 Price: ₹{ride.price}</p>
                  </div>

                  {ride.requestStatus === "pending" ? (
                    <button
                      disabled
                      className="rounded-lg bg-yellow-500 px-5 py-3 text-white cursor-not-allowed"
                    >
                      Pending
                    </button>
                  ) : ride.requestStatus === "approved" ? (
                    <button
                      disabled
                      className="rounded-lg bg-green-600 px-5 py-3 text-white cursor-not-allowed"
                    >
                      Approved
                    </button>
                  ) : ride.requestStatus === "rejected" ? (
                    <button
                      disabled
                      className="rounded-lg bg-red-600 px-5 py-3 text-white cursor-not-allowed"
                    >
                      Rejected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRequestRide(ride._id)}
                      disabled={ride.availableSeats === 0}
                      className={`rounded-lg px-5 py-3 text-white transition ${
                        ride.availableSeats === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {ride.availableSeats === 0 ? "Full" : "Request Ride"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SearchRide;
