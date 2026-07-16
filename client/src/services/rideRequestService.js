import api from "../api/axios";

// Send Ride Request
export const requestRide = async (rideId) => {
  const response = await api.post(
    `/ride-requests/request/${rideId}`
  );

  return response.data;
};

// My Requests
export const getMyRequests = async () => {
  const response = await api.get(
    "/ride-requests/my-requests"
  );

  return response.data;
};

// Driver Requests
export const getDriverRequests = async () => {
  const response = await api.get(
    "/ride-requests/driver-requests"
  );

  return response.data;
};

// Approve Request
export const approveRequest = async (requestId) => {
  const response = await api.put(
    `/ride-requests/approve/${requestId}`
  );

  return response.data;
};

// Reject Request
export const rejectRequest = async (requestId) => {
  const response = await api.put(
    `/ride-requests/reject/${requestId}`
  );

  return response.data;
};