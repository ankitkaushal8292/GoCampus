import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyBookings, leaveRide } from "../../services/rideService";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings();

      if (response.success) {
        setRides(response.rides);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveRide = async (rideId) => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this ride?",
    );

    if (!confirmLeave) {
      return;
    }

    try {
      const response = await leaveRide(rideId);

      if (response.success) {
        toast.success(response.message);

        // Refresh bookings
        fetchBookings();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to leave ride");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">My Bookings</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : rides.length === 0 ? (
          <div className="rounded-xl bg-white p-8 shadow text-center">
            <h2 className="text-xl font-semibold">No bookings found</h2>

            <p className="mt-2 text-gray-500">Join a ride to see it here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rides.map((ride) => (
              <div key={ride._id} className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-2xl font-bold text-blue-600">
                  {ride.source} → {ride.destination}
                </h2>

                <p className="mt-3">
                  📅 {new Date(ride.date).toLocaleDateString()}
                </p>

                <p>👤 Driver: {ride.driver?.name}</p>

                <p>📞 Phone: {ride.driver?.phone}</p>

                <p>💰 ₹{ride.price}</p>

                <button
                  onClick={() => handleLeaveRide(ride._id)}
                  className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                >
                  Leave Ride
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
