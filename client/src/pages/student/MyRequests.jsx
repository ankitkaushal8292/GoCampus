import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyRequests } from "../../services/rideRequestService";
import toast from "react-hot-toast";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();

      if (response.success) {
        setRequests(response.requests);
      }
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        <h1 className="mb-6 text-3xl font-bold text-blue-600">
          My Ride Requests
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : requests.length === 0 ? (
          <div className="rounded-xl bg-white p-8 shadow text-center">
            <h2 className="text-xl font-semibold">
              No Ride Requests
            </h2>

            <p className="mt-2 text-gray-500">
              Request a ride to see it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  {request.ride?.source} → {request.ride?.destination}
                </h2>

                <p className="mt-3">
                  📅{" "}
                  {new Date(
                    request.ride?.date
                  ).toLocaleDateString()}
                </p>

                <p>
                  👤 Driver: {request.driver?.name}
                </p>

                <p>
                  📞 Phone: {request.driver?.phone || "N/A"}
                </p>

                <p>
                  💰 ₹{request.ride?.price}
                </p>

                <div className="mt-5">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status.toUpperCase()}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default MyRequests;