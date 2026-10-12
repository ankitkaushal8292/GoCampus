import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getDriverRequests,
  approveRequest,
  rejectRequest,
} from "../../services/rideRequestService";

const RideRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await getDriverRequests();

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

  const handleApprove = async (id) => {
    try {
      const response = await approveRequest(id);

      if (response.success) {
        toast.success(response.message);
        fetchRequests();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to approve request"
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await rejectRequest(id);

      if (response.success) {
        toast.success(response.message);
        fetchRequests();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject request"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-3xl font-bold text-blue-600">
          Ride Requests
        </h1>

        {loading ? (
          <div className="py-10 text-center">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-semibold">
              No Ride Requests
            </h2>
          </div>
        ) : (
          <div className="space-y-6">

            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-blue-600">
                      {request.ride.source} → {request.ride.destination}
                    </h2>

                    <p className="mt-2">
                      👤 Student:
                      <strong> {request.student.name}</strong>
                    </p>

                    <p>
                      📧 {request.student.email}
                    </p>

                    <p>
                      📞 {request.student.phone || "N/A"}
                    </p>

                    <p className="mt-2">
                      Status :
                      <span className="ml-2 rounded bg-yellow-100 px-3 py-1 text-yellow-700">
                        {request.status}
                      </span>
                    </p>

                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleApprove(request._id)
                        }
                        className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(request._id)
                        }
                        className="rounded-lg cursor-pointer bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                      >
                        Reject
                      </button>

                    </div>
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

export default RideRequests;