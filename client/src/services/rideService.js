import api from "../api/axios";

// ================= CREATE RIDE =================
export const createRide = async (rideData) => {
  const response = await api.post("/rides/create", rideData);
  return response.data;
};

// ================= MY RIDES =================
export const getMyRides = async () => {
  const response = await api.get("/rides/my-rides");
  return response.data;
};

// ================= DELETE RIDE =================
export const deleteRide = async (rideId) => {
  const response = await api.delete(`/rides/${rideId}`);
  return response.data;
};

// ================= SEARCH RIDES =================
export const searchRides = async (params) => {
  const response = await api.get("/rides/search", {
    params,
  });

  return response.data;
};

// ================= JOIN RIDE =================
export const joinRide = async (rideId) => {
  const response = await api.post(`/rides/${rideId}/join`);
  return response.data;
};

// ================= LEAVE RIDE =================
export const leaveRide = async (rideId) => {
  const response = await api.delete(`/rides/${rideId}/leave`);
  return response.data;
};

// ================= MY BOOKINGS =================
export const getMyBookings = async () => {
  const response = await api.get("/rides/my-bookings");
  return response.data;
};

// ================= UPDATE RIDE =================
export const updateRide = async (rideId, rideData) => {
  const response = await api.put(`/rides/${rideId}`, rideData);
  return response.data;
};

// Driver Dashboard
export const getDriverDashboard = async () => {
  const response = await api.get("/rides/dashboard");
  return response.data;
};