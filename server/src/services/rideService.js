import api from "../api/axios";

// Create Ride
export const createRide = async (rideData) => {
  const response = await api.post("/rides/create", rideData);
  return response.data;
};

// Get My Rides
export const getMyRides = async () => {
  const response = await api.get("/rides/my-rides");
  return response.data;
};

// Search Rides
export const searchRides = async (params) => {
  const response = await api.get("/rides/search", {
    params,
  });

  return response.data;
};

