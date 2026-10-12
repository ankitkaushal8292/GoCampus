import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";
import EditRideModal from "./EditRideModal";
import {
  getMyRides,
  deleteRide,
  updateRide,
} from "../../services/rideService";

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRide, setSelectedRide] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchMyRides = async () => {
    try {
      const response = await getMyRides();

      if (response.success) {
        setRides(response.rides);
      }
    } catch (error) {
      toast.error("Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRide = async (rideId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ride?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteRide(rideId);

      if (response.success) {
        toast.success(response.message);

        // Refresh ride list
        fetchMyRides();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete ride");
      }
    }
  };

  const handleUpdateRide = async (updatedRide) => {
  try {
    const response = await updateRide(
      selectedRide._id,
      updatedRide
    );

    if (response.success) {
      toast.success(response.message);

      setShowEditModal(false);
      setSelectedRide(null);

      fetchMyRides();
    }
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to update ride");
    }
  }
};

  useEffect(() => {
    fetchMyRides();
  }, []);

  
  return (
  <>
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          My Rides
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : rides.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No rides found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first ride.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600">
                      {ride.source} → {ride.destination}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Date: {new Date(ride.date).toLocaleDateString()}
                    </p>

                    <p className="text-gray-500">
                      Seats: {ride.availableSeats}
                    </p>

                    <p className="text-gray-500">
                      Price: ₹{ride.price}
                    </p>

                    <p className="mt-2">
                      Status:
                      <span className="ml-2 rounded bg-green-100 px-3 py-1 text-green-700">
                        {ride.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedRide(ride);
                        setShowEditModal(true);
                      }}
                      className="rounded-lg cursor-pointer bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteRide(ride._id)}
                      className="rounded-lg cursor-pointer bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>

    {showEditModal && (
      <EditRideModal
        ride={selectedRide}
        onClose={() => {
          setShowEditModal(false);
          setSelectedRide(null);
        }}
        onUpdate={handleUpdateRide}
      />
    )}
  </>
);
};
export default MyRides;